import { BaseChart } from './base-chart';
/**
 * Pie chart component that extends the base chart functionality.
 * Displays data as circular segments with proportional sizes based on values.
 * Supports donut charts, percentage labels, and interactive features.
 *
 * @example
 * ```html
 * <pie-chart
 *   width="600"
 *   height="400"
 *   title="Revenue by Category"
 *   data="[{'label': 'Electronics', 'value': 120}, {'label': 'Clothing', 'value': 80}]"
 *   valueKey="value"
 *   labelKey="label"
 *   innerRadius="50"
 *   showPercentages="true"
 *   animationEnabled="true"
 * ></pie-chart>
 * ```
 */
export declare class PieChart extends BaseChart {
    /** Property name in the data objects that represents the segment value */
    valueKey: string;
    /** Property name in the data objects that represents the segment label */
    labelKey: string;
    /**
     * Inner radius of the pie chart in pixels.
     * When greater than 0, creates a donut chart.
     */
    innerRadius: number;
    /** Whether to display percentage values on the segments */
    showPercentages: boolean;
    /** Index of the currently hovered segment, or null if none */
    private hoveredSegment;
    /** Sum of all segment values, used for percentage calculations */
    private total;
    /** Array of calculated positions for segment labels */
    private labelPositions;
    /**
     * Lifecycle method called after the component is first updated.
     * Draws the pie chart.
     */
    protected firstUpdated(): void;
    /**
     * Lifecycle method called when component properties change.
     * Re-draws the chart if the data has changed.
     *
     * @param changedProperties - Map of changed property names to their old values
     */
    protected updated(changedProperties: Map<string, object>): void;
    /**
     * Draws the pie chart by creating SVG elements for each segment.
     * Calculates segment angles, positions, and adds labels.
     */
    private drawChart;
    /**
     * Handles mouse hover events on pie segments.
     * Updates the hovered segment and applies visual effects.
     *
     * @param index - The index of the hovered segment
     */
    private handleSegmentHover;
    /**
     * Handles mouse leave events on pie segments.
     * Clears the hovered segment and removes visual effects.
     */
    private handleSegmentLeave;
    /**
     * Converts polar coordinates to cartesian coordinates.
     * Used for positioning segment labels.
     *
     * @param radius - The distance from the center
     * @param angle - The angle in radians
     * @returns An object with x and y coordinates
     */
    private polarToCartesian;
}
