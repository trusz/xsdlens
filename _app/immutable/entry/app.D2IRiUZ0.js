const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["../nodes/0.Cm_VQ7Ou.js","../chunks/disclose-version.kgImLxeG.js","../chunks/utils.tSr6jWHF.js","../chunks/stores.Cnb4UKsx.js","../chunks/index-client.7s9OyLHi.js","../chunks/index.CR99Cl9f.js","../assets/stores.BVLmDUTH.css","../chunks/svelte-component.Cuuu-LEW.js","../chunks/lifecycle.DDVmuSob.js","../assets/0.DE1Mi3xd.css","../nodes/1.C2RGUFga.js","../chunks/entry.nLpGoosV.js","../nodes/2.DHfFniqS.js","../chunks/2.CrmHOFMj.js","../chunks/preload-helper.C1FmrZbK.js","../assets/2.DwiSBD-P.css"])))=>i.map(i=>d[i]);
var z=r=>{throw TypeError(r)};var B=(r,t,e)=>t.has(r)||z("Cannot "+e);var o=(r,t,e)=>(B(r,t,"read from private field"),e?e.call(r):t.get(r)),E=(r,t,e)=>t.has(r)?z("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(r):t.set(r,e),k=(r,t,e,n)=>(B(r,t,"write to private field"),n?n.call(r,e):t.set(r,e),e);import{_ as O}from"../chunks/preload-helper.C1FmrZbK.js";import{j as d,z as R,A as K,B as N,C as Q,o as U,u as W,e as X,D as Y,q as P,v as Z,F as A,y as p,w as $,t as tt,x as et,l as C}from"../chunks/utils.tSr6jWHF.js";import{h as rt,m as st,u as at,d as D,a as g,t as F,e as ot,b as nt}from"../chunks/disclose-version.kgImLxeG.js";import{p as j,o as ct,a as it,i as I,b as L}from"../chunks/index-client.7s9OyLHi.js";import{c as T}from"../chunks/svelte-component.Cuuu-LEW.js";function ut(r){return class extends lt{constructor(t){super({component:r,...t})}}}var m,c;class lt{constructor(t){E(this,m);E(this,c);var h;var e=new Map,n=(s,a)=>{var _=Q(a);return e.set(s,_),_};const u=new Proxy({...t.props||{},$$events:{}},{get(s,a){return d(e.get(a)??n(a,Reflect.get(s,a)))},has(s,a){return d(e.get(a)??n(a,Reflect.get(s,a))),Reflect.has(s,a)},set(s,a,_){return R(e.get(a)??n(a,_),_),Reflect.set(s,a,_)}});k(this,c,(t.hydrate?rt:st)(t.component,{target:t.target,anchor:t.anchor,props:u,context:t.context,intro:t.intro??!1,recover:t.recover})),(!((h=t==null?void 0:t.props)!=null&&h.$$host)||t.sync===!1)&&K(),k(this,m,u.$$events);for(const s of Object.keys(o(this,c)))s==="$set"||s==="$destroy"||s==="$on"||N(this,s,{get(){return o(this,c)[s]},set(a){o(this,c)[s]=a},enumerable:!0});o(this,c).$set=s=>{Object.assign(u,s)},o(this,c).$destroy=()=>{at(o(this,c))}}$set(t){o(this,c).$set(t)}$on(t,e){o(this,m)[t]=o(this,m)[t]||[];const n=(...u)=>e.call(this,...u);return o(this,m)[t].push(n),()=>{o(this,m)[t]=o(this,m)[t].filter(u=>u!==n)}}$destroy(){o(this,c).$destroy()}}m=new WeakMap,c=new WeakMap;const Pt={};var dt=F('<div id="svelte-announcer" aria-live="assertive" aria-atomic="true" style="position: absolute; left: 0; top: 0; clip: rect(0 0 0 0); clip-path: inset(50%); overflow: hidden; white-space: nowrap; width: 1px; height: 1px"><!></div>'),mt=F("<!> <!>",1);function _t(r,t){U(t,!0);let e=j(t,"components",23,()=>[]),n=j(t,"data_0",3,null),u=j(t,"data_1",3,null);W(()=>t.stores.page.set(t.page)),X(()=>{t.stores,t.page,t.constructors,e(),t.form,n(),u(),t.stores.page.notify()});let h=A(!1),s=A(!1),a=A(null);ct(()=>{const f=t.stores.page.subscribe(()=>{d(h)&&(R(s,!0),Y().then(()=>{R(a,it(document.title||"untitled page"))}))});return R(h,!0),f});const _=C(()=>t.constructors[1]);var V=mt(),M=P(V);I(M,()=>t.constructors[1],f=>{var l=D();const y=C(()=>t.constructors[0]);var b=P(l);T(b,()=>d(y),(v,w)=>{L(w(v,{get data(){return n()},get form(){return t.form},children:(i,ft)=>{var q=D(),G=P(q);T(G,()=>d(_),(H,J)=>{L(J(H,{get data(){return u()},get form(){return t.form}}),x=>e()[1]=x,()=>{var x;return(x=e())==null?void 0:x[1]})}),g(i,q)},$$slots:{default:!0}}),i=>e()[0]=i,()=>{var i;return(i=e())==null?void 0:i[0]})}),g(f,l)},f=>{var l=D();const y=C(()=>t.constructors[0]);var b=P(l);T(b,()=>d(y),(v,w)=>{L(w(v,{get data(){return n()},get form(){return t.form}}),i=>e()[0]=i,()=>{var i;return(i=e())==null?void 0:i[0]})}),g(f,l)});var S=p(M,2);I(S,()=>d(h),f=>{var l=dt(),y=$(l);I(y,()=>d(s),b=>{var v=ot();tt(()=>nt(v,d(a))),g(b,v)}),et(l),g(f,l)}),g(r,V),Z()}const Rt=ut(_t),wt=[()=>O(()=>import("../nodes/0.Cm_VQ7Ou.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9]),import.meta.url),()=>O(()=>import("../nodes/1.C2RGUFga.js"),__vite__mapDeps([10,1,2,8,11,5]),import.meta.url),()=>O(()=>import("../nodes/2.DHfFniqS.js"),__vite__mapDeps([12,13,1,2,4,3,5,6,8,14,15]),import.meta.url)],Et=[],kt={"/":[2]},Ot={handleError:({error:r})=>{console.error(r)},reroute:()=>{}};export{kt as dictionary,Ot as hooks,Pt as matchers,wt as nodes,Rt as root,Et as server_loads};
