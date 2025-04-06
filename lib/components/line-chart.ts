import { BaseChart } from './base-chart';
import { customElement, property } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';
import { PropertyValues } from 'lit';

@customElement('line-chart')
export class LineChart extends BaseChart {
  @property()
  xKey = 'x';

  @property()
  yKey = 'y';

  @property()
  color = '#1f77b4';

  @property({ type: Number })
  lineWidth = 2;

  @property({ type: Boolean })
  showPoints = true;

  @property({ type: Number })
  pointRadius = 4;

  protected override firstUpdated() {
    super.firstUpdated();
    this.drawChart();
  }

  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (
      changedProperties.has('data') ||
      changedProperties.has('color') ||
      changedProperties.has('lineWidth') ||
      changedProperties.has('showPoints') ||
      changedProperties.has('pointRadius')
    ) {
      this.drawChart();
    }
  }

  private drawChart() {
    if (!this.renderRoot || !this.data.length) return;

    // Clear previous content
    const svg = this.renderRoot.querySelector('svg');
    if (!svg) return;
    while (svg.firstChild) {
      svg.removeChild(svg.firstChild);
    }

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    // Create chart group
    const g = SVGHelper.createGroup(
      `translate(${this.margin.left},${this.margin.top})`,
    );
    svg.appendChild(g);

    // Calculate scales
    const xValues = this.data.map((d) => d[this.xKey]);
    const yValues = this.data.map((d) => d[this.yKey]);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const yScale = (y: number) =>
      height - ((y - yMin) / (yMax - yMin)) * height;

    // Add X axis
    const xAxis = SVGHelper.createGroup(`translate(0,${height})`);
    g.appendChild(xAxis);

    // Add X axis labels
    const xTicks = 5;
    for (let i = 0; i <= xTicks; i++) {
      const x = (i * width) / xTicks;
      const value = xMin + (i * (xMax - xMin)) / xTicks;

      const text = SVGHelper.createText(value.toFixed(1), {
        x,
        y: 20,
        anchor: 'middle',
      });
      xAxis.appendChild(text);

      const line = SVGHelper.createLine({
        x1: x,
        y1: 0,
        x2: x,
        y2: height,
        stroke: '#ddd',
      });
      xAxis.appendChild(line);
    }

    // Add Y axis
    const yAxis = SVGHelper.createGroup();
    g.appendChild(yAxis);

    // Add Y axis labels
    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = (i * height) / yTicks;
      const value = yMin + (i * (yMax - yMin)) / yTicks;

      const text = SVGHelper.createText(value.toFixed(1), {
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

    // Create path for the line
    const pathData = this.data
      .map((d, i) => {
        const x = xScale(d[this.xKey]);
        const y = yScale(d[this.yKey]);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
      })
      .join(' ');

    const path = SVGHelper.createPath({
      d: pathData,
      fill: 'none',
      stroke: this.color,
      strokeWidth: this.lineWidth.toString(),
    });
    g.appendChild(path);

    // Add points if enabled
    if (this.showPoints) {
      this.data.forEach((d) => {
        const circle = SVGHelper.createCircle({
          cx: xScale(d[this.xKey]),
          cy: yScale(d[this.yKey]),
          r: this.pointRadius,
          fill: this.color,
        });
        g.appendChild(circle);
      });
    }
  }
}
