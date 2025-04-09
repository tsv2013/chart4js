import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

/** Grid step size in pixels for connector line routing */
const GRID_STEP = 10;

/**
 * Represents a point in 2D space.
 * Used for calculating connector line paths.
 */
class Point {
  constructor(
    /** X coordinate */
    public x: number,
    /** Y coordinate */
    public y: number,
  ) {}
}

/**
 * Calculates the turn direction between three points.
 * Used to determine whether a connector line should turn left or right.
 *
 * @param p1 - First point
 * @param p2 - Second point (turn point)
 * @param p3 - Third point
 * @returns 1 for left turn, 0 for right turn
 */
function turnValue(p1: Point, p2: Point, p3: Point): number {
  if ((p2.x - p1.x) * (p3.y - p2.y) - (p2.y - p1.y) * (p3.x - p2.x) > 0) {
    return 1;
  }
  return 0;
}

/**
 * Interface defining the start and end points of a connector line.
 */
export interface ConnectorPoints {
  /** X coordinate of the start point */
  startX: number;
  /** Y coordinate of the start point */
  startY: number;
  /** X coordinate of the end point */
  endX: number;
  /** Y coordinate of the end point */
  endY: number;
}

/**
 * Component that renders a connector line between two points in a Gantt chart.
 * The line is drawn with rounded corners and follows a grid-based routing algorithm
 * to create visually pleasing connections between tasks.
 *
 * @example
 * ```html
 * <gantt-connector-line
 *   .points="${{
 *     startX: 100,
 *     startY: 50,
 *     endX: 200,
 *     endY: 100
 *   }}"
 * ></gantt-connector-line>
 * ```
 */
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

  /** Start and end points for the connector line */
  @property({ type: Object }) points!: ConnectorPoints;

  /** Array of points defining the connector line path */
  private _points: Point[] = [];

  /** Left position of the connector line container */
  private _left = 0;

  /** Top position of the connector line container */
  private _top = 0;

  /** Width of the connector line container */
  private _width = 0;

  /** Height of the connector line container */
  private _height = 0;

  /** SVG path data string for the connector line */
  private _pathData = '';

  /**
   * Lifecycle method called when component properties change.
   * Recalculates the connector path when points change.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  updated(changedProperties: Map<string, object>) {
    if (changedProperties.has('points')) {
      this._calculatePath();
    }
  }

  /**
   * Calculates the path for the connector line.
   * Uses a grid-based algorithm to create a path with rounded corners
   * that connects the start and end points.
   */
  private _calculatePath() {
    if (!this.points) return;

    const p1 = new Point(this.points.startX, this.points.startY);
    const p2 = new Point(this.points.endX, this.points.endY);

    const minX = p1.x < p2.x ? p1.x : p2.x;
    p1.x -= minX - 2 * GRID_STEP;
    p2.x -= minX - 2 * GRID_STEP;

    const minY = p1.y < p2.y ? p1.y : p2.y;
    p1.y -= minY - 2 * GRID_STEP;
    p2.y -= minY - 2 * GRID_STEP;

    this._left =
      (p1.x < p2.x ? this.points.startX : this.points.endX) - 2 * GRID_STEP;
    this._top =
      (p1.y < p2.y ? this.points.startY : this.points.endY) - 2 * GRID_STEP;
    this._width =
      (p1.x < p2.x ? Math.abs(p2.x) : Math.abs(p1.x)) + 2 * GRID_STEP;
    this._height =
      (p1.y < p2.y ? Math.abs(p2.y) : Math.abs(p1.y)) + 2 * GRID_STEP;

    const points: Point[] = [];

    if (p2.x - p1.x > 3 * GRID_STEP) {
      const x3 = p1.x + 2 * GRID_STEP;
      points.push(p1);
      points.push(new Point(x3, p1.y));
      points.push(new Point(x3, p2.y));
      points.push(p2);
    } else {
      const y3 = p2.y > p1.y ? p1.y + 2 * GRID_STEP : p2.y - 2 * GRID_STEP;
      points.push(p1);
      points.push(new Point(p1.x + 2 * GRID_STEP, p1.y));
      points.push(new Point(p1.x + 2 * GRID_STEP, y3));
      points.push(new Point(p2.x - 2 * GRID_STEP, y3));
      points.push(new Point(p2.x - 2 * GRID_STEP, p2.y));
      points.push(p2);

      if (p2.x < p1.x) {
        this._width += 2;
      }
    }

    this._points = points;
    this._generatePathData();
  }

  /**
   * Generates the SVG path data string from the calculated points.
   * Creates a path with rounded corners using arc commands.
   */
  private _generatePathData() {
    if (this._points.length < 2) {
      this._pathData = '';
      return;
    }

    let dVal = `M${this._points[0].x},${this._points[0].y}`;

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
        dVal += `h${lineLen}`;
        dVal += `a${GRID_STEP},${GRID_STEP} 0 0 ${turn} ${signX}${GRID_STEP},${signY}${GRID_STEP}`;
      } else {
        lineLen = this._points[i].y - this._points[i - 1].y;
        if (turn === 1 && lineLen > 0) {
          signX = '-';
        }
        if (turn === 1 && lineLen < 0) {
          signY = '-';
        }
        lineLen += lineLen > 0 ? -2 * GRID_STEP : 2 * GRID_STEP;
        dVal += `v${lineLen}`;
        dVal += `a${GRID_STEP},${GRID_STEP} 0 0 ${turn} ${signX}${GRID_STEP},${signY}${GRID_STEP}`;
      }
    }

    dVal += `h${this._points[this._points.length - 1].x - this._points[this._points.length - 2].x - GRID_STEP}`;

    this._pathData = dVal;
  }

  /**
   * Renders the connector line component.
   * Creates an SVG element with the calculated path.
   *
   * @returns Rendered HTML template
   */
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
