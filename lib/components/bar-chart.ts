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

  public get hasMultipleDatasets() {
    return this.datasets && this.datasets.length;
  }

  private processData() {
    if (!this.data.length) return;

    // Check if we have multiple datasets
    if (this.hasMultipleDatasets) {
      // Process multiple datasets
      const processedData: any[] = [];

      // Group data by category
      const categories = [...new Set(this.data.map((item) => item[this.xKey]))];

      // For each category, create a dataset entry
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
      // Original single dataset processing
      this.maxValue = 0;

      // Create datasets directly from the data
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

      // Apply pagination
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
    if (!this.renderRoot || !this.processedData.length) return;

    // Clear previous content
    const svg = this.renderRoot.querySelector('svg');
    if (!svg) return;
    svg.innerHTML = '';

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    // Create chart group
    const g = SVGHelper.createGroup(
      `translate(${this.margin.left},${this.margin.top})`,
    );
    svg.appendChild(g);

    // Calculate scales - Fix y-axis direction
    const xScale = (x: number) => (x / this.processedData.length) * width;
    const yScale = (y: number) => (y / this.maxValue) * height; // Fixed: Correct y-axis direction

    // Draw axes
    const xAxis = SVGHelper.createGroup(`translate(0,${height})`);
    g.appendChild(xAxis);

    // Draw X axis line
    const xAxisLine = SVGHelper.createLine({
      x1: 0,
      y1: 0,
      x2: width,
      y2: 0,
      stroke: '#ddd',
    });
    xAxis.appendChild(xAxisLine);

    // Draw Y axis
    const yAxis = SVGHelper.createGroup();
    g.appendChild(yAxis);

    // Draw Y axis line
    const yAxisLine = SVGHelper.createLine({
      x1: 0,
      y1: 0,
      x2: 0,
      y2: height,
      stroke: '#ddd',
    });
    yAxis.appendChild(yAxisLine);

    // Draw Y axis labels - Fix y-axis direction
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = height - (i * height) / yTicks; // Fixed: Correct y-axis direction
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

    // Check if we have multiple datasets
    if (this.hasMultipleDatasets) {
      // Draw bars for multiple datasets
      this.processedData.forEach((item, index) => {
        const x = xScale(index);
        const barWidth = xScale(1) * 0.8; // 80% of the available width

        // Calculate the number of datasets and the width for each bar
        const datasetCount = this.datasets.length;
        const singleBarWidth = barWidth / datasetCount;

        // Draw a bar for each dataset
        this.datasets.forEach((dataset, datasetIndex) => {
          const value = item.data[datasetIndex];
          const barHeight = yScale(value); // Fixed: Correct bar height calculation
          const barX = x + datasetIndex * singleBarWidth;

          // Create the bar
          const bar = SVGHelper.createRect({
            x: barX,
            y: height - barHeight, // Fixed: Correct bar position
            width: singleBarWidth,
            height: barHeight,
            fill:
              this.hoveredBar === index
                ? item.hoverColors[datasetIndex]
                : item.colors[datasetIndex],
            stroke: item.borderColors[datasetIndex],
            strokeWidth: '1',
          });

          // Add hover effects
          if (this.hoverEffects) {
            bar.addEventListener('mouseenter', () => {
              this.hoveredBar = index;
              this.drawChart();
            });
            bar.addEventListener('mouseleave', () => {
              this.hoveredBar = null;
              this.drawChart();
            });
          }

          g.appendChild(bar);

          // Add value labels if enabled
          if (this.showValues) {
            const text = SVGHelper.createText(value.toFixed(0), {
              x: barX + singleBarWidth / 2,
              y: height - barHeight - 5, // Fixed: Correct label position
              anchor: 'middle',
            });
            g.appendChild(text);
          }
        });

        // Add X axis labels
        const text = SVGHelper.createText(item.label, {
          x: x + barWidth / 2,
          y: 20,
          anchor: 'middle',
        });
        xAxis.appendChild(text);
      });

      // Render legend if enabled
      if (this.showLegend) {
        this.renderLegend(g, width);
      }
    } else {
      // Draw bars for single dataset
      this.processedData.forEach((item, index) => {
        const x = xScale(index);
        const barWidth = xScale(1) * 0.8; // 80% of the available width
        const value = item.data[0];
        const barHeight = yScale(value); // Fixed: Correct bar height calculation

        // Create the bar
        const bar = SVGHelper.createRect({
          x,
          y: height - barHeight, // Fixed: Correct bar position
          width: barWidth,
          height: barHeight,
          fill: this.hoveredBar === index ? item.hoverColor : item.color,
          stroke: this.getBorderColor(index),
          strokeWidth: '1',
        });

        // Add hover effects
        if (this.hoverEffects) {
          bar.addEventListener('mouseenter', () => {
            this.hoveredBar = index;
            this.drawChart();
          });
          bar.addEventListener('mouseleave', () => {
            this.hoveredBar = null;
            this.drawChart();
          });
        }

        g.appendChild(bar);

        // Add value labels if enabled
        if (this.showValues) {
          const text = SVGHelper.createText(value.toFixed(0), {
            x: x + barWidth / 2,
            y: height - barHeight - 5, // Fixed: Correct label position
            anchor: 'middle',
          });
          g.appendChild(text);
        }

        // Add X axis labels
        const text = SVGHelper.createText(item.label, {
          x: x + barWidth / 2,
          y: 20,
          anchor: 'middle',
        });
        xAxis.appendChild(text);
      });
    }
  }

  private renderLegend(g: SVGGElement, width: number) {
    const legend = SVGHelper.createGroup(
      `translate(${width / 2},${this.height - this.margin.bottom + 25})`,
    );
    g.appendChild(legend);

    // Add legend items
    this.datasets.forEach((dataset, index) => {
      const legendItem = SVGHelper.createGroup(
        `translate(${index * 100 - this.datasets.length * 50},0)`,
      );

      // Add color box
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

      // Add label
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
