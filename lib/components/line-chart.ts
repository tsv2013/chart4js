import { BaseChart } from './base-chart';
import { customElement, property, state } from 'lit/decorators.js';
import { SVGHelper } from '../utils/svg-helper';
import { PropertyValues } from 'lit';

@customElement('line-chart')
export class LineChart extends BaseChart {
  @property()
  xKey = 'x';

  @property()
  yKey = 'y';

  @property({ type: Number })
  lineWidth = 2;

  @property({ type: Boolean })
  showPoints = true;

  @property({ type: Number })
  pointRadius = 4;

  @property({ type: Boolean })
  showArea = false;

  @state() private hoveredPoint: { series: number; point: number } | null =
    null;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  @state() private datasets: any[] = [];

  private getAreaColor(index: number): string {
    const color = this.colors[index % this.colors.length];
    return `rgba(${color}, 0.1)`;
  }

  protected override firstUpdated() {
    super.firstUpdated();
    this.processData();
    this.drawChart();
  }

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
      this.processData();
      this.drawChart();
    }
  }

  private processData() {
    if (!this.data.length) return;

    // Check if data is already in dataset format
    if (Object.prototype.hasOwnProperty.call(this.data[0], 'data')) {
      this.datasets = this.data;
    } else {
      // Convert single series to dataset format
      this.datasets = [
        {
          label: this.yKey,
          color: this.colors[0],
          data: this.data,
        },
      ];
    }
  }

  private drawChart() {
    if (!this.renderRoot || !this.datasets.length) return;

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

    // Calculate scales
    const allPoints = this.datasets.flatMap((dataset) => dataset.data);
    const xValues = allPoints.map((d) => d[this.xKey]);
    const yValues = allPoints.map((d) => d[this.yKey]);
    const xMin = Math.min(...xValues);
    const xMax = Math.max(...xValues);
    const yMin = Math.min(...yValues);
    const yMax = Math.max(...yValues);

    const xScale = (x: number) => ((x - xMin) / (xMax - xMin)) * width;
    const yScale = (y: number) => ((y - yMin) / (yMax - yMin)) * height;

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
        y2: 5,
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

    // Draw each dataset
    this.datasets.forEach((dataset, seriesIndex) => {
      const points = dataset.data.map((d, i) => ({
        x: xScale(d[this.xKey]),
        y: height - yScale(d[this.yKey]),
        original: d,
        index: i,
      }));

      // Create area if enabled
      if (this.showArea) {
        const areaData = [
          `M ${points[0].x} ${height}`,
          ...points.map((p) => `L ${p.x} ${p.y}`),
          `L ${points[points.length - 1].x} ${height}`,
          'Z',
        ].join(' ');

        const area = SVGHelper.createPath({
          d: areaData,
          fill: this.getAreaColor(seriesIndex),
          stroke: 'none',
        });
        g.appendChild(area);
      }

      // Create path for the line
      const pathData = points
        .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
        .join(' ');

      const path = SVGHelper.createPath({
        d: pathData,
        fill: 'none',
        stroke: this.getBorderColor(seriesIndex),
        strokeWidth: this.lineWidth.toString(),
      });
      g.appendChild(path);

      // Add points if enabled
      if (this.showPoints) {
        points.forEach((point, pointIndex) => {
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

          // Add hover events
          if (this.hoverEffects) {
            circle.addEventListener('mouseenter', () => {
              this.hoveredPoint = { series: seriesIndex, point: pointIndex };
              this.drawChart();
            });
            circle.addEventListener('mouseleave', () => {
              this.hoveredPoint = null;
              this.drawChart();
            });
          }

          g.appendChild(circle);

          // Add value labels if enabled and point is hovered
          if (this.showValues && isHovered) {
            const text = SVGHelper.createText(
              point.original[this.yKey].toFixed(1),
              {
                x: point.x,
                y: point.y - 15,
                anchor: 'middle',
                fontSize: '12px',
                fill: this.getBorderColor(seriesIndex),
              },
            );
            g.appendChild(text);
          }
        });
      }
    });

    // Add legend if enabled
    if (this.showLegend && this.datasets.length > 1) {
      const legend = SVGHelper.createGroup(
        `translate(${width / 2},${height + 50})`,
      );
      this.datasets.forEach((dataset, i) => {
        const legendItem = SVGHelper.createGroup(
          `translate(${i * 100 - this.datasets.length * 50},0)`,
        );

        // Add line
        const line = SVGHelper.createLine({
          x1: 0,
          y1: 0,
          x2: 15,
          y2: 0,
          stroke: this.getBorderColor(i),
          strokeWidth: this.lineWidth.toString(),
        });
        legendItem.appendChild(line);

        // Add point if enabled
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
  }
}
