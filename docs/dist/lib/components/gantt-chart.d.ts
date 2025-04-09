import { LitElement, TemplateResult } from 'lit';
/**
 * Interface representing a task or item in the Gantt chart.
 */
export interface GanttItem {
    /** Unique identifier for the item */
    id: string;
    /** Display title of the item */
    title: string;
    /** Start date of the item */
    start: Date;
    /** End date of the item */
    end: Date;
    /** Optional color for the item bar */
    color?: string;
    /** Optional array of markers for the item */
    markers?: GanttMarker[];
    /** Optional array of links to other items */
    links?: GanttLink[];
}
/**
 * Interface representing a marker on the Gantt chart timeline.
 */
export interface GanttMarker {
    /** Date where the marker should appear */
    date: Date;
    /** Text to display with the marker */
    text: string;
    /** Optional color for the marker */
    color?: string;
}
/**
 * Interface representing a dependency link between two items.
 */
export interface GanttLink {
    /** ID of the source item */
    from: string;
    /** ID of the target item */
    to: string;
    /** Start date of the link */
    fromDate: Date;
    /** End date of the link */
    toDate: Date;
}
/**
 * Interface representing a ruler mark on the timeline.
 */
export interface GanttRuler {
    /** Position of the ruler in pixels */
    pos: number;
    /** Date text to display at the ruler */
    date: string;
}
/**
 * Gantt chart component for visualizing project schedules and task dependencies.
 * Provides interactive timeline visualization with support for task dependencies,
 * markers, and different time scales.
 *
 * @example
 * ```html
 * <gantt-chart
 *   .items="[
 *     { id: '1', title: 'Task 1', start: new Date('2024-01-01'), end: new Date('2024-01-15') },
 *     { id: '2', title: 'Task 2', start: new Date('2024-01-10'), end: new Date('2024-01-30') }
 *   ]"
 *   showConnectors="true"
 *   scaleIndex="8"
 * ></gantt-chart>
 * ```
 */
export declare class GanttChart extends LitElement {
    static styles: import('lit').CSSResult;
    /** Array of items/tasks to display in the chart */
    items: GanttItem[];
    /** Whether to show dependency connectors between linked items */
    showConnectors: boolean;
    /** Index into the scales array determining the current zoom level */
    scaleIndex: number;
    /** Field name for item titles */
    titleField: string;
    /** Field name for item start dates */
    startField: string;
    /** Field name for item end dates */
    endField: string;
    /** Field names for item markers */
    markerFields: string[];
    /** Field name for item links */
    linksField: string;
    /** Field name for item unique identifiers */
    keyField: string;
    /** Current scale factor from the scales array */
    private _scale;
    /** Current function for calculating next date based on scale */
    private _getNextDate;
    /** Start date of the visible range */
    private _startDate;
    /** End date of the visible range */
    private _finishDate;
    /** Minimum date value in milliseconds */
    private _minDate;
    /** Maximum date value in milliseconds */
    private _maxDate;
    /** Array of ruler marks for the timeline */
    private _rulers;
    /** Whether the mouse button is currently pressed */
    private _isMouseDown;
    /** X coordinate where mouse was pressed */
    private _mouseDownPageX;
    /** Current horizontal scroll position */
    /** Array of connector points for dependency lines */
    private _connectors;
    /**
     * Creates a new GanttChart instance.
     * Initializes the chart with default settings.
     */
    constructor();
    /**
     * Lifecycle method called when component properties change.
     * Updates the chart when relevant properties are modified.
     *
     * @param changedProperties - Map of changed property names to their old values
     */
    updated(changedProperties: Map<string, object>): void;
    /**
     * Updates the chart scale based on the current scaleIndex.
     */
    private _updateScale;
    /**
     * Calculates the date range for the visible items.
     */
    private _calculateDateRange;
    /**
     * Generates ruler marks for the timeline based on current scale.
     */
    private _generateRulers;
    /**
     * Formats a date for display on the timeline.
     * @param date - The date to format
     * @returns Formatted date string
     */
    private _getDateText;
    /**
     * Converts a date to a pixel position on the timeline.
     * @param position - The date to convert
     * @returns Position in pixels
     */
    private _createScalable;
    /**
     * Gets the pixel position of the current day line.
     * @returns Position in pixels
     */
    private _getCurrentDayPosition;
    /**
     * Scrolls the timeline left by one viewport width.
     */
    /**
     * Scrolls the timeline right by one viewport width.
     */
    /**
     * Decreases the zoom level of the timeline.
     */
    private _scaleDown;
    /**
     * Increases the zoom level of the timeline.
     */
    private _scaleUp;
    /**
     * Handles mouse down events for timeline dragging.
     * @param e - Mouse event
     */
    private _handleMouseDown;
    /**
     * Handles mouse up events for timeline dragging.
     */
    private _handleMouseUp;
    /**
     * Handles mouse move events for timeline dragging.
     * @param e - Mouse event
     */
    private _handleMouseMove;
    /**
     * Handles scroll events on the timeline.
     * @param e - Scroll event
     */
    private _handleScroll;
    /**
     * Handles click events on timeline rows.
     * @param item - The clicked item
     */
    private _rowClick;
    /**
     * Calculates connector points for dependency lines.
     */
    private _calculateConnectors;
    /**
     * Renders the Gantt chart component.
     * @returns Rendered HTML template
     */
    render(): TemplateResult<1>;
    /**
     * Renders dependency connector lines between linked items.
     * @returns Rendered HTML template for connectors
     */
    private _renderConnectors;
}
