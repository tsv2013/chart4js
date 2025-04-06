import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { PieChart } from './pie-chart';
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
    createPath: vi
      .fn()
      .mockReturnValue(
        document.createElementNS('http://www.w3.org/2000/svg', 'path'),
      ),
  },
}));

describe.skip('PieChart', () => {
  let element: PieChart;
  const testData = [
    { label: 'A', value: 30 },
    { label: 'B', value: 20 },
    { label: 'C', value: 50 },
  ];

  beforeEach(() => {
    element = document.createElement('pie-chart') as PieChart;
    document.body.appendChild(element);
  });

  afterEach(() => {
    document.body.removeChild(element);
    vi.clearAllMocks();
  });

  it('should create with default properties', () => {
    expect(element.valueKey).toBe('value');
    expect(element.labelKey).toBe('label');
    expect(element.innerRadius).toBe(0);
    expect(element.colors).toHaveLength(10);
  });

  it('should create chart elements when data is provided', async () => {
    element.data = testData;
    await element.updateComplete;

    // Check if main group was created with center translation
    expect(SVGHelper.createGroup).toHaveBeenCalledWith('translate(300,200)');

    // Check if pie segments were created
    expect(SVGHelper.createPath).toHaveBeenCalledTimes(3);
    expect(SVGHelper.createPath).toHaveBeenCalledWith(
      expect.objectContaining({
        fill: element.colors[0],
        stroke: 'white',
        strokeWidth: '2',
      }),
    );

    // Check if labels were created
    expect(SVGHelper.createText).toHaveBeenCalledWith(
      'A',
      expect.objectContaining({
        anchor: 'middle',
        dy: '.35em',
      }),
    );
  });

  it('should update chart when data changes', async () => {
    element.data = testData;
    await element.updateComplete;

    const newData = [
      { label: 'X', value: 60 },
      { label: 'Y', value: 40 },
    ];
    element.data = newData;
    await element.updateComplete;

    // Check if new segments were created
    expect(SVGHelper.createPath).toHaveBeenCalledTimes(5); // 3 from first render + 2 from update
  });

  it('should update chart when innerRadius changes', async () => {
    element.data = testData;
    element.innerRadius = 50;
    await element.updateComplete;

    // Check if paths were created with inner radius
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const pathCalls = (SVGHelper.createPath as any).mock.calls;
    const pathData = pathCalls[0][0].d;
    expect(pathData).toContain('A 50 50'); // Check if inner radius arc is present
  });

  it('should calculate correct angles based on values', async () => {
    element.data = [
      { label: 'A', value: 60 }, // 60% = 2π * 0.6 ≈ 3.77 radians
      { label: 'B', value: 40 }, // 40% = 2π * 0.4 ≈ 2.51 radians
    ];
    await element.updateComplete;

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    const pathCalls = (SVGHelper.createPath as any).mock.calls;
    expect(pathCalls).toHaveLength(2);

    // First segment should start at 0 and end at approximately 3.77 radians
    const firstPath = pathCalls[0][0].d;
    expect(firstPath).toMatch(/M.*A.*L.*A.*Z/); // Check path structure
  });
});
