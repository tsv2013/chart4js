import { BaseChart } from './base-chart';
/**
 * Gauge chart component that extends the base chart functionality.
 * Displays a single value on a semi-circular gauge with customizable
 * ranges, colors, and interactive features.
 *
 * @example
 * ```html
 * <gauge-chart
 *   width="600"
 *   height="400"
 *   title="CPU Usage"
 *   value="75"
 *   min="0"
 *   max="100"
 *   warningValue="70"
 *   criticalValue="90"
 *   units="%"
 *   animationEnabled="true"
 * ></gauge-chart>
 * ```
 */
export declare class GaugeChart extends BaseChart {
    /** Current value to display on the gauge */
    value: number;
    /** Minimum value of the gauge range */
    min: number;
    /** Maximum value of the gauge range */
    max: number;
    /** Value at which to show warning indication */
    warningValue: number;
    /** Value at which to show critical indication */
    criticalValue: number;
    /** Starting angle of the gauge arc in degrees */
    startAngle: number;
    /** Ending angle of the gauge arc in degrees */
    endAngle: number;
    /** Thickness of the gauge arc in pixels */
    arcThickness: number;
    /** Whether to show tick marks on the gauge */
    showTicks: boolean;
    /** Whether to show value labels at tick marks */
    showLabels: boolean;
    /** Number of tick marks to display */
    numTicks: number;
    /** Units to display after the value */
    units: string;
    /** Main title of the gauge */
    title: string;
    /** Subtitle displayed below the main title */
    subtitle: string;
    /** Number of decimal places to show in values */
    precision: number;
    /** Color theme configuration for the gauge */
    private theme;
    /** Current value during animation */
    private animatedValue;
    /** Whether a value animation is in progress */
    private animationInProgress;
    /**
     * Lifecycle method called after the component is first updated.
     * Initializes the gauge and starts the initial value animation.
     */
    protected firstUpdated(): void;
    /**
     * Lifecycle method called when component properties change.
     * Triggers value animation when the value property changes.
     *
     * @param changedProperties - Map of changed property names to their old values
     */
    protected updated(changedProperties: Map<string, object>): void;
    /**
     * Animates the gauge value from its current position to the target value.
     * Uses cubic easing for smooth animation.
     */
    private animateValue;
    /**
     * Draws the gauge chart by creating SVG elements.
     * Creates the background arc, colored zones, tick marks, and labels.
     */
    private drawChart;
    /**
     * Converts a value to its corresponding angle on the gauge.
     *
     * @param value - The value to convert
     * @returns The angle in degrees
     */
    private valueToAngle;
    /**
     * Creates an SVG arc path between two angles.
     *
     * @param outerRadius - The outer radius of the arc
     * @param innerRadius - The inner radius of the arc
     * @param startAngle - The starting angle in degrees
     * @param endAngle - The ending angle in degrees
     * @returns An SVG path string for the arc
     */
    private createArc;
    /**
     * Converts polar coordinates to cartesian coordinates.
     *
     * @param radius - The distance from the center
     * @param angle - The angle in degrees
     * @returns An object with x and y coordinates
     */
    private polarToCartesian;
    /**
     * Handles hover events on the gauge.
     * Updates visual state for hover effects.
     *
     * @param isHovered - Whether the gauge is being hovered
     */
    private handleHover;
}
