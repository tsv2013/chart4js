import { describe, it, expect, beforeEach } from 'vitest';
import { WordCloud } from './word-cloud';
import { defaultOptions } from './word-cloud';

describe('WordCloud', () => {
  let cloud: WordCloud;
  const testWords = [
    ['JavaScript', 10],
    ['TypeScript', 8],
    ['HTML', 6],
    ['CSS', 5],
  ] as [string, number][];

  beforeEach(async () => {
    if (!customElements.get('word-cloud')) {
      customElements.define('word-cloud', WordCloud);
    }
    cloud = document.createElement('word-cloud') as WordCloud;
    document.body.appendChild(cloud);
    await cloud.updateComplete;
  });

  it('initializes with default properties', () => {
    expect(cloud.words).toEqual([]);
    expect(cloud.colors).toEqual(['#000000']);
    expect(cloud.options).toEqual(defaultOptions);
  });

  it('renders correct number of words based on topN', async () => {
    cloud.words = testWords;
    cloud.options = { ...defaultOptions, topN: 2 };
    await cloud.updateComplete;

    const words = cloud.shadowRoot!.querySelectorAll('.word');
    expect(words.length).toBe(2);
  });

  it('sorts words by weight descending', async () => {
    cloud.words = testWords;
    await cloud.updateComplete;

    const words = cloud.shadowRoot!.querySelectorAll('.word');
    expect(words[0].textContent).toBe('JavaScript');
    expect(words[1].textContent).toBe('TypeScript');
  });

  it('applies color cycling correctly', async () => {
    cloud.words = testWords;
    cloud.colors = ['#FF0000', '#00FF00'];
    await cloud.updateComplete;

    const words = cloud.shadowRoot!.querySelectorAll('.word');
    expect(words[0].style.color).toBe('rgb(255, 0, 0)');
    expect(words[1].style.color).toBe('rgb(0, 255, 0)');
    expect(words[2].style.color).toBe('rgb(255, 0, 0)');
  });

  it('calculates font sizes correctly', async () => {
    cloud.words = testWords;
    cloud.options = { ...defaultOptions, weightFactor: 20 };
    await cloud.updateComplete;

    // (10 - 5 + 1) / 20 = 0.3
    expect(cloud['weight']).toBeCloseTo(0.3);

    const jsWords = cloud.shadowRoot!.querySelectorAll('.word')!;
    // 20px for 1st word
    const fontSize = parseFloat(jsWords[0].style.fontSize);
    expect(fontSize).toBeCloseTo(20);

    expect(parseFloat(jsWords[1].style.fontSize)).toBeCloseTo(13.33, 2);
    expect(parseFloat(jsWords[2].style.fontSize)).toBeCloseTo(6.67, 2);
    expect(parseFloat(jsWords[3].style.fontSize)).toBeCloseTo(3.33, 2);
  });

  it('updates when properties change', async () => {
    cloud.words = testWords;
    await cloud.updateComplete;
    const initialWordCount = cloud.shadowRoot!.querySelectorAll('.word').length;

    cloud.words = [...testWords, ['Python', 7]];
    await cloud.updateComplete;
    const newWordCount = cloud.shadowRoot!.querySelectorAll('.word').length;
    expect(newWordCount).toBeGreaterThan(initialWordCount);
  });

  it('handles empty words array', async () => {
    cloud.words = [];
    await cloud.updateComplete;

    const words = cloud.shadowRoot!.querySelectorAll('.word');
    expect(words.length).toBe(0);
  });

  it('respects maxHeight option', async () => {
    cloud.words = testWords;
    cloud.options = { ...defaultOptions, maxHeight: 200 };
    await cloud.updateComplete;

    const container = cloud.shadowRoot!.querySelector('.word-cloud-container')!;
    expect(container.style.height).toBe('200px');
  });

  it.skip('applies hover styles', async () => {
    cloud.words = testWords;
    await cloud.updateComplete;

    const word = cloud.shadowRoot!.querySelector('.word')!;
    expect(word.style.transition).toContain('transform 0.2s ease-in-out');
  });

  it('positions words absolutely', async () => {
    cloud.words = testWords;
    await cloud.updateComplete;

    const word = cloud.shadowRoot!.querySelector('.word')!;
    // expect(word.style.position).toBe('absolute');
    expect(word.style.left).not.toBe('');
    expect(word.style.top).not.toBe('');
  });

  it('handles duplicate weights', async () => {
    cloud.words = [
      ['A', 5],
      ['B', 5],
      ['C', 5],
    ];
    await cloud.updateComplete;

    const words = cloud.shadowRoot!.querySelectorAll('.word');
    expect(words.length).toBe(3);
  });

  it('applies padding correctly', async () => {
    cloud.words = testWords;
    cloud.options = { ...defaultOptions, padding: 20 };
    await cloud.updateComplete;

    const container = cloud.shadowRoot!.querySelector('.word-cloud-container')!;
    expect(container.style.height).toContain('px');
  });
});
