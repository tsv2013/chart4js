import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

export const defaultOptions = {
  spiralResolution: 1,
  spiralLimit: 360 * 5,
  lineHeight: 0.8,
  xWordPadding: 0,
  yWordPadding: 3,
  weightFactor: 40,
  topN: 40,
  maxHeight: 0,
  padding: 10,
};

type IPoint = {
  x: number;
  y: number;
};

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

  @property({ type: Array }) words: Array<[string, number]> = [];
  @property({ type: Array }) colors: string[] = ['#000000'];
  @property({ type: Object }) options = defaultOptions;

  @state() private placedWords: Array<{
    element: HTMLDivElement;
    rect: DOMRect;
    left: number;
    top: number;
  }> = [];

  private minWeight: number = 0;
  private weight: number = 0;

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

    // Clear previous words
    this.placedWords = [];
    container.innerHTML = '';

    // Sort words by weight
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

  protected firstUpdated() {
    this.renderWordCloud();
  }

  protected updated(changedProperties: Map<string, object>) {
    if (
      changedProperties.has('words') ||
      changedProperties.has('colors') ||
      changedProperties.has('options')
    ) {
      this.renderWordCloud();
    }
  }

  render() {
    return html`<div class="word-cloud-container"></div>`;
  }
}
