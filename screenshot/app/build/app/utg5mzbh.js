/*! Built with http://stenciljs.com */
const{h:t}=window.App;import{b as e,c as o}from"./chunk-f7b6af08.js";import{b as s}from"./chunk-9cb229af.js";class r{hostData(){return{class:e(this.color)}}render(){return t("a",{href:this.href,onClick:t=>o(this.win,this.href,t,this.routerDirection)},t("slot",null))}static get is(){return"ion-anchor"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},href:{type:String,attr:"href"},routerDirection:{type:String,attr:"router-direction"},win:{context:"window"}}}static get style(){return":host{--background:transparent;--color:var(--ion-color-primary, #3880ff);background:var(--background);color:var(--color)}:host(.ion-color){color:var(--ion-color-base)}a{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit}"}}class i{constructor(){this.keyFocus=!1,this.buttonType="button",this.disabled=!1,this.strong=!1,this.type="button"}componentWillLoad(){void 0===this.fill&&(this.fill=this.el.closest("ion-buttons")?"clear":"solid")}onFocus(){this.ionFocus.emit()}onKeyUp(){this.keyFocus=!0}onBlur(){this.keyFocus=!1,this.ionBlur.emit()}onClick(t){if("button"===this.type)o(this.win,this.href,t,this.routerDirection);else if(s(this.el)){const e=this.el.closest("form");if(e){t.preventDefault(),t.stopPropagation();const o=document.createElement("button");o.type=this.type,o.style.display="none",e.appendChild(o),o.click(),o.remove()}}}hostData(){const{buttonType:t,color:e,expand:o,fill:s,mode:r,shape:i,size:l,strong:c}=this;return{class:Object.assign({},function(t,e){return t?{[t]:!0,[`${t}-${e}`]:!0}:{}}(t,r),n(t,o,r),n(t,l,r),n(t,i,r),n(t,c?"strong":void 0,r),function(t,e,o,s){let r=t;o&&(r+=`-${o.toLowerCase()}`);const i={[r]:!0,[`${r}-${s}`]:!0};return e&&(i[`ion-color-${e}`]=!0),i}(t,e,s,r),{focused:this.keyFocus}),"ion-activable":!0}}render(){const e=this.href?"a":"button",o="button"===e?{type:this.type}:{href:this.href};return t(e,Object.assign({},o,{class:"button-native",disabled:this.disabled,onFocus:this.onFocus.bind(this),onKeyUp:this.onKeyUp.bind(this),onBlur:this.onBlur.bind(this),onClick:this.onClick.bind(this)}),t("span",{class:"button-inner"},t("slot",{name:"icon-only"}),t("slot",{name:"start"}),t("slot",null),t("slot",{name:"end"})),"md"===this.mode&&t("ion-ripple-effect",null))}static get is(){return"ion-button"}static get encapsulation(){return"shadow"}static get properties(){return{buttonType:{type:String,attr:"button-type",mutable:!0},color:{type:String,attr:"color"},disabled:{type:Boolean,attr:"disabled",reflectToAttr:!0},el:{elementRef:!0},expand:{type:String,attr:"expand",reflectToAttr:!0},fill:{type:String,attr:"fill",reflectToAttr:!0,mutable:!0},href:{type:String,attr:"href"},keyFocus:{state:!0},mode:{type:String,attr:"mode"},routerDirection:{type:String,attr:"router-direction"},shape:{type:String,attr:"shape",reflectToAttr:!0},size:{type:String,attr:"size",reflectToAttr:!0},strong:{type:Boolean,attr:"strong"},type:{type:String,attr:"type"},win:{context:"window"}}}static get events(){return[{name:"ionFocus",method:"ionFocus",bubbles:!0,cancelable:!0,composed:!0},{name:"ionBlur",method:"ionBlur",bubbles:!0,cancelable:!0,composed:!0}]}static get style(){return":host{--ion-color-base:var(--ion-color-primary, #3880ff);--ion-color-contrast:var(--ion-color-primary-contrast, #fff);--ion-color-shade:var(--ion-color-primary-shade, #3171e0);--overflow:hidden;--ripple-color:currentColor;display:inline-block;font-family:var(--ion-font-family,inherit);text-align:center;text-decoration:none;text-overflow:ellipsis;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;vertical-align:top;vertical-align:-webkit-baseline-middle;-webkit-font-kerning:none;font-kerning:none}:host([disabled]){pointer-events:none}:host(.button-solid){--background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-outline){--border-color:var(--ion-color-base);--background:transparent;color:var(--ion-color-base);--border-radius:12px;--border-width:1px;--border-style:solid}:host(.button-clear){--border-width:0;--background:transparent;color:var(--ion-color-base)}:host(.button-block){display:block}:host(.button-block) .button-native{margin-left:0;margin-right:0;display:block;width:100%;clear:both;contain:strict}:host(.button-block) .button-native::after{clear:both}:host(.button-full){display:block}:host(.button-full) .button-native{margin-left:0;margin-right:0;display:block;width:100%;contain:strict}:host(.button-full:not(.button-round)) .button-native{border-radius:0;border-right-width:0;border-left-width:0}.button-native{font-family:inherit;font-size:inherit;font-style:inherit;font-weight:inherit;letter-spacing:inherit;text-decoration:inherit;text-overflow:inherit;text-transform:inherit;text-align:inherit;white-space:inherit;color:inherit;border-radius:var(--border-radius);-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;margin:var(--margin-top) var(--margin-end) var(--margin-bottom) var(--margin-start);padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:block;position:relative;height:var(--height);-webkit-transition:var(--transition);transition:var(--transition);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);outline:0;background:var(--background);line-height:1;-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);contain:content;cursor:pointer;opacity:var(--opacity);overflow:var(--overflow);z-index:0;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-appearance:none;-moz-appearance:none;appearance:none}.button-native[disabled]{cursor:default;opacity:.5;pointer-events:none}.button-inner{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-ms-flex-negative:0;flex-shrink:0;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%}::slotted(ion-icon){font-size:1.4em;pointer-events:none}::slotted(ion-icon[slot=start]){margin:0 .3em 0 -.3em}::slotted(ion-icon[slot=end]){margin:0 -.2em 0 .3em}::slotted(ion-icon[slot=icon-only]){font-size:1.8em}ion-ripple-effect{color:var(--ripple-color)}:host{--border-radius:12px;--margin-top:4px;--margin-bottom:4px;--margin-start:2px;--margin-end:2px;--padding-top:0;--padding-bottom:0;--padding-start:1em;--padding-end:1em;--height:2.8em;--transition:background-color,opacity 100ms linear;font-size:16px;font-weight:500;letter-spacing:-.03em}:host(.button-solid:hover){--opacity:0.8}:host(.button-solid.focused){--background:var(--ion-color-shade)}:host(.button-solid.activated){--background:var(--ion-color-shade);--opacity:1}:host(.button-outline.activated){--background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.button-outline.focused){--background:rgba(var(--ion-color-base-rgb), 0.1)}:host(.button-outline.activated.focused){--border-color:var(--ion-color-shade);--background:var(--ion-color-shade)}:host(.button-clear:hover){--opacity:0.6}:host(.button-clear.activated){--opacity:0.4}:host(.button-clear.focused){--background:rgba(var(--ion-color-base-rgb), 0.1)}:host(.button-round){--border-radius:64px;--padding-top:0;--padding-start:26px;--padding-end:26px;--padding-bottom:0}:host(.button-large){--border-radius:14px;--padding-top:0;--padding-start:1em;--padding-end:1em;--padding-bottom:0;--height:2.8em;font-size:20px}:host(.button-small){--border-radius:8px;--padding-top:0;--padding-start:0.9em;--padding-end:0.9em;--padding-bottom:0;--height:2.1em;font-size:13px}:host(.button-strong){font-weight:600}"}static get styleMode(){return"ios"}}function n(t,e,o){return e?{[`${t}-${e=e.toLocaleLowerCase()}`]:!0,[`${t}-${e}-${o}`]:!0}:{}}class l{constructor(){this.isScrolling=!1,this.lastScroll=0,this.queued=!1,this.cTop=-1,this.cBottom=-1,this.detail={scrollTop:0,scrollLeft:0,type:"scroll",event:void 0,startX:0,startY:0,startTimeStamp:0,currentX:0,currentY:0,velocityX:0,velocityY:0,deltaX:0,deltaY:0,timeStamp:0,data:void 0,isScrolling:!0},this.fullscreen=!1,this.scrollX=!1,this.scrollY=!0,this.scrollEvents=!1}onNavChanged(){this.resize()}componentWillLoad(){void 0===this.forceOverscroll&&(this.forceOverscroll="ios"===this.mode&&"ontouchstart"in this.win)}componentDidLoad(){this.resize()}componentDidUnload(){this.watchDog&&clearInterval(this.watchDog)}resize(){this.fullscreen?this.queue.read(this.readDimensions.bind(this)):0===this.cTop&&0===this.cBottom||(this.cTop=this.cBottom=0,this.el.forceUpdate())}readDimensions(){const t=function(t){const e=t.closest("ion-tabs");if(e)return e;const o=t.closest("ion-app,ion-page,.ion-page,page-inner");return o||function(t){return t.parentElement?t.parentElement:t.parentNode&&t.parentNode.host?t.parentNode.host:null}(t)}(this.el),e=Math.max(this.el.offsetTop,0),o=Math.max(t.offsetHeight-e-this.el.offsetHeight,0);(e!==this.cTop||o!==this.cBottom)&&(this.cTop=e,this.cBottom=o,this.el.forceUpdate())}onScroll(t){const e=Date.now(),o=!this.isScrolling;this.lastScroll=e,o&&this.onScrollStart(),!this.queued&&this.scrollEvents&&(this.queued=!0,this.queue.read(e=>{this.queued=!1,this.detail.event=t,function(t,e,o,s){const r=t.currentX,i=t.currentY,n=t.timeStamp,l=e.scrollLeft,c=e.scrollTop;s&&(t.startTimeStamp=o,t.startX=l,t.startY=c,t.velocityX=t.velocityY=0),t.timeStamp=o,t.currentX=t.scrollLeft=l,t.currentY=t.scrollTop=c,t.deltaX=l-t.startX,t.deltaY=c-t.startY;const a=o-n;if(a>0&&a<100){const e=(l-r)/a,o=(c-i)/a;t.velocityX=.7*e+.3*t.velocityX,t.velocityY=.7*o+.3*t.velocityY}}(this.detail,this.scrollEl,e,o),this.ionScroll.emit(this.detail)}))}getScrollElement(){return Promise.resolve(this.scrollEl)}scrollToTop(t=0){return this.scrollToPoint(void 0,0,t)}scrollToBottom(t=0){const e=this.scrollEl.scrollHeight-this.scrollEl.clientHeight;return this.scrollToPoint(void 0,e,t)}scrollByPoint(t,e,o){return this.scrollToPoint(t+this.scrollEl.scrollLeft,e+this.scrollEl.scrollTop,o)}async scrollToPoint(t,e,o=0){const s=this.scrollEl;if(o<32)return null!=e&&(s.scrollTop=e),void(null!=t&&(s.scrollLeft=t));let r,i=0;const n=new Promise(t=>r=t),l=s.scrollTop,c=s.scrollLeft,a=null!=e?e-l:0,h=null!=t?t-c:0,u=t=>{const e=Math.min(1,(t-i)/o)-1,n=Math.pow(e,3)+1;0!==a&&(s.scrollTop=Math.floor(n*a+l)),0!==h&&(s.scrollLeft=Math.floor(n*h+c)),n<1?requestAnimationFrame(u):r()};return requestAnimationFrame(t=>{i=t,u(t)}),n}onScrollStart(){this.isScrolling=!0,this.ionScrollStart.emit({isScrolling:!0}),this.watchDog&&clearInterval(this.watchDog),this.watchDog=setInterval(()=>{this.lastScroll<Date.now()-120&&this.onScrollEnd()},100)}onScrollEnd(){clearInterval(this.watchDog),this.watchDog=null,this.isScrolling=!1,this.ionScrollEnd.emit({isScrolling:!1})}hostData(){return{class:Object.assign({},e(this.color),{overscroll:this.forceOverscroll}),style:{"--offset-top":`${this.cTop}px`,"--offset-bottom":`${this.cBottom}px`}}}render(){const{scrollX:e,scrollY:o,forceOverscroll:s}=this;return this.resize(),[t("div",{class:{"inner-scroll":!0,"scroll-x":e,"scroll-y":o,overscroll:(e||o)&&!!s},ref:t=>this.scrollEl=t,onScroll:t=>this.onScroll(t)},t("slot",null)),t("slot",{name:"fixed"})]}static get is(){return"ion-content"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},config:{context:"config"},el:{elementRef:!0},forceOverscroll:{type:Boolean,attr:"force-overscroll",mutable:!0},fullscreen:{type:Boolean,attr:"fullscreen"},getScrollElement:{method:!0},queue:{context:"queue"},scrollByPoint:{method:!0},scrollEvents:{type:Boolean,attr:"scroll-events"},scrollToBottom:{method:!0},scrollToPoint:{method:!0},scrollToTop:{method:!0},scrollX:{type:Boolean,attr:"scroll-x"},scrollY:{type:Boolean,attr:"scroll-y"},win:{context:"window"}}}static get events(){return[{name:"ionScrollStart",method:"ionScrollStart",bubbles:!0,cancelable:!0,composed:!0},{name:"ionScroll",method:"ionScroll",bubbles:!0,cancelable:!0,composed:!0},{name:"ionScrollEnd",method:"ionScrollEnd",bubbles:!0,cancelable:!0,composed:!0}]}static get listeners(){return[{name:"body:ionNavDidChange",method:"onNavChanged"}]}static get style(){return":host{--background:var(--ion-background-color, #fff);--color:var(--ion-text-color, #000);--padding-top:0px;--padding-bottom:0px;--padding-start:0px;--padding-end:0px;--keyboard-offset:0px;--offset-top:0px;--offset-bottom:0px;display:block;position:relative;-webkit-box-flex:1;-ms-flex:1;flex:1;padding:0!important;margin:0!important;background:var(--background);color:var(--color);font-family:var(--ion-font-family,inherit);contain:layout size style}:host(.ion-color){background:var(--ion-color-base);color:var(--ion-color-contrast)}:host(.outer-content){--background:var(--ion-background-color-step-50, #f2f2f2)}.inner-scroll{left:0;right:0;top:calc(var(--offset-top) * -1);bottom:calc(var(--offset-bottom) * -1);padding:calc(var(--padding-top) + var(--offset-top)) var(--padding-end) calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom)) var(--padding-start);position:absolute;-webkit-box-sizing:border-box;box-sizing:border-box;overflow:hidden}.scroll-x,.scroll-y{-webkit-overflow-scrolling:touch;will-change:scroll-position;-ms-scroll-chaining:none;overscroll-behavior:contain}.scroll-y{overflow-y:auto}.scroll-x{overflow-x:auto}.overscroll::after,.overscroll::before{position:absolute;width:1px;height:1px;content:\"\"}.overscroll::before{bottom:-1px}.overscroll::after{top:-1px}"}}class c{constructor(){this.isVisible=!1,this.lazy=!1}componentWillLoad(){this.waitUntilVisible(this.el,"50px",()=>{this.isVisible=!0,this.loadIcon()})}componentDidUnload(){this.io&&(this.io.disconnect(),this.io=void 0)}waitUntilVisible(t,e,o){if(this.lazy&&this.win&&this.win.IntersectionObserver){const s=this.io=new this.win.IntersectionObserver(t=>{t[0].isIntersecting&&(s.disconnect(),this.io=void 0,o())},{rootMargin:e});s.observe(t)}else o()}loadIcon(){if(!this.isServer&&this.isVisible){const t=this.getUrl();t&&function(t){let e=a.get(t);return e||(e=fetch(t,{cache:"force-cache"}).then(t=>t.ok?t.text():Promise.resolve(null)),a.set(t,e)),e}(t).then(t=>{this.svgContent=function(t,e,o){if(e){const s=t.createDocumentFragment(),r=t.createElement("div");r.innerHTML=e,s.appendChild(r);for(let t=r.childNodes.length-1;t>=0;t--)"svg"!==r.childNodes[t].nodeName.toLowerCase()&&r.removeChild(r.childNodes[t]);const i=r.firstElementChild;if(i&&"svg"===i.nodeName.toLowerCase()&&(o&&i.setAttribute("class",o),function t(e){if(1===e.nodeType){if("script"===e.nodeName.toLowerCase())return!1;for(let t=0;t<e.attributes.length;t++){const o=e.attributes[t].value;if("string"==typeof o&&0===o.toLowerCase().indexOf("on"))return!1}for(let o=0;o<e.childNodes.length;o++)if(!t(e.childNodes[o]))return!1}return!0}(i)))return r.innerHTML}return""}(this.doc,t,this.el["s-sc"])})}if(!this.ariaLabel){const t=h(this.name,this.mode,this.ios,this.md);t&&(this.ariaLabel=t.replace("ios-","").replace("md-","").replace(/\-/g," "))}}getUrl(){let t=u(this.src);return t||((t=h(this.name,this.mode,this.ios,this.md))?this.getNamedUrl(t):(t=u(this.icon))?t:(t=h(this.icon,this.mode,this.ios,this.md))?this.getNamedUrl(t):null)}getNamedUrl(t){return`${this.resourcesUrl}svg/${t}.svg`}hostData(){return{role:"img",class:Object.assign({},(t=this.color,t?{"ion-color":!0,[`ion-color-${t}`]:!0}:null),{[`icon-${this.size}`]:!!this.size})};var t}render(){return!this.isServer&&this.svgContent?t("div",{class:"icon-inner",innerHTML:this.svgContent}):t("div",{class:"icon-inner"})}static get is(){return"ion-icon"}static get encapsulation(){return"shadow"}static get properties(){return{ariaLabel:{type:String,attr:"aria-label",reflectToAttr:!0,mutable:!0},color:{type:String,attr:"color"},doc:{context:"document"},el:{elementRef:!0},icon:{type:String,attr:"icon",watchCallbacks:["loadIcon"]},ios:{type:String,attr:"ios"},isServer:{context:"isServer"},isVisible:{state:!0},lazy:{type:Boolean,attr:"lazy"},md:{type:String,attr:"md"},mode:{type:String,attr:"mode"},name:{type:String,attr:"name",watchCallbacks:["loadIcon"]},resourcesUrl:{context:"resourcesUrl"},size:{type:String,attr:"size"},src:{type:String,attr:"src",watchCallbacks:["loadIcon"]},svgContent:{state:!0},win:{context:"window"}}}static get style(){return":host{display:inline-block;width:1em;height:1em;contain:strict;-webkit-box-sizing:content-box!important;box-sizing:content-box!important}:host(.ion-color){color:var(--ion-color-base)!important}:host(.icon-small){font-size:var(--ion-icon-size-small,18px)!important}:host(.icon-large){font-size:var(--ion-icon-size-large,32px)!important}.icon-inner,svg{display:block;height:100%;width:100%}svg{fill:currentColor;stroke:currentColor}:host(.ion-color-primary){--ion-color-base:var(--ion-color-primary, #3880ff)}:host(.ion-color-secondary){--ion-color-base:var(--ion-color-secondary, #0cd1e8)}:host(.ion-color-tertiary){--ion-color-base:var(--ion-color-tertiary, #f4a942)}:host(.ion-color-success){--ion-color-base:var(--ion-color-success, #10dc60)}:host(.ion-color-warning){--ion-color-base:var(--ion-color-warning, #ffce00)}:host(.ion-color-danger){--ion-color-base:var(--ion-color-danger, #f14141)}:host(.ion-color-light){--ion-color-base:var(--ion-color-light, #f4f5f8)}:host(.ion-color-medium){--ion-color-base:var(--ion-color-medium, #989aa2)}:host(.ion-color-dark){--ion-color-base:var(--ion-color-dark, #222428)}"}}const a=new Map;function h(t,e,o,s){return e=(e||"md").toLowerCase(),o&&"ios"===e?t=o.toLowerCase():s&&"md"===e?t=s.toLowerCase():t&&(t=t.toLowerCase(),/^md-|^ios-|^logo-/.test(t)||(t=`${e}-${t}`)),"string"!=typeof t||""===t.trim()?null:""!==t.replace(/[a-z]|-|\d/gi,"")?null:t}function u(t){return"string"==typeof t&&(t=t.trim()).length>0&&/(\/|\.)/.test(t)?t:null}class d{getMode(){const t=this.el.closest("ion-toolbar");return t&&t.mode||this.mode}hostData(){const t=this.getMode();return{class:Object.assign({},e(this.color),{[`title-${t}`]:!0})}}render(){return[t("div",{class:"toolbar-title"},t("slot",null))]}static get is(){return"ion-title"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},el:{elementRef:!0}}}static get style(){return":host{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-transform:translateZ(0);transform:translateZ(0)}:host(.title-ios){left:0;top:0;padding:0 90px;position:absolute;width:100%;height:100%;-webkit-transform:translateZ(0);transform:translateZ(0);font-size:17px;font-weight:600;letter-spacing:-.03em;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;pointer-events:none}:host(.title-md){padding:0 12px;font-size:20px;font-weight:500}:host(.ion-color){color:var(--ion-color-base)}.toolbar-title{display:block;width:100%;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;pointer-events:auto}"}}class p{hostData(){return{class:e(this.color)}}render(){return[t("div",{class:"toolbar-background"}),t("div",{class:"toolbar-container"},t("slot",{name:"start"}),t("slot",{name:"secondary"}),t("div",{class:"toolbar-content"},t("slot",null)),t("slot",{name:"primary"}),t("slot",{name:"end"}))]}static get is(){return"ion-toolbar"}static get encapsulation(){return"shadow"}static get properties(){return{color:{type:String,attr:"color"},config:{context:"config"},mode:{type:String,attr:"mode"}}}static get style(){return":host{--border-width:0;--border-style:solid;--opacity:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;width:100%;color:var(--color);font-family:var(--ion-font-family,inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box;--background:var(--ion-toolbar-background-color, #f8f8f8);--color:var(--ion-toolbar-text-color, var(--ion-text-color, #000));--border-color:rgba(var(--ion-toolbar-border-color-rgb, 0, 0, 0), 0.2);--padding-top:4px;--padding-bottom:4px;--padding-start:4px;--padding-end:4px;--min-height:44px}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{padding:var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);display:-webkit-box;display:-ms-flexbox;display:flex;position:relative;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:var(--opacity);z-index:-1;pointer-events:none}.toolbar-content{-webkit-box-flex:1;-ms-flex:1;flex:1;-webkit-box-ordinal-group:5;-ms-flex-order:4;order:4;min-width:0}"}static get styleMode(){return"ios"}}export{r as IonAnchor,i as IonButton,l as IonContent,c as IonIcon,d as IonTitle,p as IonToolbar};