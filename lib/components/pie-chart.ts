import { BaseChart } from './base-chart';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

@customElement('pie-chart')
export class PieChart extends BaseChart {
  @property({ type: String }) valueKey = 'value';
  @property({ type: String }) labelKey = 'label';
  @property({ type: Number }) innerRadius = 0;
  @property({ type: Boolean }) showPercentages = true;
  @property({ type: Number }) animationDuration = 300;

  @state() private hoveredSegment: number | null = null;
  @state() private total: number = 0;
  @state() private labelPositions: { x: number; y: number }[] = [];
  @state() private isFirstRender = true;

  protected override firstUpdated() {
    super.firstUpdated();
    this.drawChart();
  }

  protected override updated(changedProperties: Map<string, object>) {
    super.updated(changedProperties);
    if (changedProperties.has('data')) {
      this.isFirstRender = true;
      this.drawChart();
    }
  }

  private drawChart() {
    if (!this.svgElement || !this.data.length) return;

    this.svgElement.innerHTML = '';

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;
    const radius = Math.min(width, height) / 2;
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const g = SVGHelper.createGroup(`translate(${centerX},${centerY})`);
    this.svgElement.appendChild(g);

    this.total = this.data.reduce((sum, d) => sum + d[this.valueKey], 0);
    let startAngle = 0;

    this.labelPositions = [];

    this.data.forEach((d, i) => {
      const value = d[this.valueKey];
      const angle = (value / this.total) * 2 * Math.PI;
      const endAngle = startAngle + angle;

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

      const isHovered = this.hoveredSegment === i;
      const segmentRadius = isHovered ? radius * 1.05 : radius;
      const segmentInnerRadius = isHovered
        ? this.innerRadius * 1.05
        : this.innerRadius;

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
        strokeWidth: '1',
      });

      path.style.transition = `transform ${this.animationDuration}ms ease-out`;
      path.style.transformOrigin = '0 0';

      if (this.isFirstRender) {
        path.style.transform = 'scale(0)';
        path.style.opacity = '0';
      }

      if (this.hoverEffects) {
        path.addEventListener('mouseenter', () => this.handleSegmentHover(i));
        path.addEventListener('mouseleave', () => this.handleSegmentLeave());
      }

      g.appendChild(path);

      if (this.isFirstRender) {
        requestAnimationFrame(() => {
          path.style.transform = 'scale(1)';
          path.style.opacity = '1';
        });
      }

      const labelAngle = startAngle + angle / 2;
      const labelRadius = radius * 0.7;
      const labelPos = this.polarToCartesian(labelRadius, labelAngle);

      this.labelPositions[i] = { x: labelPos.x, y: labelPos.y };

      if (angle > 0.1 || isHovered) {
        const labelGroup = SVGHelper.createGroup(
          `translate(${labelPos.x},${labelPos.y})`,
        );

        const text = SVGHelper.createText(d[this.labelKey], {
          x: 0,
          y: 0,
          anchor: 'middle',
          dy: '.35em',
          fontSize: isHovered ? '16px' : '12px',
        });
        text.style.fill = this.getBorderColor(i);
        labelGroup.appendChild(text);

        if (this.showValues && (angle > 0.2 || isHovered)) {
          const valueText = SVGHelper.createText(value.toString(), {
            x: 0,
            y: 15,
            anchor: 'middle',
            dy: '.35em',
            fontSize: isHovered ? '14px' : '10px',
          });
          valueText.style.fill = this.getBorderColor(i);
          labelGroup.appendChild(valueText);
        }

        if (this.showPercentages && (angle > 0.2 || isHovered)) {
          const percentage = ((value / this.total) * 100).toFixed(1);
          const percentageText = SVGHelper.createText(`${percentage}%`, {
            x: 0,
            y: 30,
            anchor: 'middle',
            dy: '.35em',
            fontSize: isHovered ? '14px' : '10px',
          });
          percentageText.style.fill = this.getBorderColor(i);
          labelGroup.appendChild(percentageText);
        }

        const dirX = labelPos.x;
        const dirY = labelPos.y;
        const length = Math.sqrt(dirX * dirX + dirY * dirY);

        const normalizedDirX = dirX / length;
        const normalizedDirY = dirY / length;

        const offsetFactor = isHovered ? 0.5 : 0.1;
        const newX = labelPos.x + normalizedDirX * radius * offsetFactor;
        const newY = labelPos.y + normalizedDirY * radius * offsetFactor;

        labelGroup.setAttribute('transform', `translate(${newX},${newY})`);

        labelGroup.style.transition = `transform ${this.animationDuration}ms ease-out`;

        if (this.isFirstRender) {
          labelGroup.style.opacity = '0';
          labelGroup.style.transition = `transform ${this.animationDuration}ms ease-out, opacity ${this.animationDuration}ms ease-out`;
        }

        g.appendChild(labelGroup);

        if (this.isFirstRender) {
          requestAnimationFrame(() => {
            labelGroup.style.opacity = '1';
          });
        }
      }

      startAngle = endAngle;
    });

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
        });
        text.style.fill = this.getBorderColor(i);
        legendItem.appendChild(text);

        legend.appendChild(legendItem);
      });
      g.appendChild(legend);
    }

    if (this.isFirstRender) {
      setTimeout(() => {
        this.isFirstRender = false;
      }, this.animationDuration);
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
