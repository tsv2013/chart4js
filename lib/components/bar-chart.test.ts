import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BarChart } from './bar-chart';
import { SVGHelper } from '../utils/svg-helper';

vi.mock('../utils/svg-helper', () => ({
  SVGHelper: {
    createSVG: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
      ),
    createGroup: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'g'),
      ),
    createText: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      ),
    createLine: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'line'),
      ),
    createRect: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'rect'),
      ),
  },
}));

describe.skip('BarChart', () => {
  let chart: BarChart;
  const testData = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
  ];

  beforeEach(async () => {
    if (!customElements.get('bar-chart')) {
      customElements.define('bar-chart', BarChart);
    }
    chart = document.createElement('bar-chart') as BarChart;
    chart.animationEnabled = false;
    document.body.appendChild(chart);
    await chart.updateComplete;
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should create with default properties', () => {
    expect(chart.xKey).toBe('category');
    expect(chart.yKey).toBe('value');
  });

  it('should create chart elements when data is provided', async () => {
    chart.data = testData;
    await chart.updateComplete;

    // Check if main group was created
    expect(SVGHelper.createGroup).toHaveBeenCalledWith('translate(40,20)');

    // Check if X axis group was created
    expect(SVGHelper.createGroup).toHaveBeenCalledWith('translate(0,350)');

    // Check if bars were created
    expect(SVGHelper.createRect).toHaveBeenCalledTimes(3);
    expect(SVGHelper.createRect).toHaveBeenCalledWith(
      expect.objectContaining({
        fill: '#1f77b4',
      }),
    );

    // Check if labels were created
    expect(SVGHelper.createText).toHaveBeenCalledWith(
      'A',
      expect.objectContaining({
        anchor: 'middle',
        transform: 'rotate(-45)',
      }),
    );
  });

  it('should update chart when data changes', async () => {
    chart.data = testData;
    await chart.updateComplete;

    const newData = [
      { category: 'X', value: 30 },
      { category: 'Y', value: 40 },
    ];
    chart.data = newData;
    await chart.updateComplete;

    // Check if new bars were created
    expect(SVGHelper.createRect).toHaveBeenCalledTimes(5); // 3 from first render + 2 from update
  });

  it('should update chart when properties change', async () => {
    chart.data = testData;
    chart.colors = ['#ff0000'];
    await chart.updateComplete;

    expect(SVGHelper.createRect).toHaveBeenCalledWith(
      expect.objectContaining({
        fill: '#ff0000',
      }),
    );
  });
});
