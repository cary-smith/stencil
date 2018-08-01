import * as d from '../../declarations';
import { NODE_TYPE, SSR_CHILD_ID, SSR_VNODE_ID } from '../../util/constants';


export function createVNodesFromSsr(plt: d.PlatformApi, domApi: d.DomApi, rootElm: Element) {
  const allSsrElms = rootElm.querySelectorAll(`[${SSR_VNODE_ID}]`) as NodeListOf<d.HostElement>;
  const ilen = allSsrElms.length;
  let elm: d.HostElement,
      ssrVNodeId: string,
      ssrVNode: d.VNode,
      i: number,
      j: number,
      jlen: number;

  if (ilen > 0) {
    plt.hasLoadedMap.set(rootElm as d.HostElement, true);

    for (i = 0; i < ilen; i++) {
      elm = allSsrElms[i];
      ssrVNodeId = domApi.$getAttribute(elm, SSR_VNODE_ID);
      ssrVNode = {};
      ssrVNode.vtag = domApi.$tagName(ssrVNode.elm = elm);
      plt.vnodeMap.set(elm, ssrVNode);

      for (j = 0, jlen = elm.childNodes.length; j < jlen; j++) {
        addChildSsrVNodes(domApi, elm.childNodes[j] as d.RenderNode, ssrVNode, ssrVNodeId, true);
      }
    }

    if (__BUILD_CONDITIONALS__.hasShadowDom) {
      convertToShadowDom(domApi, rootElm as HTMLElement);
    }
  }
}


function addChildSsrVNodes(domApi: d.DomApi, node: d.RenderNode, parentVNode: d.VNode, ssrVNodeId: string, checkNestedElements: boolean) {
  const nodeType = domApi.$nodeType(node);
  let previousComment: Comment;
  let childVNodeId: string,
      childVNodeSplt: string[],
      childVNode: d.VNode;

  if (checkNestedElements && nodeType === NODE_TYPE.ElementNode) {
    childVNodeId = domApi.$getAttribute(node, SSR_CHILD_ID);

    if (childVNodeId) {
      // split the start comment's data with a period
      childVNodeSplt = childVNodeId.split('.');

      // ensure this this element is a child element of the ssr vnode
      if (childVNodeSplt[0] === ssrVNodeId) {
        // cool, this element is a child to the parent vnode
        childVNode = {};
        childVNode.vtag = domApi.$tagName(childVNode.elm = node);

        // this is a new child vnode
        // so ensure its parent vnode has the vchildren array
        if (!parentVNode.vchildren) {
          parentVNode.vchildren = [];
        }

        // add our child vnode to a specific index of the vnode's children
        parentVNode.vchildren[childVNodeSplt[1]] = childVNode;

        // this is now the new parent vnode for all the next child checks
        parentVNode = childVNode;

        // if there's a trailing period, then it means there aren't any
        // more nested elements, but maybe nested text nodes
        // either way, don't keep walking down the tree after this next call
        checkNestedElements = (childVNodeSplt[2] !== '');
      }
    }

    // keep drilling down through the elements
    const childNodes = domApi.$childNodes(node) as NodeListOf<d.RenderNode>;
    for (let i = 0; i < childNodes.length; i++) {
      addChildSsrVNodes(domApi, childNodes[i], parentVNode, ssrVNodeId, checkNestedElements);
    }

  } else if (nodeType === NODE_TYPE.TextNode &&
            (previousComment = <Comment>node.previousSibling) &&
            domApi.$nodeType(previousComment) === NODE_TYPE.CommentNode) {

    // split the start comment's data with a period
    childVNodeSplt = domApi.$getTextContent(previousComment).split('.');

    // ensure this is an ssr text node start comment
    // which should start with an "s" and delimited by periods
    if (childVNodeSplt[0] === 's' && childVNodeSplt[1] === ssrVNodeId) {
      // cool, this is a text node and it's got a start comment
      childVNode = { vtext: domApi.$getTextContent(node) } as d.VNode;
      childVNode.elm = node;

      // this is a new child vnode
      // so ensure its parent vnode has the vchildren array
      if (!parentVNode.vchildren) {
        parentVNode.vchildren = [];
      }

      // add our child vnode to a specific index of the vnode's children
      parentVNode.vchildren[childVNodeSplt[2]] = childVNode;
    }
  }

  if (__BUILD_CONDITIONALS__.hasSlot) {
    if (nodeType === NODE_TYPE.CommentNode) {
      childVNodeSplt = domApi.$getTextContent(node).split('.');
      if (childVNodeSplt[0] === 'l' && childVNodeSplt[1] === ssrVNodeId) {
        // ok great, this is a slot for this vnode
        childVNode = { vtag: 'slot' } as d.VNode;
        domApi.$insertBefore(parentVNode.elm, childVNode.elm = domApi.$createElement(childVNode.vtag), node);
        domApi.$remove(node);

        if (childVNodeSplt[3]) {
          // this slot has a "name" attribute
          childVNode.vattrs = childVNode.vattrs || {};
          domApi.$setAttribute(childVNode.elm, 'name', childVNode.vattrs.name = (childVNode.vname = childVNodeSplt[3]));
        }

        // this is a new child vnode
        // so ensure its parent vnode has the vchildren array
        if (!parentVNode.vchildren) {
          parentVNode.vchildren = [];
        }

        // add our child vnode to a specific index of the vnode's children
        parentVNode.vchildren[childVNodeSplt[2]] = childVNode;
      }
    }
  }
}


export function convertToShadowDom(domApi: d.DomApi, node: d.HostElement) {
  const nodeType = domApi.$nodeType(node);

  const vnodeId = domApi.$getAttribute(node, SSR_VNODE_ID);
  if (vnodeId) {

  }

  if (nodeType === NODE_TYPE.ElementNode) {
    // keep drilling down through the elements
    const childNodes = domApi.$childNodes(node) as NodeListOf<d.HostElement>;
    for (let i = 0; i < childNodes.length; i++) {
      convertToShadowDom(domApi, childNodes[i]);
    }
  }
}