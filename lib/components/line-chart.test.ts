import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { LineChart } from './line-chart';

describe('LineChart', () => {
  let chart: LineChart;

  const testData = [
    { x: 0, y: 0 },
    { x: 1, y: 2 },
    { x: 2, y: 1 },
    { x: 3, y: 4 },
    { x: 4, y: 3 },
  ];

  beforeEach(async () => {
    // Register the custom element if not already registered
    if (!customElements.get('line-chart')) {
      customElements.define('line-chart', LineChart);
    }
    chart = document.createElement('line-chart') as LineChart;
    document.body.appendChild(chart);
    await chart.updateComplete;
  });

  afterEach(() => {
    if (chart && chart.parentNode) {
      chart.parentNode.removeChild(chart);
    }
  });

  it('initializes with default properties', () => {
    expect(chart.xKey).toBe('x');
    expect(chart.yKey).toBe('y');
    expect(chart.colors).toStrictEqual([
      '7, 171, 160',
      '218, 60, 120',
      '126, 52, 157',
      '0, 119, 192',
      '231, 76, 60',
      '14, 172, 81',
      '241, 137, 45',
      '227, 114, 75',
      '174, 124, 91',
      '108, 122, 137',
      '117, 133, 134',
      '112, 112, 112',
    ]);
    expect(chart.lineWidth).toBe(2);
    expect(chart.showPoints).toBe(true);
    expect(chart.pointRadius).toBe(4);
  });

  it('creates chart elements when data is provided', async () => {
    chart.data = testData;
    await chart.updateComplete;

    const svg = chart.renderRoot.querySelector('svg');
    expect(svg).toBeTruthy();

    const mainGroup = svg?.querySelector('g');
    expect(mainGroup).toBeTruthy();

    const path = mainGroup?.querySelector('path');
    expect(path).toBeTruthy();
    expect(path?.getAttribute('stroke')).toBe('rgba(7, 171, 160, 1)');
    expect(path?.getAttribute('stroke-width')).toBe(chart.lineWidth.toString());
    expect(path?.getAttribute('fill')).toBe('none');

    const circles = mainGroup?.querySelectorAll('circle');
    expect(circles?.length).toBe(testData.length);
  });

  it('updates when data changes', async () => {
    chart.data = testData;
    await chart.updateComplete;

    const newData = [
      { x: 0, y: 1 },
      { x: 1, y: 3 },
      { x: 2, y: 2 },
    ];

    chart.data = newData;
    await chart.updateComplete;

    const circles = chart.renderRoot
      .querySelector('svg')
      ?.querySelector('g')
      ?.querySelectorAll('circle');
    expect(circles?.length).toBe(newData.length);
  });

  it('hides points when showPoints is false', async () => {
    chart.data = testData;
    chart.showPoints = false;
    await chart.updateComplete;

    const circles = chart.renderRoot
      .querySelector('svg')
      ?.querySelector('g')
      ?.querySelectorAll('circle');
    expect(circles?.length).toBe(0);
  });

  it('updates line style when color and width change', async () => {
    chart.data = testData;
    await chart.updateComplete;

    const newColor = 'rgba(7, 171, 160, 1)';
    const newWidth = 4;

    chart.color = newColor;
    chart.lineWidth = newWidth;
    await chart.updateComplete;

    const path = chart.renderRoot
      .querySelector('svg')
      ?.querySelector('g')
      ?.querySelector('path');
    expect(path?.getAttribute('stroke')).toBe(newColor);
    expect(path?.getAttribute('stroke-width')).toBe(newWidth.toString());
  });

  it('creates correct number of axis ticks', async () => {
    chart.data = testData;
    await chart.updateComplete;

    const xAxis = chart.renderRoot
      .querySelector('svg')
      ?.querySelectorAll('g')[1];
    const yAxis = chart.renderRoot
      .querySelector('svg')
      ?.querySelectorAll('g')[2];

    // Check X axis ticks (5 ticks + 1 for the end)
    expect(xAxis?.querySelectorAll('text').length).toBe(6);
    expect(xAxis?.querySelectorAll('line').length).toBe(6);

    // Check Y axis ticks (5 ticks + 1 for the end)
    expect(yAxis?.querySelectorAll('text').length).toBe(6);
    expect(yAxis?.querySelectorAll('line').length).toBe(6);
  });
});
