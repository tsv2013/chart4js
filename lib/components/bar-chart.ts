import { BaseChart } from './base-chart';
import { customElement, property } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

@customElement('bar-chart')
export class BarChart extends BaseChart {
  @property({ type: String }) xKey = 'category';
  @property({ type: String }) yKey = 'value';
  @property({ type: String }) color = '#1f77b4';

  protected override firstUpdated() {
    super.firstUpdated();
    this.drawChart();
  }

  private drawChart() {
    if (!this.svgElement || !this.data.length) return;

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    // Create chart group
    const g = SVGHelper.createGroup(
      `translate(${this.margin.left},${this.margin.top})`,
    );
    this.svgElement.appendChild(g);

    // Calculate scales
    const barWidth = width / this.data.length;
    const maxValue = Math.max(...this.data.map((d) => d[this.yKey]));
    const yScale = height / maxValue;

    // Add X axis
    const xAxis = SVGHelper.createGroup(`translate(0,${height})`);
    g.appendChild(xAxis);

    // Add X axis labels
    this.data.forEach((d, i) => {
      const text = SVGHelper.createText(d[this.xKey], {
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
      const value = ((i * maxValue) / yTicks).toFixed(1);

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
    this.data.forEach((d, i) => {
      const barHeight = d[this.yKey] * yScale;
      const rect = SVGHelper.createRect({
        x: i * barWidth,
        y: height - barHeight,
        width: barWidth - 2,
        height: barHeight,
        fill: this.color,
      });
      g.appendChild(rect);
    });
  }
}
