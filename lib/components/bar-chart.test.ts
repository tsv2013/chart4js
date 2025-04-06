import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BarChart } from './bar-chart';
import { SVGHelper } from '../utils/svg-helper';
import { renderComponent } from '../../src/setupTests';
import { html } from 'lit';

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
  let element: BarChart;
  const testData = [
    { category: 'A', value: 10 },
    { category: 'B', value: 20 },
    { category: 'C', value: 15 },
  ];

  beforeEach(() => {
    const container = renderComponent(html`<bar-chart></bar-chart>`);
    element = container.querySelector('bar-chart') as BarChart;
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.innerHTML = '';
    vi.clearAllMocks();
  });

  it('should create with default properties', () => {
    expect(element.xKey).toBe('category');
    expect(element.yKey).toBe('value');
    expect(element.color).toBe('#1f77b4');
  });

  it('should create chart elements when data is provided', async () => {
    element.data = testData;
    await element.updateComplete;

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
    element.data = testData;
    await element.updateComplete;

    const newData = [
      { category: 'X', value: 30 },
      { category: 'Y', value: 40 },
    ];
    element.data = newData;
    await element.updateComplete;

    // Check if new bars were created
    expect(SVGHelper.createRect).toHaveBeenCalledTimes(5); // 3 from first render + 2 from update
  });

  it('should update chart when properties change', async () => {
    element.data = testData;
    element.color = '#ff0000';
    await element.updateComplete;

    expect(SVGHelper.createRect).toHaveBeenCalledWith(
      expect.objectContaining({
        fill: '#ff0000',
      }),
    );
  });
});
