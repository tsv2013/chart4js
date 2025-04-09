import { BaseChart } from './base-chart';
/**
 * Bar chart component that extends the base chart functionality.
 * Displays data as vertical or horizontal bars, with support for
 * multiple datasets, animations, and interactive features.
 *
 * @example
 * ```html
 * <bar-chart
 *   width="600"
 *   height="400"
 *   title="Sales by Category"
 *   data="[{'category': 'Electronics', 'value': 120}, {'category': 'Clothing', 'value': 80}]"
 *   xKey="category"
 *   yKey="value"
 *   showLegend="true"
 *   showValues="true"
 *   animationEnabled="true"
 * ></bar-chart>
 * ```
 */
export declare class BarChart extends BaseChart {
    /** Property name in the data objects that represents the X-axis categories */
    xKey: string;
    /** Property name in the data objects that represents the Y-axis values */
    yKey: string;
    /** Default color for the bars when not using the color palette */
    color: string;
    /** Whether to show navigation buttons for paginated data */
    showButtons: boolean;
    /** Maximum number of bars to display at once */
    limit: number;
    /** Current offset for paginated data display */
    private offset;
    /** Processed data ready for rendering */
    private processedData;
    /** Array of dataset keys for multi-dataset charts */
    private datasets;
    /** Maximum value in the dataset for scaling purposes */
    private maxValue;
    /** Index of the currently hovered bar, or null if none */
    private hoveredBar;
    /**
     * Lifecycle method called after the component is first updated.
     * Processes the data and draws the chart.
     */
    protected firstUpdated(): void;
    /**
     * Checks if the chart has multiple datasets.
     * @returns True if the chart has multiple datasets, false otherwise
     */
    get hasMultipleDatasets(): number;
    /**
     * Processes the raw data into a format suitable for rendering.
     * Handles both single and multiple dataset scenarios.
     */
    private processData;
    private prev;
    private next;
    private handleBarHover;
    private handleBarLeave;
    private updateBarColors;
    private drawChart;
    private renderLegend;
    protected render(): import('lit-html').TemplateResult<1>;
}
