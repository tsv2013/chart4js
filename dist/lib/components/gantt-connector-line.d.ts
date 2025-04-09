import { LitElement, TemplateResult } from 'lit';
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
export declare class GanttConnectorLine extends LitElement {
    static styles: import('lit').CSSResult;
    /** Start and end points for the connector line */
    points: ConnectorPoints;
    /** Array of points defining the connector line path */
    private _points;
    /** Left position of the connector line container */
    private _left;
    /** Top position of the connector line container */
    private _top;
    /** Width of the connector line container */
    private _width;
    /** Height of the connector line container */
    private _height;
    /** SVG path data string for the connector line */
    private _pathData;
    /**
     * Lifecycle method called when component properties change.
     * Recalculates the connector path when points change.
     *
     * @param changedProperties - Map of changed property names to their old values
     */
    updated(changedProperties: Map<string, object>): void;
    /**
     * Calculates the path for the connector line.
     * Uses a grid-based algorithm to create a path with rounded corners
     * that connects the start and end points.
     */
    private _calculatePath;
    /**
     * Generates the SVG path data string from the calculated points.
     * Creates a path with rounded corners using arc commands.
     */
    private _generatePathData;
    /**
     * Renders the connector line component.
     * Creates an SVG element with the calculated path.
     *
     * @returns Rendered HTML template
     */
    render(): TemplateResult;
}
