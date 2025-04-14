import { describe, it, expect, beforeEach } from 'vitest';
import { BarChart } from './bar-chart';
import '../utils/svg-helper';

describe('BarChart', () => {
  let chart: BarChart;

  beforeEach(async () => {
    if (!customElements.get('bar-chart')) {
      customElements.define('bar-chart', BarChart);
    }
    chart = document.createElement('bar-chart') as BarChart;
    chart.animationEnabled = false;
    document.body.appendChild(chart);
    await chart.updateComplete;
  });

  it('initializes with default properties', async () => {
    expect(chart.xKey).toBe('category');
    expect(chart.yKey).toBe('value');
    expect(chart.showButtons).toBe(true);
    expect(chart.limit).toBe(10);
  });

  it('renders correct number of bars for single dataset', async () => {
    chart.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ];
    await chart.updateComplete;

    const bars = chart.shadowRoot!.querySelectorAll('rect');
    expect(bars.length).toBe(2);
  });

  it('renders multiple datasets correctly', async () => {
    chart.data = [
      { category: 'A', sales: 10, orders: 5 },
      { category: 'B', sales: 20, orders: 8 },
    ];
    chart.showLegend = false;
    chart.datasets = ['sales', 'orders'];
    await chart.updateComplete;

    const bars = chart.shadowRoot!.querySelectorAll('rect');
    expect(bars.length).toBe(4); // 2 categories × 2 datasets
  });

  it('renders multiple datasets with legend correctly', async () => {
    chart.data = [
      { category: 'A', sales: 10, orders: 5 },
      { category: 'B', sales: 20, orders: 8 },
    ];
    chart.datasets = ['sales', 'orders'];
    await chart.updateComplete;

    const bars = chart.shadowRoot!.querySelectorAll('svg>g>rect');
    expect(bars.length).toBe(4); // 2 categories × 2 datasets

    const allRects = chart.shadowRoot!.querySelectorAll('rect');
    expect(allRects.length).toBe(6); // 2 categories × 2 datasets + 2 legend
  });

  it('calculates max value correctly', async () => {
    chart.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ];
    await chart.updateComplete;

    expect(chart.maxValue).toBe(20);
  });

  it('handles hover interactions', async () => {
    chart.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ];
    await chart.updateComplete;

    const bars = chart.shadowRoot!.querySelectorAll('rect');
    const firstBar = bars[0];
    const originalColor = firstBar.getAttribute('fill');

    // Trigger hover
    firstBar.dispatchEvent(new Event('mouseenter'));
    await chart.updateComplete;

    expect(chart.hoveredBar).toBe(0);
    expect(firstBar.getAttribute('fill')).not.toBe(originalColor);

    // Trigger leave
    firstBar.dispatchEvent(new Event('mouseleave'));
    await chart.updateComplete;

    expect(chart.hoveredBar).toBeNull();
    expect(firstBar.getAttribute('fill')).toBe(originalColor);
  });

  it('renders pagination controls when enabled', async () => {
    chart.showButtons = true;
    chart.limit = 2;
    chart.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'C', value: 30 },
    ];
    await chart.updateComplete;

    const buttons = chart.shadowRoot!.querySelectorAll('button');
    expect(buttons.length).toBe(2);
  });

  it('updates offset correctly with pagination', async () => {
    chart.limit = 2;
    chart.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
      { category: 'C', value: 30 },
    ];
    await chart.updateComplete;

    // Initial state
    expect(chart.offset).toBe(0);
    let bars = chart.shadowRoot!.querySelectorAll('rect');
    expect(bars.length).toBe(2);

    // Next page
    chart.next();
    await chart.updateComplete;
    expect(chart.offset).toBe(2);
    bars = chart.shadowRoot!.querySelectorAll('rect');
    expect(bars.length).toBe(1);

    // Previous page
    chart.prev();
    await chart.updateComplete;
    expect(chart.offset).toBe(0);
    bars = chart.shadowRoot!.querySelectorAll('rect');
    expect(bars.length).toBe(2);
  });

  it('renders axis labels correctly', async () => {
    chart.data = [
      { category: 'A', value: 10 },
      { category: 'B', value: 20 },
    ];
    await chart.updateComplete;

    const labels = chart.shadowRoot!.querySelectorAll('text');
    const xLabels = Array.from(labels).filter(
      (t) => t.textContent === 'A' || t.textContent === 'B',
    );
    expect(xLabels.length).toBe(2);
  });

  it('renders data values when enabled', async () => {
    chart.showValues = true;
    chart.data = [{ category: 'A', value: 10 }];
    await chart.updateComplete;

    const valueText = Array.from(
      chart.shadowRoot!.querySelectorAll('text'),
    ).find((t) => t.textContent === '10');
    expect(valueText).toBeTruthy();
  });

  it('renders legend for multiple datasets', async () => {
    chart.data = [
      { category: 'A', sales: 10, orders: 5 },
      { category: 'B', sales: 20, orders: 8 },
    ];
    chart.datasets = ['sales', 'orders'];
    chart.showLegend = true;
    await chart.updateComplete;

    const legendItems = chart.shadowRoot!.querySelectorAll('rect[width="15"]');
    expect(legendItems.length).toBe(2);
  });

  it('applies correct scaling for bars', async () => {
    chart.width = 400;
    chart.height = 300;
    chart.data = [{ category: 'A', value: 100 }];
    await chart.updateComplete;

    const bar = chart.shadowRoot!.querySelector('rect')!;
    const barHeight = parseFloat(bar.getAttribute('height')!);
    expect(barHeight).toBeGreaterThan(0);
    expect(barHeight).toBeLessThan(chart.height);
  });

  it('handles empty data gracefully', async () => {
    chart.data = [];
    await chart.updateComplete;

    const bars = chart.shadowRoot!.querySelectorAll('rect');
    expect(bars.length).toBe(0);
  });

  it('updates chart when data changes', async () => {
    chart.data = [{ category: 'A', value: 10 }];
    await chart.updateComplete;

    const initialBars = chart.shadowRoot!.querySelectorAll('rect').length;

    chart.data = [{ category: 'B', value: 20 }];
    await chart.updateComplete;

    const updatedBars = chart.shadowRoot!.querySelectorAll('rect').length;
    expect(updatedBars).toBe(initialBars);
  });

  it('applies animation styles when enabled', async () => {
    chart.animationEnabled = true;
    chart.data = [{ category: 'A', value: 10 }];
    await chart.updateComplete;

    const bar = chart.shadowRoot!.querySelector('rect')!;
    expect(bar.style.transition).toContain('height');
  });
});
