/*! Built with http://stenciljs.com */
const{h:e}=window.App;import{c as t,d as i,e as n}from"./chunk-9cb229af.js";import{b as s,e as o}from"./chunk-f7b6af08.js";class r{constructor(){this.lastClick=-1e4,this.visible=!0,this.tappable=!0,this.stopPropagation=!0}componentDidLoad(){var e;e=this.doc,c.add(this),e.body.classList.add(a)}componentDidUnload(){var e;e=this.doc,c.delete(this),0===c.size&&e.body.classList.remove(a)}onTouchStart(e){this.lastClick=t(e),this.emitTap(e)}onMouseDown(e){this.lastClick<t(e)-2500&&this.emitTap(e)}emitTap(e){this.stopPropagation&&(e.preventDefault(),e.stopPropagation()),this.tappable&&this.ionBackdropTap.emit()}hostData(){return{tabindex:"-1",class:{"backdrop-hide":!this.visible,"backdrop-no-tappable":!this.tappable}}}static get is(){return"ion-backdrop"}static get encapsulation(){return"shadow"}static get properties(){return{doc:{context:"document"},stopPropagation:{type:Boolean,attr:"stop-propagation"},tappable:{type:Boolean,attr:"tappable"},visible:{type:Boolean,attr:"visible"}}}static get events(){return[{name:"ionBackdropTap",method:"ionBackdropTap",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"touchstart",method:"onTouchStart",capture:!0},{name:"mousedown",method:"onMouseDown",capture:!0}]}static get style(){return".sc-ion-backdrop-md-h{left:0;right:0;top:0;bottom:0;display:block;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);contain:strict;cursor:pointer;opacity:.01;-ms-touch-action:none;touch-action:none;z-index:2;background-color:var(--ion-backdrop-color,#000)}.backdrop-hide.sc-ion-backdrop-md-h{background:0 0}.backdrop-no-tappable.sc-ion-backdrop-md-h{cursor:auto}body.backdrop-no-scroll.sc-ion-backdrop-md{overflow:hidden}"}static get styleMode(){return"md"}}const a="backdrop-no-scroll",c=new Set,l=()=>import("./ios.transition.js"),h=()=>import("./md.transition.js");async function d(e){const t=e.enteringEl,i=e.leavingEl;t&&t.classList.remove("ion-page-invisible"),i&&i.classList.remove("ion-page-invisible")}async function u(e,t){const i=(null!=e.deepWait?e.deepWait:t)?[w(e.enteringEl),w(e.leavingEl)]:[v(e.enteringEl),v(e.leavingEl)];await Promise.all(i),await async function(e,t){e&&await e(t)}(e.viewIsReady,e.enteringEl)}function m(e,t,i){g(e,i,"ionViewWillLeave"),g(e,t,"ionViewWillEnter")}function p(e,t,i){g(e,t,"ionViewDidEnter"),g(e,i,"ionViewDidLeave")}function g(e,t,i){if(t){const n=new(0,e.CustomEvent)(i,{bubbles:!1,cancelable:!1});t.dispatchEvent(n)}}function v(e){return e&&e.componentOnReady?e.componentOnReady():Promise.resolve()}async function w(e){const t=e;if(t){if(t.componentOnReady&&await t.componentOnReady())return;await Promise.all(Array.from(t.children).map(w))}}function b(e,t){t?(e.setAttribute("aria-hidden","true"),e.classList.add("ion-page-hidden")):(e.hidden=!1,e.removeAttribute("aria-hidden"),e.classList.remove("ion-page-hidden"))}class y{constructor(e,t){this.component=e,this.params=t,this.state=1}async init(e){if(this.state=2,!this.element){const t=this.component;this.element=await async function(e,t,i,n,s){if(e)return e.attachViewToDom(t,i,s,n);if("string"!=typeof i&&!(i instanceof HTMLElement))throw new Error("framework delegate is missing");const o="string"==typeof i?t.ownerDocument.createElement(i):i;return n&&n.forEach(e=>o.classList.add(e)),s&&Object.assign(o,s),t.appendChild(o),o.componentOnReady&&await o.componentOnReady(),o}(this.delegate,e,t,["ion-page","ion-page-invisible"],this.params)}}_destroy(){this.state;const e=this.element;e&&(this.delegate?this.delegate.removeViewFromDom(e.parentElement,e):e.remove()),this.nav=void 0,this.state=3}}function f(e,t,i){if(!e)return!1;if(e.component!==t)return!1;const n=e.params,s=null==n,o=null==i;if(n===i)return!0;if(s!==o)return!1;if(s&&o)return!0;const r=Object.keys(n),a=Object.keys(i);if(r.length!==a.length)return!1;for(const e of r)if(n[e]!==i[e])return!1;return!0}function k(e,t){return e?e instanceof y?e:new y(e,t):null}class S{constructor(){this.transInstr=[],this.useRouter=!1,this.isTransitioning=!1,this.destroyed=!1,this.views=[],this.animated=!0}swipeGestureChanged(){this.gesture&&this.gesture.setDisabled(!this.swipeGesture)}rootChanged(){this.root&&(this.useRouter||this.setRoot(this.root,this.rootParams))}componentWillLoad(){this.useRouter=!!this.win.document.querySelector("ion-router")&&!this.el.closest("[no-router]"),void 0===this.swipeGesture&&(this.swipeGesture=this.config.getBoolean("swipeBackEnabled","ios"===this.mode)),this.ionNavWillLoad.emit()}async componentDidLoad(){this.rootChanged(),this.gesture=(await import("./gesture.js")).createGesture({el:this.win.document.body,queue:this.queue,gestureName:"goback-swipe",gesturePriority:30,threshold:10,canStart:this.canStart.bind(this),onStart:this.onStart.bind(this),onMove:this.onMove.bind(this),onEnd:this.onEnd.bind(this)}),this.swipeGestureChanged()}componentDidUnload(){for(const e of this.views)g(this.win,e.element,"ionViewWillUnload"),e._destroy();this.gesture&&this.gesture.destroy(),this.sbTrns&&this.sbTrns.destroy(),this.transInstr.length=this.views.length=0,this.sbTrns=void 0,this.destroyed=!0}push(e,t,i,n){return this.queueTrns({insertStart:-1,insertViews:[{page:e,params:t}],opts:i},n)}insert(e,t,i,n,s){return this.queueTrns({insertStart:e,insertViews:[{page:t,params:i}],opts:n},s)}insertPages(e,t,i,n){return this.queueTrns({insertStart:e,insertViews:t,opts:i},n)}pop(e,t){return this.queueTrns({removeStart:-1,removeCount:1,opts:e},t)}popTo(e,t,i){const n={removeStart:-1,removeCount:-1,opts:t};return"object"==typeof e&&e.component?(n.removeView=e,n.removeStart=1):"number"==typeof e&&(n.removeStart=e+1),this.queueTrns(n,i)}popToRoot(e,t){return this.queueTrns({removeStart:1,removeCount:-1,opts:e},t)}removeIndex(e,t=1,i,n){return this.queueTrns({removeStart:e,removeCount:t,opts:i},n)}setRoot(e,t,i,n){return this.setPages([{page:e,params:t}],i,n)}setPages(e,t,i){return t||(t={}),!0!==t.animated&&(t.animated=!1),this.queueTrns({insertStart:0,insertViews:e,removeStart:0,removeCount:-1,opts:t},i)}setRouteId(e,t,i){const n=this.getActiveSync();if(f(n,e,t))return Promise.resolve({changed:!1,element:n.element});let s;const o=new Promise(e=>s=e);let r;const a={updateURL:!1,viewIsReady:e=>{let t;const i=new Promise(e=>t=e);return s({changed:!0,element:e,markVisible:async()=>{t(),await r}}),i}};if(0===i)r=this.setRoot(e,t,a);else{const n=this.views.find(i=>f(i,e,t));n?r=this.popTo(n,Object.assign({},a,{direction:"back"})):1===i?r=this.push(e,t,a):-1===i&&(r=this.setRoot(e,t,Object.assign({},a,{direction:"back",animated:!0})))}return o}async getRouteId(){const e=this.getActiveSync();return e?{id:e.element.tagName,params:e.params,element:e.element}:void 0}getActive(){return Promise.resolve(this.getActiveSync())}getByIndex(e){return Promise.resolve(this.views[e])}canGoBack(e){return Promise.resolve(this.canGoBackSync(e))}getPrevious(e){return Promise.resolve(this.getPreviousSync(e))}getLength(){return this.views.length}getActiveSync(){return this.views[this.views.length-1]}canGoBackSync(e=this.getActiveSync()){return!(!e||!this.getPrevious(e))}getPreviousSync(e=this.getActiveSync()){if(!e)return;const t=this.views,i=t.indexOf(e);return i>0?t[i-1]:void 0}queueTrns(e,t){if(this.isTransitioning&&e.opts&&!0===e.opts.skipIfBusy)return Promise.resolve(!1);const i=new Promise((t,i)=>{e.resolve=t,e.reject=i});return e.done=t,e.insertViews&&0===e.insertViews.length&&(e.insertViews=void 0),this.transInstr.push(e),this.nextTrns(),i}success(e,t){if(null!==this.transInstr){if(t.done&&t.done(e.hasCompleted,e.requiresTransition,e.enteringView,e.leavingView,e.direction),t.resolve(e.hasCompleted),!1!==t.opts.updateURL&&this.useRouter){const t=this.win.document.querySelector("ion-router");if(t){const i="back"===e.direction?-1:1;t.navChanged(i)}}}else this.fireError("nav controller was destroyed",t)}failed(e,t){null!==this.transInstr?(this.transInstr.length=0,this.fireError(e,t)):this.fireError("nav controller was destroyed",t)}fireError(e,t){t.done&&t.done(!1,!1,e),t.reject&&!this.destroyed?t.reject(e):t.resolve(!1)}nextTrns(){if(this.isTransitioning)return!1;const e=this.transInstr.shift();return!!e&&(this.runTransition(e),!0)}async runTransition(e){try{this.ionNavWillChange.emit(),this.isTransitioning=!0,this.prepareTI(e);const t=this.getActiveSync(),i=this.getEnteringView(e,t);if(!t&&!i)throw new Error("no views in the stack to be removed");i&&1===i.state&&await i.init(this.el),this.postViewInit(i,t,e);const n=(e.enteringRequiresTransition||e.leavingRequiresTransition)&&i!==t?await this.transition(i,t,e):{hasCompleted:!0,requiresTransition:!1};this.success(n,e),this.ionNavDidChange.emit()}catch(t){this.failed(t,e)}this.isTransitioning=!1,this.nextTrns()}prepareTI(e){const t=this.views.length;if(e.opts=e.opts||{},void 0===e.opts.delegate&&(e.opts.delegate=this.delegate),null!=e.removeView){e.removeStart,e.removeCount;const t=this.views.indexOf(e.removeView);if(t<0)throw new Error("removeView was not found");e.removeStart+=t}null!=e.removeStart&&(e.removeStart<0&&(e.removeStart=t-1),e.removeCount<0&&(e.removeCount=t-e.removeStart),e.leavingRequiresTransition=e.removeCount>0&&e.removeStart+e.removeCount===t),e.insertViews&&((e.insertStart<0||e.insertStart>t)&&(e.insertStart=t),e.enteringRequiresTransition=e.insertStart===t);const i=e.insertViews;if(!i)return;i.length;const n=i.map(e=>e instanceof y?e:"page"in e?k(e.page,e.params):k(e,void 0)).filter(e=>null!==e);if(0===n.length)throw new Error("invalid views to insert");for(const t of n){t.delegate=e.opts.delegate;const i=t.nav;if(i&&i!==this)throw new Error("inserted view was already inserted");if(3===t.state)throw new Error("inserted view was already destroyed")}e.insertViews=n}getEnteringView(e,t){const i=e.insertViews;if(i)return i[i.length-1];const n=e.removeStart;if(null!=n){const i=this.views,s=n+e.removeCount;for(let e=i.length-1;e>=0;e--){const o=i[e];if((e<n||e>=s)&&o!==t)return o}}}postViewInit(e,t,i){i.resolve,i.reject;const n=i.opts,s=i.insertViews,o=i.removeStart,r=i.removeCount;let a;if(null!=o&&null!=r){a=[];for(let i=0;i<r;i++){const n=this.views[i+o];n&&n!==e&&n!==t&&a.push(n)}n.direction=n.direction||"back"}if(0===this.views.length+(s?s.length:0)-(r||0))throw console.warn("You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.",this,this.el),new Error("navigation stack needs at least one root page");if(s){let e=i.insertStart;for(const t of s)this.insertViewAt(t,e),e++;i.enteringRequiresTransition&&(n.direction=n.direction||"forward")}if(a&&a.length>0){for(const e of a)g(this.win,e.element,"ionViewWillLeave"),g(this.win,e.element,"ionViewDidLeave"),g(this.win,e.element,"ionViewWillUnload");for(const e of a)this.destroyView(e)}}async transition(e,t,i){this.sbTrns&&(this.sbTrns.destroy(),this.sbTrns=void 0);const n=i.opts,s=n.progressAnimation?e=>{this.sbTrns=e}:void 0,o=e.element,r=t&&t.element,a=this.animated&&this.config.getBoolean("animated",!0),c=Object.assign({mode:this.mode,showGoBack:this.canGoBackSync(e),animationCtrl:this.animationCtrl,queue:this.queue,window:this.win,baseEl:this.el,progressCallback:s,animated:a,enteringEl:o,leavingEl:r},n),{hasCompleted:g}=await function(e){return new Promise((t,i)=>{e.queue.write(()=>{!function(e){const t=e.enteringEl,i=e.leavingEl;(function(e,t,i){e&&(e.style.zIndex="back"===i?"99":"101"),t&&(t.style.zIndex="100")})(t,i,e.direction),e.showGoBack?t.classList.add("can-go-back"):t.classList.remove("can-go-back"),b(t,!1),i&&b(i,!1)}(e),async function(e){const t=await async function(e){if(e.leavingEl&&!1!==e.animated&&0!==e.duration)return e.animationBuilder?e.animationBuilder:"ios"===e.mode?(await l()).iosTransitionAnimation:(await h()).mdTransitionAnimation}(e);return t?async function(e,t){await u(t,!0);const i=await t.animationCtrl.create(e,t.baseEl,t);return m(t.window,t.enteringEl,t.leavingEl),await function(e,t){const i=t.progressCallback,n=new Promise(t=>e.onFinish(t));return i?(e.progressStart(),i(e)):e.play(),n}(i,t),i.hasCompleted&&p(t.window,t.enteringEl,t.leavingEl),{hasCompleted:i.hasCompleted,animation:i}}(t,e):async function(e){const t=e.enteringEl,i=e.leavingEl;return await u(e,!1),m(e.window,t,i),p(e.window,t,i),{hasCompleted:!0}}(e)}(e).then(i=>{i.animation&&i.animation.destroy(),d(e),t(i)},t=>{d(e),i(t)})})})}(c);return this.transitionFinish(g,e,t,n)}transitionFinish(e,t,i,n){const s=e?t:i;return s&&this.cleanup(s),{hasCompleted:e,requiresTransition:!0,enteringView:t,leavingView:i,direction:n.direction}}insertViewAt(e,t){const i=this.views,n=i.indexOf(e);n>-1?(e.nav,i.splice(t,0,i.splice(n,1)[0])):(e.nav,e.nav=this,i.splice(t,0,e))}removeView(e){2===e.state||e.state;const t=this.views,i=t.indexOf(e);i>=0&&t.splice(i,1)}destroyView(e){e._destroy(),this.removeView(e)}cleanup(e){if(this.destroyed)return;const t=this.views,i=t.indexOf(e);for(let e=t.length-1;e>=0;e--){const n=t[e],s=n.element;e>i?(g(this.win,s,"ionViewWillUnload"),this.destroyView(n)):e<i&&b(s,!0)}}canStart(){return!!this.swipeGesture&&!this.isTransitioning&&this.canGoBackSync()}onStart(){this.isTransitioning||this.transInstr.length>0||this.queueTrns({removeStart:-1,removeCount:1,opts:{direction:"back",progressAnimation:!0}},void 0)}onMove(e){if(this.sbTrns){this.isTransitioning=!0;const t=e.deltaX/this.win.innerWidth;this.sbTrns.progressStep(t)}}onEnd(e){if(this.sbTrns){const t=e.deltaX,i=this.win.innerWidth,n=t/i,s=e.velocityX,o=i/2,r=s>=0&&(s>.2||e.deltaX>o),a=(r?1-n:n)*i;let c=0;if(a>5){const e=a/Math.abs(s);c=Math.min(e,300)}this.sbTrns.progressEnd(r,n,c)}}render(){return["ios"===this.mode&&e("div",{class:"nav-decor"}),e("slot",null)]}static get is(){return"ion-nav"}static get encapsulation(){return"shadow"}static get properties(){return{animated:{type:Boolean,attr:"animated"},animationCtrl:{connect:"ion-animation-controller"},canGoBack:{method:!0},config:{context:"config"},delegate:{type:"Any",attr:"delegate"},el:{elementRef:!0},getActive:{method:!0},getByIndex:{method:!0},getPrevious:{method:!0},getRouteId:{method:!0},insert:{method:!0},insertPages:{method:!0},pop:{method:!0},popTo:{method:!0},popToRoot:{method:!0},push:{method:!0},queue:{context:"queue"},removeIndex:{method:!0},root:{type:String,attr:"root",watchCallbacks:["rootChanged"]},rootParams:{type:"Any",attr:"root-params"},setPages:{method:!0},setRoot:{method:!0},setRouteId:{method:!0},swipeGesture:{type:Boolean,attr:"swipe-gesture",mutable:!0,watchCallbacks:["swipeGestureChanged"]},win:{context:"window"}}}static get events(){return[{name:"ionNavWillLoad",method:"ionNavWillLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionNavWillChange",method:"ionNavWillChange",bubbles:!0,cancelable:!0,composed:!0},{name:"ionNavDidChange",method:"ionNavDidChange",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-ion-nav-h{left:0;right:0;top:0;bottom:0;position:absolute;contain:layout size style;overflow:hidden;z-index:0}.nav-decor.sc-ion-nav{display:none}.show-decor.sc-ion-nav-h   .nav-decor.sc-ion-nav{left:0;right:0;top:0;bottom:0;display:block;position:absolute;background:#000;z-index:0;pointer-events:none}"}}class C{constructor(){this.inputId=`ion-rb-${T++}`,this.keyFocus=!1,this.name=this.inputId,this.disabled=!1,this.checked=!1}componentWillLoad(){this.ionSelect=n(this.ionSelect),this.ionStyle=n(this.ionStyle),void 0===this.value&&(this.value=this.inputId),this.emitStyle()}componentDidLoad(){this.ionRadioDidLoad.emit(),this.nativeInput.checked=this.checked;const e=this.nativeInput.closest("ion-item");if(e){const t=e.querySelector("ion-label");t&&(t.id=this.inputId+"-lbl",this.nativeInput.setAttribute("aria-labelledby",t.id))}}componentDidUnload(){this.ionRadioDidUnload.emit()}colorChanged(){this.emitStyle()}checkedChanged(e){this.nativeInput.checked!==e&&(this.nativeInput.checked=e),e&&this.ionSelect.emit({checked:!0,value:this.value}),this.emitStyle()}disabledChanged(e){this.nativeInput.disabled=e,this.emitStyle()}emitStyle(){this.ionStyle.emit({"radio-checked":this.checked,"interactive-disabled":this.disabled})}onClick(){this.checkedChanged(!0)}onChange(){this.checked=!0,this.nativeInput.focus()}onKeyUp(){this.keyFocus=!0}onFocus(){this.ionFocus.emit()}onBlur(){this.keyFocus=!1,this.ionBlur.emit()}hostData(){return{class:Object.assign({},s(this.color),{"in-item":o(".item",this.el),interactive:!0,"radio-checked":this.checked,"radio-disabled":this.disabled,"radio-key":this.keyFocus})}}render(){return[e("div",{class:"radio-icon"},e("div",{class:"radio-inner"})),e("input",{type:"radio",onClick:this.onClick.bind(this),onChange:this.onChange.bind(this),onFocus:this.onFocus.bind(this),onBlur:this.onBlur.bind(this),onKeyUp:this.onKeyUp.bind(this),id:this.inputId,name:this.name,value:this.value,disabled:this.disabled,ref:e=>this.nativeInput=e})]}static get is(){return"ion-radio"}static get encapsulation(){return"shadow"}static get properties(){return{checked:{type:Boolean,attr:"checked",mutable:!0,watchCallbacks:["checkedChanged"]},color:{type:String,attr:"color",watchCallbacks:["colorChanged"]},disabled:{type:Boolean,attr:"disabled",watchCallbacks:["disabledChanged"]},el:{elementRef:!0},keyFocus:{state:!0},mode:{type:String,attr:"mode"},name:{type:String,attr:"name"},value:{type:"Any",attr:"value",mutable:!0}}}static get events(){return[{name:"ionRadioDidLoad",method:"ionRadioDidLoad",bubbles:!0,cancelable:!0,composed:!0},{name:"ionRadioDidUnload",method:"ionRadioDidUnload",bubbles:!0,cancelable:!0,composed:!0},{name:"ionStyle",method:"ionStyle",bubbles:!0,cancelable:!0,composed:!0},{name:"ionSelect",method:"ionSelect",bubbles:!0,cancelable:!0,composed:!0},{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return".sc-ion-radio-md-h{--ion-color-base:var(--ion-color-primary, #3880ff);display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;--width:16px;--height:16px}.radio-disabled.sc-ion-radio-md-h{pointer-events:none;opacity:.3}input.sc-ion-radio-md{left:0;top:0;margin:0;position:absolute;width:100%;height:100%;border:0;background:0 0;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:0}.radio-icon.sc-ion-radio-md, .radio-inner.sc-ion-radio-md{-webkit-box-sizing:border-box;box-sizing:border-box}.radio-icon.sc-ion-radio-md{display:block;position:relative;width:var(--width);height:var(--height);contain:layout size style;left:0;top:0;margin:0;border-radius:50%;border-width:2px;border-style:solid;border-color:var(--ion-text-color-step-600,#999)}.radio-inner.sc-ion-radio-md{left:2px;top:2px;border-radius:50%;position:absolute;width:8px;height:8px;-webkit-transform:scale3d(0,0,0);transform:scale3d(0,0,0);-webkit-transition:-webkit-transform 280ms cubic-bezier(.4,0,.2,1);transition:-webkit-transform 280ms cubic-bezier(.4,0,.2,1);transition:transform 280ms cubic-bezier(.4,0,.2,1);transition:transform 280ms cubic-bezier(.4,0,.2,1),-webkit-transform 280ms cubic-bezier(.4,0,.2,1);background-color:var(--ion-color-base)}.radio-checked.sc-ion-radio-md-h   .radio-icon.sc-ion-radio-md{border-color:var(--ion-color-base)}.radio-checked.sc-ion-radio-md-h   .radio-inner.sc-ion-radio-md{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}.radio-key.sc-ion-radio-md-h   .radio-icon.sc-ion-radio-md::after{border-radius:50%;left:-12px;top:-12px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint,#4c8dff);content:\"\";opacity:.2}.in-item.sc-ion-radio-md-h{margin:9px 10px 9px 0;display:block;position:static}.in-item[slot=start].sc-ion-radio-md-h{margin:11px 36px 10px 4px}"}static get styleMode(){return"md"}}let T=0;export{r as IonBackdrop,S as IonNav,C as IonRadio};