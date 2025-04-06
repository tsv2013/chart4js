import { BaseChart } from './base-chart';
import { customElement, property } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

@customElement('pie-chart')
export class PieChart extends BaseChart {
  @property({ type: String }) valueKey = 'value';
  @property({ type: String }) labelKey = 'label';
  @property({ type: Number }) innerRadius = 0;
  @property({ type: Array }) colors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
  ];

  protected override firstUpdated() {
    super.firstUpdated();
    this.drawChart();
  }

  private drawChart() {
    if (!this.svgElement || !this.data.length) return;

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;
    const radius = Math.min(width, height) / 2;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Create chart group
    const g = SVGHelper.createGroup(`translate(${centerX},${centerY})`);
    this.svgElement.appendChild(g);

    // Calculate total and angles
    const total = this.data.reduce((sum, d) => sum + d[this.valueKey], 0);
    let startAngle = 0;

    // Draw pie segments
    this.data.forEach((d, i) => {
      const value = d[this.valueKey];
      const angle = (value / total) * 2 * Math.PI;
      const endAngle = startAngle + angle;

      // Create path for pie segment
      const start = this.polarToCartesian(radius, startAngle);
      const end = this.polarToCartesian(radius, endAngle);
      const innerStart = this.polarToCartesian(this.innerRadius, startAngle);
      const innerEnd = this.polarToCartesian(this.innerRadius, endAngle);

      const largeArcFlag = angle > Math.PI ? 1 : 0;
      const pathData = [
        'M',
        start.x,
        start.y,
        'A',
        radius,
        radius,
        0,
        largeArcFlag,
        1,
        end.x,
        end.y,
        'L',
        innerEnd.x,
        innerEnd.y,
        'A',
        this.innerRadius,
        this.innerRadius,
        0,
        largeArcFlag,
        0,
        innerStart.x,
        innerStart.y,
        'Z',
      ].join(' ');

      const path = SVGHelper.createPath({
        d: pathData,
        fill: this.colors[i % this.colors.length],
        stroke: 'white',
        strokeWidth: '2',
      });
      g.appendChild(path);

      // Add label
      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelPos = this.polarToCartesian(labelRadius, labelAngle);

      const text = SVGHelper.createText(d[this.labelKey], {
        x: labelPos.x,
        y: labelPos.y,
        anchor: 'middle',
        dy: '.35em',
      });
      g.appendChild(text);

      startAngle = endAngle;
    });
  }

  private polarToCartesian(radius: number, angle: number) {
    return {
      x: radius * Math.cos(angle - Math.PI / 2),
      y: radius * Math.sin(angle - Math.PI / 2),
    };
  }
}
