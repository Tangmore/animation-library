import{R as i}from"./chunks/theme.D9ytwzgj.js";import{R as o,aR as u,aS as l,aT as c,aU as f,aV as d,aW as m,aX as h,aY as g,aZ as A,a_ as R,d as v,u as C,v as P,s as b,a$ as w,b0 as y,b1 as S,aC as T}from"./chunks/framework.dBYHnlQg.js";function p(e){if(e.extends){const a=p(e.extends);return{...a,...e,async enhanceApp(t){a.enhanceApp&&await a.enhanceApp(t),e.enhanceApp&&await e.enhanceApp(t)}}}return e}const s=p(i),E=v({name:"VitePressApp",setup(){const{site:e,lang:a,dir:t}=C();return P(()=>{b(()=>{document.documentElement.lang=a.value,document.documentElement.dir=t.value})}),e.value.router.prefetchLinks&&w(),y(),S(),s.setup&&s.setup(),()=>T(s.Layout)}});async function _(){globalThis.__VITEPRESS__=!0;const e=V(),a=D();a.provide(l,e);const t=c(e.route);return a.provide(f,t),a.component("Content",d),a.component("ClientOnly",m),Object.defineProperties(a.config.globalProperties,{$frontmatter:{get(){return t.frontmatter.value}},$params:{get(){return t.page.value.params}}}),s.enhanceApp&&await s.enhanceApp({app:a,router:e,siteData:h}),{app:a,router:e,data:t}}function D(){return g(E)}function V(){let e=o,a;return A(t=>{let n=R(t),r=null;return n&&(e&&(a=n),(e||a===n)&&(n=n.replace(/\.js$/,".lean.js")),r=import(n)),o&&(e=!1),r},s.NotFound)}o&&_().then(({app:e,router:a,data:t})=>{a.go().then(()=>{u(a.route,t.site),e.mount("#app")})});export{_ as createApp};
