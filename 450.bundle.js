/*! For license information please see 450.bundle.js.LICENSE.txt */
(()=>{var t={9591:(t,e,r)=>{var n=r(8).default;function o(){"use strict";t.exports=o=function(){return e},t.exports.__esModule=!0,t.exports.default=t.exports;var e={},r=Object.prototype,a=r.hasOwnProperty,i="function"==typeof Symbol?Symbol:{},c=i.iterator||"@@iterator",u=i.asyncIterator||"@@asyncIterator",s=i.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(t){l=function(t,e,r){return t[e]=r}}function f(t,e,r,n){var o=e&&e.prototype instanceof y?e:y,a=Object.create(o.prototype),i=new _(n||[]);return a._invoke=function(t,e,r){var n="suspendedStart";return function(o,a){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw a;return{value:void 0,done:!0}}for(r.method=o,r.arg=a;;){var i=r.delegate;if(i){var c=A(i,r);if(c){if(c===h)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=p(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===h)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}(t,r,i),a}function p(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}e.wrap=f;var h={};function y(){}function d(){}function v(){}var m={};l(m,c,(function(){return this}));var g=Object.getPrototypeOf,w=g&&g(g(O([])));w&&w!==r&&a.call(w,c)&&(m=w);var b=v.prototype=y.prototype=Object.create(m);function x(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function E(t,e){function r(o,i,c,u){var s=p(t[o],t,i);if("throw"!==s.type){var l=s.arg,f=l.value;return f&&"object"==n(f)&&a.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):e.resolve(f).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,u)}))}u(s.arg)}var o;this._invoke=function(t,n){function a(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(a,a):a()}}function A(t,e){var r=t.iterator[e.method];if(void 0===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=void 0,A(t,e),"throw"===e.method))return h;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return h}var n=p(r,t.iterator,e.arg);if("throw"===n.type)return e.method="throw",e.arg=n.arg,e.delegate=null,h;var o=n.arg;return o?o.done?(e[t.resultName]=o.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,h):o:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,h)}function L(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function _(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(L,this),this.reset(!0)}function O(t){if(t){var e=t[c];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var r=-1,n=function e(){for(;++r<t.length;)if(a.call(t,r))return e.value=t[r],e.done=!1,e;return e.value=void 0,e.done=!0,e};return n.next=n}}return{next:T}}function T(){return{value:void 0,done:!0}}return d.prototype=v,l(b,"constructor",v),l(v,"constructor",d),d.displayName=l(v,s,"GeneratorFunction"),e.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===d||"GeneratorFunction"===(e.displayName||e.name))},e.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,v):(t.__proto__=v,l(t,s,"GeneratorFunction")),t.prototype=Object.create(b),t},e.awrap=function(t){return{__await:t}},x(E.prototype),l(E.prototype,u,(function(){return this})),e.AsyncIterator=E,e.async=function(t,r,n,o,a){void 0===a&&(a=Promise);var i=new E(f(t,r,n,o),a);return e.isGeneratorFunction(r)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},x(b),l(b,s,"Generator"),l(b,c,(function(){return this})),l(b,"toString",(function(){return"[object Generator]"})),e.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){for(;e.length;){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},e.values=O,_.prototype={constructor:_,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(S),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,n){return i.type="throw",i.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n],i=o.completion;if("root"===o.tryLoc)return r("end");if(o.tryLoc<=this.prev){var c=a.call(o,"catchLoc"),u=a.call(o,"finallyLoc");if(c&&u){if(this.prev<o.catchLoc)return r(o.catchLoc,!0);if(this.prev<o.finallyLoc)return r(o.finallyLoc)}else if(c){if(this.prev<o.catchLoc)return r(o.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<o.finallyLoc)return r(o.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var n=this.tryEntries[r];if(n.tryLoc<=this.prev&&a.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var o=n;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,h):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),h},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),h}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),h}},e}t.exports=o,t.exports.__esModule=!0,t.exports.default=t.exports},8:t=>{function e(r){return t.exports=e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t.exports.__esModule=!0,t.exports.default=t.exports,e(r)}t.exports=e,t.exports.__esModule=!0,t.exports.default=t.exports},7757:(t,e,r)=>{var n=r(9591)();t.exports=n;try{regeneratorRuntime=n}catch(t){"object"==typeof globalThis?globalThis.regeneratorRuntime=n:Function("r","regeneratorRuntime = r")(n)}}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var a=e[n]={exports:{}};return t[n](a,a.exports,r),a.exports}r.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return r.d(e,{a:e}),e},r.d=(t,e)=>{for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})},r.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=Symbol("Comlink.proxy"),e=Symbol("Comlink.endpoint"),n=Symbol("Comlink.releaseProxy"),o=Symbol("Comlink.thrown"),a=t=>"object"==typeof t&&null!==t||"function"==typeof t,i=new Map([["proxy",{canHandle:e=>a(e)&&e[t],serialize(t){const{port1:e,port2:r}=new MessageChannel;return c(t,e),[r,[r]]},deserialize:t=>(t.start(),l(t,[],undefined))}],["throw",{canHandle:t=>a(t)&&o in t,serialize({value:t}){let e;return e=t instanceof Error?{isError:!0,value:{message:t.message,name:t.name,stack:t.stack}}:{isError:!1,value:t},[e,[]]},deserialize(t){if(t.isError)throw Object.assign(new Error(t.value.message),t.value);throw t.value}}]]);function c(e,r=self){r.addEventListener("message",(function n(a){if(!a||!a.data)return;const{id:i,type:s,path:l}=Object.assign({path:[]},a.data),f=(a.data.argumentList||[]).map(y);let d;try{const r=l.slice(0,-1).reduce(((t,e)=>t[e]),e),n=l.reduce(((t,e)=>t[e]),e);switch(s){case"GET":d=n;break;case"SET":r[l.slice(-1)[0]]=y(a.data.value),d=!0;break;case"APPLY":d=n.apply(r,f);break;case"CONSTRUCT":d=function(e){return Object.assign(e,{[t]:!0})}(new n(...f));break;case"ENDPOINT":{const{port1:t,port2:r}=new MessageChannel;c(e,r),d=function(t,e){return p.set(t,e),t}(t,[t])}break;case"RELEASE":d=void 0;break;default:return}}catch(t){d={value:t,[o]:0}}Promise.resolve(d).catch((t=>({value:t,[o]:0}))).then((t=>{const[e,o]=h(t);r.postMessage(Object.assign(Object.assign({},e),{id:i}),o),"RELEASE"===s&&(r.removeEventListener("message",n),u(r))}))})),r.start&&r.start()}function u(t){(function(t){return"MessagePort"===t.constructor.name})(t)&&t.close()}function s(t){if(t)throw new Error("Proxy has been released and is not useable")}function l(t,r=[],o=function(){}){let a=!1;const i=new Proxy(o,{get(e,o){if(s(a),o===n)return()=>d(t,{type:"RELEASE",path:r.map((t=>t.toString()))}).then((()=>{u(t),a=!0}));if("then"===o){if(0===r.length)return{then:()=>i};const e=d(t,{type:"GET",path:r.map((t=>t.toString()))}).then(y);return e.then.bind(e)}return l(t,[...r,o])},set(e,n,o){s(a);const[i,c]=h(o);return d(t,{type:"SET",path:[...r,n].map((t=>t.toString())),value:i},c).then(y)},apply(n,o,i){s(a);const c=r[r.length-1];if(c===e)return d(t,{type:"ENDPOINT"}).then(y);if("bind"===c)return l(t,r.slice(0,-1));const[u,p]=f(i);return d(t,{type:"APPLY",path:r.map((t=>t.toString())),argumentList:u},p).then(y)},construct(e,n){s(a);const[o,i]=f(n);return d(t,{type:"CONSTRUCT",path:r.map((t=>t.toString())),argumentList:o},i).then(y)}});return i}function f(t){const e=t.map(h);return[e.map((t=>t[0])),(r=e.map((t=>t[1])),Array.prototype.concat.apply([],r))];var r}const p=new WeakMap;function h(t){for(const[e,r]of i)if(r.canHandle(t)){const[n,o]=r.serialize(t);return[{type:"HANDLER",name:e,value:n},o]}return[{type:"RAW",value:t},p.get(t)||[]]}function y(t){switch(t.type){case"HANDLER":return i.get(t.name).deserialize(t.value);case"RAW":return t.value}}function d(t,e,r){return new Promise((n=>{const o=new Array(4).fill(0).map((()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16))).join("-");t.addEventListener("message",(function e(r){r.data&&r.data.id&&r.data.id===o&&(t.removeEventListener("message",e),n(r.data))})),t.start&&t.start(),t.postMessage(Object.assign({id:o},e),r)}))}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,n=new Array(e);r<e;r++)n[r]=t[r];return n}function m(t,e,r,n,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function g(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var a=t.apply(e,r);function i(t){m(a,n,o,i,c,"next",t)}function c(t){m(a,n,o,i,c,"throw",t)}i(void 0)}))}}var w=r(7757),b=r.n(w);const x="function"==typeof atob,E="function"==typeof btoa,A="function"==typeof Buffer,L=("function"==typeof TextDecoder&&new TextDecoder,"function"==typeof TextEncoder&&new TextEncoder,Array.prototype.slice.call("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=")),S=(t=>{let e={};return t.forEach(((t,r)=>e[t]=r)),e})(L),_=/^(?:[A-Za-z\d+\/]{4})*?(?:[A-Za-z\d+\/]{2}(?:==)?|[A-Za-z\d+\/]{3}=?)?$/,O=String.fromCharCode.bind(String),T="function"==typeof Uint8Array.from?Uint8Array.from.bind(Uint8Array):(t,e=(t=>t))=>new Uint8Array(Array.prototype.slice.call(t,0).map(e)),j=t=>t.replace(/[^A-Za-z0-9\+\/]/g,""),k=E?t=>btoa(t):A?t=>Buffer.from(t,"binary").toString("base64"):t=>{let e,r,n,o,a="";const i=t.length%3;for(let i=0;i<t.length;){if((r=t.charCodeAt(i++))>255||(n=t.charCodeAt(i++))>255||(o=t.charCodeAt(i++))>255)throw new TypeError("invalid character found");e=r<<16|n<<8|o,a+=L[e>>18&63]+L[e>>12&63]+L[e>>6&63]+L[63&e]}return i?a.slice(0,i-3)+"===".substring(i):a},P=A?t=>Buffer.from(t).toString("base64"):t=>{let e=[];for(let r=0,n=t.length;r<n;r+=4096)e.push(O.apply(null,t.subarray(r,r+4096)));return k(e.join(""))},C=x?t=>atob(j(t)):A?t=>Buffer.from(t,"base64").toString("binary"):t=>{if(t=t.replace(/\s+/g,""),!_.test(t))throw new TypeError("malformed base64.");t+="==".slice(2-(3&t.length));let e,r,n,o="";for(let a=0;a<t.length;)e=S[t.charAt(a++)]<<18|S[t.charAt(a++)]<<12|(r=S[t.charAt(a++)])<<6|(n=S[t.charAt(a++)]),o+=64===r?O(e>>16&255):64===n?O(e>>16&255,e>>8&255):O(e>>16&255,e>>8&255,255&e);return o},M=A?t=>T(Buffer.from(t,"base64")):t=>T(C(t),(t=>t.charCodeAt(0))),N=t=>j(t.replace(/[-_]/g,(t=>"-"==t?"+":"/"))),R=(t,e=!1)=>e?P(t).replace(/=/g,"").replace(/[+\/]/g,(t=>"+"==t?"-":"_")):P(t),F=t=>M(N(t));var U=function(t){return R(t,!0)},G=function(t){return F(t)},z=function(t){return new Promise((function(e,r){var n=new FileReader;n.onload=function(){if(!n.result||"string"==typeof n.result)return r();e(n.result)},n.readAsArrayBuffer(t)}))},D=new TextEncoder,I=new TextDecoder,B=function(t){return crypto.subtle.importKey("raw",D.encode(t),"PBKDF2",!1,["deriveKey"])},H=function(t,e,r){return crypto.subtle.deriveKey({name:"PBKDF2",salt:e,iterations:25e4,hash:"SHA-256"},t,{name:"AES-GCM",length:256},!1,r)};function K(t,e){return Y.apply(this,arguments)}function Y(){return(Y=g(b().mark((function t(e,r){var n,o,a,i,c,u,s;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=crypto.getRandomValues(new Uint8Array(16)),o=crypto.getRandomValues(new Uint8Array(12)),t.next=5,B(r);case 5:return a=t.sent,t.next=8,H(a,n,["encrypt"]);case 8:return i=t.sent,t.next=11,crypto.subtle.encrypt({name:"AES-GCM",iv:o},i,e);case 11:return c=t.sent,u=new Uint8Array(c),(s=new Uint8Array(n.byteLength+o.byteLength+u.byteLength)).set(n,0),s.set(o,n.byteLength),s.set(u,n.byteLength+o.byteLength),t.abrupt("return",s);case 20:throw t.prev=20,t.t0=t.catch(0),console.log("Error - ".concat(t.t0)),t.t0;case 24:case"end":return t.stop()}}),t,null,[[0,20]])})))).apply(this,arguments)}function Z(t,e){return V.apply(this,arguments)}function V(){return(V=g(b().mark((function t(e,r){var n,o,a,i,c;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,n=e.slice(0,16),o=e.slice(16,28),a=e.slice(28),t.next=6,B(r);case 6:return i=t.sent,t.next=9,H(i,n,["decrypt"]);case 9:return c=t.sent,t.next=12,crypto.subtle.decrypt({name:"AES-GCM",iv:o},c,a);case 12:return t.abrupt("return",t.sent);case 15:throw t.prev=15,t.t0=t.catch(0),console.log("Error - ".concat(t.t0)),t.t0;case 19:case"end":return t.stop()}}),t,null,[[0,15]])})))).apply(this,arguments)}function W(){return(W=g(b().mark((function t(e){var r,n,o,a;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return r=$(20),t.next=3,z(e);case 3:return n=t.sent,t.next=6,K(new Uint8Array(n),r);case 6:return o=t.sent,t.next=9,K(new Uint8Array(D.encode(e.name)),r);case 9:return a=t.sent,t.abrupt("return",{id:U(a),encryptedFile:new File([o],U(a),{type:"application/download"}),name:e.name,password:r});case 11:case"end":return t.stop()}}),t)})))).apply(this,arguments)}function X(){return(X=g(b().mark((function t(e,r,n){var o,a,i;return b().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,z(r);case 2:return o=t.sent,t.next=5,Z(new Uint8Array(o),n);case 5:return a=t.sent,t.next=8,Z(G(e),n);case 8:return i=t.sent,t.abrupt("return",{name:I.decode(i),decryptedFile:new File([new Uint8Array(a)],I.decode(i),{type:"application/download"})});case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}var $=function(t){return self.btoa(String.fromCharCode.apply(String,function(t){if(Array.isArray(t))return v(t)}(e=crypto.getRandomValues(new Uint8Array(t)))||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(t,e){if(t){if("string"==typeof t)return v(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?v(t,e):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()));var e};c({encryptFile:function(t){return W.apply(this,arguments)},decryptFile:function(t,e,r){return X.apply(this,arguments)}})})()})();
//# sourceMappingURL=450.bundle.js.map