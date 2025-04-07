import { BaseChart } from './base-chart';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

@customElement('bar-chart')
export class BarChart extends BaseChart {
  @property({ type: String }) xKey = 'category';
  @property({ type: String }) yKey = 'value';
  @property({ type: String }) color = '#1f77b4';
  @property({ type: Boolean }) showButtons = true;
  @property({ type: Number }) limit = 10;

  @state() private offset = 0;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @state() private processedData: any[] = [];
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @state() private datasets: any[] = [];
  @state() private maxValue = 0;
  @state() private hoveredBar: number | null = null;

  protected override firstUpdated() {
    super.firstUpdated();
    this.processData();
    this.drawChart();
  }

  private processData() {
    if (!this.data.length) return;

    // Group data by xKey if multiple datasets
    const groupedData = this.data.reduce((acc, item) => {
      const xValue = item[this.xKey];
      if (!acc[xValue]) {
        acc[xValue] = [];
      }
      acc[xValue].push(item);
      return acc;
    }, {});

    // Create datasets
    this.datasets = Object.keys(groupedData).map((xValue, index) => {
      const items = groupedData[xValue];
      const values = items.map((item) => item[this.yKey]);
      const maxValue = Math.max(...values);
      this.maxValue = Math.max(this.maxValue, maxValue);

      return {
        label: xValue,
        data: values,
        color: this.getColor(index),
        hoverColor: this.getHoverColor(index),
      };
    });

    // Apply pagination
    this.processedData = this.datasets.slice(
      this.offset,
      this.offset + this.limit,
    );
  }

  private getColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.2)`;
  }

  private getHoverColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.4)`;
  }

  private getBorderColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 1)`;
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
      this.drawChart();
    }
  }

  private handleBarLeave() {
    if (this.hoverEffects) {
      this.hoveredBar = null;
      this.drawChart();
    }
  }

  private drawChart() {
    if (!this.svgElement || !this.processedData.length) return;

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    // Clear previous chart
    this.svgElement.innerHTML = '';

    // Create chart group
    const g = SVGHelper.createGroup(
      `translate(${this.margin.left},${this.margin.top})`,
    );
    this.svgElement.appendChild(g);

    // Calculate scales
    const barWidth = width / this.processedData.length;
    const yScale = height / this.maxValue;

    // Add X axis
    const xAxis = SVGHelper.createGroup(`translate(0,${height})`);
    g.appendChild(xAxis);

    // Add X axis labels
    this.processedData.forEach((dataset, i) => {
      const text = SVGHelper.createText(dataset.label, {
        x: i * barWidth + barWidth / 2,
        y: 20,
        anchor: 'middle',
        transform: 'rotate(-45)',
      });
      xAxis.appendChild(text);
    });

    // Add Y axis
    const yAxis = SVGHelper.createGroup();
    g.appendChild(yAxis);

    // Add Y axis labels
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = height - (i * height) / yTicks;
      const value = ((i * this.maxValue) / yTicks).toFixed(1);

      const text = SVGHelper.createText(value, {
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

    // Add bars
    this.processedData.forEach((dataset, i) => {
      const barHeight = dataset.data[0] * yScale;
      const rect = SVGHelper.createRect({
        x: i * barWidth,
        y: height - barHeight,
        width: barWidth - 2,
        height: barHeight,
        fill: this.hoveredBar === i ? dataset.hoverColor : dataset.color,
        stroke: this.getBorderColor(i),
        strokeWidth: 1,
      });

      // Add hover events
      if (this.hoverEffects) {
        rect.addEventListener('mouseenter', () => this.handleBarHover(i));
        rect.addEventListener('mouseleave', () => this.handleBarLeave());
      }

      g.appendChild(rect);

      // Add value labels
      if (this.showValues) {
        const text = SVGHelper.createText(dataset.data[0].toString(), {
          x: i * barWidth + (barWidth - 2) / 2,
          y: height - barHeight - 5,
          anchor: 'middle',
          fontSize: '12px',
        });
        g.appendChild(text);
      }
    });

    // Add legend if enabled
    if (this.showLegend) {
      const legend = SVGHelper.createGroup(`translate(0,${height + 30})`);
      this.processedData.forEach((dataset, i) => {
        const legendItem = SVGHelper.createGroup(`translate(${i * 100},0)`);

        const rect = SVGHelper.createRect({
          x: 0,
          y: 0,
          width: 15,
          height: 15,
          fill: dataset.color,
          stroke: this.getBorderColor(i),
        });
        legendItem.appendChild(rect);

        const text = SVGHelper.createText(dataset.label, {
          x: 20,
          y: 12,
          fontSize: '12px',
        });
        legendItem.appendChild(text);

        legend.appendChild(legendItem);
      });
      g.appendChild(legend);
    }
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
