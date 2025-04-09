import { css as Xt, LitElement as Yt, html as H } from "lit";
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = (s) => (t, e) => {
  e !== void 0 ? e.addInitializer(() => {
    customElements.define(s, t);
  }) : customElements.define(s, t);
};
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const $t = globalThis, Mt = $t.ShadowRoot && ($t.ShadyCSS === void 0 || $t.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Zt = Symbol(), Ut = /* @__PURE__ */ new WeakMap();
let oe = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== Zt) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (Mt && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = Ut.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && Ut.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ae = (s) => new oe(typeof s == "string" ? s : s + "", void 0, Zt), ne = (s, t) => {
  if (Mt) s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else for (const e of t) {
    const i = document.createElement("style"), r = $t.litNonce;
    r !== void 0 && i.setAttribute("nonce", r), i.textContent = e.cssText, s.appendChild(i);
  }
}, Bt = Mt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules) e += i.cssText;
  return ae(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: he, defineProperty: le, getOwnPropertyDescriptor: ce, getOwnPropertyNames: de, getOwnPropertySymbols: pe, getPrototypeOf: ue } = Object, Y = globalThis, Ht = Y.trustedTypes, ge = Ht ? Ht.emptyScript : "", St = Y.reactiveElementPolyfillSupport, ut = (s, t) => s, bt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ge : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Rt = (s, t) => !he(s, t), Vt = { attribute: !0, type: String, converter: bt, reflect: !1, hasChanged: Rt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), Y.litPropertyMetadata ?? (Y.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class ct extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Vt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), r = this.getPropertyDescriptor(t, i, e);
      r !== void 0 && le(this.prototype, t, r);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: r, set: o } = ce(this.prototype, t) ?? { get() {
      return this[e];
    }, set(a) {
      this[e] = a;
    } };
    return { get() {
      return r == null ? void 0 : r.call(this);
    }, set(a) {
      const h = r == null ? void 0 : r.call(this);
      o.call(this, a), this.requestUpdate(t, h, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Vt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(ut("elementProperties"))) return;
    const t = ue(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(ut("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(ut("properties"))) {
      const e = this.properties, i = [...de(e), ...pe(e)];
      for (const r of i) this.createProperty(r, e[r]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0) for (const [i, r] of e) this.elementProperties.set(i, r);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const r = this._$Eu(e, i);
      r !== void 0 && this._$Eh.set(r, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const r of i) e.unshift(Bt(r));
    } else t !== void 0 && e.push(Bt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const i of e.keys()) this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ne(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EC(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), r = this.constructor._$Eu(t, i);
    if (r !== void 0 && i.reflect === !0) {
      const a = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : bt).toAttribute(e, i.type);
      this._$Em = t, a == null ? this.removeAttribute(r) : this.setAttribute(r, a), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, r = i._$Eh.get(t);
    if (r !== void 0 && this._$Em !== r) {
      const a = i.getPropertyOptions(r), h = typeof a.converter == "function" ? { fromAttribute: a.converter } : ((o = a.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? a.converter : bt;
      this._$Em = r, this[r] = h.fromAttribute(e, a.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? Rt)(this[t], e)) return;
      this.P(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var i;
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, a] of this._$Ep) this[o] = a;
        this._$Ep = void 0;
      }
      const r = this.constructor.elementProperties;
      if (r.size > 0) for (const [o, a] of r) a.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], a);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((r) => {
        var o;
        return (o = r.hostUpdate) == null ? void 0 : o.call(r);
      }), this.update(e)) : this._$EU();
    } catch (r) {
      throw t = !1, this._$EU(), r;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var r;
      return (r = i.hostUpdated) == null ? void 0 : r.call(i);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
ct.elementStyles = [], ct.shadowRootOptions = { mode: "open" }, ct[ut("elementProperties")] = /* @__PURE__ */ new Map(), ct[ut("finalized")] = /* @__PURE__ */ new Map(), St == null || St({ ReactiveElement: ct }), (Y.reactiveElementVersions ?? (Y.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const ye = { attribute: !0, type: String, converter: bt, reflect: !1, hasChanged: Rt }, fe = (s = ye, t, e) => {
  const { kind: i, metadata: r } = e;
  let o = globalThis.litPropertyMetadata.get(r);
  if (o === void 0 && globalThis.litPropertyMetadata.set(r, o = /* @__PURE__ */ new Map()), o.set(e.name, s), i === "accessor") {
    const { name: a } = e;
    return { set(h) {
      const n = t.get.call(this);
      t.set.call(this, h), this.requestUpdate(a, n, s);
    }, init(h) {
      return h !== void 0 && this.P(a, void 0, s), h;
    } };
  }
  if (i === "setter") {
    const { name: a } = e;
    return function(h) {
      const n = this[a];
      t.call(this, h), this.requestUpdate(a, n, s);
    };
  }
  throw Error("Unsupported decorator location: " + i);
};
function d(s) {
  return (t, e) => typeof e == "object" ? fe(s, t, e) : ((i, r, o) => {
    const a = r.hasOwnProperty(o);
    return r.constructor.createProperty(o, a ? { ...i, wrapped: !0 } : i), a ? Object.getOwnPropertyDescriptor(r, o) : void 0;
  })(s, t, e);
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
function C(s) {
  return d({ ...s, state: !0, attribute: !1 });
}
const Nt = class Nt {
  static createSVG(t, e, i) {
    const r = document.createElementNS(this.SVG_NS, "svg");
    return r.setAttribute("width", t.toString()), r.setAttribute("height", e.toString()), i && r.setAttribute("viewBox", i), r;
  }
  static createGroup(t) {
    const e = document.createElementNS(this.SVG_NS, "g");
    return t && e.setAttribute("transform", t), e;
  }
  static createText(t, e) {
    const i = document.createElementNS(this.SVG_NS, "text");
    return i.setAttribute("x", e.x.toString()), i.setAttribute("y", e.y.toString()), e.anchor && i.setAttribute("text-anchor", e.anchor), e.transform && i.setAttribute("transform", e.transform), e.dy && i.setAttribute("dy", e.dy), e.fontSize && (i.style.fontSize = e.fontSize), e.fill && (i.style.fill = e.fill), e.stroke && (i.style.stroke = e.stroke), e.strokeWidth && i.setAttribute("stroke-width", e.strokeWidth), i.textContent = t, i;
  }
  static createLine(t) {
    const e = document.createElementNS(this.SVG_NS, "line");
    return e.setAttribute("x1", t.x1.toString()), e.setAttribute("y1", t.y1.toString()), e.setAttribute("x2", t.x2.toString()), e.setAttribute("y2", t.y2.toString()), t.stroke && e.setAttribute("stroke", t.stroke), t.strokeWidth && e.setAttribute("stroke-width", t.strokeWidth), e;
  }
  static createRect(t) {
    const e = document.createElementNS(this.SVG_NS, "rect");
    return e.setAttribute("x", t.x.toString()), e.setAttribute("y", t.y.toString()), e.setAttribute("width", t.width.toString()), e.setAttribute("height", t.height.toString()), t.fill && e.setAttribute("fill", t.fill), t.stroke && e.setAttribute("stroke", t.stroke), t.strokeWidth && e.setAttribute("stroke-width", t.strokeWidth), e;
  }
  static createPath(t) {
    const e = document.createElementNS(this.SVG_NS, "path");
    return e.setAttribute("d", t.d), t.fill && e.setAttribute("fill", t.fill), t.stroke && e.setAttribute("stroke", t.stroke), t.strokeWidth && e.setAttribute("stroke-width", t.strokeWidth), e;
  }
  static createCircle(t) {
    const e = document.createElementNS(this.SVG_NS, "circle");
    return e.setAttribute("cx", t.cx.toString()), e.setAttribute("cy", t.cy.toString()), e.setAttribute("r", t.r.toString()), t.fill && e.setAttribute("fill", t.fill), t.stroke && e.setAttribute("stroke", t.stroke), t.strokeWidth && e.setAttribute("stroke-width", t.strokeWidth), e;
  }
};
Nt.SVG_NS = "http://www.w3.org/2000/svg";
let l = Nt;
var me = Object.defineProperty, xe = Object.getOwnPropertyDescriptor, O = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? xe(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && me(t, e, r), r;
};
let D = class extends Yt {
  constructor() {
    super(...arguments), this.width = 600, this.height = 400, this.title = "", this.data = [], this.margin = {
      top: 20,
      right: 20,
      bottom: 80,
      left: 60
    }, this.colors = [
      "7, 171, 160",
      "218, 60, 120",
      "126, 52, 157",
      "0, 119, 192",
      "231, 76, 60",
      "14, 172, 81",
      "241, 137, 45",
      "227, 114, 75",
      "174, 124, 91",
      "108, 122, 137",
      "117, 133, 134",
      "112, 112, 112"
    ], this.showLegend = !0, this.showValues = !0, this.hoverEffects = !0, this.animationDuration = 800, this.animationEnabled = !0, this.isFirstRender = !0, this.svgElement = null;
  }
  /**
   * Returns the fill color for a chart element based on its index.
   * @param index - The index of the element in the data array
   * @returns A color string in rgba format with 0.2 opacity
   */
  getColor(s) {
    return `rgba(${this.colors[s % this.colors.length]}, 0.2)`;
  }
  /**
   * Returns the hover color for a chart element based on its index.
   * @param index - The index of the element in the data array
   * @returns A color string in rgba format with 0.4 opacity
   */
  getHoverColor(s) {
    return `rgba(${this.colors[s % this.colors.length]}, 0.4)`;
  }
  /**
   * Returns the border color for a chart element based on its index.
   * @param index - The index of the element in the data array
   * @returns A color string in rgba format with 1.0 opacity
   */
  getBorderColor(s) {
    return `rgba(${this.colors[s % this.colors.length]}, 1)`;
  }
  /**
   * Creates the render root element and adds necessary styles.
   * @returns The render root element
   */
  createRenderRoot() {
    const s = super.createRenderRoot(), t = document.createElement("style");
    return t.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `, s.appendChild(t), s;
  }
  /**
   * Lifecycle method called after the component is first updated.
   * Initializes the chart by creating the SVG element and setting up the title.
   */
  firstUpdated() {
    this.initializeChart();
  }
  get isAnimationEnabled() {
    return this.animationEnabled && this.isFirstRender;
  }
  /**
   * Initializes the chart by creating the SVG element and setting up the title.
   * This method is called after the component is first updated and can be
   * overridden by child classes to add additional initialization logic.
   */
  initializeChart() {
    var t;
    const s = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".chart-container");
    if (s && (s.innerHTML = "", this.svgElement = l.createSVG(
      this.width,
      this.height,
      `0 0 ${this.width} ${this.height}`
    ), s.appendChild(this.svgElement), this.title)) {
      const e = l.createText(this.title, {
        x: this.width / 2,
        y: this.margin.top / 2,
        anchor: "middle",
        fontSize: "16px"
      });
      this.svgElement.appendChild(e);
    }
  }
  /**
   * Renders the chart container element.
   * @returns The rendered HTML template
   */
  render() {
    return H` <div class="chart-container"></div> `;
  }
};
D.styles = Xt`
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
  `;
O([
  d({ type: Number })
], D.prototype, "width", 2);
O([
  d({ type: Number })
], D.prototype, "height", 2);
O([
  d({ type: String })
], D.prototype, "title", 2);
O([
  d({ type: Array })
], D.prototype, "data", 2);
O([
  d({ type: Object })
], D.prototype, "margin", 2);
O([
  d({ type: Array })
], D.prototype, "colors", 2);
O([
  d({ type: Boolean })
], D.prototype, "showLegend", 2);
O([
  d({ type: Boolean })
], D.prototype, "showValues", 2);
O([
  d({ type: Boolean })
], D.prototype, "hoverEffects", 2);
O([
  d({ type: Number })
], D.prototype, "animationDuration", 2);
O([
  d({ type: Boolean })
], D.prototype, "animationEnabled", 2);
O([
  C()
], D.prototype, "isFirstRender", 2);
O([
  C()
], D.prototype, "svgElement", 2);
D = O([
  nt("base-chart")
], D);
var ve = Object.defineProperty, $e = Object.getOwnPropertyDescriptor, F = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? $e(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && ve(t, e, r), r;
};
let V = class extends D {
  constructor() {
    super(...arguments), this.xKey = "category", this.yKey = "value", this.color = "#1f77b4", this.showButtons = !0, this.limit = 10, this.offset = 0, this.processedData = [], this.datasets = [], this.maxValue = 0, this.hoveredBar = null;
  }
  /**
   * Lifecycle method called after the component is first updated.
   * Processes the data and draws the chart.
   */
  firstUpdated() {
    super.firstUpdated(), this.processData(), this.drawChart();
  }
  /**
   * Checks if the chart has multiple datasets.
   * @returns True if the chart has multiple datasets, false otherwise
   */
  get hasMultipleDatasets() {
    return this.datasets && this.datasets.length;
  }
  /**
   * Processes the raw data into a format suitable for rendering.
   * Handles both single and multiple dataset scenarios.
   */
  processData() {
    if (this.data.length)
      if (this.isFirstRender = !0, this.hasMultipleDatasets) {
        const s = [];
        [...new Set(this.data.map((e) => e[this.xKey]))].forEach((e) => {
          const i = this.data.find(
            (a) => a[this.xKey] === e
          ), r = this.datasets.map(
            (a) => i[a]
          ), o = Math.max(...r);
          this.maxValue = Math.max(this.maxValue, o), s.push({
            label: e,
            data: r,
            colors: this.datasets.map((a, h) => this.getColor(h)),
            hoverColors: this.datasets.map((a, h) => this.getHoverColor(h)),
            borderColors: this.datasets.map((a, h) => this.getBorderColor(h))
          });
        }), this.processedData = s.slice(
          this.offset,
          this.offset + this.limit
        );
      } else {
        this.maxValue = 0;
        const s = this.data.map((t, e) => {
          const i = t[this.yKey];
          return this.maxValue = Math.max(this.maxValue, i), {
            label: t[this.xKey],
            data: [i],
            color: this.getColor(e),
            hoverColor: this.getHoverColor(e)
          };
        });
        this.processedData = s.slice(
          this.offset,
          this.offset + this.limit
        );
      }
  }
  prev() {
    this.offset >= this.limit && (this.offset -= this.limit, this.processData(), this.drawChart());
  }
  next() {
    this.offset += this.limit, this.processData(), this.drawChart();
  }
  handleBarHover(s) {
    this.hoverEffects && (this.hoveredBar = s, this.updateBarColors());
  }
  handleBarLeave() {
    this.hoverEffects && (this.hoveredBar = null, this.updateBarColors());
  }
  updateBarColors() {
    if (!this.renderRoot) return;
    const s = this.renderRoot.querySelector("svg");
    if (!s) return;
    s.querySelectorAll("rect").forEach((e, i) => {
      const r = Math.floor(
        i / (this.hasMultipleDatasets ? this.datasets.length : 1)
      );
      if (this.hoveredBar === r)
        if (this.hasMultipleDatasets) {
          const o = i % this.datasets.length;
          e.setAttribute(
            "fill",
            this.processedData[r].hoverColors[o]
          );
        } else
          e.setAttribute("fill", this.processedData[r].hoverColor);
      else if (this.hasMultipleDatasets) {
        const o = i % this.datasets.length;
        e.setAttribute(
          "fill",
          this.processedData[r].colors[o]
        );
      } else
        e.setAttribute("fill", this.processedData[r].color);
    });
  }
  drawChart() {
    if (!this.renderRoot || !this.processedData.length) return;
    const s = this.renderRoot.querySelector("svg");
    if (!s) return;
    s.innerHTML = "";
    const t = this.width - this.margin.left - this.margin.right, e = this.height - this.margin.top - this.margin.bottom, i = l.createGroup(
      `translate(${this.margin.left},${this.margin.top})`
    );
    s.appendChild(i);
    const r = (c) => c / this.processedData.length * t, o = (c) => c / this.maxValue * e, a = l.createGroup(`translate(0,${e})`);
    i.appendChild(a);
    const h = l.createLine({
      x1: 0,
      y1: 0,
      x2: t,
      y2: 0,
      stroke: "#ddd"
    });
    a.appendChild(h);
    const n = l.createGroup();
    i.appendChild(n);
    const u = l.createLine({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: e,
      stroke: "#ddd"
    });
    n.appendChild(u);
    const p = 5;
    for (let c = 0; c <= p; c++) {
      const m = e - c * e / p, $ = this.maxValue * c / p, x = l.createText($.toFixed(0), {
        x: -5,
        y: m,
        anchor: "end"
      });
      n.appendChild(x);
      const L = l.createLine({
        x1: 0,
        y1: m,
        x2: t,
        y2: m,
        stroke: "#ddd"
      });
      n.appendChild(L);
    }
    this.hasMultipleDatasets ? (this.processedData.forEach((c, m) => {
      const $ = r(m), x = r(1) * 0.8, L = this.datasets.length, T = x / L;
      this.datasets.forEach((f, g) => {
        const S = c.data[g], _ = o(S), b = $ + g * T, v = l.createRect({
          x: b,
          y: e,
          width: T,
          height: 0,
          fill: this.hoveredBar === m ? c.hoverColors[g] : c.colors[g],
          stroke: c.borderColors[g],
          strokeWidth: "1"
        });
        if (this.isAnimationEnabled && (v.style.transition = `height ${this.animationDuration}ms ease-out, y ${this.animationDuration}ms ease-out`), this.hoverEffects && (v.addEventListener(
          "mouseenter",
          () => this.handleBarHover(m)
        ), v.addEventListener("mouseleave", () => this.handleBarLeave())), i.appendChild(v), setTimeout(() => {
          v.setAttribute("height", _.toString()), v.setAttribute("y", (e - _).toString());
        }, 50), this.showValues) {
          const k = l.createText(S.toFixed(0), {
            x: b + T / 2,
            y: e - _ - 5,
            // Fixed: Correct label position
            anchor: "middle"
          });
          this.isAnimationEnabled ? (k.style.transition = `opacity ${this.animationDuration}ms ease-out`, k.style.opacity = "0") : k.style.opacity = "1", i.appendChild(k), this.isAnimationEnabled && setTimeout(() => {
            k.style.opacity = "1";
          }, this.animationDuration / 2);
        }
      });
      const y = l.createText(c.label, {
        x: $ + x / 2,
        y: 20,
        anchor: "middle"
      });
      a.appendChild(y);
    }), this.showLegend && this.renderLegend(i, t)) : this.processedData.forEach((c, m) => {
      const $ = r(m), x = r(1) * 0.8, L = c.data[0], T = o(L), y = l.createRect({
        x: $,
        y: e,
        width: x,
        height: 0,
        fill: this.hoveredBar === m ? c.hoverColor : c.color,
        stroke: this.getBorderColor(m),
        strokeWidth: "1"
      });
      if (this.isAnimationEnabled && (y.style.transition = `height ${this.animationDuration}ms ease-out, y ${this.animationDuration}ms ease-out`), this.hoverEffects && (y.addEventListener("mouseenter", () => this.handleBarHover(m)), y.addEventListener("mouseleave", () => this.handleBarLeave())), i.appendChild(y), setTimeout(() => {
        y.setAttribute("height", T.toString()), y.setAttribute("y", (e - T).toString());
      }, 50), this.showValues) {
        const g = l.createText(L.toFixed(0), {
          x: $ + x / 2,
          y: e - T - 5,
          anchor: "middle"
        });
        this.isAnimationEnabled ? (g.style.transition = `opacity ${this.animationDuration}ms ease-out`, g.style.opacity = "0") : g.style.opacity = "1", i.appendChild(g), this.isAnimationEnabled && setTimeout(() => {
          g.style.opacity = "1";
        }, this.animationDuration / 2);
      }
      const f = l.createText(c.label, {
        x: $ + x / 2,
        y: 20,
        anchor: "middle"
      });
      a.appendChild(f);
    }), this.isFirstRender = !1;
  }
  renderLegend(s, t) {
    const e = l.createGroup(
      `translate(${t / 2},${this.height - this.margin.bottom + 25})`
    );
    s.appendChild(e), this.datasets.forEach((i, r) => {
      const o = l.createGroup(
        `translate(${r * 100 - this.datasets.length * 50},0)`
      ), a = l.createRect({
        x: 0,
        y: -7.5,
        width: 15,
        height: 15,
        fill: this.getColor(r),
        stroke: this.getBorderColor(r),
        strokeWidth: "1"
      });
      o.appendChild(a);
      const h = l.createText(
        i.label || `Dataset ${r + 1}`,
        {
          x: 20,
          y: 4,
          fontSize: "12px"
        }
      );
      o.appendChild(h), e.appendChild(o);
    });
  }
  render() {
    return H`
      <div class="chart-container">
        ${this.showButtons ? H`
              <div class="chart-controls">
                <button
                  @click=${this.prev}
                  ?disabled=${this.offset < this.limit}
                >
                  Previous
                </button>
                <button
                  @click=${this.next}
                  ?disabled=${this.offset + this.limit >= this.datasets.length}
                >
                  Next
                </button>
              </div>
            ` : ""}
      </div>
    `;
  }
};
F([
  d({ type: String })
], V.prototype, "xKey", 2);
F([
  d({ type: String })
], V.prototype, "yKey", 2);
F([
  d({ type: String })
], V.prototype, "color", 2);
F([
  d({ type: Boolean })
], V.prototype, "showButtons", 2);
F([
  d({ type: Number })
], V.prototype, "limit", 2);
F([
  C()
], V.prototype, "offset", 2);
F([
  C()
], V.prototype, "processedData", 2);
F([
  C()
], V.prototype, "datasets", 2);
F([
  C()
], V.prototype, "maxValue", 2);
F([
  C()
], V.prototype, "hoveredBar", 2);
V = F([
  nt("bar-chart")
], V);
var be = Object.defineProperty, _e = Object.getOwnPropertyDescriptor, Z = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? _e(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && be(t, e, r), r;
};
let j = class extends D {
  constructor() {
    super(...arguments), this.valueKey = "value", this.labelKey = "label", this.innerRadius = 0, this.showPercentages = !0, this.hoveredSegment = null, this.total = 0, this.labelPositions = [];
  }
  /**
   * Lifecycle method called after the component is first updated.
   * Draws the pie chart.
   */
  firstUpdated() {
    super.firstUpdated(), this.drawChart();
  }
  /**
   * Lifecycle method called when component properties change.
   * Re-draws the chart if the data has changed.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  updated(s) {
    super.updated(s), s.has("data") && (this.isFirstRender = !0, this.drawChart());
  }
  /**
   * Draws the pie chart by creating SVG elements for each segment.
   * Calculates segment angles, positions, and adds labels.
   */
  drawChart() {
    if (!this.svgElement || !this.data.length) return;
    this.svgElement.innerHTML = "";
    const s = this.width - this.margin.left - this.margin.right, t = this.height - this.margin.top - this.margin.bottom, e = Math.min(s, t) / 2, i = this.width / 2, r = this.height / 2, o = l.createGroup(`translate(${i},${r})`);
    this.svgElement.appendChild(o), this.total = this.data.reduce((h, n) => h + n[this.valueKey], 0);
    let a = 0;
    if (this.labelPositions = [], this.data.forEach((h, n) => {
      const u = h[this.valueKey], p = u / this.total * 2 * Math.PI, c = a + p, m = this.polarToCartesian(e, a), $ = this.polarToCartesian(e, c), x = this.polarToCartesian(this.innerRadius, a), L = this.polarToCartesian(this.innerRadius, c), T = p > Math.PI ? 1 : 0, y = [
        "M",
        m.x,
        m.y,
        "A",
        e,
        e,
        0,
        T,
        1,
        $.x,
        $.y,
        "L",
        L.x,
        L.y,
        "A",
        this.innerRadius,
        this.innerRadius,
        0,
        T,
        0,
        x.x,
        x.y,
        "Z"
      ].join(" "), f = this.hoveredSegment === n, g = f ? e * 1.05 : e, S = f ? this.innerRadius * 1.05 : this.innerRadius, _ = this.polarToCartesian(g, a), b = this.polarToCartesian(g, c), v = this.polarToCartesian(
        S,
        a
      ), k = this.polarToCartesian(S, c), U = [
        "M",
        _.x,
        _.y,
        "A",
        g,
        g,
        0,
        T,
        1,
        b.x,
        b.y,
        "L",
        k.x,
        k.y,
        "A",
        S,
        S,
        0,
        T,
        0,
        v.x,
        v.y,
        "Z"
      ].join(" "), N = l.createPath({
        d: f ? U : y,
        fill: f ? this.getHoverColor(n) : this.getColor(n),
        stroke: this.getBorderColor(n),
        strokeWidth: "1"
      });
      N.style.transition = `transform ${this.animationDuration}ms ease-out`, N.style.transformOrigin = "0 0", this.isAnimationEnabled && (N.style.transform = "scale(0)", N.style.opacity = "0"), this.hoverEffects && (N.addEventListener("mouseenter", () => this.handleSegmentHover(n)), N.addEventListener("mouseleave", () => this.handleSegmentLeave())), o.appendChild(N), this.isAnimationEnabled && requestAnimationFrame(() => {
        N.style.transform = "scale(1)", N.style.opacity = "1";
      });
      const J = a + p / 2, W = e * 0.7, B = this.polarToCartesian(W, J);
      if (this.labelPositions[n] = { x: B.x, y: B.y }, p > 0.1 || f) {
        const A = l.createGroup(
          `translate(${B.x},${B.y})`
        ), Q = l.createText(h[this.labelKey], {
          x: 0,
          y: 0,
          anchor: "middle",
          dy: ".35em",
          fontSize: f ? "16px" : "12px"
        });
        if (Q.style.fill = this.getBorderColor(n), A.appendChild(Q), this.showValues && (p > 0.2 || f)) {
          const xt = l.createText(u.toString(), {
            x: 0,
            y: 15,
            anchor: "middle",
            dy: ".35em",
            fontSize: f ? "14px" : "10px"
          });
          xt.style.fill = this.getBorderColor(n), A.appendChild(xt);
        }
        if (this.showPercentages && (p > 0.2 || f)) {
          const xt = (u / this.total * 100).toFixed(1), Ot = l.createText(`${xt}%`, {
            x: 0,
            y: 30,
            anchor: "middle",
            dy: ".35em",
            fontSize: f ? "14px" : "10px"
          });
          Ot.style.fill = this.getBorderColor(n), A.appendChild(Ot);
        }
        const z = B.x, G = B.y, ht = Math.sqrt(z * z + G * G), rt = z / ht, mt = G / ht, lt = f ? 0.5 : 0.1, ie = B.x + rt * e * lt, re = B.y + mt * e * lt;
        A.setAttribute("transform", `translate(${ie},${re})`), A.style.transition = `transform ${this.animationDuration}ms ease-out`, this.isAnimationEnabled && (A.style.opacity = "0", A.style.transition = `transform ${this.animationDuration}ms ease-out, opacity ${this.animationDuration}ms ease-out`), o.appendChild(A), this.isAnimationEnabled && requestAnimationFrame(() => {
          A.style.opacity = "1";
        });
      }
      a = c;
    }), this.showLegend) {
      const h = l.createGroup(
        `translate(${s / 2},${t / 2 + e + 30})`
      );
      this.data.forEach((n, u) => {
        const p = l.createGroup(
          `translate(${u * 100 - this.data.length * 50},0)`
        ), c = l.createRect({
          x: 0,
          y: 0,
          width: 15,
          height: 15,
          fill: this.getColor(u),
          stroke: this.getBorderColor(u),
          strokeWidth: "1"
        });
        p.appendChild(c);
        const m = l.createText(n[this.labelKey], {
          x: 20,
          y: 12,
          fontSize: "12px"
        });
        m.style.fill = this.getBorderColor(u), p.appendChild(m), h.appendChild(p);
      }), o.appendChild(h);
    }
    this.isFirstRender && setTimeout(() => {
      this.isFirstRender = !1;
    }, this.animationDuration);
  }
  /**
   * Handles mouse hover events on pie segments.
   * Updates the hovered segment and applies visual effects.
   *
   * @param index - The index of the hovered segment
   */
  handleSegmentHover(s) {
    this.hoverEffects && (this.hoveredSegment = s, this.drawChart());
  }
  /**
   * Handles mouse leave events on pie segments.
   * Clears the hovered segment and removes visual effects.
   */
  handleSegmentLeave() {
    this.hoverEffects && (this.hoveredSegment = null, this.drawChart());
  }
  /**
   * Converts polar coordinates to cartesian coordinates.
   * Used for positioning segment labels.
   *
   * @param radius - The distance from the center
   * @param angle - The angle in radians
   * @returns An object with x and y coordinates
   */
  polarToCartesian(s, t) {
    return {
      x: s * Math.cos(t - Math.PI / 2),
      y: s * Math.sin(t - Math.PI / 2)
    };
  }
};
Z([
  d({ type: String })
], j.prototype, "valueKey", 2);
Z([
  d({ type: String })
], j.prototype, "labelKey", 2);
Z([
  d({ type: Number })
], j.prototype, "innerRadius", 2);
Z([
  d({ type: Boolean })
], j.prototype, "showPercentages", 2);
Z([
  C()
], j.prototype, "hoveredSegment", 2);
Z([
  C()
], j.prototype, "total", 2);
Z([
  C()
], j.prototype, "labelPositions", 2);
j = Z([
  nt("pie-chart")
], j);
var Ae = Object.defineProperty, Ce = Object.getOwnPropertyDescriptor, K = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ce(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && Ae(t, e, r), r;
};
let I = class extends D {
  constructor() {
    super(...arguments), this.xKey = "x", this.yKey = "y", this.lineWidth = 2, this.showPoints = !0, this.pointRadius = 4, this.showArea = !1, this.hoveredPoint = null, this.datasets = [];
  }
  /**
   * Returns the fill color for the area under a line based on its index.
   * @param index - The index of the line in the dataset
   * @returns A color string in rgba format with 0.1 opacity
   */
  getAreaColor(s) {
    return `rgba(${this.colors[s % this.colors.length]}, 0.1)`;
  }
  /**
   * Lifecycle method called after the component is first updated.
   * Processes the data and draws the chart.
   */
  firstUpdated() {
    super.firstUpdated(), this.processData(), this.drawChart();
  }
  /**
   * Lifecycle method called when component properties change.
   * Re-processes data and redraws the chart if relevant properties have changed.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  updated(s) {
    super.updated(s), (s.has("data") || s.has("color") || s.has("lineWidth") || s.has("showPoints") || s.has("pointRadius") || s.has("showArea")) && (this.isFirstRender = !0, this.processData(), this.drawChart());
  }
  processData() {
    this.data.length && (Object.prototype.hasOwnProperty.call(this.data[0], "data") ? this.datasets = this.data : this.datasets = [
      {
        label: this.yKey,
        color: this.colors[0],
        data: this.data
      }
    ]);
  }
  drawChart() {
    if (!this.renderRoot || !this.datasets.length) return;
    const s = this.renderRoot.querySelector("svg");
    if (!s) return;
    s.innerHTML = "";
    const t = this.width - this.margin.left - this.margin.right, e = this.height - this.margin.top - this.margin.bottom, i = l.createGroup(
      `translate(${this.margin.left},${this.margin.top})`
    );
    s.appendChild(i);
    const r = this.datasets.flatMap((y) => y.data), o = r.map((y) => y[this.xKey]), a = r.map((y) => y[this.yKey]), h = Math.min(...o), n = Math.max(...o), u = Math.min(...a), p = Math.max(...a), c = (y) => (y - h) / (n - h) * t, m = (y) => (y - u) / (p - u) * e, $ = l.createGroup(`translate(0,${e})`);
    i.appendChild($);
    const x = 5;
    for (let y = 0; y <= x; y++) {
      const f = y * t / x, g = h + y * (n - h) / x, S = l.createText(g.toFixed(1), {
        x: f,
        y: 20,
        anchor: "middle"
      });
      $.appendChild(S);
      const _ = l.createLine({
        x1: f,
        y1: 0,
        x2: f,
        y2: 5,
        stroke: "#ddd"
      });
      $.appendChild(_);
    }
    const L = l.createGroup();
    i.appendChild(L);
    const T = 5;
    for (let y = 0; y <= T; y++) {
      const f = e - y * e / T, g = u + y * (p - u) / T, S = l.createText(g.toFixed(1), {
        x: -5,
        y: f,
        anchor: "end"
      });
      L.appendChild(S);
      const _ = l.createLine({
        x1: 0,
        y1: f,
        x2: t,
        y2: f,
        stroke: "#ddd"
      });
      L.appendChild(_);
    }
    if (this.datasets.forEach((y, f) => {
      const g = y.data.map((b, v) => ({
        x: c(b[this.xKey]),
        y: e - m(b[this.yKey]),
        original: b,
        index: v
      }));
      if (this.showArea) {
        const b = [
          `M ${g[0].x} ${e}`,
          ...g.map((k) => `L ${k.x} ${k.y}`),
          `L ${g[g.length - 1].x} ${e}`,
          "Z"
        ].join(" "), v = l.createPath({
          d: b,
          fill: this.getAreaColor(f),
          stroke: "none"
        });
        this.isFirstRender ? (v.style.transition = `opacity ${this.animationDuration}ms ease-out`, v.style.opacity = "0") : v.style.opacity = "1", i.appendChild(v), this.isFirstRender && setTimeout(() => {
          v.style.opacity = "1";
        }, 50);
      }
      const S = g.map((b, v) => `${v === 0 ? "M" : "L"} ${b.x} ${b.y}`).join(" "), _ = l.createPath({
        d: S,
        fill: "none",
        stroke: this.getBorderColor(f),
        strokeWidth: this.lineWidth.toString()
      });
      this.isAnimationEnabled && (_.style.transition = `stroke-dashoffset ${this.animationDuration}ms ease-out`, _.style.strokeDasharray = _.getTotalLength().toString(), _.style.strokeDashoffset = _.getTotalLength().toString()), i.appendChild(_), this.isAnimationEnabled && setTimeout(() => {
        _.style.strokeDashoffset = "0";
      }, 50), this.showPoints && g.forEach((b, v) => {
        var N, J;
        const k = ((N = this.hoveredPoint) == null ? void 0 : N.series) === f && ((J = this.hoveredPoint) == null ? void 0 : J.point) === v, U = l.createCircle({
          cx: b.x,
          cy: b.y,
          r: k ? this.pointRadius * 1.5 : this.pointRadius,
          fill: k ? this.getHoverColor(f) : this.getColor(f),
          stroke: this.getBorderColor(f),
          strokeWidth: "1"
        });
        if (this.isAnimationEnabled ? (U.style.transition = `opacity ${this.animationDuration}ms ease-out, r ${this.animationDuration}ms ease-out`, U.style.opacity = "0") : U.style.opacity = "1", this.hoverEffects && (U.addEventListener("mouseenter", () => {
          this.hoveredPoint = { series: f, point: v }, this.updatePointStyles();
        }), U.addEventListener("mouseleave", () => {
          this.hoveredPoint = null, this.updatePointStyles();
        })), i.appendChild(U), this.isAnimationEnabled && setTimeout(
          () => {
            U.style.opacity = "1";
          },
          this.animationDuration / 2 + v * 50
        ), this.showValues && k) {
          const W = l.createText(
            b.original[this.yKey].toFixed(1),
            {
              x: b.x,
              y: b.y - 15,
              anchor: "middle",
              fontSize: "12px",
              fill: this.getBorderColor(f)
            }
          );
          W.style.transition = "opacity 0.2s ease-out", W.style.opacity = "0", i.appendChild(W), this.animationEnabled ? setTimeout(() => {
            W.style.opacity = "1";
          }, 50) : W.style.opacity = "1";
        }
      });
    }), this.showLegend && this.datasets.length > 1) {
      const y = l.createGroup(
        `translate(${t / 2},${e + 50})`
      );
      this.datasets.forEach((f, g) => {
        const S = l.createGroup(
          `translate(${g * 100 - this.datasets.length * 50},0)`
        ), _ = l.createLine({
          x1: 0,
          y1: 0,
          x2: 15,
          y2: 0,
          stroke: this.getBorderColor(g),
          strokeWidth: this.lineWidth.toString()
        });
        if (S.appendChild(_), this.showPoints) {
          const v = l.createCircle({
            cx: 7.5,
            cy: 0,
            r: this.pointRadius,
            fill: this.getColor(g),
            stroke: this.getBorderColor(g),
            strokeWidth: "1"
          });
          S.appendChild(v);
        }
        const b = l.createText(f.label || `Series ${g + 1}`, {
          x: 20,
          y: 4,
          fontSize: "12px",
          fill: this.getBorderColor(g)
        });
        S.appendChild(b), y.appendChild(S);
      }), i.appendChild(y);
    }
    this.isFirstRender = !1;
  }
  updatePointStyles() {
    if (!this.renderRoot) return;
    const s = this.renderRoot.querySelector("svg");
    if (!s) return;
    s.querySelectorAll("circle").forEach((e, i) => {
      var h, n, u;
      const r = Math.floor(i / this.datasets[0].data.length), o = i % this.datasets[0].data.length;
      if (((h = this.hoveredPoint) == null ? void 0 : h.series) === r && ((n = this.hoveredPoint) == null ? void 0 : n.point) === o) {
        if (e.setAttribute("r", (this.pointRadius * 1.5).toString()), e.setAttribute("fill", this.getHoverColor(r)), this.showValues && !s.querySelector(
          `text[data-point="${r}-${o}"]`
        )) {
          const c = parseFloat(e.getAttribute("cx") || "0"), m = parseFloat(e.getAttribute("cy") || "0"), $ = this.datasets[r].data[o][this.yKey], x = l.createText($.toFixed(1), {
            x: c,
            y: m - 15,
            anchor: "middle",
            fontSize: "12px",
            fill: this.getBorderColor(r)
          });
          x.setAttribute("data-point", `${r}-${o}`), x.style.transition = "opacity 0.2s ease-out", x.style.opacity = "0", (u = s.querySelector("g")) == null || u.appendChild(x), this.animationEnabled ? setTimeout(() => {
            x.style.opacity = "1";
          }, 50) : x.style.opacity = "1";
        }
      } else {
        e.setAttribute("r", this.pointRadius.toString()), e.setAttribute("fill", this.getColor(r));
        const p = s.querySelector(
          `text[data-point="${r}-${o}"]`
        );
        p && p.remove();
      }
    });
  }
};
K([
  d()
], I.prototype, "xKey", 2);
K([
  d()
], I.prototype, "yKey", 2);
K([
  d({ type: Number })
], I.prototype, "lineWidth", 2);
K([
  d({ type: Boolean })
], I.prototype, "showPoints", 2);
K([
  d({ type: Number })
], I.prototype, "pointRadius", 2);
K([
  d({ type: Boolean })
], I.prototype, "showArea", 2);
K([
  C()
], I.prototype, "hoveredPoint", 2);
K([
  C()
], I.prototype, "datasets", 2);
I = K([
  nt("line-chart")
], I);
var we = Object.defineProperty, Se = Object.getOwnPropertyDescriptor, R = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Se(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && we(t, e, r), r;
};
let P = class extends D {
  constructor() {
    super(...arguments), this.value = 0, this.min = 0, this.max = 100, this.warningValue = 70, this.criticalValue = 90, this.startAngle = -90, this.endAngle = 90, this.arcThickness = 30, this.showTicks = !0, this.showLabels = !0, this.numTicks = 5, this.units = "", this.title = "", this.subtitle = "", this.precision = 0, this.theme = {
      backgroundColor: "rgba(200, 200, 200, 0.2)",
      tickColor: "rgba(0, 0, 0, 0.6)",
      labelColor: "rgba(0, 0, 0, 0.7)",
      valueColor: "rgba(0, 0, 0, 0.85)",
      titleColor: "rgba(0, 0, 0, 0.85)"
    }, this.animatedValue = 0, this.animationInProgress = !1;
  }
  /**
   * Lifecycle method called after the component is first updated.
   * Initializes the gauge and starts the initial value animation.
   */
  firstUpdated() {
    super.firstUpdated(), this.drawChart(), this.animateValue();
  }
  /**
   * Lifecycle method called when component properties change.
   * Triggers value animation when the value property changes.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  updated(s) {
    super.updated(s), s.has("value") && this.animateValue();
  }
  /**
   * Animates the gauge value from its current position to the target value.
   * Uses cubic easing for smooth animation.
   */
  animateValue() {
    if (this.animationInProgress) return;
    if (!this.animationEnabled) {
      this.animatedValue = this.value, this.drawChart();
      return;
    }
    this.animationInProgress = !0;
    const s = this.animatedValue, t = this.value, e = performance.now(), i = (r) => {
      const o = r - e, a = Math.min(o / this.animationDuration, 1), h = 1 - Math.pow(1 - a, 3);
      this.animatedValue = s + (t - s) * h, this.drawChart(), a < 1 ? requestAnimationFrame(i) : this.animationInProgress = !1;
    };
    requestAnimationFrame(i);
  }
  /**
   * Draws the gauge chart by creating SVG elements.
   * Creates the background arc, colored zones, tick marks, and labels.
   */
  drawChart() {
    if (!this.svgElement) return;
    this.svgElement.innerHTML = "";
    const s = this.width - this.margin.left - this.margin.right, t = this.height - this.margin.top - this.margin.bottom, e = Math.min(s, t) / 2, i = this.width / 2, r = this.height / 2;
    this.svgElement.setAttribute(
      "viewBox",
      `0 0 ${this.width} ${this.height * 0.7}`
    );
    const o = l.createGroup(`translate(${i},${r * 0.75})`);
    this.svgElement.appendChild(o);
    const a = e * 0.9, h = a - this.arcThickness, n = l.createPath({
      d: this.createArc(
        a,
        h,
        this.startAngle,
        this.endAngle
      ),
      fill: this.theme.backgroundColor,
      stroke: "rgba(0, 0, 0, 0.1)",
      strokeWidth: "1"
    });
    o.appendChild(n), [
      { min: this.min, max: this.warningValue, color: this.getColor(0) },
      {
        min: this.warningValue,
        max: this.criticalValue,
        color: this.getColor(4)
      },
      { min: this.criticalValue, max: this.max, color: this.getColor(1) }
    ].forEach((A) => {
      const Q = this.valueToAngle(A.min), z = this.valueToAngle(A.max), G = l.createPath({
        d: this.createArc(a, h, Q, z),
        fill: A.color,
        stroke: "none"
      });
      o.appendChild(G);
    });
    const p = this.valueToAngle(this.warningValue), c = this.valueToAngle(this.criticalValue), m = this.polarToCartesian(a + 10, p), $ = l.createCircle({
      cx: m.x,
      cy: m.y,
      r: 5,
      fill: this.getColor(4)
    });
    o.appendChild($);
    const x = this.polarToCartesian(
      a + 25,
      p
    ), L = l.createText("Warning", {
      x: x.x,
      y: x.y,
      anchor: "start",
      dy: ".35em",
      fontSize: "12px"
    });
    L.style.fill = this.getColor(4), L.style.fontWeight = "bold", o.appendChild(L);
    const T = this.polarToCartesian(
      a + 10,
      c
    ), y = l.createCircle({
      cx: T.x,
      cy: T.y,
      r: 5,
      fill: this.getColor(1)
    });
    o.appendChild(y);
    const f = this.polarToCartesian(
      a + 25,
      c
    ), g = l.createText("Critical", {
      x: f.x,
      y: f.y,
      anchor: "start",
      dy: ".35em",
      fontSize: "12px"
    });
    if (g.style.fill = this.getColor(1), g.style.fontWeight = "bold", o.appendChild(g), this.showTicks || this.showLabels)
      for (let A = 0; A <= this.numTicks; A++) {
        const Q = this.min + A / this.numTicks * (this.max - this.min), z = this.valueToAngle(Q), G = this.polarToCartesian(a + 5, z), ht = this.polarToCartesian(a - 5, z);
        if (this.showTicks) {
          const rt = l.createLine({
            x1: ht.x,
            y1: ht.y,
            x2: G.x,
            y2: G.y,
            stroke: this.theme.tickColor
          });
          o.appendChild(rt);
        }
        if (this.showLabels) {
          const rt = this.polarToCartesian(a + 20, z), mt = Q.toFixed(this.precision), lt = l.createText(
            this.units ? `${mt}${this.units}` : mt,
            {
              x: rt.x,
              y: rt.y,
              anchor: "middle",
              dy: ".35em",
              fontSize: "12px"
            }
          );
          lt.style.fill = this.theme.labelColor, o.appendChild(lt);
        }
      }
    if (this.title) {
      const A = l.createText(this.title, {
        x: 0,
        y: -e / 2,
        anchor: "middle",
        fontSize: "16px"
      });
      A.style.fill = this.theme.titleColor, A.style.fontWeight = "bold", o.appendChild(A);
    }
    if (this.subtitle) {
      const A = l.createText(this.subtitle, {
        x: 0,
        y: -e / 2 + 20,
        anchor: "middle",
        fontSize: "14px"
      });
      A.style.fill = this.theme.titleColor, o.appendChild(A);
    }
    const S = this.animatedValue.toFixed(this.precision), _ = this.valueToAngle(this.animatedValue), b = 15, v = a - this.arcThickness / 2, k = this.polarToCartesian(
      v - b,
      _
    ), U = this.polarToCartesian(
      v + b,
      _
    ), N = l.createLine({
      x1: k.x,
      y1: k.y,
      x2: U.x,
      y2: U.y,
      stroke: this.theme.valueColor
    });
    o.appendChild(N);
    const J = this.polarToCartesian(v, _), W = l.createCircle({
      cx: J.x,
      cy: J.y,
      r: 6,
      fill: this.theme.valueColor
    });
    o.appendChild(W);
    const B = l.createText(
      this.units ? `${S}${this.units}` : S,
      {
        x: 0,
        y: -12,
        anchor: "middle",
        dy: ".35em",
        fontSize: "24px"
      }
    );
    B.style.fill = this.theme.valueColor, B.style.fontWeight = "bold", o.appendChild(B), this.hoverEffects && (N.addEventListener("mouseenter", () => this.handleHover(!0)), N.addEventListener("mouseleave", () => this.handleHover(!1)));
  }
  /**
   * Converts a value to its corresponding angle on the gauge.
   *
   * @param value - The value to convert
   * @returns The angle in degrees
   */
  valueToAngle(s) {
    const t = (s - this.min) / (this.max - this.min);
    return this.startAngle + t * (this.endAngle - this.startAngle);
  }
  /**
   * Creates an SVG arc path between two angles.
   *
   * @param outerRadius - The outer radius of the arc
   * @param innerRadius - The inner radius of the arc
   * @param startAngle - The starting angle in degrees
   * @param endAngle - The ending angle in degrees
   * @returns An SVG path string for the arc
   */
  createArc(s, t, e, i) {
    const r = this.polarToCartesian(s, e), o = this.polarToCartesian(s, i), a = this.polarToCartesian(t, e), h = this.polarToCartesian(t, i), n = Math.abs(i - e) <= 180 ? 0 : 1;
    return [
      "M",
      r.x,
      r.y,
      "A",
      s,
      s,
      0,
      n,
      1,
      o.x,
      o.y,
      "L",
      h.x,
      h.y,
      "A",
      t,
      t,
      0,
      n,
      0,
      a.x,
      a.y,
      "Z"
    ].join(" ");
  }
  /**
   * Converts polar coordinates to cartesian coordinates.
   *
   * @param radius - The distance from the center
   * @param angle - The angle in degrees
   * @returns An object with x and y coordinates
   */
  polarToCartesian(s, t) {
    const e = (t - 90) * (Math.PI / 180);
    return {
      x: s * Math.cos(e),
      y: s * Math.sin(e)
    };
  }
  /**
   * Handles hover events on the gauge.
   * Updates visual state for hover effects.
   *
   * @param isHovered - Whether the gauge is being hovered
   */
  handleHover(s) {
    this.drawChart();
  }
};
R([
  d({ type: Number })
], P.prototype, "value", 2);
R([
  d({ type: Number })
], P.prototype, "min", 2);
R([
  d({ type: Number })
], P.prototype, "max", 2);
R([
  d({ type: Number })
], P.prototype, "warningValue", 2);
R([
  d({ type: Number })
], P.prototype, "criticalValue", 2);
R([
  d({ type: Number })
], P.prototype, "startAngle", 2);
R([
  d({ type: Number })
], P.prototype, "endAngle", 2);
R([
  d({ type: Number })
], P.prototype, "arcThickness", 2);
R([
  d({ type: Boolean })
], P.prototype, "showTicks", 2);
R([
  d({ type: Boolean })
], P.prototype, "showLabels", 2);
R([
  d({ type: Number })
], P.prototype, "numTicks", 2);
R([
  d({ type: String })
], P.prototype, "units", 2);
R([
  d({ type: String })
], P.prototype, "title", 2);
R([
  d({ type: String })
], P.prototype, "subtitle", 2);
R([
  d({ type: Number })
], P.prototype, "precision", 2);
R([
  C()
], P.prototype, "animatedValue", 2);
R([
  C()
], P.prototype, "animationInProgress", 2);
P = R([
  nt("gauge-chart")
], P);
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const gt = globalThis, _t = gt.trustedTypes, Ft = _t ? _t.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Jt = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, Qt = "?" + X, De = `<${Qt}>`, it = document, At = () => it.createComment(""), yt = (s) => s === null || typeof s != "object" && typeof s != "function", Lt = Array.isArray, Ee = (s) => Lt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", Dt = `[ 	
\f\r]`, dt = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, It = /-->/g, Wt = />/g, tt = RegExp(`>|${Dt}(?:([^\\s"'>=/]+)(${Dt}*=${Dt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), zt = /'/g, jt = /"/g, te = /^(?:script|style|textarea|title)$/i, ot = Symbol.for("lit-noChange"), M = Symbol.for("lit-nothing"), Kt = /* @__PURE__ */ new WeakMap(), st = it.createTreeWalker(it, 129);
function ee(s, t) {
  if (!Lt(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Ft !== void 0 ? Ft.createHTML(t) : t;
}
const Te = (s, t) => {
  const e = s.length - 1, i = [];
  let r, o = t === 2 ? "<svg>" : t === 3 ? "<math>" : "", a = dt;
  for (let h = 0; h < e; h++) {
    const n = s[h];
    let u, p, c = -1, m = 0;
    for (; m < n.length && (a.lastIndex = m, p = a.exec(n), p !== null); ) m = a.lastIndex, a === dt ? p[1] === "!--" ? a = It : p[1] !== void 0 ? a = Wt : p[2] !== void 0 ? (te.test(p[2]) && (r = RegExp("</" + p[2], "g")), a = tt) : p[3] !== void 0 && (a = tt) : a === tt ? p[0] === ">" ? (a = r ?? dt, c = -1) : p[1] === void 0 ? c = -2 : (c = a.lastIndex - p[2].length, u = p[1], a = p[3] === void 0 ? tt : p[3] === '"' ? jt : zt) : a === jt || a === zt ? a = tt : a === It || a === Wt ? a = dt : (a = tt, r = void 0);
    const $ = a === tt && s[h + 1].startsWith("/>") ? " " : "";
    o += a === dt ? n + De : c >= 0 ? (i.push(u), n.slice(0, c) + Jt + n.slice(c) + X + $) : n + X + (c === -2 ? h : $);
  }
  return [ee(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : t === 3 ? "</math>" : "")), i];
};
class ft {
  constructor({ strings: t, _$litType$: e }, i) {
    let r;
    this.parts = [];
    let o = 0, a = 0;
    const h = t.length - 1, n = this.parts, [u, p] = Te(t, e);
    if (this.el = ft.createElement(u, i), st.currentNode = this.el.content, e === 2 || e === 3) {
      const c = this.el.content.firstChild;
      c.replaceWith(...c.childNodes);
    }
    for (; (r = st.nextNode()) !== null && n.length < h; ) {
      if (r.nodeType === 1) {
        if (r.hasAttributes()) for (const c of r.getAttributeNames()) if (c.endsWith(Jt)) {
          const m = p[a++], $ = r.getAttribute(c).split(X), x = /([.?@])?(.*)/.exec(m);
          n.push({ type: 1, index: o, name: x[2], strings: $, ctor: x[1] === "." ? ke : x[1] === "?" ? Me : x[1] === "@" ? Re : wt }), r.removeAttribute(c);
        } else c.startsWith(X) && (n.push({ type: 6, index: o }), r.removeAttribute(c));
        if (te.test(r.tagName)) {
          const c = r.textContent.split(X), m = c.length - 1;
          if (m > 0) {
            r.textContent = _t ? _t.emptyScript : "";
            for (let $ = 0; $ < m; $++) r.append(c[$], At()), st.nextNode(), n.push({ type: 2, index: ++o });
            r.append(c[m], At());
          }
        }
      } else if (r.nodeType === 8) if (r.data === Qt) n.push({ type: 2, index: o });
      else {
        let c = -1;
        for (; (c = r.data.indexOf(X, c + 1)) !== -1; ) n.push({ type: 7, index: o }), c += X.length - 1;
      }
      o++;
    }
  }
  static createElement(t, e) {
    const i = it.createElement("template");
    return i.innerHTML = t, i;
  }
}
function at(s, t, e = s, i) {
  var a, h;
  if (t === ot) return t;
  let r = i !== void 0 ? (a = e._$Co) == null ? void 0 : a[i] : e._$Cl;
  const o = yt(t) ? void 0 : t._$litDirective$;
  return (r == null ? void 0 : r.constructor) !== o && ((h = r == null ? void 0 : r._$AO) == null || h.call(r, !1), o === void 0 ? r = void 0 : (r = new o(s), r._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = r : e._$Cl = r), r !== void 0 && (t = at(s, r._$AS(s, t.values), r, i)), t;
}
class Pe {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: i } = this._$AD, r = ((t == null ? void 0 : t.creationScope) ?? it).importNode(e, !0);
    st.currentNode = r;
    let o = st.nextNode(), a = 0, h = 0, n = i[0];
    for (; n !== void 0; ) {
      if (a === n.index) {
        let u;
        n.type === 2 ? u = new Ct(o, o.nextSibling, this, t) : n.type === 1 ? u = new n.ctor(o, n.name, n.strings, this, t) : n.type === 6 && (u = new Le(o, this, t)), this._$AV.push(u), n = i[++h];
      }
      a !== (n == null ? void 0 : n.index) && (o = st.nextNode(), a++);
    }
    return st.currentNode = it, r;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV) i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Ct {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, r) {
    this.type = 2, this._$AH = M, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = r, this._$Cv = (r == null ? void 0 : r.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = at(this, t, e), yt(t) ? t === M || t == null || t === "" ? (this._$AH !== M && this._$AR(), this._$AH = M) : t !== this._$AH && t !== ot && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Ee(t) ? this.k(t) : this._(t);
  }
  O(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.O(t));
  }
  _(t) {
    this._$AH !== M && yt(this._$AH) ? this._$AA.nextSibling.data = t : this.T(it.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, r = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = ft.createElement(ee(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === r) this._$AH.p(e);
    else {
      const a = new Pe(r, this), h = a.u(this.options);
      a.p(e), this.T(h), this._$AH = a;
    }
  }
  _$AC(t) {
    let e = Kt.get(t.strings);
    return e === void 0 && Kt.set(t.strings, e = new ft(t)), e;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, r = 0;
    for (const o of t) r === e.length ? e.push(i = new Ct(this.O(At()), this.O(At()), this, this.options)) : i = e[r], i._$AI(o), r++;
    r < e.length && (this._$AR(i && i._$AB.nextSibling, r), e.length = r);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const r = t.nextSibling;
      t.remove(), t = r;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class wt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, r, o) {
    this.type = 1, this._$AH = M, this._$AN = void 0, this.element = t, this.name = e, this._$AM = r, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = M;
  }
  _$AI(t, e = this, i, r) {
    const o = this.strings;
    let a = !1;
    if (o === void 0) t = at(this, t, e, 0), a = !yt(t) || t !== this._$AH && t !== ot, a && (this._$AH = t);
    else {
      const h = t;
      let n, u;
      for (t = o[0], n = 0; n < o.length - 1; n++) u = at(this, h[i + n], e, n), u === ot && (u = this._$AH[n]), a || (a = !yt(u) || u !== this._$AH[n]), u === M ? t = M : t !== M && (t += (u ?? "") + o[n + 1]), this._$AH[n] = u;
    }
    a && !r && this.j(t);
  }
  j(t) {
    t === M ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ke extends wt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === M ? void 0 : t;
  }
}
class Me extends wt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== M);
  }
}
class Re extends wt {
  constructor(t, e, i, r, o) {
    super(t, e, i, r, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = at(this, t, e, 0) ?? M) === ot) return;
    const i = this._$AH, r = t === M && i !== M || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== M && (i === M || r);
    r && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Le {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    at(this, t);
  }
}
const Et = gt.litHtmlPolyfillSupport;
Et == null || Et(ft, Ct), (gt.litHtmlVersions ?? (gt.litHtmlVersions = [])).push("3.2.1");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Ne = { ATTRIBUTE: 1 }, Oe = (s) => (...t) => ({ _$litDirective$: s, values: t });
let Ue = class {
  constructor(t) {
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AT(t, e, i) {
    this._$Ct = t, this._$AM = e, this._$Ci = i;
  }
  _$AS(t, e) {
    return this.update(t, e);
  }
  update(t, e) {
    return this.render(...e);
  }
};
/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const se = "important", Be = " !" + se, q = Oe(class extends Ue {
  constructor(s) {
    var t;
    if (super(s), s.type !== Ne.ATTRIBUTE || s.name !== "style" || ((t = s.strings) == null ? void 0 : t.length) > 2) throw Error("The `styleMap` directive must be used in the `style` attribute and must be the only part in the attribute.");
  }
  render(s) {
    return Object.keys(s).reduce((t, e) => {
      const i = s[e];
      return i == null ? t : t + `${e = e.includes("-") ? e : e.replace(/(?:^(webkit|moz|ms|o)|)(?=[A-Z])/g, "-$&").toLowerCase()}:${i};`;
    }, "");
  }
  update(s, [t]) {
    const { style: e } = s.element;
    if (this.ft === void 0) return this.ft = new Set(Object.keys(t)), this.render(t);
    for (const i of this.ft) t[i] == null && (this.ft.delete(i), i.includes("-") ? e.removeProperty(i) : e[i] = null);
    for (const i in t) {
      const r = t[i];
      if (r != null) {
        this.ft.add(i);
        const o = typeof r == "string" && r.endsWith(Be);
        i.includes("-") || o ? e.setProperty(i, o ? r.slice(0, -11) : r, o ? se : "") : e[i] = r;
      }
    }
    return ot;
  }
});
var He = Object.defineProperty, Ve = Object.getOwnPropertyDescriptor, E = (s, t, e, i) => {
  for (var r = i > 1 ? void 0 : i ? Ve(t, e) : t, o = s.length - 1, a; o >= 0; o--)
    (a = s[o]) && (r = (i ? a(t, e, r) : a(r)) || r);
  return i && r && He(t, e, r), r;
};
const et = 60 * 60 * 24 * 1e3, vt = 35, Tt = (s) => new Date(s.getFullYear(), s.getMonth(), s.getDate() + 1), Pt = (s) => new Date(s.getFullYear(), s.getMonth(), s.getDate() + 7), kt = (s) => new Date(s.getFullYear(), s.getMonth() + 1, 1), Gt = (s) => new Date(s.getFullYear(), s.getMonth() + 3, 1), qt = (s) => new Date(s.getFullYear() + 1, 0, 1), Fe = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
], pt = [
  { scale: 0.5, nextDate: qt },
  { scale: 0.7, nextDate: qt },
  { scale: 1, nextDate: Gt },
  { scale: 2, nextDate: Gt },
  { scale: 4, nextDate: kt },
  { scale: 7, nextDate: kt },
  { scale: 10, nextDate: kt },
  { scale: 15, nextDate: Pt },
  { scale: 20, nextDate: Pt },
  { scale: 50, nextDate: Pt },
  { scale: 100, nextDate: Tt },
  { scale: 150, nextDate: Tt },
  { scale: 200, nextDate: Tt }
];
let w = class extends Yt {
  /**
   * Creates a new GanttChart instance.
   * Initializes the chart with default settings.
   */
  constructor() {
    super(), this.items = [], this.showConnectors = !0, this.scaleIndex = 8, this.titleField = "title", this.startField = "start", this.endField = "end", this.markerFields = [], this.linksField = "links", this.keyField = "id", this._scale = pt[8].scale, this._getNextDate = pt[8].nextDate, this._startDate = /* @__PURE__ */ new Date(), this._finishDate = /* @__PURE__ */ new Date(), this._minDate = 0, this._maxDate = 0, this._rulers = [], this._isMouseDown = !1, this._mouseDownPageX = 0, this._connectors = [], this._updateScale(), this._calculateDateRange(), this._generateRulers();
  }
  /**
   * Lifecycle method called when component properties change.
   * Updates the chart when relevant properties are modified.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  updated(s) {
    (s.has("items") || s.has("scaleIndex")) && (this._updateScale(), this._calculateDateRange(), this._generateRulers(), this._calculateConnectors());
  }
  /**
   * Updates the chart scale based on the current scaleIndex.
   */
  _updateScale() {
    this._scale = pt[this.scaleIndex].scale, this._getNextDate = pt[this.scaleIndex].nextDate;
  }
  /**
   * Calculates the date range for the visible items.
   */
  _calculateDateRange() {
    if (this.items.length === 0) return;
    let s = new Date(this.items[0].start), t = new Date(this.items[0].end);
    this.items.forEach((r) => {
      const o = new Date(r.start), a = new Date(r.end);
      o < s && (s = o), a > t && (t = a);
    }), this._startDate = s, this._finishDate = t;
    const e = new Date(s.getFullYear(), 0, 1), i = new Date(t.getFullYear(), 11, 31);
    this._minDate = e.getTime() / et, this._maxDate = i.getTime() / et;
  }
  /**
   * Generates ruler marks for the timeline based on current scale.
   */
  _generateRulers() {
    const s = [], t = new Date(this._minDate * et), e = new Date(this._maxDate * et);
    let i = t;
    for (; i < e; )
      s.push({
        pos: (i.getTime() / et - this._minDate) * this._scale,
        date: this._getDateText(i)
      }), i = this._getNextDate(i);
    this._rulers = s;
  }
  /**
   * Formats a date for display on the timeline.
   * @param date - The date to format
   * @returns Formatted date string
   */
  _getDateText(s) {
    const t = `${Fe[s.getMonth()]} '${String(s.getFullYear()).substring(2)}`;
    return this.scaleIndex < 7 ? t : `${s.getDate()} ${t}`;
  }
  /**
   * Converts a date to a pixel position on the timeline.
   * @param position - The date to convert
   * @returns Position in pixels
   */
  _createScalable(s) {
    return (s.getTime() / et - this._minDate) * this._scale;
  }
  /**
   * Gets the pixel position of the current day line.
   * @returns Position in pixels
   */
  _getCurrentDayPosition() {
    const s = /* @__PURE__ */ new Date();
    return this._createScalable(s);
  }
  /**
   * Scrolls the timeline left by one viewport width.
   */
  // private _moveLeft() {
  //   this.shadowRoot?.querySelector('.gantt-content')?.scrollBy({
  //     left: -100,
  //     behavior: 'smooth',
  //   });
  // }
  /**
   * Scrolls the timeline right by one viewport width.
   */
  // private _moveRight() {
  //   this.shadowRoot?.querySelector('.gantt-content')?.scrollBy({
  //     left: 100,
  //     behavior: 'smooth',
  //   });
  // }
  /**
   * Decreases the zoom level of the timeline.
   */
  _scaleDown() {
    this.scaleIndex < pt.length - 1 && (this.scaleIndex++, this._updateScale(), this._generateRulers(), this._calculateConnectors());
  }
  /**
   * Increases the zoom level of the timeline.
   */
  _scaleUp() {
    this.scaleIndex > 0 && (this.scaleIndex--, this._updateScale(), this._generateRulers(), this._calculateConnectors());
  }
  /**
   * Handles mouse down events for timeline dragging.
   * @param e - Mouse event
   */
  _handleMouseDown(s) {
    this._isMouseDown = !0, this._mouseDownPageX = s.pageX;
  }
  /**
   * Handles mouse up events for timeline dragging.
   */
  _handleMouseUp() {
    this._isMouseDown = !1;
  }
  /**
   * Handles mouse move events for timeline dragging.
   * @param e - Mouse event
   */
  _handleMouseMove(s) {
    var t, e;
    if (this._isMouseDown) {
      const i = s.pageX - this._mouseDownPageX;
      this._mouseDownPageX = s.pageX, (e = (t = this.shadowRoot) == null ? void 0 : t.querySelector(".gantt-content")) == null || e.scrollBy({
        left: -i,
        behavior: "auto"
      });
    }
  }
  /**
   * Handles scroll events on the timeline.
   * @param e - Scroll event
   */
  _handleScroll(s) {
  }
  /**
   * Handles click events on timeline rows.
   * @param item - The clicked item
   */
  _rowClick(s) {
    this.dispatchEvent(
      new CustomEvent("row-click", {
        detail: { item: s },
        bubbles: !0,
        composed: !0
      })
    );
  }
  /**
   * Calculates connector points for dependency lines.
   */
  _calculateConnectors() {
    if (!this.showConnectors || !this.items.length) {
      this._connectors = [];
      return;
    }
    const s = [];
    this.items.forEach((t, e) => {
      if (!t.links || !t.links.length) return;
      const i = vt / 2 + e * vt;
      t.links.forEach((r) => {
        if (!this.items.find((n) => n.id === r.to)) return;
        const a = this.items.findIndex((n) => n.id === r.to);
        if (a === -1) return;
        const h = vt / 2 + a * vt;
        s.push({
          startX: this._createScalable(new Date(r.fromDate)),
          startY: i,
          endX: this._createScalable(new Date(r.toDate)),
          endY: h
        });
      });
    }), this._connectors = s;
  }
  /**
   * Renders the Gantt chart component.
   * @returns Rendered HTML template
   */
  render() {
    return H`
      <div class="gantt-container">
        <div class="gantt-legend">
          <div class="gantt-legend-header">Tasks</div>
          <div class="gantt-legend-content">
            ${this.items.map(
      (s) => H`
                <div class="gantt-row" @click=${() => this._rowClick(s)}>
                  <div class="gantt-row-title" title=${s.title}>
                    ${s.title}
                  </div>
                </div>
              `
    )}
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
            ${this._rulers.map(
      (s) => H`
                <div
                  class="gantt-ruler"
                  style=${q({ left: `${s.pos}px` })}
                >
                  <span class="gantt-ruler-text">${s.date}</span>
                </div>
              `
    )}
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
              style=${q({
      width: `${this._rulers.length > 0 ? this._rulers[this._rulers.length - 1].pos + 100 : 0}px`
    })}
            >
              ${this._rulers.map(
      (s) => H`
                  <div
                    class="gantt-ruler"
                    style=${q({ left: `${s.pos}px` })}
                  ></div>
                `
    )}
              ${this.items.map(
      (s) => {
        var t;
        return H`
                  <div class="gantt-row" @click=${() => this._rowClick(s)}>
                    <div
                      class="gantt-line"
                      style=${q({
          left: `${this._createScalable(new Date(s.start))}px`,
          width: `${(new Date(s.end).getTime() - new Date(s.start).getTime()) / et * this._scale}px`,
          backgroundColor: s.color || "#4CAF50"
        })}
                      title=${`${s.title}: ${new Date(s.start).toLocaleDateString()} - ${new Date(s.end).toLocaleDateString()}`}
                    >
                      ${s.title}
                    </div>

                    ${(t = s.markers) == null ? void 0 : t.map(
          (e) => H`
                        <div
                          class="gantt-marker"
                          style=${q({
            left: `${this._createScalable(new Date(e.date))}px`,
            backgroundColor: e.color || "#333"
          })}
                        >
                          <div class="gantt-marker-text">${e.text}</div>
                        </div>
                      `
        )}
                  </div>
                `;
      }
    )}

              <div
                class="gantt-current-day"
                style=${q({
      left: `${this._getCurrentDayPosition()}px`
    })}
                title=${`Current day: ${(/* @__PURE__ */ new Date()).toLocaleDateString()}`}
              ></div>

              ${this.showConnectors ? this._renderConnectors() : ""}
            </div>
          </div>
        </div>
      </div>
    `;
  }
  /**
   * Renders dependency connector lines between linked items.
   * @returns Rendered HTML template for connectors
   */
  _renderConnectors() {
    return this._connectors.length ? H`
      ${this._connectors.map(
      (s) => H`
          <div
            class="gantt-connector-endpoint gantt-connector-endpoint--start"
            style=${q({
        left: `${s.startX}px`,
        top: `${s.startY}px`
      })}
          ></div>
          <div
            class="gantt-connector-endpoint"
            style=${q({
        left: `${s.endX}px`,
        top: `${s.endY}px`
      })}
          ></div>
          <gantt-connector-line .points=${s}></gantt-connector-line>
        `
    )}
    ` : H``;
  }
};
w.styles = Xt`
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
  `;
E([
  d({ type: Array })
], w.prototype, "items", 2);
E([
  d({ type: Boolean })
], w.prototype, "showConnectors", 2);
E([
  d({ type: Number })
], w.prototype, "scaleIndex", 2);
E([
  d({ type: String })
], w.prototype, "titleField", 2);
E([
  d({ type: String })
], w.prototype, "startField", 2);
E([
  d({ type: String })
], w.prototype, "endField", 2);
E([
  d({ type: Array })
], w.prototype, "markerFields", 2);
E([
  d({ type: String })
], w.prototype, "linksField", 2);
E([
  d({ type: String })
], w.prototype, "keyField", 2);
E([
  C()
], w.prototype, "_scale", 2);
E([
  C()
], w.prototype, "_getNextDate", 2);
E([
  C()
], w.prototype, "_startDate", 2);
E([
  C()
], w.prototype, "_finishDate", 2);
E([
  C()
], w.prototype, "_minDate", 2);
E([
  C()
], w.prototype, "_maxDate", 2);
E([
  C()
], w.prototype, "_rulers", 2);
E([
  C()
], w.prototype, "_isMouseDown", 2);
E([
  C()
], w.prototype, "_mouseDownPageX", 2);
E([
  C()
], w.prototype, "_connectors", 2);
w = E([
  nt("gantt-chart")
], w);
export {
  V as BarChart,
  D as BaseChart,
  w as GanttChart,
  P as GaugeChart,
  I as LineChart,
  j as PieChart
};
