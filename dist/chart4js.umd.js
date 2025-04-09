(function(o,E){typeof exports=="object"&&typeof module<"u"?E(exports,require("lit")):typeof define=="function"&&define.amd?define(["exports","lit"],E):(o=typeof globalThis<"u"?globalThis:o||self,E(o.Chart4JS={},o.Lit))})(this,function(o,E){"use strict";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const tt=n=>(t,e)=>{e!==void 0?e.addInitializer(()=>{customElements.define(n,t)}):customElements.define(n,t)};/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const pt=globalThis,_t=pt.ShadowRoot&&(pt.ShadyCSS===void 0||pt.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Mt=Symbol(),Bt=new WeakMap;let Zt=class{constructor(t,e,s){if(this._$cssResult$=!0,s!==Mt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(_t&&t===void 0){const s=e!==void 0&&e.length===1;s&&(t=Bt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),s&&Bt.set(e,t))}return t}toString(){return this.cssText}};const Jt=n=>new Zt(typeof n=="string"?n:n+"",void 0,Mt),Qt=(n,t)=>{if(_t)n.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const s=document.createElement("style"),i=pt.litNonce;i!==void 0&&s.setAttribute("nonce",i),s.textContent=e.cssText,n.appendChild(s)}},Lt=_t?n=>n:n=>n instanceof CSSStyleSheet?(t=>{let e="";for(const s of t.cssRules)e+=s.cssText;return Jt(e)})(n):n;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:te,defineProperty:ee,getOwnPropertyDescriptor:se,getOwnPropertyNames:ie,getOwnPropertySymbols:ae,getPrototypeOf:re}=Object,I=globalThis,Rt=I.trustedTypes,ne=Rt?Rt.emptyScript:"",xt=I.reactiveElementPolyfillSupport,at=(n,t)=>n,gt={toAttribute(n,t){switch(t){case Boolean:n=n?ne:null;break;case Object:case Array:n=n==null?n:JSON.stringify(n)}return n},fromAttribute(n,t){let e=n;switch(t){case Boolean:e=n!==null;break;case Number:e=n===null?null:Number(n);break;case Object:case Array:try{e=JSON.parse(n)}catch{e=null}}return e}},At=(n,t)=>!te(n,t),Nt={attribute:!0,type:String,converter:gt,reflect:!1,hasChanged:At};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),I.litPropertyMetadata??(I.litPropertyMetadata=new WeakMap);class rt extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=Nt){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const s=Symbol(),i=this.getPropertyDescriptor(t,s,e);i!==void 0&&ee(this.prototype,t,i)}}static getPropertyDescriptor(t,e,s){const{get:i,set:r}=se(this.prototype,t)??{get(){return this[e]},set(a){this[e]=a}};return{get(){return i==null?void 0:i.call(this)},set(a){const h=i==null?void 0:i.call(this);r.call(this,a),this.requestUpdate(t,h,s)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??Nt}static _$Ei(){if(this.hasOwnProperty(at("elementProperties")))return;const t=re(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(at("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(at("properties"))){const e=this.properties,s=[...ie(e),...ae(e)];for(const i of s)this.createProperty(i,e[i])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[s,i]of e)this.elementProperties.set(s,i)}this._$Eh=new Map;for(const[e,s]of this.elementProperties){const i=this._$Eu(e,s);i!==void 0&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const s=new Set(t.flat(1/0).reverse());for(const i of s)e.unshift(Lt(i))}else t!==void 0&&e.push(Lt(t));return e}static _$Eu(t,e){const s=e.attribute;return s===!1?void 0:typeof s=="string"?s:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$EO??(this._$EO=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$EO)==null||e.delete(t)}_$E_(){const t=new Map,e=this.constructor.elementProperties;for(const s of e.keys())this.hasOwnProperty(s)&&(t.set(s,this[s]),delete this[s]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Qt(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostConnected)==null?void 0:s.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$EO)==null||t.forEach(e=>{var s;return(s=e.hostDisconnected)==null?void 0:s.call(e)})}attributeChangedCallback(t,e,s){this._$AK(t,s)}_$EC(t,e){var r;const s=this.constructor.elementProperties.get(t),i=this.constructor._$Eu(t,s);if(i!==void 0&&s.reflect===!0){const a=(((r=s.converter)==null?void 0:r.toAttribute)!==void 0?s.converter:gt).toAttribute(e,s.type);this._$Em=t,a==null?this.removeAttribute(i):this.setAttribute(i,a),this._$Em=null}}_$AK(t,e){var r;const s=this.constructor,i=s._$Eh.get(t);if(i!==void 0&&this._$Em!==i){const a=s.getPropertyOptions(i),h=typeof a.converter=="function"?{fromAttribute:a.converter}:((r=a.converter)==null?void 0:r.fromAttribute)!==void 0?a.converter:gt;this._$Em=i,this[i]=h.fromAttribute(e,a.type),this._$Em=null}}requestUpdate(t,e,s){if(t!==void 0){if(s??(s=this.constructor.getPropertyOptions(t)),!(s.hasChanged??At)(this[t],e))return;this.P(t,e,s)}this.isUpdatePending===!1&&(this._$ES=this._$ET())}P(t,e,s){this._$AL.has(t)||this._$AL.set(t,e),s.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$ET(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var s;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[r,a]of this._$Ep)this[r]=a;this._$Ep=void 0}const i=this.constructor.elementProperties;if(i.size>0)for(const[r,a]of i)a.wrapped!==!0||this._$AL.has(r)||this[r]===void 0||this.P(r,this[r],a)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(s=this._$EO)==null||s.forEach(i=>{var r;return(r=i.hostUpdate)==null?void 0:r.call(i)}),this.update(e)):this._$EU()}catch(i){throw t=!1,this._$EU(),i}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$EO)==null||e.forEach(s=>{var i;return(i=s.hostUpdated)==null?void 0:i.call(s)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$EU(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EC(e,this[e]))),this._$EU()}updated(t){}firstUpdated(t){}}rt.elementStyles=[],rt.shadowRootOptions={mode:"open"},rt[at("elementProperties")]=new Map,rt[at("finalized")]=new Map,xt==null||xt({ReactiveElement:rt}),(I.reactiveElementVersions??(I.reactiveElementVersions=[])).push("2.0.4");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const oe={attribute:!0,type:String,converter:gt,reflect:!1,hasChanged:At},he=(n=oe,t,e)=>{const{kind:s,metadata:i}=e;let r=globalThis.litPropertyMetadata.get(i);if(r===void 0&&globalThis.litPropertyMetadata.set(i,r=new Map),r.set(e.name,n),s==="accessor"){const{name:a}=e;return{set(h){const l=t.get.call(this);t.set.call(this,h),this.requestUpdate(a,l,n)},init(h){return h!==void 0&&this.P(a,void 0,n),h}}}if(s==="setter"){const{name:a}=e;return function(h){const l=this[a];t.call(this,h),this.requestUpdate(a,l,n)}}throw Error("Unsupported decorator location: "+s)};function u(n){return(t,e)=>typeof e=="object"?he(n,t,e):((s,i,r)=>{const a=i.hasOwnProperty(r);return i.constructor.createProperty(r,a?{...s,wrapped:!0}:s),a?Object.getOwnPropertyDescriptor(i,r):void 0})(n,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function x(n){return u({...n,state:!0,attribute:!1})}const kt=class kt{static createSVG(t,e,s){const i=document.createElementNS(this.SVG_NS,"svg");return i.setAttribute("width",t.toString()),i.setAttribute("height",e.toString()),s&&i.setAttribute("viewBox",s),i}static createGroup(t){const e=document.createElementNS(this.SVG_NS,"g");return t&&e.setAttribute("transform",t),e}static createText(t,e){const s=document.createElementNS(this.SVG_NS,"text");return s.setAttribute("x",e.x.toString()),s.setAttribute("y",e.y.toString()),e.anchor&&s.setAttribute("text-anchor",e.anchor),e.transform&&s.setAttribute("transform",e.transform),e.dy&&s.setAttribute("dy",e.dy),e.fontSize&&(s.style.fontSize=e.fontSize),e.fill&&(s.style.fill=e.fill),e.stroke&&(s.style.stroke=e.stroke),e.strokeWidth&&s.setAttribute("stroke-width",e.strokeWidth),s.textContent=t,s}static createLine(t){const e=document.createElementNS(this.SVG_NS,"line");return e.setAttribute("x1",t.x1.toString()),e.setAttribute("y1",t.y1.toString()),e.setAttribute("x2",t.x2.toString()),e.setAttribute("y2",t.y2.toString()),t.stroke&&e.setAttribute("stroke",t.stroke),t.strokeWidth&&e.setAttribute("stroke-width",t.strokeWidth),e}static createRect(t){const e=document.createElementNS(this.SVG_NS,"rect");return e.setAttribute("x",t.x.toString()),e.setAttribute("y",t.y.toString()),e.setAttribute("width",t.width.toString()),e.setAttribute("height",t.height.toString()),t.fill&&e.setAttribute("fill",t.fill),t.stroke&&e.setAttribute("stroke",t.stroke),t.strokeWidth&&e.setAttribute("stroke-width",t.strokeWidth),e}static createPath(t){const e=document.createElementNS(this.SVG_NS,"path");return e.setAttribute("d",t.d),t.fill&&e.setAttribute("fill",t.fill),t.stroke&&e.setAttribute("stroke",t.stroke),t.strokeWidth&&e.setAttribute("stroke-width",t.strokeWidth),e}static createCircle(t){const e=document.createElementNS(this.SVG_NS,"circle");return e.setAttribute("cx",t.cx.toString()),e.setAttribute("cy",t.cy.toString()),e.setAttribute("r",t.r.toString()),t.fill&&e.setAttribute("fill",t.fill),t.stroke&&e.setAttribute("stroke",t.stroke),t.strokeWidth&&e.setAttribute("stroke-width",t.strokeWidth),e}};kt.SVG_NS="http://www.w3.org/2000/svg";let c=kt;var le=Object.defineProperty,ce=Object.getOwnPropertyDescriptor,N=(n,t,e,s)=>{for(var i=s>1?void 0:s?ce(t,e):t,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(t,e,i):a(i))||i);return s&&i&&le(t,e,i),i};o.BaseChart=class extends E.LitElement{constructor(){super(...arguments),this.width=600,this.height=400,this.title="",this.data=[],this.margin={top:20,right:20,bottom:80,left:60},this.colors=["7, 171, 160","218, 60, 120","126, 52, 157","0, 119, 192","231, 76, 60","14, 172, 81","241, 137, 45","227, 114, 75","174, 124, 91","108, 122, 137","117, 133, 134","112, 112, 112"],this.showLegend=!0,this.showValues=!0,this.hoverEffects=!0,this.animationDuration=800,this.animationEnabled=!0,this.isFirstRender=!0,this.svgElement=null}getColor(t){return`rgba(${this.colors[t%this.colors.length]}, 0.2)`}getHoverColor(t){return`rgba(${this.colors[t%this.colors.length]}, 0.4)`}getBorderColor(t){return`rgba(${this.colors[t%this.colors.length]}, 1)`}createRenderRoot(){const t=super.createRenderRoot(),e=document.createElement("style");return e.textContent=`
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `,t.appendChild(e),t}firstUpdated(){this.initializeChart()}get isAnimationEnabled(){return this.animationEnabled&&this.isFirstRender}initializeChart(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(".chart-container");if(t&&(t.innerHTML="",this.svgElement=c.createSVG(this.width,this.height,`0 0 ${this.width} ${this.height}`),t.appendChild(this.svgElement),this.title)){const s=c.createText(this.title,{x:this.width/2,y:this.margin.top/2,anchor:"middle",fontSize:"16px"});this.svgElement.appendChild(s)}}render(){return E.html` <div class="chart-container"></div> `}},o.BaseChart.styles=E.css`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
    .chart-container {
      width: 100%;
      height: 100%;
    }
    svg {
      width: 100%;
      height: 100%;
    }
  `,N([u({type:Number})],o.BaseChart.prototype,"width",2),N([u({type:Number})],o.BaseChart.prototype,"height",2),N([u({type:String})],o.BaseChart.prototype,"title",2),N([u({type:Array})],o.BaseChart.prototype,"data",2),N([u({type:Object})],o.BaseChart.prototype,"margin",2),N([u({type:Array})],o.BaseChart.prototype,"colors",2),N([u({type:Boolean})],o.BaseChart.prototype,"showLegend",2),N([u({type:Boolean})],o.BaseChart.prototype,"showValues",2),N([u({type:Boolean})],o.BaseChart.prototype,"hoverEffects",2),N([u({type:Number})],o.BaseChart.prototype,"animationDuration",2),N([u({type:Boolean})],o.BaseChart.prototype,"animationEnabled",2),N([x()],o.BaseChart.prototype,"isFirstRender",2),N([x()],o.BaseChart.prototype,"svgElement",2),o.BaseChart=N([tt("base-chart")],o.BaseChart);var de=Object.defineProperty,ue=Object.getOwnPropertyDescriptor,U=(n,t,e,s)=>{for(var i=s>1?void 0:s?ue(t,e):t,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(t,e,i):a(i))||i);return s&&i&&de(t,e,i),i};o.BarChart=class extends o.BaseChart{constructor(){super(...arguments),this.xKey="category",this.yKey="value",this.color="#1f77b4",this.showButtons=!0,this.limit=10,this.offset=0,this.processedData=[],this.datasets=[],this.maxValue=0,this.hoveredBar=null}firstUpdated(){super.firstUpdated(),this.processData(),this.drawChart()}get hasMultipleDatasets(){return this.datasets&&this.datasets.length}processData(){if(this.data.length)if(this.isFirstRender=!0,this.hasMultipleDatasets){const t=[];[...new Set(this.data.map(s=>s[this.xKey]))].forEach(s=>{const i=this.data.find(h=>h[this.xKey]===s),r=this.datasets.map(h=>i[h]),a=Math.max(...r);this.maxValue=Math.max(this.maxValue,a),t.push({label:s,data:r,colors:this.datasets.map((h,l)=>this.getColor(l)),hoverColors:this.datasets.map((h,l)=>this.getHoverColor(l)),borderColors:this.datasets.map((h,l)=>this.getBorderColor(l))})}),this.processedData=t.slice(this.offset,this.offset+this.limit)}else{this.maxValue=0;const t=this.data.map((e,s)=>{const i=e[this.yKey];return this.maxValue=Math.max(this.maxValue,i),{label:e[this.xKey],data:[i],color:this.getColor(s),hoverColor:this.getHoverColor(s)}});this.processedData=t.slice(this.offset,this.offset+this.limit)}}prev(){this.offset>=this.limit&&(this.offset-=this.limit,this.processData(),this.drawChart())}next(){this.offset+=this.limit,this.processData(),this.drawChart()}handleBarHover(t){this.hoverEffects&&(this.hoveredBar=t,this.updateBarColors())}handleBarLeave(){this.hoverEffects&&(this.hoveredBar=null,this.updateBarColors())}updateBarColors(){if(!this.renderRoot)return;const t=this.renderRoot.querySelector("svg");if(!t)return;t.querySelectorAll("rect").forEach((s,i)=>{const r=Math.floor(i/(this.hasMultipleDatasets?this.datasets.length:1));if(this.hoveredBar===r)if(this.hasMultipleDatasets){const a=i%this.datasets.length;s.setAttribute("fill",this.processedData[r].hoverColors[a])}else s.setAttribute("fill",this.processedData[r].hoverColor);else if(this.hasMultipleDatasets){const a=i%this.datasets.length;s.setAttribute("fill",this.processedData[r].colors[a])}else s.setAttribute("fill",this.processedData[r].color)})}drawChart(){if(!this.renderRoot||!this.processedData.length)return;const t=this.renderRoot.querySelector("svg");if(!t)return;t.innerHTML="";const e=this.width-this.margin.left-this.margin.right,s=this.height-this.margin.top-this.margin.bottom,i=c.createGroup(`translate(${this.margin.left},${this.margin.top})`);t.appendChild(i);const r=g=>g/this.processedData.length*e,a=g=>g/this.maxValue*s,h=c.createGroup(`translate(0,${s})`);i.appendChild(h);const l=c.createLine({x1:0,y1:0,x2:e,y2:0,stroke:"#ddd"});h.appendChild(l);const d=c.createGroup();i.appendChild(d);const m=c.createLine({x1:0,y1:0,x2:0,y2:s,stroke:"#ddd"});d.appendChild(m);const p=5;for(let g=0;g<=p;g++){const v=s-g*s/p,A=this.maxValue*g/p,b=c.createText(A.toFixed(0),{x:-5,y:v,anchor:"end"});d.appendChild(b);const L=c.createLine({x1:0,y1:v,x2:e,y2:v,stroke:"#ddd"});d.appendChild(L)}this.hasMultipleDatasets?(this.processedData.forEach((g,v)=>{const A=r(v),b=r(1)*.8,L=this.datasets.length,P=b/L;this.datasets.forEach((C,y)=>{const D=g.data[y],w=a(D),_=A+y*P,$=c.createRect({x:_,y:s,width:P,height:0,fill:this.hoveredBar===v?g.hoverColors[y]:g.colors[y],stroke:g.borderColors[y],strokeWidth:"1"});if(this.isAnimationEnabled&&($.style.transition=`height ${this.animationDuration}ms ease-out, y ${this.animationDuration}ms ease-out`),this.hoverEffects&&($.addEventListener("mouseenter",()=>this.handleBarHover(v)),$.addEventListener("mouseleave",()=>this.handleBarLeave())),i.appendChild($),setTimeout(()=>{$.setAttribute("height",w.toString()),$.setAttribute("y",(s-w).toString())},50),this.showValues){const B=c.createText(D.toFixed(0),{x:_+P/2,y:s-w-5,anchor:"middle"});this.isAnimationEnabled?(B.style.transition=`opacity ${this.animationDuration}ms ease-out`,B.style.opacity="0"):B.style.opacity="1",i.appendChild(B),this.isAnimationEnabled&&setTimeout(()=>{B.style.opacity="1"},this.animationDuration/2)}});const f=c.createText(g.label,{x:A+b/2,y:20,anchor:"middle"});h.appendChild(f)}),this.showLegend&&this.renderLegend(i,e)):this.processedData.forEach((g,v)=>{const A=r(v),b=r(1)*.8,L=g.data[0],P=a(L),f=c.createRect({x:A,y:s,width:b,height:0,fill:this.hoveredBar===v?g.hoverColor:g.color,stroke:this.getBorderColor(v),strokeWidth:"1"});if(this.isAnimationEnabled&&(f.style.transition=`height ${this.animationDuration}ms ease-out, y ${this.animationDuration}ms ease-out`),this.hoverEffects&&(f.addEventListener("mouseenter",()=>this.handleBarHover(v)),f.addEventListener("mouseleave",()=>this.handleBarLeave())),i.appendChild(f),setTimeout(()=>{f.setAttribute("height",P.toString()),f.setAttribute("y",(s-P).toString())},50),this.showValues){const y=c.createText(L.toFixed(0),{x:A+b/2,y:s-P-5,anchor:"middle"});this.isAnimationEnabled?(y.style.transition=`opacity ${this.animationDuration}ms ease-out`,y.style.opacity="0"):y.style.opacity="1",i.appendChild(y),this.isAnimationEnabled&&setTimeout(()=>{y.style.opacity="1"},this.animationDuration/2)}const C=c.createText(g.label,{x:A+b/2,y:20,anchor:"middle"});h.appendChild(C)}),this.isFirstRender=!1}renderLegend(t,e){const s=c.createGroup(`translate(${e/2},${this.height-this.margin.bottom+25})`);t.appendChild(s),this.datasets.forEach((i,r)=>{const a=c.createGroup(`translate(${r*100-this.datasets.length*50},0)`),h=c.createRect({x:0,y:-7.5,width:15,height:15,fill:this.getColor(r),stroke:this.getBorderColor(r),strokeWidth:"1"});a.appendChild(h);const l=c.createText(i.label||`Dataset ${r+1}`,{x:20,y:4,fontSize:"12px"});a.appendChild(l),s.appendChild(a)})}render(){return E.html`
      <div class="chart-container">
        ${this.showButtons?E.html`
              <div class="chart-controls">
                <button
                  @click=${this.prev}
                  ?disabled=${this.offset<this.limit}
                >
                  Previous
                </button>
                <button
                  @click=${this.next}
                  ?disabled=${this.offset+this.limit>=this.datasets.length}
                >
                  Next
                </button>
              </div>
            `:""}
      </div>
    `}},U([u({type:String})],o.BarChart.prototype,"xKey",2),U([u({type:String})],o.BarChart.prototype,"yKey",2),U([u({type:String})],o.BarChart.prototype,"color",2),U([u({type:Boolean})],o.BarChart.prototype,"showButtons",2),U([u({type:Number})],o.BarChart.prototype,"limit",2),U([x()],o.BarChart.prototype,"offset",2),U([x()],o.BarChart.prototype,"processedData",2),U([x()],o.BarChart.prototype,"datasets",2),U([x()],o.BarChart.prototype,"maxValue",2),U([x()],o.BarChart.prototype,"hoveredBar",2),o.BarChart=U([tt("bar-chart")],o.BarChart);var pe=Object.defineProperty,ge=Object.getOwnPropertyDescriptor,W=(n,t,e,s)=>{for(var i=s>1?void 0:s?ge(t,e):t,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(t,e,i):a(i))||i);return s&&i&&pe(t,e,i),i};o.PieChart=class extends o.BaseChart{constructor(){super(...arguments),this.valueKey="value",this.labelKey="label",this.innerRadius=0,this.showPercentages=!0,this.hoveredSegment=null,this.total=0,this.labelPositions=[]}firstUpdated(){super.firstUpdated(),this.drawChart()}updated(t){super.updated(t),t.has("data")&&(this.isFirstRender=!0,this.drawChart())}drawChart(){if(!this.svgElement||!this.data.length)return;this.svgElement.innerHTML="";const t=this.width-this.margin.left-this.margin.right,e=this.height-this.margin.top-this.margin.bottom,s=Math.min(t,e)/2,i=this.width/2,r=this.height/2,a=c.createGroup(`translate(${i},${r})`);this.svgElement.appendChild(a),this.total=this.data.reduce((l,d)=>l+d[this.valueKey],0);let h=0;if(this.labelPositions=[],this.data.forEach((l,d)=>{const m=l[this.valueKey],p=m/this.total*2*Math.PI,g=h+p,v=this.polarToCartesian(s,h),A=this.polarToCartesian(s,g),b=this.polarToCartesian(this.innerRadius,h),L=this.polarToCartesian(this.innerRadius,g),P=p>Math.PI?1:0,f=["M",v.x,v.y,"A",s,s,0,P,1,A.x,A.y,"L",L.x,L.y,"A",this.innerRadius,this.innerRadius,0,P,0,b.x,b.y,"Z"].join(" "),C=this.hoveredSegment===d,y=C?s*1.05:s,D=C?this.innerRadius*1.05:this.innerRadius,w=this.polarToCartesian(y,h),_=this.polarToCartesian(y,g),$=this.polarToCartesian(D,h),B=this.polarToCartesian(D,g),G=["M",w.x,w.y,"A",y,y,0,P,1,_.x,_.y,"L",B.x,B.y,"A",D,D,0,P,0,$.x,$.y,"Z"].join(" "),R=c.createPath({d:C?G:f,fill:C?this.getHoverColor(d):this.getColor(d),stroke:this.getBorderColor(d),strokeWidth:"1"});R.style.transition=`transform ${this.animationDuration}ms ease-out`,R.style.transformOrigin="0 0",this.isAnimationEnabled&&(R.style.transform="scale(0)",R.style.opacity="0"),this.hoverEffects&&(R.addEventListener("mouseenter",()=>this.handleSegmentHover(d)),R.addEventListener("mouseleave",()=>this.handleSegmentLeave())),a.appendChild(R),this.isAnimationEnabled&&requestAnimationFrame(()=>{R.style.transform="scale(1)",R.style.opacity="1"});const J=h+p/2,V=s*.7,O=this.polarToCartesian(V,J);if(this.labelPositions[d]={x:O.x,y:O.y},p>.1||C){const S=c.createGroup(`translate(${O.x},${O.y})`),Q=c.createText(l[this.labelKey],{x:0,y:0,anchor:"middle",dy:".35em",fontSize:C?"16px":"12px"});if(Q.style.fill=this.getBorderColor(d),S.appendChild(Q),this.showValues&&(p>.2||C)){const bt=c.createText(m.toString(),{x:0,y:15,anchor:"middle",dy:".35em",fontSize:C?"14px":"10px"});bt.style.fill=this.getBorderColor(d),S.appendChild(bt)}if(this.showPercentages&&(p>.2||C)){const bt=(m/this.total*100).toFixed(1),Yt=c.createText(`${bt}%`,{x:0,y:30,anchor:"middle",dy:".35em",fontSize:C?"14px":"10px"});Yt.style.fill=this.getBorderColor(d),S.appendChild(Yt)}const F=O.x,K=O.y,dt=Math.sqrt(F*F+K*K),it=F/dt,$t=K/dt,ut=C?.5:.1,Le=O.x+it*s*ut,Re=O.y+$t*s*ut;S.setAttribute("transform",`translate(${Le},${Re})`),S.style.transition=`transform ${this.animationDuration}ms ease-out`,this.isAnimationEnabled&&(S.style.opacity="0",S.style.transition=`transform ${this.animationDuration}ms ease-out, opacity ${this.animationDuration}ms ease-out`),a.appendChild(S),this.isAnimationEnabled&&requestAnimationFrame(()=>{S.style.opacity="1"})}h=g}),this.showLegend){const l=c.createGroup(`translate(${t/2},${e/2+s+30})`);this.data.forEach((d,m)=>{const p=c.createGroup(`translate(${m*100-this.data.length*50},0)`),g=c.createRect({x:0,y:0,width:15,height:15,fill:this.getColor(m),stroke:this.getBorderColor(m),strokeWidth:"1"});p.appendChild(g);const v=c.createText(d[this.labelKey],{x:20,y:12,fontSize:"12px"});v.style.fill=this.getBorderColor(m),p.appendChild(v),l.appendChild(p)}),a.appendChild(l)}this.isFirstRender&&setTimeout(()=>{this.isFirstRender=!1},this.animationDuration)}handleSegmentHover(t){this.hoverEffects&&(this.hoveredSegment=t,this.drawChart())}handleSegmentLeave(){this.hoverEffects&&(this.hoveredSegment=null,this.drawChart())}polarToCartesian(t,e){return{x:t*Math.cos(e-Math.PI/2),y:t*Math.sin(e-Math.PI/2)}}},W([u({type:String})],o.PieChart.prototype,"valueKey",2),W([u({type:String})],o.PieChart.prototype,"labelKey",2),W([u({type:Number})],o.PieChart.prototype,"innerRadius",2),W([u({type:Boolean})],o.PieChart.prototype,"showPercentages",2),W([x()],o.PieChart.prototype,"hoveredSegment",2),W([x()],o.PieChart.prototype,"total",2),W([x()],o.PieChart.prototype,"labelPositions",2),o.PieChart=W([tt("pie-chart")],o.PieChart);var ye=Object.defineProperty,fe=Object.getOwnPropertyDescriptor,H=(n,t,e,s)=>{for(var i=s>1?void 0:s?fe(t,e):t,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(t,e,i):a(i))||i);return s&&i&&ye(t,e,i),i};o.LineChart=class extends o.BaseChart{constructor(){super(...arguments),this.xKey="x",this.yKey="y",this.lineWidth=2,this.showPoints=!0,this.pointRadius=4,this.showArea=!1,this.hoveredPoint=null,this.datasets=[]}getAreaColor(t){return`rgba(${this.colors[t%this.colors.length]}, 0.1)`}firstUpdated(){super.firstUpdated(),this.processData(),this.drawChart()}updated(t){super.updated(t),(t.has("data")||t.has("color")||t.has("lineWidth")||t.has("showPoints")||t.has("pointRadius")||t.has("showArea"))&&(this.isFirstRender=!0,this.processData(),this.drawChart())}processData(){this.data.length&&(Object.prototype.hasOwnProperty.call(this.data[0],"data")?this.datasets=this.data:this.datasets=[{label:this.yKey,color:this.colors[0],data:this.data}])}drawChart(){if(!this.renderRoot||!this.datasets.length)return;const t=this.renderRoot.querySelector("svg");if(!t)return;t.innerHTML="";const e=this.width-this.margin.left-this.margin.right,s=this.height-this.margin.top-this.margin.bottom,i=c.createGroup(`translate(${this.margin.left},${this.margin.top})`);t.appendChild(i);const r=this.datasets.flatMap(f=>f.data),a=r.map(f=>f[this.xKey]),h=r.map(f=>f[this.yKey]),l=Math.min(...a),d=Math.max(...a),m=Math.min(...h),p=Math.max(...h),g=f=>(f-l)/(d-l)*e,v=f=>(f-m)/(p-m)*s,A=c.createGroup(`translate(0,${s})`);i.appendChild(A);const b=5;for(let f=0;f<=b;f++){const C=f*e/b,y=l+f*(d-l)/b,D=c.createText(y.toFixed(1),{x:C,y:20,anchor:"middle"});A.appendChild(D);const w=c.createLine({x1:C,y1:0,x2:C,y2:5,stroke:"#ddd"});A.appendChild(w)}const L=c.createGroup();i.appendChild(L);const P=5;for(let f=0;f<=P;f++){const C=s-f*s/P,y=m+f*(p-m)/P,D=c.createText(y.toFixed(1),{x:-5,y:C,anchor:"end"});L.appendChild(D);const w=c.createLine({x1:0,y1:C,x2:e,y2:C,stroke:"#ddd"});L.appendChild(w)}if(this.datasets.forEach((f,C)=>{const y=f.data.map((_,$)=>({x:g(_[this.xKey]),y:s-v(_[this.yKey]),original:_,index:$}));if(this.showArea){const _=[`M ${y[0].x} ${s}`,...y.map(B=>`L ${B.x} ${B.y}`),`L ${y[y.length-1].x} ${s}`,"Z"].join(" "),$=c.createPath({d:_,fill:this.getAreaColor(C),stroke:"none"});this.isFirstRender?($.style.transition=`opacity ${this.animationDuration}ms ease-out`,$.style.opacity="0"):$.style.opacity="1",i.appendChild($),this.isFirstRender&&setTimeout(()=>{$.style.opacity="1"},50)}const D=y.map((_,$)=>`${$===0?"M":"L"} ${_.x} ${_.y}`).join(" "),w=c.createPath({d:D,fill:"none",stroke:this.getBorderColor(C),strokeWidth:this.lineWidth.toString()});this.isAnimationEnabled&&(w.style.transition=`stroke-dashoffset ${this.animationDuration}ms ease-out`,w.style.strokeDasharray=w.getTotalLength().toString(),w.style.strokeDashoffset=w.getTotalLength().toString()),i.appendChild(w),this.isAnimationEnabled&&setTimeout(()=>{w.style.strokeDashoffset="0"},50),this.showPoints&&y.forEach((_,$)=>{var R,J;const B=((R=this.hoveredPoint)==null?void 0:R.series)===C&&((J=this.hoveredPoint)==null?void 0:J.point)===$,G=c.createCircle({cx:_.x,cy:_.y,r:B?this.pointRadius*1.5:this.pointRadius,fill:B?this.getHoverColor(C):this.getColor(C),stroke:this.getBorderColor(C),strokeWidth:"1"});if(this.isAnimationEnabled?(G.style.transition=`opacity ${this.animationDuration}ms ease-out, r ${this.animationDuration}ms ease-out`,G.style.opacity="0"):G.style.opacity="1",this.hoverEffects&&(G.addEventListener("mouseenter",()=>{this.hoveredPoint={series:C,point:$},this.updatePointStyles()}),G.addEventListener("mouseleave",()=>{this.hoveredPoint=null,this.updatePointStyles()})),i.appendChild(G),this.isAnimationEnabled&&setTimeout(()=>{G.style.opacity="1"},this.animationDuration/2+$*50),this.showValues&&B){const V=c.createText(_.original[this.yKey].toFixed(1),{x:_.x,y:_.y-15,anchor:"middle",fontSize:"12px",fill:this.getBorderColor(C)});V.style.transition="opacity 0.2s ease-out",V.style.opacity="0",i.appendChild(V),this.animationEnabled?setTimeout(()=>{V.style.opacity="1"},50):V.style.opacity="1"}})}),this.showLegend&&this.datasets.length>1){const f=c.createGroup(`translate(${e/2},${s+50})`);this.datasets.forEach((C,y)=>{const D=c.createGroup(`translate(${y*100-this.datasets.length*50},0)`),w=c.createLine({x1:0,y1:0,x2:15,y2:0,stroke:this.getBorderColor(y),strokeWidth:this.lineWidth.toString()});if(D.appendChild(w),this.showPoints){const $=c.createCircle({cx:7.5,cy:0,r:this.pointRadius,fill:this.getColor(y),stroke:this.getBorderColor(y),strokeWidth:"1"});D.appendChild($)}const _=c.createText(C.label||`Series ${y+1}`,{x:20,y:4,fontSize:"12px",fill:this.getBorderColor(y)});D.appendChild(_),f.appendChild(D)}),i.appendChild(f)}this.isFirstRender=!1}updatePointStyles(){if(!this.renderRoot)return;const t=this.renderRoot.querySelector("svg");if(!t)return;t.querySelectorAll("circle").forEach((s,i)=>{var l,d,m;const r=Math.floor(i/this.datasets[0].data.length),a=i%this.datasets[0].data.length;if(((l=this.hoveredPoint)==null?void 0:l.series)===r&&((d=this.hoveredPoint)==null?void 0:d.point)===a){if(s.setAttribute("r",(this.pointRadius*1.5).toString()),s.setAttribute("fill",this.getHoverColor(r)),this.showValues&&!t.querySelector(`text[data-point="${r}-${a}"]`)){const g=parseFloat(s.getAttribute("cx")||"0"),v=parseFloat(s.getAttribute("cy")||"0"),A=this.datasets[r].data[a][this.yKey],b=c.createText(A.toFixed(1),{x:g,y:v-15,anchor:"middle",fontSize:"12px",fill:this.getBorderColor(r)});b.setAttribute("data-point",`${r}-${a}`),b.style.transition="opacity 0.2s ease-out",b.style.opacity="0",(m=t.querySelector("g"))==null||m.appendChild(b),this.animationEnabled?setTimeout(()=>{b.style.opacity="1"},50):b.style.opacity="1"}}else{s.setAttribute("r",this.pointRadius.toString()),s.setAttribute("fill",this.getColor(r));const p=t.querySelector(`text[data-point="${r}-${a}"]`);p&&p.remove()}})}},H([u()],o.LineChart.prototype,"xKey",2),H([u()],o.LineChart.prototype,"yKey",2),H([u({type:Number})],o.LineChart.prototype,"lineWidth",2),H([u({type:Boolean})],o.LineChart.prototype,"showPoints",2),H([u({type:Number})],o.LineChart.prototype,"pointRadius",2),H([u({type:Boolean})],o.LineChart.prototype,"showArea",2),H([x()],o.LineChart.prototype,"hoveredPoint",2),H([x()],o.LineChart.prototype,"datasets",2),o.LineChart=H([tt("line-chart")],o.LineChart);var me=Object.defineProperty,Ce=Object.getOwnPropertyDescriptor,k=(n,t,e,s)=>{for(var i=s>1?void 0:s?Ce(t,e):t,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(t,e,i):a(i))||i);return s&&i&&me(t,e,i),i};o.GaugeChart=class extends o.BaseChart{constructor(){super(...arguments),this.value=0,this.min=0,this.max=100,this.warningValue=70,this.criticalValue=90,this.startAngle=-90,this.endAngle=90,this.arcThickness=30,this.showTicks=!0,this.showLabels=!0,this.numTicks=5,this.units="",this.title="",this.subtitle="",this.precision=0,this.theme={backgroundColor:"rgba(200, 200, 200, 0.2)",tickColor:"rgba(0, 0, 0, 0.6)",labelColor:"rgba(0, 0, 0, 0.7)",valueColor:"rgba(0, 0, 0, 0.85)",titleColor:"rgba(0, 0, 0, 0.85)"},this.animatedValue=0,this.animationInProgress=!1}firstUpdated(){super.firstUpdated(),this.drawChart(),this.animateValue()}updated(t){super.updated(t),t.has("value")&&this.animateValue()}animateValue(){if(this.animationInProgress)return;if(!this.animationEnabled){this.animatedValue=this.value,this.drawChart();return}this.animationInProgress=!0;const t=this.animatedValue,e=this.value,s=performance.now(),i=r=>{const a=r-s,h=Math.min(a/this.animationDuration,1),l=1-Math.pow(1-h,3);this.animatedValue=t+(e-t)*l,this.drawChart(),h<1?requestAnimationFrame(i):this.animationInProgress=!1};requestAnimationFrame(i)}drawChart(){if(!this.svgElement)return;this.svgElement.innerHTML="";const t=this.width-this.margin.left-this.margin.right,e=this.height-this.margin.top-this.margin.bottom,s=Math.min(t,e)/2,i=this.width/2,r=this.height/2;this.svgElement.setAttribute("viewBox",`0 0 ${this.width} ${this.height*.7}`);const a=c.createGroup(`translate(${i},${r*.75})`);this.svgElement.appendChild(a);const h=s*.9,l=h-this.arcThickness,d=c.createPath({d:this.createArc(h,l,this.startAngle,this.endAngle),fill:this.theme.backgroundColor,stroke:"rgba(0, 0, 0, 0.1)",strokeWidth:"1"});a.appendChild(d),[{min:this.min,max:this.warningValue,color:this.getColor(0)},{min:this.warningValue,max:this.criticalValue,color:this.getColor(4)},{min:this.criticalValue,max:this.max,color:this.getColor(1)}].forEach(S=>{const Q=this.valueToAngle(S.min),F=this.valueToAngle(S.max),K=c.createPath({d:this.createArc(h,l,Q,F),fill:S.color,stroke:"none"});a.appendChild(K)});const p=this.valueToAngle(this.warningValue),g=this.valueToAngle(this.criticalValue),v=this.polarToCartesian(h+10,p),A=c.createCircle({cx:v.x,cy:v.y,r:5,fill:this.getColor(4)});a.appendChild(A);const b=this.polarToCartesian(h+25,p),L=c.createText("Warning",{x:b.x,y:b.y,anchor:"start",dy:".35em",fontSize:"12px"});L.style.fill=this.getColor(4),L.style.fontWeight="bold",a.appendChild(L);const P=this.polarToCartesian(h+10,g),f=c.createCircle({cx:P.x,cy:P.y,r:5,fill:this.getColor(1)});a.appendChild(f);const C=this.polarToCartesian(h+25,g),y=c.createText("Critical",{x:C.x,y:C.y,anchor:"start",dy:".35em",fontSize:"12px"});if(y.style.fill=this.getColor(1),y.style.fontWeight="bold",a.appendChild(y),this.showTicks||this.showLabels)for(let S=0;S<=this.numTicks;S++){const Q=this.min+S/this.numTicks*(this.max-this.min),F=this.valueToAngle(Q),K=this.polarToCartesian(h+5,F),dt=this.polarToCartesian(h-5,F);if(this.showTicks){const it=c.createLine({x1:dt.x,y1:dt.y,x2:K.x,y2:K.y,stroke:this.theme.tickColor});a.appendChild(it)}if(this.showLabels){const it=this.polarToCartesian(h+20,F),$t=Q.toFixed(this.precision),ut=c.createText(this.units?`${$t}${this.units}`:$t,{x:it.x,y:it.y,anchor:"middle",dy:".35em",fontSize:"12px"});ut.style.fill=this.theme.labelColor,a.appendChild(ut)}}if(this.title){const S=c.createText(this.title,{x:0,y:-s/2,anchor:"middle",fontSize:"16px"});S.style.fill=this.theme.titleColor,S.style.fontWeight="bold",a.appendChild(S)}if(this.subtitle){const S=c.createText(this.subtitle,{x:0,y:-s/2+20,anchor:"middle",fontSize:"14px"});S.style.fill=this.theme.titleColor,a.appendChild(S)}const D=this.animatedValue.toFixed(this.precision),w=this.valueToAngle(this.animatedValue),_=15,$=h-this.arcThickness/2,B=this.polarToCartesian($-_,w),G=this.polarToCartesian($+_,w),R=c.createLine({x1:B.x,y1:B.y,x2:G.x,y2:G.y,stroke:this.theme.valueColor});a.appendChild(R);const J=this.polarToCartesian($,w),V=c.createCircle({cx:J.x,cy:J.y,r:6,fill:this.theme.valueColor});a.appendChild(V);const O=c.createText(this.units?`${D}${this.units}`:D,{x:0,y:-12,anchor:"middle",dy:".35em",fontSize:"24px"});O.style.fill=this.theme.valueColor,O.style.fontWeight="bold",a.appendChild(O),this.hoverEffects&&(R.addEventListener("mouseenter",()=>this.handleHover(!0)),R.addEventListener("mouseleave",()=>this.handleHover(!1)))}valueToAngle(t){const e=(t-this.min)/(this.max-this.min);return this.startAngle+e*(this.endAngle-this.startAngle)}createArc(t,e,s,i){const r=this.polarToCartesian(t,s),a=this.polarToCartesian(t,i),h=this.polarToCartesian(e,s),l=this.polarToCartesian(e,i),d=Math.abs(i-s)<=180?0:1;return["M",r.x,r.y,"A",t,t,0,d,1,a.x,a.y,"L",l.x,l.y,"A",e,e,0,d,0,h.x,h.y,"Z"].join(" ")}polarToCartesian(t,e){const s=(e-90)*(Math.PI/180);return{x:t*Math.cos(s),y:t*Math.sin(s)}}handleHover(t){this.drawChart()}},k([u({type:Number})],o.GaugeChart.prototype,"value",2),k([u({type:Number})],o.GaugeChart.prototype,"min",2),k([u({type:Number})],o.GaugeChart.prototype,"max",2),k([u({type:Number})],o.GaugeChart.prototype,"warningValue",2),k([u({type:Number})],o.GaugeChart.prototype,"criticalValue",2),k([u({type:Number})],o.GaugeChart.prototype,"startAngle",2),k([u({type:Number})],o.GaugeChart.prototype,"endAngle",2),k([u({type:Number})],o.GaugeChart.prototype,"arcThickness",2),k([u({type:Boolean})],o.GaugeChart.prototype,"showTicks",2),k([u({type:Boolean})],o.GaugeChart.prototype,"showLabels",2),k([u({type:Number})],o.GaugeChart.prototype,"numTicks",2),k([u({type:String})],o.GaugeChart.prototype,"units",2),k([u({type:String})],o.GaugeChart.prototype,"title",2),k([u({type:String})],o.GaugeChart.prototype,"subtitle",2),k([u({type:Number})],o.GaugeChart.prototype,"precision",2),k([x()],o.GaugeChart.prototype,"animatedValue",2),k([x()],o.GaugeChart.prototype,"animationInProgress",2),o.GaugeChart=k([tt("gauge-chart")],o.GaugeChart);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const nt=globalThis,yt=nt.trustedTypes,Gt=yt?yt.createPolicy("lit-html",{createHTML:n=>n}):void 0,Ot="$lit$",z=`lit$${Math.random().toFixed(9).slice(2)}$`,Ut="?"+z,ve=`<${Ut}>`,q=document,ft=()=>q.createComment(""),ot=n=>n===null||typeof n!="object"&&typeof n!="function",wt=Array.isArray,$e=n=>wt(n)||typeof(n==null?void 0:n[Symbol.iterator])=="function",St=`[ 	
\f\r]`,ht=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,Ht=/-->/g,Vt=/>/g,X=RegExp(`>|${St}(?:([^\\s"'>=/]+)(${St}*=${St}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Ft=/'/g,It=/"/g,Wt=/^(?:script|style|textarea|title)$/i,et=Symbol.for("lit-noChange"),M=Symbol.for("lit-nothing"),zt=new WeakMap,Y=q.createTreeWalker(q,129);function jt(n,t){if(!wt(n)||!n.hasOwnProperty("raw"))throw Error("invalid template strings array");return Gt!==void 0?Gt.createHTML(t):t}const be=(n,t)=>{const e=n.length-1,s=[];let i,r=t===2?"<svg>":t===3?"<math>":"",a=ht;for(let h=0;h<e;h++){const l=n[h];let d,m,p=-1,g=0;for(;g<l.length&&(a.lastIndex=g,m=a.exec(l),m!==null);)g=a.lastIndex,a===ht?m[1]==="!--"?a=Ht:m[1]!==void 0?a=Vt:m[2]!==void 0?(Wt.test(m[2])&&(i=RegExp("</"+m[2],"g")),a=X):m[3]!==void 0&&(a=X):a===X?m[0]===">"?(a=i??ht,p=-1):m[1]===void 0?p=-2:(p=a.lastIndex-m[2].length,d=m[1],a=m[3]===void 0?X:m[3]==='"'?It:Ft):a===It||a===Ft?a=X:a===Ht||a===Vt?a=ht:(a=X,i=void 0);const v=a===X&&n[h+1].startsWith("/>")?" ":"";r+=a===ht?l+ve:p>=0?(s.push(d),l.slice(0,p)+Ot+l.slice(p)+z+v):l+z+(p===-2?h:v)}return[jt(n,r+(n[e]||"<?>")+(t===2?"</svg>":t===3?"</math>":"")),s]};class lt{constructor({strings:t,_$litType$:e},s){let i;this.parts=[];let r=0,a=0;const h=t.length-1,l=this.parts,[d,m]=be(t,e);if(this.el=lt.createElement(d,s),Y.currentNode=this.el.content,e===2||e===3){const p=this.el.content.firstChild;p.replaceWith(...p.childNodes)}for(;(i=Y.nextNode())!==null&&l.length<h;){if(i.nodeType===1){if(i.hasAttributes())for(const p of i.getAttributeNames())if(p.endsWith(Ot)){const g=m[a++],v=i.getAttribute(p).split(z),A=/([.?@])?(.*)/.exec(g);l.push({type:1,index:r,name:A[2],strings:v,ctor:A[1]==="."?xe:A[1]==="?"?Ae:A[1]==="@"?we:Ct}),i.removeAttribute(p)}else p.startsWith(z)&&(l.push({type:6,index:r}),i.removeAttribute(p));if(Wt.test(i.tagName)){const p=i.textContent.split(z),g=p.length-1;if(g>0){i.textContent=yt?yt.emptyScript:"";for(let v=0;v<g;v++)i.append(p[v],ft()),Y.nextNode(),l.push({type:2,index:++r});i.append(p[g],ft())}}}else if(i.nodeType===8)if(i.data===Ut)l.push({type:2,index:r});else{let p=-1;for(;(p=i.data.indexOf(z,p+1))!==-1;)l.push({type:7,index:r}),p+=z.length-1}r++}}static createElement(t,e){const s=q.createElement("template");return s.innerHTML=t,s}}function st(n,t,e=n,s){var a,h;if(t===et)return t;let i=s!==void 0?(a=e._$Co)==null?void 0:a[s]:e._$Cl;const r=ot(t)?void 0:t._$litDirective$;return(i==null?void 0:i.constructor)!==r&&((h=i==null?void 0:i._$AO)==null||h.call(i,!1),r===void 0?i=void 0:(i=new r(n),i._$AT(n,e,s)),s!==void 0?(e._$Co??(e._$Co=[]))[s]=i:e._$Cl=i),i!==void 0&&(t=st(n,i._$AS(n,t.values),i,s)),t}class _e{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:s}=this._$AD,i=((t==null?void 0:t.creationScope)??q).importNode(e,!0);Y.currentNode=i;let r=Y.nextNode(),a=0,h=0,l=s[0];for(;l!==void 0;){if(a===l.index){let d;l.type===2?d=new mt(r,r.nextSibling,this,t):l.type===1?d=new l.ctor(r,l.name,l.strings,this,t):l.type===6&&(d=new Se(r,this,t)),this._$AV.push(d),l=s[++h]}a!==(l==null?void 0:l.index)&&(r=Y.nextNode(),a++)}return Y.currentNode=q,i}p(t){let e=0;for(const s of this._$AV)s!==void 0&&(s.strings!==void 0?(s._$AI(t,s,e),e+=s.strings.length-2):s._$AI(t[e])),e++}}class mt{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,s,i){this.type=2,this._$AH=M,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=s,this.options=i,this._$Cv=(i==null?void 0:i.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=st(this,t,e),ot(t)?t===M||t==null||t===""?(this._$AH!==M&&this._$AR(),this._$AH=M):t!==this._$AH&&t!==et&&this._(t):t._$litType$!==void 0?this.$(t):t.nodeType!==void 0?this.T(t):$e(t)?this.k(t):this._(t)}O(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}T(t){this._$AH!==t&&(this._$AR(),this._$AH=this.O(t))}_(t){this._$AH!==M&&ot(this._$AH)?this._$AA.nextSibling.data=t:this.T(q.createTextNode(t)),this._$AH=t}$(t){var r;const{values:e,_$litType$:s}=t,i=typeof s=="number"?this._$AC(t):(s.el===void 0&&(s.el=lt.createElement(jt(s.h,s.h[0]),this.options)),s);if(((r=this._$AH)==null?void 0:r._$AD)===i)this._$AH.p(e);else{const a=new _e(i,this),h=a.u(this.options);a.p(e),this.T(h),this._$AH=a}}_$AC(t){let e=zt.get(t.strings);return e===void 0&&zt.set(t.strings,e=new lt(t)),e}k(t){wt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let s,i=0;for(const r of t)i===e.length?e.push(s=new mt(this.O(ft()),this.O(ft()),this,this.options)):s=e[i],s._$AI(r),i++;i<e.length&&(this._$AR(s&&s._$AB.nextSibling,i),e.length=i)}_$AR(t=this._$AA.nextSibling,e){var s;for((s=this._$AP)==null?void 0:s.call(this,!1,!0,e);t&&t!==this._$AB;){const i=t.nextSibling;t.remove(),t=i}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class Ct{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,s,i,r){this.type=1,this._$AH=M,this._$AN=void 0,this.element=t,this.name=e,this._$AM=i,this.options=r,s.length>2||s[0]!==""||s[1]!==""?(this._$AH=Array(s.length-1).fill(new String),this.strings=s):this._$AH=M}_$AI(t,e=this,s,i){const r=this.strings;let a=!1;if(r===void 0)t=st(this,t,e,0),a=!ot(t)||t!==this._$AH&&t!==et,a&&(this._$AH=t);else{const h=t;let l,d;for(t=r[0],l=0;l<r.length-1;l++)d=st(this,h[s+l],e,l),d===et&&(d=this._$AH[l]),a||(a=!ot(d)||d!==this._$AH[l]),d===M?t=M:t!==M&&(t+=(d??"")+r[l+1]),this._$AH[l]=d}a&&!i&&this.j(t)}j(t){t===M?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class xe extends Ct{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===M?void 0:t}}class Ae extends Ct{constructor(){super(...arguments),this.type=4}j(t){this.element.toggleAttribute(this.name,!!t&&t!==M)}}class we extends Ct{constructor(t,e,s,i,r){super(t,e,s,i,r),this.type=5}_$AI(t,e=this){if((t=st(this,t,e,0)??M)===et)return;const s=this._$AH,i=t===M&&s!==M||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==M&&(s===M||i);i&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class Se{constructor(t,e,s){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=s}get _$AU(){return this._$AM._$AU}_$AI(t){st(this,t)}}const Dt=nt.litHtmlPolyfillSupport;Dt==null||Dt(lt,mt),(nt.litHtmlVersions??(nt.litHtmlVersions=[])).push("3.2.1");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const De={ATTRIBUTE:1},Ee=n=>(...t)=>({_$litDirective$:n,values:t});let Te=class{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,s){this._$Ct=t,this._$AM=e,this._$Ci=s}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}};/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Kt="important",Pe=" !"+Kt,j=Ee(class extends Te{constructor(n){var t;if(super(n),n.type!==De.ATTRIBUTE||n.name!=="style"||((t=n.strings)==null?void 0:t.length)>2)throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.")}render(n){return Object.keys(n).reduce((t,e)=>{const s=n[e];return s==null?t:t+`${e=e.includes("-")?e:e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g,"-$&").toLowerCase()}:${s};`},"")}update(n,[t]){const{style:e}=n.element;if(this.ft===void 0)return this.ft=new Set(Object.keys(t)),this.render(t);for(const s of this.ft)t[s]==null&&(this.ft.delete(s),s.includes("-")?e.removeProperty(s):e[s]=null);for(const s in t){const i=t[s];if(i!=null){this.ft.add(s);const r=typeof i=="string"&&i.endsWith(Pe);s.includes("-")||r?e.setProperty(s,r?i.slice(0,-11):i,r?Kt:""):e[s]=i}}return et}});var ke=Object.defineProperty,Me=Object.getOwnPropertyDescriptor,T=(n,t,e,s)=>{for(var i=s>1?void 0:s?Me(t,e):t,r=n.length-1,a;r>=0;r--)(a=n[r])&&(i=(s?a(t,e,i):a(i))||i);return s&&i&&ke(t,e,i),i};const Z=60*60*24*1e3,vt=35,Et=n=>new Date(n.getFullYear(),n.getMonth(),n.getDate()+1),Tt=n=>new Date(n.getFullYear(),n.getMonth(),n.getDate()+7),Pt=n=>new Date(n.getFullYear(),n.getMonth()+1,1),qt=n=>new Date(n.getFullYear(),n.getMonth()+3,1),Xt=n=>new Date(n.getFullYear()+1,0,1),Be=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],ct=[{scale:.5,nextDate:Xt},{scale:.7,nextDate:Xt},{scale:1,nextDate:qt},{scale:2,nextDate:qt},{scale:4,nextDate:Pt},{scale:7,nextDate:Pt},{scale:10,nextDate:Pt},{scale:15,nextDate:Tt},{scale:20,nextDate:Tt},{scale:50,nextDate:Tt},{scale:100,nextDate:Et},{scale:150,nextDate:Et},{scale:200,nextDate:Et}];o.GanttChart=class extends E.LitElement{constructor(){super(),this.items=[],this.showConnectors=!0,this.scaleIndex=8,this.titleField="title",this.startField="start",this.endField="end",this.markerFields=[],this.linksField="links",this.keyField="id",this._scale=ct[8].scale,this._getNextDate=ct[8].nextDate,this._startDate=new Date,this._finishDate=new Date,this._minDate=0,this._maxDate=0,this._rulers=[],this._isMouseDown=!1,this._mouseDownPageX=0,this._connectors=[],this._updateScale(),this._calculateDateRange(),this._generateRulers()}updated(t){(t.has("items")||t.has("scaleIndex"))&&(this._updateScale(),this._calculateDateRange(),this._generateRulers(),this._calculateConnectors())}_updateScale(){this._scale=ct[this.scaleIndex].scale,this._getNextDate=ct[this.scaleIndex].nextDate}_calculateDateRange(){if(this.items.length===0)return;let t=new Date(this.items[0].start),e=new Date(this.items[0].end);this.items.forEach(r=>{const a=new Date(r.start),h=new Date(r.end);a<t&&(t=a),h>e&&(e=h)}),this._startDate=t,this._finishDate=e;const s=new Date(t.getFullYear(),0,1),i=new Date(e.getFullYear(),11,31);this._minDate=s.getTime()/Z,this._maxDate=i.getTime()/Z}_generateRulers(){const t=[],e=new Date(this._minDate*Z),s=new Date(this._maxDate*Z);let i=e;for(;i<s;)t.push({pos:(i.getTime()/Z-this._minDate)*this._scale,date:this._getDateText(i)}),i=this._getNextDate(i);this._rulers=t}_getDateText(t){const e=`${Be[t.getMonth()]} '${String(t.getFullYear()).substring(2)}`;return this.scaleIndex<7?e:`${t.getDate()} ${e}`}_createScalable(t){return(t.getTime()/Z-this._minDate)*this._scale}_getCurrentDayPosition(){const t=new Date;return this._createScalable(t)}_scaleDown(){this.scaleIndex<ct.length-1&&(this.scaleIndex++,this._updateScale(),this._generateRulers(),this._calculateConnectors())}_scaleUp(){this.scaleIndex>0&&(this.scaleIndex--,this._updateScale(),this._generateRulers(),this._calculateConnectors())}_handleMouseDown(t){this._isMouseDown=!0,this._mouseDownPageX=t.pageX}_handleMouseUp(){this._isMouseDown=!1}_handleMouseMove(t){var e,s;if(this._isMouseDown){const i=t.pageX-this._mouseDownPageX;this._mouseDownPageX=t.pageX,(s=(e=this.shadowRoot)==null?void 0:e.querySelector(".gantt-content"))==null||s.scrollBy({left:-i,behavior:"auto"})}}_handleScroll(t){}_rowClick(t){this.dispatchEvent(new CustomEvent("row-click",{detail:{item:t},bubbles:!0,composed:!0}))}_calculateConnectors(){if(!this.showConnectors||!this.items.length){this._connectors=[];return}const t=[];this.items.forEach((e,s)=>{if(!e.links||!e.links.length)return;const i=vt/2+s*vt;e.links.forEach(r=>{if(!this.items.find(d=>d.id===r.to))return;const h=this.items.findIndex(d=>d.id===r.to);if(h===-1)return;const l=vt/2+h*vt;t.push({startX:this._createScalable(new Date(r.fromDate)),startY:i,endX:this._createScalable(new Date(r.toDate)),endY:l})})}),this._connectors=t}render(){return E.html`
      <div class="gantt-container">
        <div class="gantt-legend">
          <div class="gantt-legend-header">Tasks</div>
          <div class="gantt-legend-content">
            ${this.items.map(t=>E.html`
                <div class="gantt-row" @click=${()=>this._rowClick(t)}>
                  <div class="gantt-row-title" title=${t.title}>
                    ${t.title}
                  </div>
                </div>
              `)}
          </div>
        </div>

        <div class="gantt-diagram">
          <div class="gantt-actions">
            <div class="gantt-actions-left">
              Start: ${this._startDate.toLocaleDateString()}
            </div>
            <div class="gantt-actions-center">
              <button @click=${this._scaleDown} title="Zoom Out">▣</button>
              <button @click=${this._scaleUp} title="Zoom In">◼</button>
            </div>
            <div class="gantt-actions-right">
              End: ${this._finishDate.toLocaleDateString()}
            </div>
          </div>

          <div class="gantt-diagram-header">
            ${this._rulers.map(t=>E.html`
                <div
                  class="gantt-ruler"
                  style=${j({left:`${t.pos}px`})}
                >
                  <span class="gantt-ruler-text">${t.date}</span>
                </div>
              `)}
          </div>

          <div
            class="gantt-content"
            @scroll=${this._handleScroll}
            @mousedown=${this._handleMouseDown}
            @mouseup=${this._handleMouseUp}
            @mouseleave=${this._handleMouseUp}
            @mousemove=${this._handleMouseMove}
          >
            <div
              style=${j({width:`${this._rulers.length>0?this._rulers[this._rulers.length-1].pos+100:0}px`})}
            >
              ${this._rulers.map(t=>E.html`
                  <div
                    class="gantt-ruler"
                    style=${j({left:`${t.pos}px`})}
                  ></div>
                `)}
              ${this.items.map(t=>{var e;return E.html`
                  <div class="gantt-row" @click=${()=>this._rowClick(t)}>
                    <div
                      class="gantt-line"
                      style=${j({left:`${this._createScalable(new Date(t.start))}px`,width:`${(new Date(t.end).getTime()-new Date(t.start).getTime())/Z*this._scale}px`,backgroundColor:t.color||"#4CAF50"})}
                      title=${`${t.title}: ${new Date(t.start).toLocaleDateString()} - ${new Date(t.end).toLocaleDateString()}`}
                    >
                      ${t.title}
                    </div>

                    ${(e=t.markers)==null?void 0:e.map(s=>E.html`
                        <div
                          class="gantt-marker"
                          style=${j({left:`${this._createScalable(new Date(s.date))}px`,backgroundColor:s.color||"#333"})}
                        >
                          <div class="gantt-marker-text">${s.text}</div>
                        </div>
                      `)}
                  </div>
                `})}

              <div
                class="gantt-current-day"
                style=${j({left:`${this._getCurrentDayPosition()}px`})}
                title=${`Current day: ${new Date().toLocaleDateString()}`}
              ></div>

              ${this.showConnectors?this._renderConnectors():""}
            </div>
          </div>
        </div>
      </div>
    `}_renderConnectors(){return this._connectors.length?E.html`
      ${this._connectors.map(t=>E.html`
          <div
            class="gantt-connector-endpoint gantt-connector-endpoint--start"
            style=${j({left:`${t.startX}px`,top:`${t.startY}px`})}
          ></div>
          <div
            class="gantt-connector-endpoint"
            style=${j({left:`${t.endX}px`,top:`${t.endY}px`})}
          ></div>
          <gantt-connector-line .points=${t}></gantt-connector-line>
        `)}
    `:E.html``}},o.GanttChart.styles=E.css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .gantt-container {
      display: flex;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    .gantt-legend {
      width: 200px;
      border-right: 1px solid #ddd;
      background-color: #f5f5f5;
    }

    .gantt-legend-header {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      padding-top: 34px;
      background-color: #e0e0e0;
      font-weight: bold;
    }

    .gantt-legend-content {
      overflow-y: auto;
    }

    .gantt-row {
      position: relative;
      height: 35px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }

    .gantt-row:hover {
      background-color: #f0f0f0;
    }

    .gantt-row-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .gantt-diagram {
      flex: 1;
      overflow: auto;
    }

    .gantt-diagram-header {
      height: 32px;
      background-color: #e0e0e0;
      position: relative;
    }

    .gantt-ruler {
      position: absolute;
      height: 100%;
      border-left: 1px dotted #ccc;
    }

    .gantt-ruler-text {
      padding: 0 5px;
      font-size: 12px;
    }

    .gantt-content {
      position: relative;
    }

    .gantt-line {
      position: absolute;
      height: 25px;
      bottom: 5px;
      background-color: #4caf50;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 25px;
      padding: 0 5px;
      color: white;
      font-size: 12px;
    }

    .gantt-marker {
      position: absolute;
      width: 2px;
      height: 35px;
      background-color: #333;
    }

    .gantt-marker-text {
      position: absolute;
      top: -20px;
      left: -50px;
      width: 100px;
      text-align: center;
      font-size: 10px;
    }

    .gantt-current-day {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: #f44336;
    }

    .gantt-actions {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }

    .gantt-actions-center {
      display: flex;
      gap: 5px;
    }

    button {
      padding: 5px 10px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .gantt-connector-endpoint {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 1px solid black;
      border-radius: 50%;
      margin-top: -5px;
      margin-left: -5px;
    }

    .gantt-connector-endpoint--start {
      background-color: black;
    }
  `,T([u({type:Array})],o.GanttChart.prototype,"items",2),T([u({type:Boolean})],o.GanttChart.prototype,"showConnectors",2),T([u({type:Number})],o.GanttChart.prototype,"scaleIndex",2),T([u({type:String})],o.GanttChart.prototype,"titleField",2),T([u({type:String})],o.GanttChart.prototype,"startField",2),T([u({type:String})],o.GanttChart.prototype,"endField",2),T([u({type:Array})],o.GanttChart.prototype,"markerFields",2),T([u({type:String})],o.GanttChart.prototype,"linksField",2),T([u({type:String})],o.GanttChart.prototype,"keyField",2),T([x()],o.GanttChart.prototype,"_scale",2),T([x()],o.GanttChart.prototype,"_getNextDate",2),T([x()],o.GanttChart.prototype,"_startDate",2),T([x()],o.GanttChart.prototype,"_finishDate",2),T([x()],o.GanttChart.prototype,"_minDate",2),T([x()],o.GanttChart.prototype,"_maxDate",2),T([x()],o.GanttChart.prototype,"_rulers",2),T([x()],o.GanttChart.prototype,"_isMouseDown",2),T([x()],o.GanttChart.prototype,"_mouseDownPageX",2),T([x()],o.GanttChart.prototype,"_connectors",2),o.GanttChart=T([tt("gantt-chart")],o.GanttChart),Object.defineProperty(o,Symbol.toStringTag,{value:"Module"})});
