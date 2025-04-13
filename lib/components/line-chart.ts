import { BaseChart } from './base-chart';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';
import { PropertyValues } from 'lit';

/**
 * Line chart component that extends the base chart functionality.
 * Displays data as connected lines with optional points and area fills.
 * Supports multiple data series, animations, and interactive features.
 *
 * @example
 * ```html
 * <line-chart
 *   width="600"
 *   height="400"
 *   title="Monthly Sales"
 *   data="[{'x': 'Jan', 'y': 10}, {'x': 'Feb', 'y': 20}, {'x': 'Mar', 'y': 15}]"
 *   xKey="x"
 *   yKey="y"
 *   showPoints="true"
 *   showArea="true"
 *   lineWidth="2"
 *   animationEnabled="true"
 * ></line-chart>
 * ```
 */
@customElement('line-chart')
export class LineChart extends BaseChart {
  /** Property name in the data objects that represents the X-axis values */
  @property()
  xKey = 'x';

  /** Property name in the data objects that represents the Y-axis values */
  @property()
  yKey = 'y';

  /** Width of the line in pixels */
  @property({ type: Number })
  lineWidth = 2;

  /** Whether to display points at each data point */
  @property({ type: Boolean })
  showPoints = true;

  /** Radius of the points in pixels */
  @property({ type: Number })
  pointRadius = 4;

  /** Whether to fill the area under the line */
  @property({ type: Boolean })
  showArea = false;

  /** Currently hovered point, containing series and point indices */
  @state() private hoveredPoint: { series: number; point: number } | null =
    null;

  /** Array of dataset keys for multi-dataset charts */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @state() private datasets: any[] = [];

  /**
   * Returns the fill color for the area under a line based on its index.
   * @param index - The index of the line in the dataset
   * @returns A color string in rgba format with 0.1 opacity
   */
  private getAreaColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.1)`;
  }

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
   * Lifecycle method called when component properties change.
   * Re-processes data and redraws the chart if relevant properties have changed.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  protected override updated(changedProperties: PropertyValues) {
    super.updated(changedProperties);
    if (
      changedProperties.has('data') ||
      changedProperties.has('color') ||
      changedProperties.has('lineWidth') ||
      changedProperties.has('showPoints') ||
      changedProperties.has('pointRadius') ||
      changedProperties.has('showArea')
    ) {
      this.isFirstRender = true;
      this.processData();
      this.drawChart();
    }
  }

  private processData() {
    if (!this.data.length) return;

    if (Object.prototype.hasOwnProperty.call(this.data[0], 'data')) {
      this.datasets = this.data;
    } else {
      this.datasets = [
        {
          label: this.yKey,
          color: this.colors[0],
          data: this.data,
        },
      ];
    }
  }

  protected override drawChart() {
    super.drawChart();
    if (!this.renderRoot || !this.datasets.length) return;

    const svg = this.renderRoot.querySelector('svg');
    if (!svg) return;
    svg.innerHTML = '';

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    const g = SVGHelper.createGroup(
      `translate(${this.margin.left},${this.margin.top})`,
    );
    svg.appendChild(g);

    const allPoints = this.datasets.flatMap((dataset) => dataset.data);
    const xValues = allPoints.map((d) => d[this.xKey]);
    const yValues = allPoints.map((d) => d[this.yKey]);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const yScale = (y: number) => ((y - yMin) / (yMax - yMin)) * height;

    const xAxis = SVGHelper.createGroup(`translate(0,${height})`);
    g.appendChild(xAxis);

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
        y2: 5,
        stroke: '#ddd',
      });
      xAxis.appendChild(line);
    }

    const yAxis = SVGHelper.createGroup();
    g.appendChild(yAxis);

    const yTicks = 5;
    for (let i = 0; i <= yTicks; i++) {
      const y = height - (i * height) / yTicks;
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

    this.datasets.forEach((dataset, seriesIndex) => {
      const points = dataset.data.map((d: any, i: number) => ({
        x: xScale(d[this.xKey]),
        y: height - yScale(d[this.yKey]),
        original: d,
        index: i,
      }));

      if (this.showArea) {
        const areaData = [
          `M ${points[0].x} ${height}`,
          ...points.map((p: { x: number; y: number }) => `L ${p.x} ${p.y}`),
          `L ${points[points.length - 1].x} ${height}`,
          'Z',
        ].join(' ');

        const area = SVGHelper.createPath({
          d: areaData,
          fill: this.getAreaColor(seriesIndex),
          stroke: 'none',
        });

        if (this.isFirstRender) {
          area.style.transition = `opacity ${this.animationDuration}ms ease-out`;
          area.style.opacity = '0';
        } else {
          area.style.opacity = '1';
        }

        g.appendChild(area);

        if (this.isFirstRender) {
          setTimeout(() => {
            area.style.opacity = '1';
          }, 50);
        }
      }

      const pathData = points
        .map(
          (p: { x: number; y: number }, i: number) =>
            `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`,
        )
        .join(' ');

      const path = SVGHelper.createPath({
        d: pathData,
        fill: 'none',
        stroke: this.getBorderColor(seriesIndex),
        strokeWidth: this.lineWidth.toString(),
      });

      if (this.isAnimationEnabled) {
        path.style.transition = `stroke-dashoffset ${this.animationDuration}ms ease-out`;
        path.style.strokeDasharray = path.getTotalLength().toString();
        path.style.strokeDashoffset = path.getTotalLength().toString();
      }

      g.appendChild(path);

      if (this.isAnimationEnabled) {
        setTimeout(() => {
          path.style.strokeDashoffset = '0';
        }, 50);
      }

      if (this.showPoints) {
        points.forEach(
          (point: { x: number; y: number }, pointIndex: number) => {
            const isHovered =
              this.hoveredPoint?.series === seriesIndex &&
              this.hoveredPoint?.point === pointIndex;

            const circle = SVGHelper.createCircle({
              cx: point.x,
              cy: point.y,
              r: isHovered ? this.pointRadius * 1.5 : this.pointRadius,
              fill: isHovered
                ? this.getHoverColor(seriesIndex)
                : this.getColor(seriesIndex),
              stroke: this.getBorderColor(seriesIndex),
              strokeWidth: '1',
            });

            if (this.isAnimationEnabled) {
              circle.style.transition = `opacity ${this.animationDuration}ms ease-out, r ${this.animationDuration}ms ease-out`;
              circle.style.opacity = '0';
            } else {
              circle.style.opacity = '1';
            }

            if (this.hoverEffects) {
              circle.addEventListener('mouseenter', () => {
                this.hoveredPoint = { series: seriesIndex, point: pointIndex };
                this.updatePointStyles();
              });
              circle.addEventListener('mouseleave', () => {
                this.hoveredPoint = null;
                this.updatePointStyles();
              });
            }

            g.appendChild(circle);

            if (this.isAnimationEnabled) {
              setTimeout(
                () => {
                  circle.style.opacity = '1';
                },
                this.animationDuration / 2 + pointIndex * 50,
              );
            }

            if (this.showValues && isHovered) {
              const text = SVGHelper.createText(
                (point as any).original[this.yKey].toFixed(1),
                {
                  x: point.x,
                  y: point.y - 15,
                  anchor: 'middle',
                  fontSize: '12px',
                  fill: this.getBorderColor(seriesIndex),
                },
              );

              text.style.transition = `opacity 0.2s ease-out`;
              text.style.opacity = '0';

              g.appendChild(text);

              if (this.animationEnabled) {
                setTimeout(() => {
                  text.style.opacity = '1';
                }, 50);
              } else {
                text.style.opacity = '1';
              }
            }
          },
        );
      }
    });

    if (this.showLegend && this.datasets.length > 1) {
      const legend = SVGHelper.createGroup(
        `translate(${width / 2},${height + 50})`,
      );
      this.datasets.forEach((dataset, i) => {
        const legendItem = SVGHelper.createGroup(
          `translate(${i * 100 - this.datasets.length * 50},0)`,
        );

        const line = SVGHelper.createLine({
          x1: 0,
          y1: 0,
          x2: 15,
          y2: 0,
          stroke: this.getBorderColor(i),
          strokeWidth: this.lineWidth.toString(),
        });
        legendItem.appendChild(line);

        if (this.showPoints) {
          const point = SVGHelper.createCircle({
            cx: 7.5,
            cy: 0,
            r: this.pointRadius,
            fill: this.getColor(i),
            stroke: this.getBorderColor(i),
            strokeWidth: '1',
          });
          legendItem.appendChild(point);
        }

        const text = SVGHelper.createText(dataset.label || `Series ${i + 1}`, {
          x: 20,
          y: 4,
          fontSize: '12px',
          fill: this.getBorderColor(i),
        });
        legendItem.appendChild(text);

        legend.appendChild(legendItem);
      });
      g.appendChild(legend);
    }

    this.isFirstRender = false;
  }

  private updatePointStyles() {
    if (!this.renderRoot) return;

    const svg = this.renderRoot.querySelector('svg');
    if (!svg) return;

    const circles = svg.querySelectorAll('circle');
    circles.forEach((circle, i) => {
      const seriesIndex = Math.floor(i / this.datasets[0].data.length);
      const pointIndex = i % this.datasets[0].data.length;

      const isHovered =
        this.hoveredPoint?.series === seriesIndex &&
        this.hoveredPoint?.point === pointIndex;

      if (isHovered) {
        circle.setAttribute('r', (this.pointRadius * 1.5).toString());
        circle.setAttribute('fill', this.getHoverColor(seriesIndex));

        if (this.showValues) {
          const existingLabel = svg.querySelector(
            `text[data-point="${seriesIndex}-${pointIndex}"]`,
          );
          if (!existingLabel) {
            const cx = parseFloat(circle.getAttribute('cx') || '0');
            const cy = parseFloat(circle.getAttribute('cy') || '0');
            const value =
              this.datasets[seriesIndex].data[pointIndex][this.yKey];

            const text = SVGHelper.createText(value.toFixed(1), {
              x: cx,
              y: cy - 15,
              anchor: 'middle',
              fontSize: '12px',
              fill: this.getBorderColor(seriesIndex),
            });

            text.setAttribute('data-point', `${seriesIndex}-${pointIndex}`);

            text.style.transition = `opacity 0.2s ease-out`;
            text.style.opacity = '0';

            svg.querySelector('g')?.appendChild(text);

            if (this.animationEnabled) {
              setTimeout(() => {
                text.style.opacity = '1';
              }, 50);
            } else {
              text.style.opacity = '1';
            }
          }
        }
      } else {
        circle.setAttribute('r', this.pointRadius.toString());
        circle.setAttribute('fill', this.getColor(seriesIndex));

        const label = svg.querySelector(
          `text[data-point="${seriesIndex}-${pointIndex}"]`,
        );
        if (label) {
          label.remove();
        }
      }
    });
  }
}
