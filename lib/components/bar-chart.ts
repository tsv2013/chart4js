import { BaseChart } from './base-chart';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

/**
 * Bar chart component that extends the base chart functionality.
 * Displays data as vertical or horizontal bars, with support for
 * multiple datasets, animations, and interactive features.
 *
 * @example
 * ```html
 * <bar-chart
 *   width="600"
 *   height="400"
 *   title="Sales by Category"
 *   data="[{'category': 'Electronics', 'value': 120}, {'category': 'Clothing', 'value': 80}]"
 *   xKey="category"
 *   yKey="value"
 *   showLegend="true"
 *   showValues="true"
 * ></bar-chart>
 * ```
 */
@customElement('bar-chart')
export class BarChart extends BaseChart {
  /** Property name in the data objects that represents the X-axis categories */
  @property({ type: String }) xKey = 'category';

  /** Property name in the data objects that represents the Y-axis values */
  @property({ type: String }) yKey = 'value';

  /** Default color for the bars when not using the color palette */
  @property({ type: String }) color = '#1f77b4';

  /** Whether to show navigation buttons for paginated data */
  @property({ type: Boolean }) showButtons = true;

  /** Maximum number of bars to display at once */
  @property({ type: Number }) limit = 10;

  /** Current offset for paginated data display */
  @state() private offset = 0;

  /** Processed data ready for rendering */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @state() private processedData: any[] = [];

  /** Array of dataset keys for multi-dataset charts */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @state() private datasets: any[] = [];

  /** Maximum value in the dataset for scaling purposes */
  @state() private maxValue = 0;

  /** Index of the currently hovered bar, or null if none */
  @state() private hoveredBar: number | null = null;

  /**
   * Lifecycle method called after the component is first updated.
   * Processes the data and draws the chart.
   */
  protected override firstUpdated() {
    super.firstUpdated();
    this.processData();
    this.drawChart();
  }

  /**
   * Checks if the chart has multiple datasets.
   * @returns True if the chart has multiple datasets, false otherwise
   */
  public get hasMultipleDatasets() {
    return this.datasets && this.datasets.length;
  }

  /**
   * Processes the raw data into a format suitable for rendering.
   * Handles both single and multiple dataset scenarios.
   */
  private processData() {
    if (!this.data.length) return;

    this.isFirstRender = true;

    if (this.hasMultipleDatasets) {
      const processedData: any[] = [];

      const categories = [...new Set(this.data.map((item) => item[this.xKey]))];

      categories.forEach((category) => {
        const categoryData = this.data.find(
          (item) => item[this.xKey] === category,
        );
        const values = this.datasets.map(
          (datasetKey) => categoryData[datasetKey],
        );
        const maxValue = Math.max(...values);
        this.maxValue = Math.max(this.maxValue, maxValue);

        processedData.push({
          label: category,
          data: values,
          colors: this.datasets.map((_, i) => this.getColor(i)),
          hoverColors: this.datasets.map((_, i) => this.getHoverColor(i)),
          borderColors: this.datasets.map((_, i) => this.getBorderColor(i)),
        });
      });

      this.processedData = processedData.slice(
        this.offset,
        this.offset + this.limit,
      );
    } else {
      this.maxValue = 0;

      const processedData: any[] = this.data.map((item, index) => {
        const value = item[this.yKey];
        this.maxValue = Math.max(this.maxValue, value);

        return {
          label: item[this.xKey],
          data: [value],
          color: this.getColor(index),
          hoverColor: this.getHoverColor(index),
        };
      });

      this.processedData = processedData.slice(
        this.offset,
        this.offset + this.limit,
      );
    }
  }

  private prev() {
    if (this.offset >= this.limit) {
      this.offset -= this.limit;
      this.processData();
      this.drawChart();
    }
  }

  private next() {
    this.offset += this.limit;
    this.processData();
    this.drawChart();
  }

  private handleBarHover(index: number) {
    if (this.hoverEffects) {
      this.hoveredBar = index;
      this.updateBarColors();
    }
  }

  private handleBarLeave() {
    if (this.hoverEffects) {
      this.hoveredBar = null;
      this.updateBarColors();
    }
  }

  private updateBarColors() {
    if (!this.renderRoot) return;

    const svg = this.renderRoot.querySelector('svg');
    if (!svg) return;

    const bars = svg.querySelectorAll('rect');
    bars.forEach((bar, i) => {
      const barIndex = Math.floor(
        i / (this.hasMultipleDatasets ? this.datasets.length : 1),
      );

      if (this.hoveredBar === barIndex) {
        if (this.hasMultipleDatasets) {
          const datasetIndex = i % this.datasets.length;
          bar.setAttribute(
            'fill',
            this.processedData[barIndex].hoverColors[datasetIndex],
          );
        } else {
          bar.setAttribute('fill', this.processedData[barIndex].hoverColor);
        }
      } else {
        if (this.hasMultipleDatasets) {
          const datasetIndex = i % this.datasets.length;
          bar.setAttribute(
            'fill',
            this.processedData[barIndex].colors[datasetIndex],
          );
        } else {
          bar.setAttribute('fill', this.processedData[barIndex].color);
        }
      }
    });
  }

  private drawChart() {
    if (!this.renderRoot || !this.processedData.length) return;

    const svg = this.renderRoot.querySelector('svg');
    if (!svg) return;
    svg.innerHTML = '';

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    const g = SVGHelper.createGroup(
      `translate(${this.margin.left},${this.margin.top})`,
    );
    svg.appendChild(g);

    const xScale = (x: number) => (x / this.processedData.length) * width;
    const yScale = (y: number) => (y / this.maxValue) * height; // Fixed: Correct y-axis direction

    const xAxis = SVGHelper.createGroup(`translate(0,${height})`);
    g.appendChild(xAxis);

    const xAxisLine = SVGHelper.createLine({
      x1: 0,
      y1: 0,
      x2: width,
      y2: 0,
      stroke: '#ddd',
    });
    xAxis.appendChild(xAxisLine);

    const yAxis = SVGHelper.createGroup();
    g.appendChild(yAxis);

    const yAxisLine = SVGHelper.createLine({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: height,
      stroke: '#ddd',
    });
    yAxis.appendChild(yAxisLine);

    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = height - (i * height) / yTicks;
      const value = (this.maxValue * i) / yTicks;

      const text = SVGHelper.createText(value.toFixed(0), {
        x: -5,
        y,
        anchor: 'end',
      });
      yAxis.appendChild(text);

      const line = SVGHelper.createLine({
        x1: 0,
        y1: y,
        x2: width,
        y2: y,
        stroke: '#ddd',
      });
      yAxis.appendChild(line);
    }

    if (this.hasMultipleDatasets) {
      this.processedData.forEach((item, index) => {
        const x = xScale(index);
        const barWidth = xScale(1) * 0.8;

        const datasetCount = this.datasets.length;
        const singleBarWidth = barWidth / datasetCount;

        this.datasets.forEach((dataset, datasetIndex) => {
          const value = item.data[datasetIndex];
          const barHeight = yScale(value);
          const barX = x + datasetIndex * singleBarWidth;

          // Create the bar
          const bar = SVGHelper.createRect({
            x: barX,
            y: height,
            width: singleBarWidth,
            height: 0,
            fill:
              this.hoveredBar === index
                ? item.hoverColors[datasetIndex]
                : item.colors[datasetIndex],
            stroke: item.borderColors[datasetIndex],
            strokeWidth: '1',
          });

          if (this.isFirstRender) {
            bar.style.transition = `height ${this.animationDuration}ms ease-out, y ${this.animationDuration}ms ease-out`;
          }

          if (this.hoverEffects) {
            bar.addEventListener('mouseenter', () =>
              this.handleBarHover(index),
            );
            bar.addEventListener('mouseleave', () => this.handleBarLeave());
          }

          g.appendChild(bar);

          setTimeout(() => {
            bar.setAttribute('height', barHeight.toString());
            bar.setAttribute('y', (height - barHeight).toString());
          }, 50);

          if (this.showValues) {
            const text = SVGHelper.createText(value.toFixed(0), {
              x: barX + singleBarWidth / 2,
              y: height - barHeight - 5, // Fixed: Correct label position
              anchor: 'middle',
            });

            if (this.isFirstRender) {
              text.style.transition = `opacity ${this.animationDuration}ms ease-out`;
              text.style.opacity = '0';
            } else {
              text.style.opacity = '1';
            }

            g.appendChild(text);

            if (this.isFirstRender) {
              setTimeout(() => {
                text.style.opacity = '1';
              }, this.animationDuration / 2);
            }
          }
        });

        const text = SVGHelper.createText(item.label, {
          x: x + barWidth / 2,
          y: 20,
          anchor: 'middle',
        });
        xAxis.appendChild(text);
      });

      if (this.showLegend) {
        this.renderLegend(g, width);
      }
    } else {
      this.processedData.forEach((item, index) => {
        const x = xScale(index);
        const barWidth = xScale(1) * 0.8;
        const value = item.data[0];
        const barHeight = yScale(value);

        const bar = SVGHelper.createRect({
          x,
          y: height,
          width: barWidth,
          height: 0,
          fill: this.hoveredBar === index ? item.hoverColor : item.color,
          stroke: this.getBorderColor(index),
          strokeWidth: '1',
        });

        if (this.isFirstRender) {
          bar.style.transition = `height ${this.animationDuration}ms ease-out, y ${this.animationDuration}ms ease-out`;
        }

        if (this.hoverEffects) {
          bar.addEventListener('mouseenter', () => this.handleBarHover(index));
          bar.addEventListener('mouseleave', () => this.handleBarLeave());
        }

        g.appendChild(bar);

        setTimeout(() => {
          bar.setAttribute('height', barHeight.toString());
          bar.setAttribute('y', (height - barHeight).toString());
        }, 50);

        if (this.showValues) {
          const text = SVGHelper.createText(value.toFixed(0), {
            x: x + barWidth / 2,
            y: height - barHeight - 5,
            anchor: 'middle',
          });

          if (this.isFirstRender) {
            text.style.transition = `opacity ${this.animationDuration}ms ease-out`;
            text.style.opacity = '0';
          } else {
            text.style.opacity = '1';
          }

          g.appendChild(text);

          if (this.isFirstRender) {
            setTimeout(() => {
              text.style.opacity = '1';
            }, this.animationDuration / 2);
          }
        }

        const text = SVGHelper.createText(item.label, {
          x: x + barWidth / 2,
          y: 20,
          anchor: 'middle',
        });
        xAxis.appendChild(text);
      });
    }

    this.isFirstRender = false;
  }

  private renderLegend(g: SVGGElement, width: number) {
    const legend = SVGHelper.createGroup(
      `translate(${width / 2},${this.height - this.margin.bottom + 25})`,
    );
    g.appendChild(legend);

    this.datasets.forEach((dataset, index) => {
      const legendItem = SVGHelper.createGroup(
        `translate(${index * 100 - this.datasets.length * 50},0)`,
      );

      const box = SVGHelper.createRect({
        x: 0,
        y: -7.5,
        width: 15,
        height: 15,
        fill: this.getColor(index),
        stroke: this.getBorderColor(index),
        strokeWidth: '1',
      });
      legendItem.appendChild(box);

      const text = SVGHelper.createText(
        dataset.label || `Dataset ${index + 1}`,
        {
          x: 20,
          y: 4,
          fontSize: '12px',
        },
      );
      legendItem.appendChild(text);

      legend.appendChild(legendItem);
    });
  }

  protected override render() {
    return html`
      <div class="chart-container">
        ${this.showButtons
          ? html`
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
            `
          : ''}
      </div>
    `;
  }
}
