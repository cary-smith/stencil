/*! Built with http://stenciljs.com */
App.loadBundle("wyvfcygb",["exports"],function(e){window.App.h;var t=function(){function e(){}return e.prototype.addRipple=function(e,t){var n=this,i=this.win.requestIdleCallback;i||(i=window.requestAnimationFrame),i(function(){return n.prepareRipple(e,t)})},e.prototype.prepareRipple=function(e,t){var o,u,p,a=this;this.queue.read(function(){var n=a.el.getBoundingClientRect(),i=n.width,l=n.height;p=Math.min(2*Math.sqrt(i*i+l*l),r),o=e-n.left-.5*p,u=t-n.top-.5*p}),this.queue.write(function(){var e=a.win.document.createElement("div");e.classList.add("ripple-effect");var t=e.style,r=Math.max(n*Math.sqrt(p),i);t.top=u+"px",t.left=o+"px",t.width=t.height=p+"px",t.animationDuration=r+"ms",(a.el.shadowRoot||a.el).appendChild(e),setTimeout(function(){return e.remove()},r+50)})},Object.defineProperty(e,"is",{get:function(){return"ion-ripple-effect"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(e,"properties",{get:function(){return{addRipple:{method:!0},el:{elementRef:!0},queue:{context:"queue"},win:{context:"window"}}},enumerable:!0,configurable:!0}),Object.defineProperty(e,"style",{get:function(){return".sc-ion-ripple-effect-h{left:0;right:0;top:0;bottom:0;position:absolute;contain:strict}.ripple-effect.sc-ion-ripple-effect{border-radius:50%;position:absolute;background-color:currentColor;color:inherit;contain:strict;opacity:0;-webkit-animation-name:rippleAnimation;animation-name:rippleAnimation;-webkit-animation-duration:.2s;animation-duration:.2s;-webkit-animation-timing-function:ease-out;animation-timing-function:ease-out;will-change:transform,opacity;pointer-events:none}\@-webkit-keyframes rippleAnimation{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:.2}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}\@keyframes rippleAnimation{0%{-webkit-transform:scale(.1);transform:scale(.1);opacity:.2}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}"},enumerable:!0,configurable:!0}),e}(),n=35,i=260,r=550;e.IonRippleEffect=t,Object.defineProperty(e,"__esModule",{value:!0})});