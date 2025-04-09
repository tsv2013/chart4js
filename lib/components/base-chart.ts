import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

@customElement('base-chart')
export class BaseChart extends LitElement {
  static styles = css`
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

  @property({ type: Number }) width = 600;
  @property({ type: Number }) height = 400;
  @property({ type: String }) title = '';
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @property({ type: Array }) data: any[] = [];
  @property({ type: Object }) margin = {
    top: 20,
    right: 20,
    bottom: 80,
    left: 60,
  };
  @property({ type: Array }) colors = [
    '7, 171, 160',
    '218, 60, 120',
    '126, 52, 157',
    '0, 119, 192',
    '231, 76, 60',
    '14, 172, 81',
    '241, 137, 45',
    '227, 114, 75',
    '174, 124, 91',
    '108, 122, 137',
    '117, 133, 134',
    '112, 112, 112',
  ];
  @property({ type: Boolean }) showLegend = true;
  @property({ type: Boolean }) showValues = true;
  @property({ type: Boolean }) hoverEffects = true;

  @state()
  protected svgElement: SVGSVGElement | null = null;

  protected getColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.2)`;
  }

  protected getHoverColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.4)`;
  }

  protected getBorderColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 1)`;
  }

  protected createRenderRoot() {
    const root = super.createRenderRoot();
    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        width: 100%;
        height: 100%;
      }
    `;
    root.appendChild(style);
    return root;
  }

  protected firstUpdated() {
    this.initializeChart();
  }

  protected initializeChart() {
    const container = this.shadowRoot?.querySelector('.chart-container');
    if (!container) return;

    container.innerHTML = '';

    this.svgElement = SVGHelper.createSVG(
      this.width,
      this.height,
      `0 0 ${this.width} ${this.height}`,
    );
    container.appendChild(this.svgElement);

    if (this.title) {
      const titleElement = SVGHelper.createText(this.title, {
        x: this.width / 2,
        y: this.margin.top / 2,
        anchor: 'middle',
        fontSize: '16px',
      });
      this.svgElement.appendChild(titleElement);
    }
  }

  protected render() {
    return html` <div class="chart-container"></div> `;
  }
}
