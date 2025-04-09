import { LitElement } from 'lit';
/**
 * Default configuration options for the word cloud component.
 * These settings control the layout, appearance, and behavior of the word cloud.
 */
export declare const defaultOptions: {
    /** Controls the density of the spiral placement algorithm (higher values = more points) */
    spiralResolution: number;
    /** Maximum number of spiral points to try before giving up on placing a word */
    spiralLimit: number;
    /** Line height multiplier for word elements */
    lineHeight: number;
    /** Horizontal padding between words in pixels */
    xWordPadding: number;
    /** Vertical padding between words in pixels */
    yWordPadding: number;
    /** Factor used to scale word sizes based on their weight */
    weightFactor: number;
    /** Maximum number of words to display in the cloud */
    topN: number;
    /** Maximum height of the cloud in pixels (0 for auto-height) */
    maxHeight: number;
    /** Padding around the entire word cloud in pixels */
    padding: number;
};
/**
 * Word cloud component that displays a collection of words with varying sizes
 * based on their weights. Words are arranged in a spiral pattern to maximize
 * space utilization while avoiding overlaps.
 *
 * @example
 * ```html
 * <word-cloud
 *   words="[['JavaScript', 10], ['TypeScript', 8], ['HTML', 6], ['CSS', 5]]"
 *   colors="['#4285F4', '#EA4335', '#FBBC05', '#34A853']"
 *   options="{ weightFactor: 30, topN: 20 }"
 * ></word-cloud>
 * ```
 */
export declare class WordCloud extends LitElement {
    static styles: import('lit').CSSResult;
    /**
     * Array of word-weight pairs to display in the cloud.
     * Each entry is a tuple of [word, weight] where weight determines the word size.
     */
    words: Array<[string, number]>;
    /**
     * Array of color strings to use for the words.
     * Colors are applied in sequence to the words.
     */
    colors: string[];
    /**
     * Configuration options for the word cloud.
     * See defaultOptions for available settings and their defaults.
     */
    options: {
        /** Controls the density of the spiral placement algorithm (higher values = more points) */
        spiralResolution: number;
        /** Maximum number of spiral points to try before giving up on placing a word */
        spiralLimit: number;
        /** Line height multiplier for word elements */
        lineHeight: number;
        /** Horizontal padding between words in pixels */
        xWordPadding: number;
        /** Vertical padding between words in pixels */
        yWordPadding: number;
        /** Factor used to scale word sizes based on their weight */
        weightFactor: number;
        /** Maximum number of words to display in the cloud */
        topN: number;
        /** Maximum height of the cloud in pixels (0 for auto-height) */
        maxHeight: number;
        /** Padding around the entire word cloud in pixels */
        padding: number;
    };
    /**
     * Array of placed words with their positions and DOM elements.
     * Used for tracking word positions and detecting overlaps.
     */
    private placedWords;
    /** Minimum weight value in the dataset, used for scaling */
    private minWeight;
    /** Scaling factor for word sizes based on weights */
    private weight;
    /**
     * Creates a DOM element for a word with the specified text, weight, and color.
     *
     * @param text - The word text to display
     * @param weight - The weight value that determines the word size
     * @param color - The index of the color to use from the colors array
     * @returns A div element configured for the word cloud
     */
    private createWordElement;
    /**
     * Checks if a word element intersects with any previously placed words.
     *
     * @param currentWordRect - The bounding rectangle of the current word element
     * @returns True if there is an intersection, false otherwise
     */
    private isIntersectWithOthers;
    /**
     * Arranges words in a spiral pattern starting from the center.
     * Attempts to place each word without overlapping with previously placed words.
     *
     * @param cloudElement - The container element for the word cloud
     * @param startPoint - The center point of the spiral
     * @param currentPoint - The current point in the spiral (updated during placement)
     * @returns A tuple of [minY, maxY] representing the vertical bounds of placed words
     */
    private arrangeWords;
    /**
     * Renders the word cloud by processing the data and arranging the words.
     * This method is called when the component is first updated or when
     * the words, colors, or options properties change.
     */
    private renderWordCloud;
    /**
     * Lifecycle method called after the component is first updated.
     * Initializes the word cloud.
     */
    protected firstUpdated(): void;
    /**
     * Lifecycle method called when component properties change.
     * Re-renders the word cloud if relevant properties have changed.
     *
     * @param changedProperties - Map of changed property names to their old values
     */
    protected updated(changedProperties: Map<string, object>): void;
    /**
     * Renders the word cloud container element.
     *
     * @returns The rendered HTML template
     */
    render(): import('lit-html').TemplateResult<1>;
}
