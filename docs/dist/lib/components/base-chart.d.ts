import { LitElement } from 'lit';
/**
 * Base chart component that provides common functionality for all chart types.
 * This class serves as the foundation for all chart components in the library,
 * providing basic SVG rendering, color management, and layout capabilities.
 *
 * @example
 * ```html
 * <base-chart
 *   width="600"
 *   height="400"
 *   title="My Chart"
 *   data="[{'category': 'A', 'value': 10}, {'category': 'B', 'value': 20}]"
 *   showLegend="true"
 *   animationEnabled="true"
 * ></base-chart>
 * ```
 */
export declare class BaseChart extends LitElement {
    static styles: import('lit').CSSResult;
    /** Width of the chart in pixels */
    width: number;
    /** Height of the chart in pixels */
    height: number;
    /** Title displayed at the top of the chart */
    title: string;
    /**
     * Data array for the chart. The structure depends on the specific chart type.
     * For most charts, this should be an array of objects with properties matching
     * the xKey and yKey values.
     */
    data: any[];
    /**
     * Margin settings for the chart content.
     * Controls the spacing between the chart content and the chart boundaries.
     */
    margin: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
    /**
     * Color palette for the chart elements.
     * Each color is specified as an RGB string without the 'rgb(' prefix.
     * The colors are used in sequence for different data series or segments.
     */
    colors: string[];
    /** Whether to display the chart legend */
    showLegend: boolean;
    /** Whether to display data values on the chart elements */
    showValues: boolean;
    /** Whether to enable hover effects on chart elements */
    hoverEffects: boolean;
    /** Duration of animation in milliseconds */
    animationDuration: number;
    /** Whether animations are enabled */
    animationEnabled: boolean;
    /** Flag indicating if this is the first render of the chart */
    protected isFirstRender: boolean;
    /** Reference to the SVG element used for rendering the chart */
    protected svgElement: SVGSVGElement | null;
    /**
     * Returns the fill color for a chart element based on its index.
     * @param index - The index of the element in the data array
     * @returns A color string in rgba format with 0.2 opacity
     */
    protected getColor(index: number): string;
    /**
     * Returns the hover color for a chart element based on its index.
     * @param index - The index of the element in the data array
     * @returns A color string in rgba format with 0.4 opacity
     */
    protected getHoverColor(index: number): string;
    /**
     * Returns the border color for a chart element based on its index.
     * @param index - The index of the element in the data array
     * @returns A color string in rgba format with 1.0 opacity
     */
    protected getBorderColor(index: number): string;
    /**
     * Creates the render root element and adds necessary styles.
     * @returns The render root element
     */
    protected createRenderRoot(): HTMLElement | DocumentFragment;
    /**
     * Lifecycle method called after the component is first updated.
     * Initializes the chart by creating the SVG element and setting up the title.
     */
    protected firstUpdated(): void;
    protected get isAnimationEnabled(): boolean;
    /**
     * Initializes the chart by creating the SVG element and setting up the title.
     * This method is called after the component is first updated and can be
     * overridden by child classes to add additional initialization logic.
     */
    protected initializeChart(): void;
    /**
     * Renders the chart container element.
     * @returns The rendered HTML template
     */
    protected render(): import('lit-html').TemplateResult<1>;
}
