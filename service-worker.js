if(!self.define){let e,d={};const i=(i,n)=>(i=new URL(i+".js",n).href,d[i]||new Promise((d=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=d,document.head.appendChild(e)}else e=i,importScripts(i),d()})).then((()=>{let e=d[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(n,r)=>{const f=e||("document"in self?document.currentScript.src:"")||location.href;if(d[f])return;let s={};const c=e=>i(e,f),l={module:{uri:f},exports:s,require:c};d[f]=Promise.all(n.map((e=>l[e]||c(e)))).then((e=>(r(...e),s)))}}define(["./workbox-ad8011fb"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"../dist/index.html",revision:"67748dc848fa1ebc099da59ae4707108"},{url:"236.bundle.js",revision:"9f1ca34f6f26284f871f557ef44461d0"},{url:"515.bundle.js",revision:"4ece66bd94fea43b899af6af1ade0d6c"},{url:"515.bundle.js.LICENSE.txt",revision:"3dfb7b153c86245997f3d25d62a432d2"},{url:"7ff3ca6fa798de3f8ac2.woff?08efbba7c53d8c5413793eecb19b20bb",revision:null},{url:"b1882091a5cb2313b03f.jpg",revision:null},{url:"bundle.js",revision:"14f9dcddebf424554b34783064d92044"},{url:"bundle.js.LICENSE.txt",revision:"07013d75d3cd57c0c4095756ac395de1"},{url:"f2539a501be3a673de05.woff2?08efbba7c53d8c5413793eecb19b20bb",revision:null}],{})}));
//# sourceMappingURL=service-worker.js.map
