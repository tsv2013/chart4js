import { describe, it, expect, beforeEach } from 'vitest';
import { BaseChart } from './base-chart';
import '../utils/svg-helper';

describe('BaseChart', () => {
  let chart: BaseChart;

  beforeEach(async () => {
    if (!customElements.get('base-chart')) {
      customElements.define('base-chart', BaseChart);
    }
    chart = document.createElement('base-chart') as BaseChart;
    chart.animationEnabled = false;
    document.body.appendChild(chart);
    await chart.updateComplete;
  });

  it('initializes with default properties', async () => {
    expect(chart.width).toBe(600);
    expect(chart.height).toBe(400);
    expect(chart.title).toBe('');
    expect(chart.data).toEqual([]);
    expect(chart.showLegend).toBe(true);
    expect(chart.animationEnabled).toBe(false);
  });

  it('creates SVG element with correct dimensions', async () => {
    chart.width = 800;
    chart.height = 500;
    await chart.updateComplete;

    const svg = chart.shadowRoot!.querySelector('svg');
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute('width')).toBe('800');
    expect(svg?.getAttribute('height')).toBe('500');
  });

  it('renders title when provided', async () => {
    chart.title = 'Test Chart';
    await chart.updateComplete;

    const title = chart.shadowRoot!.querySelector('text');
    expect(title?.textContent).toBe('Test Chart');
    expect(title?.getAttribute('x')).toBe((chart.width / 2).toString());
  });

  it('applies correct color schemes', async () => {
    chart.colors = ['255,0,0', '0,255,0'];

    expect(chart.getColor(0)).toBe('rgba(255,0,0, 0.2)');
    expect(chart.getHoverColor(1)).toBe('rgba(0,255,0, 0.4)');
    expect(chart.getBorderColor(2)).toBe('rgba(255,0,0, 1)'); // Tests color cycling
  });

  it('responds to property changes', async () => {
    expect(chart.shadowRoot!.querySelector('svg')).toBeTruthy();

    chart.width = 1000;
    chart.height = 600;
    await chart.updateComplete;

    const svg = chart.shadowRoot!.querySelector('svg');
    expect(svg?.getAttribute('width')).toBe('1000');
    expect(svg?.getAttribute('height')).toBe('600');

    chart.title = 'New Title';
    await chart.updateComplete;
    expect(chart.shadowRoot!.querySelector('text')?.textContent).toBe(
      'New Title',
    );
  });

  it.skip('handles data changes', async () => {
    chart.data = [{ value: 10 }];
    await chart.updateComplete;

    const initialSvg = chart.shadowRoot!.querySelector('svg')?.outerHTML;

    chart.data = [{ value: 20 }];
    await chart.updateComplete;

    const updatedSvg = chart.shadowRoot!.querySelector('svg')?.outerHTML;
    expect(updatedSvg).not.toBe(initialSvg);
  });

  it('manages animation states correctly', async () => {
    expect(chart.isAnimationEnabled).toBe(false);
    chart.animationEnabled = true;
    expect(chart.isAnimationEnabled).toBe(true);
  });

  it('handles empty data gracefully', async () => {
    chart.data = [];
    await chart.updateComplete;

    // Should still render SVG container
    expect(chart.shadowRoot!.querySelector('svg')).toBeTruthy();
  });

  it('applies correct margin calculations', async () => {
    chart.margin = { top: 50, right: 30, bottom: 50, left: 30 };
    await chart.updateComplete;

    expect(chart.margin.top).toBe(50);
    expect(chart.margin.left).toBe(30);
  });

  it('creates render root with styles', async () => {
    const style = chart.shadowRoot!.querySelector('style');

    expect(style).toBeTruthy();
    expect(style?.textContent).toContain('display: block');
  });
});
