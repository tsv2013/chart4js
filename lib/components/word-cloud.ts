import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Default configuration options for the word cloud component.
 * These settings control the layout, appearance, and behavior of the word cloud.
 */
export const defaultOptions = {
  /** Controls the density of the spiral placement algorithm (higher values = more points) */
  spiralResolution: 1,
  /** Maximum number of spiral points to try before giving up on placing a word */
  spiralLimit: 360 * 5,
  /** Line height multiplier for word elements */
  lineHeight: 0.8,
  /** Horizontal padding between words in pixels */
  xWordPadding: 0,
  /** Vertical padding between words in pixels */
  yWordPadding: 3,
  /** Factor used to scale word sizes based on their weight */
  weightFactor: 40,
  /** Maximum number of words to display in the cloud */
  topN: 40,
  /** Maximum height of the cloud in pixels (0 for auto-height) */
  maxHeight: 0,
  /** Padding around the entire word cloud in pixels */
  padding: 10,
};

/**
 * Represents a point in 2D space with x and y coordinates.
 */
type IPoint = {
  x: number;
  y: number;
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
@customElement('word-cloud')
export class WordCloud extends LitElement {
  static styles = css`
    :host {
      display: block;
      position: relative;
      width: 100%;
      height: 100%;
    }
    .word-cloud-container {
      position: relative;
      width: 100%;
      height: 100%;
    }
    .word {
      position: absolute;
      cursor: pointer;
      transition: transform 0.2s ease-in-out;
    }
    .word:hover {
      transform: scale(1.1);
    }
  `;

  /**
   * Array of word-weight pairs to display in the cloud.
   * Each entry is a tuple of [word, weight] where weight determines the word size.
   */
  @property({ type: Array }) words: Array<[string, number]> = [];

  /**
   * Array of color strings to use for the words.
   * Colors are applied in sequence to the words.
   */
  @property({ type: Array }) colors: string[] = ['#000000'];

  /**
   * Configuration options for the word cloud.
   * See defaultOptions for available settings and their defaults.
   */
  @property({ type: Object }) options = defaultOptions;

  /**
   * Array of placed words with their positions and DOM elements.
   * Used for tracking word positions and detecting overlaps.
   */
  @state() private placedWords: Array<{
    element: HTMLDivElement;
    rect: DOMRect;
    left: number;
    top: number;
  }> = [];

  /** Minimum weight value in the dataset, used for scaling */
  private minWeight: number = 0;

  /** Scaling factor for word sizes based on weights */
  private weight: number = 0;

  /**
   * Creates a DOM element for a word with the specified text, weight, and color.
   *
   * @param text - The word text to display
   * @param weight - The weight value that determines the word size
   * @param color - The index of the color to use from the colors array
   * @returns A div element configured for the word cloud
   */
  private createWordElement(text: string, weight: number, color: number) {
    const element = document.createElement('div');
    element.className = 'word';
    element.style.fontSize = `${(weight - this.minWeight + 1) / this.weight}px`;
    element.style.lineHeight = `${this.options.lineHeight}em`;
    element.style.color = this.colors[color % this.colors.length];
    element.title = `${text} (${weight})`;
    element.textContent = text;
    return element;
  }

  /**
   * Checks if a word element intersects with any previously placed words.
   *
   * @param currentWordRect - The bounding rectangle of the current word element
   * @returns True if there is an intersection, false otherwise
   */
  private isIntersectWithOthers(currentWordRect: DOMRect) {
    for (const existingWord of this.placedWords) {
      const existingWordRect = existingWord.rect;
      if (
        !(
          currentWordRect.right + this.options.xWordPadding <
            existingWordRect.left - this.options.xWordPadding ||
          currentWordRect.left - this.options.xWordPadding >
            existingWordRect.right + this.options.xWordPadding ||
          currentWordRect.bottom + this.options.yWordPadding <
            existingWordRect.top - this.options.yWordPadding ||
          currentWordRect.top - this.options.yWordPadding >
            existingWordRect.bottom + this.options.yWordPadding
        )
      ) {
        return true;
      }
    }
    return false;
  }

  /**
   * Arranges words in a spiral pattern starting from the center.
   * Attempts to place each word without overlapping with previously placed words.
   *
   * @param cloudElement - The container element for the word cloud
   * @param startPoint - The center point of the spiral
   * @param currentPoint - The current point in the spiral (updated during placement)
   * @returns A tuple of [minY, maxY] representing the vertical bounds of placed words
   */
  private arrangeWords(
    cloudElement: HTMLDivElement,
    startPoint: IPoint,
    currentPoint: IPoint,
  ) {
    let yMin = currentPoint.y;
    let yMax = currentPoint.y;
    const displayWordsCount = Math.min(this.options.topN, this.words.length);

    for (let i = 0; i < displayWordsCount; i += 1) {
      const wordElement = this.createWordElement(
        this.words[i][0],
        this.words[i][1],
        i,
      );
      cloudElement.appendChild(wordElement);

      for (let j = 0; j < this.options.spiralLimit; j++) {
        const angle = this.options.spiralResolution * j;
        currentPoint.x = (1 + angle) * Math.cos(angle);
        currentPoint.y = (1 + angle) * Math.sin(angle);
        const left =
          startPoint.x + currentPoint.x - wordElement.offsetWidth / 2;
        const top =
          startPoint.y + currentPoint.y - wordElement.offsetHeight / 2;
        wordElement.style.left = `${left}px`;
        wordElement.style.top = `${top}px`;
        const wordRect = wordElement.getBoundingClientRect();
        if (!this.isIntersectWithOthers(wordRect)) {
          this.placedWords.push({
            element: wordElement,
            rect: wordRect,
            left,
            top,
          });
          break;
        }
      }

      if (yMin > currentPoint.y) {
        yMin = currentPoint.y;
      }
      if (yMax < currentPoint.y) {
        yMax = currentPoint.y;
      }
    }

    return [yMin, yMax];
  }

  /**
   * Renders the word cloud by processing the data and arranging the words.
   * This method is called when the component is first updated or when
   * the words, colors, or options properties change.
   */
  private renderWordCloud() {
    const container = this.shadowRoot?.querySelector(
      '.word-cloud-container',
    ) as HTMLDivElement;
    if (!container) return;

    container.style.position = 'relative';
    if (this.options.maxHeight > 0) {
      container.style.height = `${this.options.maxHeight}px`;
      container.style.overflow = 'auto';
    }

    this.placedWords = [];
    container.innerHTML = '';

    const sortedWords = [...this.words].sort((a, b) => b[1] - a[1]);
    this.minWeight = sortedWords[sortedWords.length - 1][1];
    this.weight =
      (sortedWords[0][1] - this.minWeight + 1) / this.options.weightFactor;

    const startPoint = {
      x: container.offsetWidth / 2,
      y: container.offsetHeight / 2,
    };
    const currentPoint = { x: startPoint.x, y: startPoint.y };

    const [yMin, yMax] = this.arrangeWords(container, startPoint, currentPoint);

    if (this.options.maxHeight === 0) {
      container.style.height = `${yMax - yMin + this.options.padding * 2}px`;
    }
  }

  /**
   * Lifecycle method called after the component is first updated.
   * Initializes the word cloud.
   */
  protected firstUpdated() {
    this.renderWordCloud();
  }

  /**
   * Lifecycle method called when component properties change.
   * Re-renders the word cloud if relevant properties have changed.
   *
   * @param changedProperties - Map of changed property names to their old values
   */
  protected updated(changedProperties: Map<string, object>) {
    if (
      changedProperties.has('words') ||
      changedProperties.has('colors') ||
      changedProperties.has('options')
    ) {
      this.renderWordCloud();
    }
  }

  /**
   * Renders the word cloud container element.
   *
   * @returns The rendered HTML template
   */
  render() {
    return html`<div class="word-cloud-container"></div>`;
  }
}
