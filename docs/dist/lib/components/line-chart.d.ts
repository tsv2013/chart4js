import { BaseChart } from './base-chart';
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
export declare class LineChart extends BaseChart {
    /** Property name in the data objects that represents the X-axis values */
    xKey: string;
    /** Property name in the data objects that represents the Y-axis values */
    yKey: string;
    /** Width of the line in pixels */
    lineWidth: number;
    /** Whether to display points at each data point */
    showPoints: boolean;
    /** Radius of the points in pixels */
    pointRadius: number;
    /** Whether to fill the area under the line */
    showArea: boolean;
    /** Currently hovered point, containing series and point indices */
    private hoveredPoint;
    /** Array of dataset keys for multi-dataset charts */
    private datasets;
    /**
     * Returns the fill color for the area under a line based on its index.
     * @param index - The index of the line in the dataset
     * @returns A color string in rgba format with 0.1 opacity
     */
    private getAreaColor;
    /**
     * Lifecycle method called after the component is first updated.
     * Processes the data and draws the chart.
     */
    protected firstUpdated(): void;
    /**
     * Lifecycle method called when component properties change.
     * Re-processes data and redraws the chart if relevant properties have changed.
     *
     * @param changedProperties - Map of changed property names to their old values
     */
    protected updated(changedProperties: PropertyValues): void;
    private processData;
    private drawChart;
    private updatePointStyles;
}
