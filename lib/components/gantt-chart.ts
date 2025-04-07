import { LitElement, html, css, TemplateResult } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';
import { ConnectorPoints } from './gantt-connector-line';

// Constants
const MIN_TIME_INTERVAL = 60 * 60 * 24 * 1000; // 1 day in milliseconds
const LINE_HEIGHT = 35;

// Date utility functions
const addDay = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
const addWeek = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 7);
const addMonth = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 1, 1);
const addQuarter = (date: Date): Date =>
  new Date(date.getFullYear(), date.getMonth() + 3, 1);
const addYear = (date: Date): Date => new Date(date.getFullYear() + 1, 0, 1);

// Month names for display
const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

// Scale configurations
const scales = [
  { scale: 0.5, nextDate: addYear },
  { scale: 0.7, nextDate: addYear },
  { scale: 1, nextDate: addQuarter },
  { scale: 2, nextDate: addQuarter },
  { scale: 4, nextDate: addMonth },
  { scale: 7, nextDate: addMonth },
  { scale: 10, nextDate: addMonth },
  { scale: 15, nextDate: addWeek },
  { scale: 20, nextDate: addWeek },
  { scale: 50, nextDate: addWeek },
  { scale: 100, nextDate: addDay },
  { scale: 150, nextDate: addDay },
  { scale: 200, nextDate: addDay },
];

// Interfaces
export interface GanttItem {
  id: string;
  title: string;
  start: Date;
  end: Date;
  color?: string;
  markers?: GanttMarker[];
  links?: GanttLink[];
}

export interface GanttMarker {
  date: Date;
  text: string;
  color?: string;
}

export interface GanttLink {
  from: string;
  to: string;
  fromDate: Date;
  toDate: Date;
}

export interface GanttRuler {
  pos: number;
  date: string;
}

@customElement('gantt-chart')
export class GanttChart extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
    }

    .gantt-container {
      display: flex;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }

    .gantt-legend {
      width: 200px;
      border-right: 1px solid #ddd;
      background-color: #f5f5f5;
    }

    .gantt-legend-header {
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      background-color: #e0e0e0;
      font-weight: bold;
    }

    .gantt-legend-content {
      overflow-y: auto;
    }

    .gantt-row {
      position: relative;
      height: 35px;
      padding: 0 10px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }

    .gantt-row:hover {
      background-color: #f0f0f0;
    }

    .gantt-row-title {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .gantt-diagram {
      flex: 1;
      overflow: auto;
    }

    .gantt-diagram-header {
      height: 32px;
      background-color: #e0e0e0;
      position: relative;
    }

    .gantt-ruler {
      position: absolute;
      height: 100%;
      border-left: 1px dotted #ccc;
    }

    .gantt-ruler-text {
      padding: 0 5px;
      font-size: 12px;
    }

    .gantt-content {
      position: relative;
    }

    .gantt-line {
      position: absolute;
      height: 25px;
      bottom: 5px;
      background-color: #4caf50;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 25px;
      padding: 0 5px;
      color: white;
      font-size: 12px;
    }

    .gantt-marker {
      position: absolute;
      width: 2px;
      height: 35px;
      background-color: #333;
    }

    .gantt-marker-text {
      position: absolute;
      top: -20px;
      left: -50px;
      width: 100px;
      text-align: center;
      font-size: 10px;
    }

    .gantt-current-day {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2px;
      background-color: #f44336;
    }

    .gantt-actions {
      display: flex;
      justify-content: space-between;
      padding: 5px 10px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }

    .gantt-actions-center {
      display: flex;
      gap: 5px;
    }

    button {
      padding: 5px 10px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }

    .gantt-connector-endpoint {
      position: absolute;
      width: 10px;
      height: 10px;
      border: 1px solid black;
      border-radius: 50%;
      margin-top: -5px;
      margin-left: -5px;
    }

    .gantt-connector-endpoint--start {
      background-color: black;
    }
  `;

  @property({ type: Array }) items: GanttItem[] = [];
  @property({ type: Boolean }) showConnectors = true;
  @property({ type: Number }) scaleIndex = 8;
  @property({ type: String }) titleField = 'title';
  @property({ type: String }) startField = 'start';
  @property({ type: String }) endField = 'end';
  @property({ type: Array }) markerFields: string[] = [];
  @property({ type: String }) linksField = 'links';
  @property({ type: String }) keyField = 'id';

  @state() private _scale = scales[8].scale;
  @state() private _getNextDate = scales[8].nextDate;
  @state() private _startDate = new Date();
  @state() private _finishDate = new Date();
  @state() private _minDate = 0;
  @state() private _maxDate = 0;
  @state() private _rulers: GanttRuler[] = [];
  @state() private _isMouseDown = false;
  @state() private _mouseDownPageX = 0;
  @state() private _scrollLeft = 0;
  @state() private _connectors: ConnectorPoints[] = [];

  private _itemLinks: { [key: string]: { index: number; links: GanttLink[] } } =
    {};

  constructor() {
    super();
    this._updateScale();
    this._calculateDateRange();
    this._generateRulers();
  }

  updated(changedProperties: Map<string, object>) {
    if (changedProperties.has('items') || changedProperties.has('scaleIndex')) {
      this._updateScale();
      this._calculateDateRange();
      this._generateRulers();
      this._calculateConnectors();
    }
  }

  private _updateScale() {
    this._scale = scales[this.scaleIndex].scale;
    this._getNextDate = scales[this.scaleIndex].nextDate;
  }

  private _calculateDateRange() {
    if (this.items.length === 0) return;

    let minDate = new Date(this.items[0].start);
    let maxDate = new Date(this.items[0].end);

    this.items.forEach((item) => {
      const start = new Date(item.start);
      const end = new Date(item.end);

      if (start < minDate) minDate = start;
      if (end > maxDate) maxDate = end;
    });

    this._startDate = minDate;
    this._finishDate = maxDate;

    // Set min and max dates to year boundaries
    const yearStart = new Date(minDate.getFullYear(), 0, 1);
    const yearEnd = new Date(maxDate.getFullYear(), 11, 31);

    this._minDate = yearStart.getTime() / MIN_TIME_INTERVAL;
    this._maxDate = yearEnd.getTime() / MIN_TIME_INTERVAL;
  }

  private _generateRulers() {
    const rulers: GanttRuler[] = [];
    const startDate = new Date(this._minDate * MIN_TIME_INTERVAL);
    const endDate = new Date(this._maxDate * MIN_TIME_INTERVAL);

    let pos = startDate;
    while (pos < endDate) {
      rulers.push({
        pos: (pos.getTime() / MIN_TIME_INTERVAL - this._minDate) * this._scale,
        date: this._getDateText(pos),
      });
      pos = this._getNextDate(pos);
    }

    this._rulers = rulers;
  }

  private _getDateText(date: Date): string {
    const text = `${monthNames[date.getMonth()]} '${String(date.getFullYear()).substring(2)}`;
    if (this.scaleIndex < 7) {
      return text;
    }
    return `${date.getDate()} ${text}`;
  }

  private _createScalable(position: Date): number {
    const pos = position.getTime();
    return (pos / MIN_TIME_INTERVAL - this._minDate) * this._scale;
  }

  private _getCurrentDayPosition(): number {
    const now = new Date();
    return this._createScalable(now);
  }

  private _moveLeft() {
    this.shadowRoot?.querySelector('.gantt-content')?.scrollBy({
      left: -100,
      behavior: 'smooth',
    });
  }

  private _moveRight() {
    this.shadowRoot?.querySelector('.gantt-content')?.scrollBy({
      left: 100,
      behavior: 'smooth',
    });
  }

  private _scaleDown() {
    if (this.scaleIndex < scales.length - 1) {
      this.scaleIndex++;
      this._updateScale();
      this._generateRulers();
      this._calculateConnectors();
    }
  }

  private _scaleUp() {
    if (this.scaleIndex > 0) {
      this.scaleIndex--;
      this._updateScale();
      this._generateRulers();
      this._calculateConnectors();
    }
  }

  private _handleMouseDown(e: MouseEvent) {
    this._isMouseDown = true;
    this._mouseDownPageX = e.pageX;
  }

  private _handleMouseUp() {
    this._isMouseDown = false;
  }

  private _handleMouseMove(e: MouseEvent) {
    if (this._isMouseDown) {
      const deltaX = e.pageX - this._mouseDownPageX;
      this._mouseDownPageX = e.pageX;

      this.shadowRoot?.querySelector('.gantt-content')?.scrollBy({
        left: -deltaX,
        behavior: 'auto',
      });
    }
  }

  private _handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    this._scrollLeft = target.scrollLeft;
  }

  private _rowClick(item: GanttItem) {
    this.dispatchEvent(
      new CustomEvent('row-click', {
        detail: { item },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _calculateConnectors() {
    if (!this.showConnectors || !this.items.length) {
      this._connectors = [];
      return;
    }

    const connectors: ConnectorPoints[] = [];

    this.items.forEach((item, index) => {
      if (!item.links || !item.links.length) return;

      const startY = LINE_HEIGHT / 2 + index * LINE_HEIGHT;

      item.links.forEach((link) => {
        const targetItem = this.items.find((i) => i.id === link.to);
        if (!targetItem) return;

        const targetIndex = this.items.findIndex((i) => i.id === link.to);
        if (targetIndex === -1) return;

        const endY = LINE_HEIGHT / 2 + targetIndex * LINE_HEIGHT;

        connectors.push({
          startX: this._createScalable(new Date(link.fromDate)),
          startY,
          endX: this._createScalable(new Date(link.toDate)),
          endY,
        });
      });
    });

    this._connectors = connectors;
  }

  render() {
    return html`
      <div class="gantt-container">
        <div class="gantt-legend">
          <div class="gantt-legend-header">Tasks</div>
          <div class="gantt-legend-content">
            ${this.items.map(
              (item) => html`
                <div class="gantt-row" @click=${() => this._rowClick(item)}>
                  <div class="gantt-row-title" title=${item.title}>
                    ${item.title}
                  </div>
                </div>
              `,
            )}
          </div>
        </div>

        <div class="gantt-diagram">
          <div class="gantt-actions">
            <div class="gantt-actions-left">
              Start: ${this._startDate.toLocaleDateString()}
            </div>
            <div class="gantt-actions-center">
              <button @click=${this._scaleDown} title="Zoom Out">▣</button>
              <button @click=${this._scaleUp} title="Zoom In">◼</button>
            </div>
            <div class="gantt-actions-right">
              End: ${this._finishDate.toLocaleDateString()}
            </div>
          </div>

          <div class="gantt-diagram-header">
            ${this._rulers.map(
              (ruler) => html`
                <div
                  class="gantt-ruler"
                  style=${styleMap({ left: `${ruler.pos}px` })}
                >
                  <span class="gantt-ruler-text">${ruler.date}</span>
                </div>
              `,
            )}
          </div>

          <div
            class="gantt-content"
            @scroll=${this._handleScroll}
            @mousedown=${this._handleMouseDown}
            @mouseup=${this._handleMouseUp}
            @mouseleave=${this._handleMouseUp}
            @mousemove=${this._handleMouseMove}
          >
            <div
              style=${styleMap({
                width: `${this._rulers.length > 0 ? this._rulers[this._rulers.length - 1].pos + 100 : 0}px`,
              })}
            >
              ${this._rulers.map(
                (ruler) => html`
                  <div
                    class="gantt-ruler"
                    style=${styleMap({ left: `${ruler.pos}px` })}
                  ></div>
                `,
              )}
              ${this.items.map(
                (item) => html`
                  <div class="gantt-row" @click=${() => this._rowClick(item)}>
                    <div
                      class="gantt-line"
                      style=${styleMap({
                        left: `${this._createScalable(new Date(item.start))}px`,
                        width: `${((new Date(item.end).getTime() - new Date(item.start).getTime()) / MIN_TIME_INTERVAL) * this._scale}px`,
                        backgroundColor: item.color || '#4CAF50',
                      })}
                      title=${`${item.title}: ${new Date(item.start).toLocaleDateString()} - ${new Date(item.end).toLocaleDateString()}`}
                    >
                      ${item.title}
                    </div>

                    ${item.markers?.map(
                      (marker) => html`
                        <div
                          class="gantt-marker"
                          style=${styleMap({
                            left: `${this._createScalable(new Date(marker.date))}px`,
                            backgroundColor: marker.color || '#333',
                          })}
                        >
                          <div class="gantt-marker-text">${marker.text}</div>
                        </div>
                      `,
                    )}
                  </div>
                `,
              )}

              <div
                class="gantt-current-day"
                style=${styleMap({
                  left: `${this._getCurrentDayPosition()}px`,
                })}
                title=${`Current day: ${new Date().toLocaleDateString()}`}
              ></div>

              ${this.showConnectors ? this._renderConnectors() : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  private _renderConnectors(): TemplateResult {
    if (!this._connectors.length) return html``;

    return html`
      ${this._connectors.map(
        (connector) => html`
          <div
            class="gantt-connector-endpoint gantt-connector-endpoint--start"
            style=${styleMap({
              left: `${connector.startX}px`,
              top: `${connector.startY}px`,
            })}
          ></div>
          <div
            class="gantt-connector-endpoint"
            style=${styleMap({
              left: `${connector.endX}px`,
              top: `${connector.endY}px`,
            })}
          ></div>
          <gantt-connector-line .points=${connector}></gantt-connector-line>
        `,
      )}
    `;
  }
}
