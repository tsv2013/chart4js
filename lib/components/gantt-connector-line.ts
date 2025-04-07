import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

// Constants
const GRID_STEP = 10;

// Point class for calculations
class Point {
  constructor(
    public x: number,
    public y: number,
  ) {}
}

// Function to determine turn direction
function turnValue(p1: Point, p2: Point, p3: Point): number {
  if ((p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x) > 0) {
    return 1;
  }
  return 0;
}

// Interface for connector points
export interface ConnectorPoints {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

@customElement('gantt-connector-line')
export class GanttConnectorLine extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .connector-line {
      position: absolute;
      pointer-events: none;
    }

    .svg-icon {
      overflow: visible;
    }

    path {
      stroke: black;
      stroke-width: 2;
      fill: transparent;
    }
  `;

  @property({ type: Object }) points!: ConnectorPoints;

  private _points: Point[] = [];
  private _left = 0;
  private _top = 0;
  private _width = 0;
  private _height = 0;
  private _pathData = '';

  updated(changedProperties: Map<string, object>) {
    if (changedProperties.has('points')) {
      this._calculatePath();
    }
  }

  private _calculatePath() {
    if (!this.points) return;

    // Create points
    const p1 = new Point(this.points.startX, this.points.startY);
    const p2 = new Point(this.points.endX, this.points.endY);

    // Adjust points for grid
    const minX = p1.x < p2.x ? p1.x : p2.x;
    p1.x -= minX - 2 * GRID_STEP;
    p2.x -= minX - 2 * GRID_STEP;

    const minY = p1.y < p2.y ? p1.y : p2.y;
    p1.y -= minY - 2 * GRID_STEP;
    p2.y -= minY - 2 * GRID_STEP;

    // Set position and dimensions
    this._left =
      (p1.x < p2.x ? this.points.startX : this.points.endX) - 2 * GRID_STEP;
    this._top =
      (p1.y < p2.y ? this.points.startY : this.points.endY) - 2 * GRID_STEP;
    this._width =
      (p1.x < p2.x ? Math.abs(p2.x) : Math.abs(p1.x)) + 2 * GRID_STEP;
    this._height =
      (p1.y < p2.y ? Math.abs(p2.y) : Math.abs(p1.y)) + 2 * GRID_STEP;

    // Calculate path points
    const points: Point[] = [];

    if (p2.x - p1.x > 3 * GRID_STEP) {
      // Horizontal path
      const x3 = p1.x + 2 * GRID_STEP;
      points.push(p1);
      points.push(new Point(x3, p1.y));
      points.push(new Point(x3, p2.y));
      points.push(p2);
    } else {
      // Vertical path
      const y3 = p2.y > p1.y ? p1.y + 2 * GRID_STEP : p2.y - 2 * GRID_STEP;
      points.push(p1);
      points.push(new Point(p1.x + 2 * GRID_STEP, p1.y));
      points.push(new Point(p1.x + 2 * GRID_STEP, y3));
      points.push(new Point(p2.x - 2 * GRID_STEP, y3));
      points.push(new Point(p2.x - 2 * GRID_STEP, p2.y));
      points.push(p2);

      if (p2.x < p1.x) {
        this._width += 2; // Fix for SVG width
      }
    }

    this._points = points;
    this._generatePathData();
  }

  private _generatePathData() {
    if (this._points.length < 2) {
      this._pathData = '';
      return;
    }

    let dVal = `M${this._points[0].x},${this._points[0].y} `;

    for (let i = 1; i < this._points.length - 1; i++) {
      const turn = turnValue(
        this._points[i - 1],
        this._points[i],
        this._points[i + 1],
      );
      const isHorizontal =
        Math.abs(this._points[i - 1].y - this._points[i].y) < 0.1;

      let signX = '';
      let signY = '';
      let lineLen;

      if (isHorizontal) {
        lineLen = this._points[i].x - this._points[i - 1].x;
        if (turn === 0 && lineLen < 0) {
          signX = '-';
        }
        if (turn === 0 && lineLen > 0) {
          signY = '-';
        }
        lineLen += lineLen > 0 ? -GRID_STEP : 2 * GRID_STEP + 2;
        dVal += `h${lineLen} `;
        dVal += `a${GRID_STEP},${GRID_STEP} 0 0 ${turn} ${signX}${GRID_STEP},${signY}${GRID_STEP} `;
      } else {
        lineLen = this._points[i].y - this._points[i - 1].y;
        if (turn === 1 && lineLen > 0) {
          signX = '-';
        }
        if (turn === 1 && lineLen < 0) {
          signY = '-';
        }
        lineLen += lineLen > 0 ? -2 * GRID_STEP : 2 * GRID_STEP;
        dVal += `v${lineLen} `;
        dVal += `a${GRID_STEP},${GRID_STEP} 0 0 ${turn} ${signX}${GRID_STEP},${signY}${GRID_STEP} `;
      }
    }

    dVal += `h${this._points[this._points.length - 1].x - this._points[this._points.length - 2].x - GRID_STEP} `;

    this._pathData = dVal;
  }

  render(): TemplateResult {
    return html`
      <div
        class="connector-line"
        style=${styleMap({
          left: `${this._left}px`,
          top: `${this._top}px`,
          width: `${this._width}px`,
          height: `${this._height}px`,
        })}
      >
        <svg
          class="svg-icon"
          style=${styleMap({
            width: `${this._width}px`,
            height: `${this._height}px`,
          })}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path d=${this._pathData}></path>
          </g>
        </svg>
      </div>
    `;
  }
}
