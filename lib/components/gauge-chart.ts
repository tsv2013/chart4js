import { BaseChart } from './base-chart';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';

interface GaugeTheme {
  backgroundColor: string;
  tickColor: string;
  labelColor: string;
  valueColor: string;
  titleColor: string;
}

@customElement('gauge-chart')
export class GaugeChart extends BaseChart {
  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) warningValue = 70;
  @property({ type: Number }) criticalValue = 90;
  @property({ type: Number }) startAngle = -90;
  @property({ type: Number }) endAngle = 90;
  @property({ type: Number }) arcThickness = 30;
  @property({ type: Boolean }) showTicks = true;
  @property({ type: Boolean }) showLabels = true;
  @property({ type: Number }) numTicks = 5;
  @property({ type: String }) units = '';
  @property({ type: String }) title = '';
  @property({ type: String }) subtitle = '';
  @property({ type: Number }) precision = 0;
  @property({ type: Number }) animationDuration = 1000;
  private theme: GaugeTheme = {
    backgroundColor: 'rgba(200, 200, 200, 0.2)',
    tickColor: 'rgba(0, 0, 0, 0.6)',
    labelColor: 'rgba(0, 0, 0, 0.7)',
    valueColor: 'rgba(0, 0, 0, 0.85)',
    titleColor: 'rgba(0, 0, 0, 0.85)',
  };

  @state() private isHovered = false;
  @state() private animatedValue = 0;
  @state() private animationInProgress = false;

  protected override firstUpdated() {
    super.firstUpdated();
    this.drawChart();
    this.animateValue();
  }

  protected override updated(changedProperties: Map<string, object>) {
    super.updated(changedProperties);
    if (changedProperties.has('value')) {
      this.animateValue();
    }
  }

  private animateValue() {
    if (this.animationInProgress) return;

    this.animationInProgress = true;
    const startValue = this.animatedValue;
    const endValue = this.value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.animationDuration, 1);

      const easeOut = 1 - Math.pow(1 - progress, 3);

      this.animatedValue = startValue + (endValue - startValue) * easeOut;
      this.drawChart();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        this.animationInProgress = false;
      }
    };

    requestAnimationFrame(animate);
  }

  private drawChart() {
    if (!this.svgElement) return;

    this.svgElement.innerHTML = '';

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;
    const radius = Math.min(width, height) / 2;
    const centerX = this.width / 2;
    const centerY = this.height / 2;

    this.svgElement.setAttribute(
      'viewBox',
      `0 0 ${this.width} ${this.height * 0.7}`,
    );

    const g = SVGHelper.createGroup(`translate(${centerX},${centerY * 0.75})`);
    this.svgElement.appendChild(g);

    const outerRadius = radius * 0.9;
    const innerRadius = outerRadius - this.arcThickness;

    const backgroundPath = SVGHelper.createPath({
      d: this.createArc(
        outerRadius,
        innerRadius,
        this.startAngle,
        this.endAngle,
      ),
      fill: this.theme.backgroundColor,
      stroke: 'rgba(0, 0, 0, 0.1)',
      strokeWidth: '1',
    });
    g.appendChild(backgroundPath);

    const dynamicColorZones = [
      { min: this.min, max: this.warningValue, color: this.getColor(0) },
      {
        min: this.warningValue,
        max: this.criticalValue,
        color: this.getColor(4),
      },
      { min: this.criticalValue, max: this.max, color: this.getColor(1) },
    ];

    dynamicColorZones.forEach((zone) => {
      const startAngle = this.valueToAngle(zone.min);
      const endAngle = this.valueToAngle(zone.max);
      const zonePath = SVGHelper.createPath({
        d: this.createArc(outerRadius, innerRadius, startAngle, endAngle),
        fill: zone.color,
        stroke: 'none',
      });
      g.appendChild(zonePath);
    });

    const warningAngle = this.valueToAngle(this.warningValue);
    const criticalAngle = this.valueToAngle(this.criticalValue);

    const warningPoint = this.polarToCartesian(outerRadius + 10, warningAngle);
    const warningMarker = SVGHelper.createCircle({
      cx: warningPoint.x,
      cy: warningPoint.y,
      r: 5,
      fill: this.getColor(4),
    });
    g.appendChild(warningMarker);

    const warningLabelPoint = this.polarToCartesian(
      outerRadius + 25,
      warningAngle,
    );
    const warningLabel = SVGHelper.createText('Warning', {
      x: warningLabelPoint.x,
      y: warningLabelPoint.y,
      anchor: 'start',
      dy: '.35em',
      fontSize: '12px',
    });
    warningLabel.style.fill = this.getColor(4);
    warningLabel.style.fontWeight = 'bold';
    g.appendChild(warningLabel);

    const criticalPoint = this.polarToCartesian(
      outerRadius + 10,
      criticalAngle,
    );
    const criticalMarker = SVGHelper.createCircle({
      cx: criticalPoint.x,
      cy: criticalPoint.y,
      r: 5,
      fill: this.getColor(1),
    });
    g.appendChild(criticalMarker);

    const criticalLabelPoint = this.polarToCartesian(
      outerRadius + 25,
      criticalAngle,
    );
    const criticalLabel = SVGHelper.createText('Critical', {
      x: criticalLabelPoint.x,
      y: criticalLabelPoint.y,
      anchor: 'start',
      dy: '.35em',
      fontSize: '12px',
    });
    criticalLabel.style.fill = this.getColor(1);
    criticalLabel.style.fontWeight = 'bold';
    g.appendChild(criticalLabel);

    if (this.showTicks || this.showLabels) {
      for (let i = 0; i <= this.numTicks; i++) {
        const tickValue =
          this.min + (i / this.numTicks) * (this.max - this.min);
        const angle = this.valueToAngle(tickValue);
        const outerPoint = this.polarToCartesian(outerRadius + 5, angle);
        const innerPoint = this.polarToCartesian(outerRadius - 5, angle);

        if (this.showTicks) {
          const tick = SVGHelper.createLine({
            x1: innerPoint.x,
            y1: innerPoint.y,
            x2: outerPoint.x,
            y2: outerPoint.y,
            stroke: this.theme.tickColor,
          });
          g.appendChild(tick);
        }

        if (this.showLabels) {
          const labelPoint = this.polarToCartesian(outerRadius + 20, angle);
          const formattedValue = tickValue.toFixed(this.precision);
          const label = SVGHelper.createText(
            this.units ? `${formattedValue}${this.units}` : formattedValue,
            {
              x: labelPoint.x,
              y: labelPoint.y,
              anchor: 'middle',
              dy: '.35em',
              fontSize: '12px',
            },
          );
          label.style.fill = this.theme.labelColor;
          g.appendChild(label);
        }
      }
    }

    if (this.title) {
      const titleText = SVGHelper.createText(this.title, {
        x: 0,
        y: -radius / 2,
        anchor: 'middle',
        fontSize: '16px',
      });
      titleText.style.fill = this.theme.titleColor;
      titleText.style.fontWeight = 'bold';
      g.appendChild(titleText);
    }

    if (this.subtitle) {
      const subtitleText = SVGHelper.createText(this.subtitle, {
        x: 0,
        y: -radius / 2 + 20,
        anchor: 'middle',
        fontSize: '14px',
      });
      subtitleText.style.fill = this.theme.titleColor;
      g.appendChild(subtitleText);
    }

    const formattedValue = this.animatedValue.toFixed(this.precision);

    const valueAngle = this.valueToAngle(this.animatedValue);

    const lineLength = 15;
    const lineRadius = outerRadius - this.arcThickness / 2;
    const lineStartPoint = this.polarToCartesian(
      lineRadius - lineLength,
      valueAngle,
    );
    const lineEndPoint = this.polarToCartesian(
      lineRadius + lineLength,
      valueAngle,
    );

    const valueLine = SVGHelper.createLine({
      x1: lineStartPoint.x,
      y1: lineStartPoint.y,
      x2: lineEndPoint.x,
      y2: lineEndPoint.y,
      stroke: this.theme.valueColor,
    });
    g.appendChild(valueLine);

    const centerPoint = this.polarToCartesian(lineRadius, valueAngle);
    const valueCircle = SVGHelper.createCircle({
      cx: centerPoint.x,
      cy: centerPoint.y,
      r: 6,
      fill: this.theme.valueColor,
    });
    g.appendChild(valueCircle);

    const valueText = SVGHelper.createText(
      this.units ? `${formattedValue}${this.units}` : formattedValue,
      {
        x: 0,
        y: -12,
        anchor: 'middle',
        dy: '.35em',
        fontSize: '24px',
      },
    );
    valueText.style.fill = this.theme.valueColor;
    valueText.style.fontWeight = 'bold';
    g.appendChild(valueText);

    if (this.hoverEffects) {
      valueLine.addEventListener('mouseenter', () => this.handleHover(true));
      valueLine.addEventListener('mouseleave', () => this.handleHover(false));
    }
  }

  private valueToAngle(value: number): number {
    const normalizedValue = (value - this.min) / (this.max - this.min);
    return (
      this.startAngle + normalizedValue * (this.endAngle - this.startAngle)
    );
  }

  private createArc(
    outerRadius: number,
    innerRadius: number,
    startAngle: number,
    endAngle: number,
  ): string {
    const start = this.polarToCartesian(outerRadius, startAngle);
    const end = this.polarToCartesian(outerRadius, endAngle);
    const innerStart = this.polarToCartesian(innerRadius, startAngle);
    const innerEnd = this.polarToCartesian(innerRadius, endAngle);
    const largeArcFlag = Math.abs(endAngle - startAngle) <= 180 ? 0 : 1;

    return [
      'M',
      start.x,
      start.y,
      'A',
      outerRadius,
      outerRadius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
      'L',
      innerEnd.x,
      innerEnd.y,
      'A',
      innerRadius,
      innerRadius,
      0,
      largeArcFlag,
      0,
      innerStart.x,
      innerStart.y,
      'Z',
    ].join(' ');
  }

  private polarToCartesian(radius: number, angle: number) {
    const angleInRadians = (angle - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians),
    };
  }

  private handleHover(isHovered: boolean) {
    this.isHovered = isHovered;
    this.drawChart();
  }
}
