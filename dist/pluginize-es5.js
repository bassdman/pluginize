var pluginizeWrapper=function(t){"use strict";var n=function(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r};var e=function(t){if(Array.isArray(t))return n(t)};var r=function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)};var o=function(t,e){if(t){if("string"==typeof t)return n(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?n(t,e):void 0}};var i=function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")};var a=function(t){return e(t)||r(t)||o(t)||i()},u="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:{};function c(t,n,e){return t(e={path:n,exports:{},require:function(t,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&e.path)}},e.exports),e.exports}var l=c((function(t){function n(e){return"function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?t.exports=n=function(t){return typeof t}:t.exports=n=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(e)}t.exports=n})),f=c((function(t){var n=function(t){var n,e=Object.prototype,r=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,n,e){return Object.defineProperty(t,n,{value:e,enumerable:!0,configurable:!0,writable:!0}),t[n]}try{c({},"")}catch(t){c=function(t,n,e){return t[n]=e}}function f(t,n,e,r){var o=n&&n.prototype instanceof v?n:v,i=Object.create(o.prototype),a=new S(r||[]);return i._invoke=function(t,n,e){var r=p;return function(o,i){if(r===h)throw new Error("Generator is already running");if(r===g){if("throw"===o)throw i;return C()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var u=P(a,e);if(u){if(u===d)continue;return u}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(r===p)throw r=g,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);r=h;var c=s(t,n,e);if("normal"===c.type){if(r=e.done?g:y,c.arg===d)continue;return{value:c.arg,done:e.done}}"throw"===c.type&&(r=g,e.method="throw",e.arg=c.arg)}}}(t,e,a),i}function s(t,n,e){try{return{type:"normal",arg:t.call(n,e)}}catch(t){return{type:"throw",arg:t}}}t.wrap=f;var p="suspendedStart",y="suspendedYield",h="executing",g="completed",d={};function v(){}function b(){}function m(){}var w={};w[i]=function(){return this};var k=Object.getPrototypeOf,_=k&&k(k(E([])));_&&_!==e&&r.call(_,i)&&(w=_);var j=m.prototype=v.prototype=Object.create(w);function x(t){["next","throw","return"].forEach((function(n){c(t,n,(function(t){return this._invoke(n,t)}))}))}function A(t,n){function e(o,i,a,u){var c=s(t[o],t,i);if("throw"!==c.type){var f=c.arg,p=f.value;return p&&"object"===l(p)&&r.call(p,"__await")?n.resolve(p.__await).then((function(t){e("next",t,a,u)}),(function(t){e("throw",t,a,u)})):n.resolve(p).then((function(t){f.value=t,a(f)}),(function(t){return e("throw",t,a,u)}))}u(c.arg)}var o;this._invoke=function(t,r){function i(){return new n((function(n,o){e(t,r,n,o)}))}return o=o?o.then(i,i):i()}}function P(t,e){var r=t.iterator[e.method];if(r===n){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=n,P(t,e),"throw"===e.method))return d;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return d}var o=s(r,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,d;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,d):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,d)}function O(t){var n={tryLoc:t[0]};1 in t&&(n.catchLoc=t[1]),2 in t&&(n.finallyLoc=t[2],n.afterLoc=t[3]),this.tryEntries.push(n)}function I(t){var n=t.completion||{};n.type="normal",delete n.arg,t.completion=n}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(O,this),this.reset(!0)}function E(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){for(;++o<t.length;)if(r.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=n,e.done=!0,e};return a.next=a}}return{next:C}}function C(){return{value:n,done:!0}}return b.prototype=j.constructor=m,m.constructor=b,b.displayName=c(m,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var n="function"==typeof t&&t.constructor;return!!n&&(n===b||"GeneratorFunction"===(n.displayName||n.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,m):(t.__proto__=m,c(t,u,"GeneratorFunction")),t.prototype=Object.create(j),t},t.awrap=function(t){return{__await:t}},x(A.prototype),A.prototype[a]=function(){return this},t.AsyncIterator=A,t.async=function(n,e,r,o,i){void 0===i&&(i=Promise);var a=new A(f(n,e,r,o),i);return t.isGeneratorFunction(e)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},x(j),c(j,u,"Generator"),j[i]=function(){return this},j.toString=function(){return"[object Generator]"},t.keys=function(t){var n=[];for(var e in t)n.push(e);return n.reverse(),function e(){for(;n.length;){var r=n.pop();if(r in t)return e.value=r,e.done=!1,e}return e.done=!0,e}},t.values=E,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(r,o){return u.type="throw",u.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),l=r.call(a,"finallyLoc");if(c&&l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!l)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,n){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=n&&n<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=n,i?(this.method="next",this.next=i.finallyLoc,d):this.complete(a)},complete:function(t,n){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&n&&(this.next=n),d},finish:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),I(e),d}},catch:function(t){for(var n=this.tryEntries.length-1;n>=0;--n){var e=this.tryEntries[n];if(e.tryLoc===t){var r=e.completion;if("throw"===r.type){var o=r.arg;I(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:E(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),d}},t}(t.exports);try{regeneratorRuntime=n}catch(t){Function("r","regeneratorRuntime = r")(n)}}));function s(t,n,e,r,o,i,a){try{var u=t[i](a),c=u.value}catch(t){return void e(t)}u.done?n(c):Promise.resolve(c).then(r,o)}var p=function(t){return function(){var n=this,e=arguments;return new Promise((function(r,o){var i=t.apply(n,e);function a(t){s(i,r,o,a,u,"next",t)}function u(t){s(i,r,o,a,u,"throw",t)}a(void 0)}))}},y="production";function h(t,n){if("development"==y)throw n;throw new Error(t)}function g(t,n,e){t&&h(n,e)}function d(t){y=t}function v(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return b(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return b(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==e.return||e.return()}finally{if(u)throw i}}}}function b(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function m(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return w(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return w(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==e.return||e.return()}finally{if(u)throw i}}}}function w(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}var k={name:"DefaultPlugins",plugins:[new function(){var t=["name","hooks","init","allowKeys","desactivateKeyCheck","plugins","debug","preInit"],n=!1;return{name:"ValidateConfigPlugin",hooks:{initPlugin:function(e,r){e.allowKeys&&t.push.apply(t,a(e.allowKeys)),e.desactivateKeyCheck&&(n=e.desactivateKeyCheck)},pluginsInitialized:function(e){if(!n){var r,o=v(e.plugins);try{for(o.s();!(r=o.n()).done;)for(var i=r.value,a=0,u=Object.keys(i);a<u.length;a++){var c=u[a];t.includes(c)||h('Config attribute "'.concat(c,'" is used but not allowed. Allowed are ').concat(t.join(", "),". \n                            You want to disable this proove? set desactivateKeyCheck:true.\n                            You want to allow another config attributes? Add allowKeys:['yourkeyname']."),"config.invalidKey")}}catch(t){o.e(t)}finally{o.f()}}}},init:function(){return{desactivateKeyCheck:function(){n=!0}}}}},new function(t){return{name:"InitHooksPlugin",allowKeys:["addHooks","hooks"],hooks:{initPlugin:function(t,n){if(t.addHooks){g(Array.isArray(t.addHooks)||"object"!=l(t.addHooks),'Error in plugin "'.concat(t.name,'": config.addHooks must be an object but is a ').concat(l(t.addHooks)),"config.addHooks.wrongtype");for(var e=0,r=Object.keys(t.addHooks);e<r.length;e++){var o=r[e];n.hooks[o]=t.addHooks[o]}}if(t.hooks){g(Array.isArray(t.hooks)||"object"!=l(t.hooks),'Error in plugin "'.concat(t.name,'": config.hooks must be an object but is a ').concat(l(t.hooks)),"config.hooks.wrongtype");for(var i=0,a=Object.keys(t.hooks);i<a.length;i++){var u=a[i];g(!n.hooks[u],'There is no Hook named "'+u+'", declared in plugin '+t.name+' . Is it correctly written? If yes, initialize it first with config attribute "addHooks"',"config.hooks.notDefined"),n.hooks[u].tap(t.name,t.hooks[u])}}}},init:function(t,n,e){return t.hooks&&t.hooks.preInitPlugin&&e.hooks.preInitPlugin.tap("preInitPlugin",t.hooks.preInitPlugin),{addHooks:function(t){for(var n=0,r=Object.keys(t);n<r.length;n++){var o=r[n];e.hooks[o]=t[o]}},on:function(t,n,r){if(!e.hooks[t])throw new Error('Hook with name "'+t+'" does not exist. context.on(name, pluginname, fn) failed');return e.hooks[t].tap(n,r)}}}}},new function(){return{allowKeys:["return"],name:"ReturnPlugin",hooks:{initPlugin:function(t,n){t.return&&(n.return=t.return)}}}},new function(){var t={};return{allowKeys:["rename"],name:"RenamePlugin",hooks:{initPlugin:function(n,e){if(n.rename)for(var r,o,i=0,a=Object.keys(n.rename);i<a.length;i++)o=a[i],r=n.rename[o],t[o]=r},return:function(n){for(var e,r=0,o=Object.keys(t);r<o.length;r++)e=o[r],n[t[e]]=n[e],delete n[e]}}}},new function(){var t=[];return{allowKeys:["delete"],name:"DeletePlugin",hooks:{initPlugin:function(n,e){n.delete&&t.push.apply(t,a(n.delete))},return:function(n){var e,r=m(t);try{for(r.s();!(e=r.n()).done;){delete n[e.value]}}catch(t){r.e(t)}finally{r.f()}}}}}]},_=c((function(t){function n(e,r){return t.exports=n=Object.setPrototypeOf||function(t,n){return t.__proto__=n,t},n(e,r)}t.exports=n}));var j=function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(n&&n.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),n&&_(t,n)};var x=function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t};var A=function(t,n){return!n||"object"!==l(n)&&"function"!=typeof n?x(t):n},P=c((function(t){function n(e){return t.exports=n=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},n(e)}t.exports=n}));var O=function(t,n){if(!(t instanceof n))throw new TypeError("Cannot call a class as a function")};function I(t,n){for(var e=0;e<n.length;e++){var r=n[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var S=function(t,n,e){return n&&I(t.prototype,n),e&&I(t,e),t};function E(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return C(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return C(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==e.return||e.return()}finally{if(u)throw i}}}}function C(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function z(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=P(t);if(n){var o=P(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return A(this,e)}}var L=function(){function t(){O(this,t),this._listeners={}}return S(t,[{key:"tap",value:function(t,n){if(null==t)throw new Error("Hook.on(): should be on(name:string, listener:function) but name is undefined");if(null==n)throw new Error("Hook.on(): should be on(name:string, listener:function) but listener is undefined");this._listeners[t]=n}},{key:"off",value:function(t){if(null==t)throw new Error("Hook.off(): should be on(name:string, listener:function) but name is undefined");delete this._listeners[t]}},{key:"listeners",value:function(t){return t?this._listeners[t]:Object.values(this._listeners)}}]),t}(),T=function(t){j(e,t);var n=z(e);function e(){return O(this,e),n.apply(this,arguments)}return S(e,[{key:"call",value:function(t){var n,e=this.listeners(),r=E(e);try{for(r.s();!(n=r.n()).done;){var o=n.value;o.apply(void 0,arguments)}}catch(t){r.e(t)}finally{r.f()}}}]),e}(L),H=function(t){j(r,t);var n,e=z(r);function r(){return O(this,r),e.apply(this,arguments)}return S(r,[{key:"promise",value:(n=p(f.mark((function t(n){var e,r,o,i,a=arguments;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.listeners(),r=E(e),t.prev=2,r.s();case 4:if((o=r.n()).done){t.next=10;break}return i=o.value,t.next=8,i.apply(void 0,a);case 8:t.next=4;break;case 10:t.next=15;break;case 12:t.prev=12,t.t0=t.catch(2),r.e(t.t0);case 15:return t.prev=15,r.f(),t.finish(15);case 18:case"end":return t.stop()}}),t,this,[[2,12,15,18]])}))),function(t){return n.apply(this,arguments)})}]),r}(L),N=function(t){j(e,t);var n=z(e);function e(){return O(this,e),n.apply(this,arguments)}return S(e,[{key:"call",value:function(t){var n,e=t,r=this.listeners(),o=E(r);try{for(o.s();!(n=o.n()).done;){var i=n.value;if(null==e)throw new Error("A listener in SyncWaterfallHook.trigger(context) returns null. This is not allowed. Did you forget returning sth in a listener?");e=i.apply(void 0,[e].concat(Array.prototype.slice.call(arguments)))}}catch(t){o.e(t)}finally{o.f()}return e}}]),e}(L),F=function(t){j(r,t);var n,e=z(r);function r(){return O(this,r),e.apply(this,arguments)}return S(r,[{key:"promise",value:(n=p(f.mark((function t(n){var e,r,o,i,a,u=arguments;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=n,r=this.listeners(),o=E(r),t.prev=3,o.s();case 5:if((i=o.n()).done){t.next=12;break}return a=i.value,t.next=9,a.apply(void 0,[e].concat(Array.prototype.slice.call(u)));case 9:e=t.sent;case 10:t.next=5;break;case 12:t.next=17;break;case 14:t.prev=14,t.t0=t.catch(3),o.e(t.t0);case 17:return t.prev=17,o.f(),t.finish(17);case 20:return t.abrupt("return",e);case 21:case"end":return t.stop()}}),t,this,[[3,14,17,20]])}))),function(t){return n.apply(this,arguments)})}]),r}(L),K=function(t){j(e,t);var n=z(e);function e(){return O(this,e),n.apply(this,arguments)}return S(e,[{key:"call",value:function(t){var n,e=this.listeners(),r=E(e);try{for(r.s();!(n=r.n()).done;){var o=n.value,i=o.apply(void 0,arguments);if(!i)return}}catch(t){r.e(t)}finally{r.f()}}}]),e}(L),$=function(t){j(r,t);var n,e=z(r);function r(){return O(this,r),e.apply(this,arguments)}return S(r,[{key:"call",value:(n=p(f.mark((function t(n){var e,r,o,i,a=arguments;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:e=this.listeners(),r=E(e),t.prev=2,r.s();case 4:if((o=r.n()).done){t.next=13;break}return i=o.value,t.next=8,i.apply(void 0,a);case 8:if(t.sent){t.next=11;break}return t.abrupt("return");case 11:t.next=4;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t.catch(2),r.e(t.t0);case 18:return t.prev=18,r.f(),t.finish(18);case 21:case"end":return t.stop()}}),t,this,[[2,15,18,21]])}))),function(t){return n.apply(this,arguments)})}]),r}(L);function R(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return D(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return D(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==e.return||e.return()}finally{if(u)throw i}}}}function D(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function U(t){function n(t,n){return e.apply(this,arguments)}function e(){return(e=p(f.mark((function t(e,r){var o,i,a,u,c,s,p;return f.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r.log('- Add plugin "'+e.name+'"'),t.next=3,r.hooks.preInitPlugin.promise(e,r);case 3:if(t.t0=t.sent,t.t0){t.next=6;break}t.t0=e;case 6:if(g(!(e=t.t0).name,"Plugin ".concat(JSON.stringify(e),' has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.'),"plugin.noName"),g("function"==typeof e,"Plugin ".concat(e.name," is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())"),"plugin.isFunction"),g("object"!==l(e)||Array.isArray(e),"Plugin ".concat(e.name," should be a configuration of type object, but is typeof ").concat(l(e),"."),"plugin.wrongType"),r.plugins.push(e),!e.init){t.next=18;break}return g("function"!=typeof e.init,'Error in plugin "'.concat(e.name,'": config.init must be a function but is a ').concat(l(e.init)),"config.init.wrongtype"),r.log("- Execute init() function of plugin ".concat(e.name)),t.next=16,e.init(r.config,e,r);case 16:if((o=t.sent)&&!o._context&&"object"==l(o)&&!Array.isArray(o)){i=R(Object.keys(o)||{});try{for(i.s();!(a=i.n()).done;)u=a.value,r.log("- add "+u+" to global context."),r[u]=o[u]}catch(t){i.e(t)}finally{i.f()}}case 18:if(!e.hooks||!e.hooks.initPlugin){t.next=21;break}return t.next=21,r.hooks.initPlugin.tap(e.name,e.hooks.initPlugin);case 21:g(e.plugins&&!Array.isArray(e.plugins),'Error in plugin "'.concat(e.name,'": config.plugin must be an array but is an ').concat(l(e.plugins)),"config.plugin.wrongtype"),c=R(e.plugins||[]),t.prev=23,c.s();case 25:if((s=c.n()).done){t.next=31;break}return p=s.value,t.next=29,n(p,r);case 29:t.next=25;break;case 31:t.next=36;break;case 33:t.prev=33,t.t1=t.catch(23),c.e(t.t1);case 36:return t.prev=36,c.f(),t.finish(36);case 39:return t.abrupt("return",r);case 40:case"end":return t.stop()}}),t,null,[[23,33,36,39]])})))).apply(this,arguments)}return function(){var e=p(f.mark((function e(){var r,o,i,a,u,c,s,p,y,h,v,b=arguments;return f.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=b.length>0&&void 0!==b[0]?b[0]:{},o={plugins:[],config:r,_context:!0,addPlugin:n,hooks:{return:new H(["context"]),preInitPlugin:new F(["config","context"]),pluginsInitialized:new H(["context"]),initPlugin:new H(["plugin","context"])},log:function(){var t;r.debug&&(t=console).log.apply(t,arguments)}},i=R(t.configs);try{for(i.s();!(a=i.n()).done;)(u=a.value).preInit&&u.preInit(r,o)}catch(t){i.e(t)}finally{i.f()}return g(null==r,"pluginize(config,factoryConfig): factoryConfig.preInit returns null but should return the modified config.","factoryConfig.preInit.isNull"),g("object"!==l(r),"pluginize(config,factoryConfig): factoryConfig.preInit returns a "+("undefined"==typeof entry?"undefined":l(entry))+"but should return an object.","factoryConfig.preInit.wrongType"),g(Array.isArray(r),"pluginize(config,factoryConfig): factoryConfig.preInit returns an Array but should return an object.","factoryConfig.preInit.wrongTypeArray"),r.debug&&d("development"),r.name||(r.name="PluginizeAsync"),o.log("Starting Pluginize."),e.next=12,n(k,o);case 12:c=R(t.configs),e.prev=13,c.s();case 15:if((s=c.n()).done){e.next=21;break}return p=s.value,e.next=19,n(p,o);case 19:e.next=15;break;case 21:e.next=26;break;case 23:e.prev=23,e.t0=e.catch(13),c.e(e.t0);case 26:return e.prev=26,c.f(),e.finish(26);case 29:return e.next=31,n(r,o);case 31:y=R(o.plugins),e.prev=32,y.s();case 34:if((h=y.n()).done){e.next=43;break}return g(null==(v=h.value),"error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)","config.preInit.returnNull"),g(Array.isArray(v)||"object"!==l(v),"error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a "+l(v),"config.preInit.wrongType"),o.log('- call hook "initPlugin" of plugin '+v.name),e.next=41,o.hooks.initPlugin.promise(v,o);case 41:e.next=34;break;case 43:e.next=48;break;case 45:e.prev=45,e.t1=e.catch(32),y.e(e.t1);case 48:return e.prev=48,y.f(),e.finish(48);case 51:return o.log('- call hook "pluginsInitialized"'),e.next=54,o.hooks.pluginsInitialized.promise(o);case 54:return e.next=56,o.hooks.return.promise(o);case 56:if(!o.return){e.next=60;break}return e.abrupt("return",o[o.return]);case 60:return e.abrupt("return",o);case 61:case"end":return e.stop()}}),e,null,[[13,23,26,29],[32,45,48,51]])})));return function(){return e.apply(this,arguments)}}()}function M(t,n){var e;if("undefined"==typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(e=function(t,n){if(!t)return;if("string"==typeof t)return G(t,n);var e=Object.prototype.toString.call(t).slice(8,-1);"Object"===e&&t.constructor&&(e=t.constructor.name);if("Map"===e||"Set"===e)return Array.from(t);if("Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e))return G(t,n)}(t))||n&&t&&"number"==typeof t.length){e&&(t=e);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,a=!0,u=!1;return{s:function(){e=t[Symbol.iterator]()},n:function(){var t=e.next();return a=t.done,t},e:function(t){u=!0,i=t},f:function(){try{a||null==e.return||e.return()}finally{if(u)throw i}}}}function G(t,n){(null==n||n>t.length)&&(n=t.length);for(var e=0,r=new Array(n);e<n;e++)r[e]=t[e];return r}function B(t){function n(t,e){if(e.log('- Add plugin "'+t.name+'"'),g(null==(t=e.hooks.preInitPlugin.call(t,e)||t),"Error: Plugin is null","conf.isNull"),g(!t.name,"Plugin ".concat(JSON.stringify(t),' has no name. Please define a name by adding an attribute name:"pluginname" to your plugin.'),"plugin.noName"),g("function"==typeof t,"Plugin ".concat(t.name," is a function, but should be a configuration object. Did you forget calling it? (eg: PluginName())"),"plugin.isFunction"),g("object"!==l(t)||Array.isArray(t),"Plugin ".concat(t.name," should be a configuration of type object, but is typeof ").concat(l(t),"."),"plugin.wrongType"),e.plugins.push(t),t.init){g("function"!=typeof t.init,'Error in plugin "'.concat(t.name,'": config.init must be a function but is a ').concat(l(t.init)),"config.init.wrongtype"),e.log("- Execute init() function of plugin ".concat(t.name));var r=t.init(e.config,t,e);if(r&&!r._context&&"object"==l(r)&&!Array.isArray(r)){var o,i=M(Object.keys(r)||{});try{for(i.s();!(o=i.n()).done;){var a=o.value;e.log("- add "+a+" to global context."),e[a]=r[a]}}catch(t){i.e(t)}finally{i.f()}}}t.hooks&&t.hooks.initPlugin&&e.hooks.initPlugin.tap(t.name,t.hooks.initPlugin),g(t.plugins&&!Array.isArray(t.plugins),'Error in plugin "'.concat(t.name,'": config.plugin must be an array but is an ').concat(l(t.plugins)),"config.plugin.wrongtype");var u,c=M(t.plugins||[]);try{for(c.s();!(u=c.n()).done;){n(u.value,e)}}catch(t){c.e(t)}finally{c.f()}return e}return function(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o={plugins:[],config:r,_context:!0,addPlugin:n,hooks:{return:new T(["context"]),preInitPlugin:new N(["config","context"]),pluginsInitialized:new T(["context"]),initPlugin:new T(["plugin","context"])},log:function(){var t;r.debug&&(t=console).log.apply(t,arguments)}},i=M(t.configs);try{for(i.s();!(e=i.n()).done;){var a=e.value;a.preInit&&a.preInit(r,o)}}catch(t){i.e(t)}finally{i.f()}g(null==r,"pluginize(config,factoryConfig): factoryConfig.preInit returns null but should return the modified config.","factoryConfig.preInit.isNull"),g("object"!==l(r),"pluginize(config,factoryConfig): factoryConfig.preInit returns a "+("undefined"==typeof entry?"undefined":l(entry))+"but should return an object.","factoryConfig.preInit.wrongType"),g(Array.isArray(r),"pluginize(config,factoryConfig): factoryConfig.preInit returns an Array but should return an object.","factoryConfig.preInit.wrongTypeArray"),r.debug&&d("development"),r.name||(r.name="Pluginize"),o.log("Starting Pluginize."),n(k,o);var u,c=M(t.configs);try{for(c.s();!(u=c.n()).done;){var f=u.value;n(f,o)}}catch(t){c.e(t)}finally{c.f()}n(r,o);var s,p=M(o.plugins);try{for(p.s();!(s=p.n()).done;){var y=s.value;g(null==y,"error in Pluginize(config): hook preInitPlugin - a listener returns null but should  return an object (the modified config)","config.preInit.returnNull"),g(Array.isArray(y)||"object"!==l(y),"error in Pluginize(config): hook preInitPlugin - a listener should return an object (the modified config) but returns a "+l(y),"config.preInit.wrongType"),o.log('- call hook "initPlugin" of plugin '+y.name),o.hooks.initPlugin.call(y,o)}}catch(t){p.e(t)}finally{p.f()}return o.log('- call hook "pluginsInitialized"'),o.hooks.pluginsInitialized.call(o),o.hooks.return.call(o),o.return?o[o.return]:o}}var W=c((function(t,n){var e="__lodash_hash_undefined__",r=9007199254740991,o="[object Arguments]",i="[object Boolean]",a="[object Date]",c="[object Function]",f="[object GeneratorFunction]",s="[object Map]",p="[object Number]",y="[object Object]",h="[object Promise]",g="[object RegExp]",d="[object Set]",v="[object String]",b="[object Symbol]",m="[object WeakMap]",w="[object ArrayBuffer]",k="[object DataView]",_="[object Float32Array]",j="[object Float64Array]",x="[object Int8Array]",A="[object Int16Array]",P="[object Int32Array]",O="[object Uint8Array]",I="[object Uint8ClampedArray]",S="[object Uint16Array]",E="[object Uint32Array]",C=/\w*$/,z=/^\[object .+?Constructor\]$/,L=/^(?:0|[1-9]\d*)$/,T={};T[o]=T["[object Array]"]=T[w]=T[k]=T[i]=T[a]=T[_]=T[j]=T[x]=T[A]=T[P]=T[s]=T[p]=T[y]=T[g]=T[d]=T[v]=T[b]=T[O]=T[I]=T[S]=T[E]=!0,T["[object Error]"]=T[c]=T[m]=!1;var H="object"==l(u)&&u&&u.Object===Object&&u,N="object"==("undefined"==typeof self?"undefined":l(self))&&self&&self.Object===Object&&self,F=H||N||Function("return this")(),K=n&&!n.nodeType&&n,$=K&&t&&!t.nodeType&&t,R=$&&$.exports===K;function D(t,n){return t.set(n[0],n[1]),t}function U(t,n){return t.add(n),t}function M(t,n,e,r){var o=-1,i=t?t.length:0;for(r&&i&&(e=t[++o]);++o<i;)e=n(e,t[o],o,t);return e}function G(t){var n=!1;if(null!=t&&"function"!=typeof t.toString)try{n=!!(t+"")}catch(t){}return n}function B(t){var n=-1,e=Array(t.size);return t.forEach((function(t,r){e[++n]=[r,t]})),e}function W(t,n){return function(e){return t(n(e))}}function Y(t){var n=-1,e=Array(t.size);return t.forEach((function(t){e[++n]=t})),e}var V,q=Array.prototype,J=Function.prototype,Q=Object.prototype,X=F["__core-js_shared__"],Z=(V=/[^.]+$/.exec(X&&X.keys&&X.keys.IE_PROTO||""))?"Symbol(src)_1."+V:"",tt=J.toString,nt=Q.hasOwnProperty,et=Q.toString,rt=RegExp("^"+tt.call(nt).replace(/[\\^$.*+?()[\]{}|]/g,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),ot=R?F.Buffer:void 0,it=F.Symbol,at=F.Uint8Array,ut=W(Object.getPrototypeOf,Object),ct=Object.create,lt=Q.propertyIsEnumerable,ft=q.splice,st=Object.getOwnPropertySymbols,pt=ot?ot.isBuffer:void 0,yt=W(Object.keys,Object),ht=$t(F,"DataView"),gt=$t(F,"Map"),dt=$t(F,"Promise"),vt=$t(F,"Set"),bt=$t(F,"WeakMap"),mt=$t(Object,"create"),wt=Gt(ht),kt=Gt(gt),_t=Gt(dt),jt=Gt(vt),xt=Gt(bt),At=it?it.prototype:void 0,Pt=At?At.valueOf:void 0;function Ot(t){var n=-1,e=t?t.length:0;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}function It(t){var n=-1,e=t?t.length:0;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}function St(t){var n=-1,e=t?t.length:0;for(this.clear();++n<e;){var r=t[n];this.set(r[0],r[1])}}function Et(t){this.__data__=new It(t)}function Ct(t,n){var e=Wt(t)||function(t){return function(t){return function(t){return!!t&&"object"==l(t)}(t)&&Yt(t)}(t)&&nt.call(t,"callee")&&(!lt.call(t,"callee")||et.call(t)==o)}(t)?function(t,n){for(var e=-1,r=Array(t);++e<t;)r[e]=n(e);return r}(t.length,String):[],r=e.length,i=!!r;for(var a in t)!n&&!nt.call(t,a)||i&&("length"==a||Ut(a,r))||e.push(a);return e}function zt(t,n,e){var r=t[n];nt.call(t,n)&&Bt(r,e)&&(void 0!==e||n in t)||(t[n]=e)}function Lt(t,n){for(var e=t.length;e--;)if(Bt(t[e][0],n))return e;return-1}function Tt(t,n,e,r,u,l,h){var m;if(r&&(m=l?r(t,u,l,h):r(t)),void 0!==m)return m;if(!Jt(t))return t;var z=Wt(t);if(z){if(m=function(t){var n=t.length,e=t.constructor(n);n&&"string"==typeof t[0]&&nt.call(t,"index")&&(e.index=t.index,e.input=t.input);return e}(t),!n)return function(t,n){var e=-1,r=t.length;n||(n=Array(r));for(;++e<r;)n[e]=t[e];return n}(t,m)}else{var L=Dt(t),H=L==c||L==f;if(Vt(t))return function(t,n){if(n)return t.slice();var e=new t.constructor(t.length);return t.copy(e),e}(t,n);if(L==y||L==o||H&&!l){if(G(t))return l?t:{};if(m=function(t){return"function"!=typeof t.constructor||Mt(t)?{}:(n=ut(t),Jt(n)?ct(n):{});var n}(H?{}:t),!n)return function(t,n){return Ft(t,Rt(t),n)}(t,function(t,n){return t&&Ft(n,Qt(n),t)}(m,t))}else{if(!T[L])return l?t:{};m=function(t,n,e,r){var o=t.constructor;switch(n){case w:return Nt(t);case i:case a:return new o(+t);case k:return function(t,n){var e=n?Nt(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.byteLength)}(t,r);case _:case j:case x:case A:case P:case O:case I:case S:case E:return function(t,n){var e=n?Nt(t.buffer):t.buffer;return new t.constructor(e,t.byteOffset,t.length)}(t,r);case s:return function(t,n,e){return M(n?e(B(t),!0):B(t),D,new t.constructor)}(t,r,e);case p:case v:return new o(t);case g:return function(t){var n=new t.constructor(t.source,C.exec(t));return n.lastIndex=t.lastIndex,n}(t);case d:return function(t,n,e){return M(n?e(Y(t),!0):Y(t),U,new t.constructor)}(t,r,e);case b:return u=t,Pt?Object(Pt.call(u)):{}}var u}(t,L,Tt,n)}}h||(h=new Et);var N=h.get(t);if(N)return N;if(h.set(t,m),!z)var F=e?function(t){return function(t,n,e){var r=n(t);return Wt(t)?r:function(t,n){for(var e=-1,r=n.length,o=t.length;++e<r;)t[o+e]=n[e];return t}(r,e(t))}(t,Qt,Rt)}(t):Qt(t);return function(t,n){for(var e=-1,r=t?t.length:0;++e<r&&!1!==n(t[e],e,t););}(F||t,(function(o,i){F&&(o=t[i=o]),zt(m,i,Tt(o,n,e,r,i,t,h))})),m}function Ht(t){return!(!Jt(t)||(n=t,Z&&Z in n))&&(qt(t)||G(t)?rt:z).test(Gt(t));var n}function Nt(t){var n=new t.constructor(t.byteLength);return new at(n).set(new at(t)),n}function Ft(t,n,e,r){e||(e={});for(var o=-1,i=n.length;++o<i;){var a=n[o],u=r?r(e[a],t[a],a,e,t):void 0;zt(e,a,void 0===u?t[a]:u)}return e}function Kt(t,n){var e,r,o=t.__data__;return("string"==(r=l(e=n))||"number"==r||"symbol"==r||"boolean"==r?"__proto__"!==e:null===e)?o["string"==typeof n?"string":"hash"]:o.map}function $t(t,n){var e=function(t,n){return null==t?void 0:t[n]}(t,n);return Ht(e)?e:void 0}Ot.prototype.clear=function(){this.__data__=mt?mt(null):{}},Ot.prototype.delete=function(t){return this.has(t)&&delete this.__data__[t]},Ot.prototype.get=function(t){var n=this.__data__;if(mt){var r=n[t];return r===e?void 0:r}return nt.call(n,t)?n[t]:void 0},Ot.prototype.has=function(t){var n=this.__data__;return mt?void 0!==n[t]:nt.call(n,t)},Ot.prototype.set=function(t,n){return this.__data__[t]=mt&&void 0===n?e:n,this},It.prototype.clear=function(){this.__data__=[]},It.prototype.delete=function(t){var n=this.__data__,e=Lt(n,t);return!(e<0)&&(e==n.length-1?n.pop():ft.call(n,e,1),!0)},It.prototype.get=function(t){var n=this.__data__,e=Lt(n,t);return e<0?void 0:n[e][1]},It.prototype.has=function(t){return Lt(this.__data__,t)>-1},It.prototype.set=function(t,n){var e=this.__data__,r=Lt(e,t);return r<0?e.push([t,n]):e[r][1]=n,this},St.prototype.clear=function(){this.__data__={hash:new Ot,map:new(gt||It),string:new Ot}},St.prototype.delete=function(t){return Kt(this,t).delete(t)},St.prototype.get=function(t){return Kt(this,t).get(t)},St.prototype.has=function(t){return Kt(this,t).has(t)},St.prototype.set=function(t,n){return Kt(this,t).set(t,n),this},Et.prototype.clear=function(){this.__data__=new It},Et.prototype.delete=function(t){return this.__data__.delete(t)},Et.prototype.get=function(t){return this.__data__.get(t)},Et.prototype.has=function(t){return this.__data__.has(t)},Et.prototype.set=function(t,n){var e=this.__data__;if(e instanceof It){var r=e.__data__;if(!gt||r.length<199)return r.push([t,n]),this;e=this.__data__=new St(r)}return e.set(t,n),this};var Rt=st?W(st,Object):function(){return[]},Dt=function(t){return et.call(t)};function Ut(t,n){return!!(n=null==n?r:n)&&("number"==typeof t||L.test(t))&&t>-1&&t%1==0&&t<n}function Mt(t){var n=t&&t.constructor;return t===("function"==typeof n&&n.prototype||Q)}function Gt(t){if(null!=t){try{return tt.call(t)}catch(t){}try{return t+""}catch(t){}}return""}function Bt(t,n){return t===n||t!=t&&n!=n}(ht&&Dt(new ht(new ArrayBuffer(1)))!=k||gt&&Dt(new gt)!=s||dt&&Dt(dt.resolve())!=h||vt&&Dt(new vt)!=d||bt&&Dt(new bt)!=m)&&(Dt=function(t){var n=et.call(t),e=n==y?t.constructor:void 0,r=e?Gt(e):void 0;if(r)switch(r){case wt:return k;case kt:return s;case _t:return h;case jt:return d;case xt:return m}return n});var Wt=Array.isArray;function Yt(t){return null!=t&&function(t){return"number"==typeof t&&t>-1&&t%1==0&&t<=r}(t.length)&&!qt(t)}var Vt=pt||function(){return!1};function qt(t){var n=Jt(t)?et.call(t):"";return n==c||n==f}function Jt(t){var n=l(t);return!!t&&("object"==n||"function"==n)}function Qt(t){return Yt(t)?Ct(t):function(t){if(!Mt(t))return yt(t);var n=[];for(var e in Object(t))nt.call(t,e)&&"constructor"!=e&&n.push(e);return n}(t)}t.exports=function(t){return Tt(t,!0,!0)}}));var Y=function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};function r(){var e,r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=W(Object.assign({configs:[]},n)),i=Array.isArray(r)?r:[r];i=i.map((function(t){return t.name=t.name||"pluginize(config)",t})),(e=o.configs).push.apply(e,a(i));var u=U(o),c=B(o),l=new t(o,{runPromise:u,run:c,factoryConfig:Object.assign(o,{level:o.level+1})});return l}for(var o=0,i=Object.keys(e);o<i.length;o++){var u=i[o];r[u]=e[u]}return r}({level:0});return t.AsyncBreakableHook=$,t.AsyncHook=H,t.AsyncWaterfallHook=F,t.SyncBreakableHook=K,t.SyncHook=T,t.SyncWaterfallHook=N,t.pluginize=Y,t}({}),pluginize=pluginizeWrapper.pluginize;
//# sourceMappingURL=pluginize-es5.js.map
