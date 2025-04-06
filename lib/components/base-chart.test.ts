import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { BaseChart } from './base-chart';
import { SVGHelper } from '../utils/svg-helper';

vi.mock('../utils/svg-helper', () => ({
  SVGHelper: {
    createSVG: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
      ),
    createText: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'text'),
      ),
  },
}));

describe.skip('BaseChart', () => {
  let element: BaseChart;

  beforeEach(() => {
    element = document.createElement('base-chart') as BaseChart;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.clearAllMocks();
  });

  it('should create with default properties', () => {
    expect(element.width).toBe(600);
    expect(element.height).toBe(400);
    expect(element.title).toBe('');
    expect(element.data).toEqual([]);
    expect(element.margin).toEqual({
      top: 20,
      right: 20,
      bottom: 30,
      left: 40,
    });
  });

  it('should create SVG element on initialization', async () => {
    await element.updateComplete;

    expect(SVGHelper.createSVG).toHaveBeenCalledWith(600, 400, '0 0 600 400');
  });

  it('should add title when provided', async () => {
    element.title = 'Test Chart';
    await element.updateComplete;

    expect(SVGHelper.createText).toHaveBeenCalledWith('Test Chart', {
      x: 300,
      y: 10,
      anchor: 'middle',
      fontSize: '16px',
    });
  });

  it('should update chart when properties change', async () => {
    element.width = 800;
    element.height = 600;
    await element.updateComplete;

    expect(SVGHelper.createSVG).toHaveBeenCalledWith(800, 600, '0 0 800 600');
  });
});
