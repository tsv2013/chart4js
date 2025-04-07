import { BaseChart } from './base-chart';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

@customElement('pie-chart')
export class PieChart extends BaseChart {
  @property({ type: String }) valueKey = 'value';
  @property({ type: String }) labelKey = 'label';
  @property({ type: Number }) innerRadius = 0;
  @property({ type: Boolean }) showPercentages = true;

  @state() private hoveredSegment: number | null = null;
  @state() private total: number = 0;

  private getColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.7)`;
  }

  private getHoverColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.9)`;
  }

  private getBorderColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 1)`;
  }

  protected override firstUpdated() {
    super.firstUpdated();
    this.drawChart();
  }

  private drawChart() {
    if (!this.svgElement || !this.data.length) return;

    // Clear previous chart
    this.svgElement.innerHTML = '';

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;
    const radius = Math.min(width, height) / 2;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    // Create chart group
    const g = SVGHelper.createGroup(`translate(${centerX},${centerY})`);
    this.svgElement.appendChild(g);

    // Calculate total and angles
    this.total = this.data.reduce((sum, d) => sum + d[this.valueKey], 0);
    let startAngle = 0;

    // Draw pie segments
    this.data.forEach((d, i) => {
      const value = d[this.valueKey];
      const angle = (value / this.total) * 2 * Math.PI;
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

      // Apply hover effect if segment is hovered
      const isHovered = this.hoveredSegment === i;
      const segmentRadius = isHovered ? radius * 1.05 : radius;
      const segmentInnerRadius = isHovered
        ? this.innerRadius * 1.05
        : this.innerRadius;

      // Recalculate path with adjusted radius for hover effect
      const hoverStart = this.polarToCartesian(segmentRadius, startAngle);
      const hoverEnd = this.polarToCartesian(segmentRadius, endAngle);
      const hoverInnerStart = this.polarToCartesian(
        segmentInnerRadius,
        startAngle,
      );
      const hoverInnerEnd = this.polarToCartesian(segmentInnerRadius, endAngle);

      const hoverPathData = [
        'M',
        hoverStart.x,
        hoverStart.y,
        'A',
        segmentRadius,
        segmentRadius,
        0,
        largeArcFlag,
        1,
        hoverEnd.x,
        hoverEnd.y,
        'L',
        hoverInnerEnd.x,
        hoverInnerEnd.y,
        'A',
        segmentInnerRadius,
        segmentInnerRadius,
        0,
        largeArcFlag,
        0,
        hoverInnerStart.x,
        hoverInnerStart.y,
        'Z',
      ].join(' ');

      const path = SVGHelper.createPath({
        d: isHovered ? hoverPathData : pathData,
        fill: isHovered ? this.getHoverColor(i) : this.getColor(i),
        stroke: this.getBorderColor(i),
        strokeWidth: '2',
      });

      // Add hover events
      if (this.hoverEffects) {
        path.addEventListener('mouseenter', () => this.handleSegmentHover(i));
        path.addEventListener('mouseleave', () => this.handleSegmentLeave());
      }

      g.appendChild(path);

      // Add label
      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelPos = this.polarToCartesian(labelRadius, labelAngle);

      // Only show label if segment is large enough
      if (angle > 0.1) {
        const text = SVGHelper.createText(d[this.labelKey], {
          x: labelPos.x,
          y: labelPos.y,
          anchor: 'middle',
          dy: '.35em',
          fontSize: '12px',
          fill: this.getBorderColor(i),
        });
        g.appendChild(text);
      }

      // Add value label if enabled
      if (this.showValues && angle > 0.2) {
        const valueLabelPos = this.polarToCartesian(
          labelRadius * 0.8,
          labelAngle,
        );
        const valueText = SVGHelper.createText(value.toString(), {
          x: valueLabelPos.x,
          y: valueLabelPos.y + 15,
          anchor: 'middle',
          dy: '.35em',
          fontSize: '10px',
          fill: this.getBorderColor(i),
        });
        g.appendChild(valueText);
      }

      // Add percentage if enabled
      if (this.showPercentages && angle > 0.2) {
        const percentage = ((value / this.total) * 100).toFixed(1);
        const percentageLabelPos = this.polarToCartesian(
          labelRadius * 0.9,
          labelAngle,
        );
        const percentageText = SVGHelper.createText(`${percentage}%`, {
          x: percentageLabelPos.x,
          y: percentageLabelPos.y + 30,
          anchor: 'middle',
          dy: '.35em',
          fontSize: '10px',
          fill: this.getBorderColor(i),
        });
        g.appendChild(percentageText);
      }

      startAngle = endAngle;
    });

    // Add legend if enabled
    if (this.showLegend) {
      const legend = SVGHelper.createGroup(
        `translate(${width / 2},${height / 2 + radius + 30})`,
      );
      this.data.forEach((d, i) => {
        const legendItem = SVGHelper.createGroup(
          `translate(${i * 100 - this.data.length * 50},0)`,
        );

        const rect = SVGHelper.createRect({
          x: 0,
          y: 0,
          width: 15,
          height: 15,
          fill: this.getColor(i),
          stroke: this.getBorderColor(i),
          strokeWidth: '1',
        });
        legendItem.appendChild(rect);

        const text = SVGHelper.createText(d[this.labelKey], {
          x: 20,
          y: 12,
          fontSize: '12px',
          fill: this.getBorderColor(i),
        });
        legendItem.appendChild(text);

        legend.appendChild(legendItem);
      });
      g.appendChild(legend);
    }
  }

  private handleSegmentHover(index: number) {
    if (this.hoverEffects) {
      this.hoveredSegment = index;
      this.drawChart();
    }
  }

  private handleSegmentLeave() {
    if (this.hoverEffects) {
      this.hoveredSegment = null;
      this.drawChart();
    }
  }

  private polarToCartesian(radius: number, angle: number) {
    return {
      x: radius * Math.cos(angle - Math.PI / 2),
      y: radius * Math.sin(angle - Math.PI / 2),
    };
  }
}
