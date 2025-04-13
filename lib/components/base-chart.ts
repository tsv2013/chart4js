import { LitElement, html, css, PropertyValues } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

/**
 * Base chart component that provides common functionality for all chart types.
 * This class serves as the foundation for all chart components in the library,
 * providing basic SVG rendering, color management, and layout capabilities.
 *
 * @example
 * ```html
 * <base-chart
 *   width="600"
 *   height="400"
 *   title="My Chart"
 *   data="[{'category': 'A', 'value': 10}, {'category': 'B', 'value': 20}]"
 *   showLegend="true"
 *   animationEnabled="true"
 * ></base-chart>
 * ```
 */
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

  /** Width of the chart in pixels */
  @property({ type: Number }) width = 600;

  /** Height of the chart in pixels */
  @property({ type: Number }) height = 400;

  /** Title displayed at the top of the chart */
  @property({ type: String }) title = '';

  /**
   * Data array for the chart. The structure depends on the specific chart type.
   * For most charts, this should be an array of objects with properties matching
   * the xKey and yKey values.
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @property({ type: Array }) data: any[] = [];

  /**
   * Margin settings for the chart content.
   * Controls the spacing between the chart content and the chart boundaries.
   */
  @property({ type: Object }) margin = {
    top: 20,
    right: 20,
    bottom: 80,
    left: 60,
  };

  /**
   * Color palette for the chart elements.
   * Each color is specified as an RGB string without the 'rgb(' prefix.
   * The colors are used in sequence for different data series or segments.
   */
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

  /** Whether to display the chart legend */
  @property({ type: Boolean }) showLegend = true;

  /** Whether to display data values on the chart elements */
  @property({ type: Boolean }) showValues = true;

  /** Whether to enable hover effects on chart elements */
  @property({ type: Boolean }) hoverEffects = true;

  /** Duration of animation in milliseconds */
  @property({ type: Number }) animationDuration = 800;

  /** Whether animations are enabled */
  @property({ type: Boolean }) animationEnabled = true;

  /** Flag indicating if this is the first render of the chart */
  @state() protected isFirstRender = true;

  /** Reference to the SVG element used for rendering the chart */
  @state() protected svgElement: SVGSVGElement | null = null;

  /**
   * Returns the fill color for a chart element based on its index.
   * @param index - The index of the element in the data array
   * @returns A color string in rgba format with 0.2 opacity
   */
  public getColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.2)`;
  }

  /**
   * Returns the hover color for a chart element based on its index.
   * @param index - The index of the element in the data array
   * @returns A color string in rgba format with 0.4 opacity
   */
  public getHoverColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.4)`;
  }

  /**
   * Returns the border color for a chart element based on its index.
   * @param index - The index of the element in the data array
   * @returns A color string in rgba format with 1.0 opacity
   */
  public getBorderColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 1)`;
  }

  /**
   * Creates the render root element and adds necessary styles.
   * @returns The render root element
   */
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

  /**
   * Lifecycle method called after the component is first updated.
   * Initializes the chart by creating the SVG element and setting up the title.
   */
  protected firstUpdated() {
    this.drawChart();
  }

  public get isAnimationEnabled() {
    return this.animationEnabled && this.isFirstRender;
  }

  /**
   * Initializes the chart by creating the SVG element and setting up the title.
   * This method is called after the component is first updated and can be
   * overridden by child classes to add additional initialization logic.
   */
  protected drawChart() {
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

  /**
   * Lifecycle method called when component properties change.
   * Re-draws the chart if the data has changed.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (
      changedProperties.has('data') ||
      changedProperties.has('width') ||
      changedProperties.has('height') ||
      changedProperties.has('title')
    ) {
      this.isFirstRender = true;
      this.drawChart();
    }
  }

  /**
   * Renders the chart container element.
   * @returns The rendered HTML template
   */
  protected render() {
    return html` <div class="chart-container"></div> `;
  }
}
