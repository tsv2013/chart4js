import { describe, it, expect, beforeEach } from 'vitest';
import { PieChart } from './pie-chart';
import '../utils/svg-helper';

describe('PieChart', () => {
  let chart: PieChart;

  beforeEach(async () => {
    if (!customElements.get('pie-chart')) {
      customElements.define('pie-chart', PieChart);
    }
    chart = document.createElement('pie-chart') as PieChart;
    chart.animationEnabled = false;
    document.body.appendChild(chart);
    await chart.updateComplete;
  });

  it('calculates total value correctly', async () => {
    const data = [
      { value: 120, label: 'A' },
      { value: 80, label: 'B' },
    ];
    chart.data = data;
    await chart.updateComplete;

    expect(chart['total']).toBe(200);
  });

  it('renders correct number of segments', async () => {
    const data = [
      { value: 100, label: 'A' },
      { value: 50, label: 'B' },
    ];
    chart.data = data;
    await chart.updateComplete;

    const paths = chart.shadowRoot!.querySelectorAll('path');
    expect(paths.length).toBe(2);
  });

  it('updates hover state on segment interaction', async () => {
    const data = [{ value: 100, label: 'A' }];
    chart.hoverEffects = true;
    chart.data = data;
    await chart.updateComplete;

    let path = chart.shadowRoot!.querySelector('path')!;
    const originalColor = path.getAttribute('fill');

    // Trigger hover
    path.dispatchEvent(new Event('mouseenter'));
    await chart.updateComplete;
    path = chart.shadowRoot!.querySelector('path')!;

    expect(chart['hoveredSegment']).toBe(0);
    expect(path.getAttribute('fill')).not.toBe(originalColor);

    // Trigger leave
    path.dispatchEvent(new Event('mouseleave'));
    await chart.updateComplete;
    path = chart.shadowRoot!.querySelector('path')!;

    expect(chart['hoveredSegment']).toBeNull();
    expect(path.getAttribute('fill')).toBe(originalColor);
  });

  it('displays percentage labels when enabled', async () => {
    const data = [{ value: 100, label: 'A' }];
    chart.data = data;
    chart.showPercentages = true;
    await chart.updateComplete;

    const textContent = Array.from(chart.shadowRoot!.querySelectorAll('text'))
      .map((t) => t.textContent)
      .join('');

    expect(textContent).toContain('100.0%');
  });

  it('creates donut chart when innerRadius is set', async () => {
    const data = [{ value: 100, label: 'A' }];
    chart.data = data;
    chart.innerRadius = 50;
    await chart.updateComplete;

    const path = chart.shadowRoot!.querySelector('path')!;
    const pathData = path.getAttribute('d');
    expect(pathData).toMatch(/A 50/); // Check for inner radius arc
  });

  it('renders legend when showLegend is true', async () => {
    const data = [{ value: 100, label: 'A' }];
    chart.data = data;
    chart.showLegend = true;
    await chart.updateComplete;

    const legendText = chart.shadowRoot!.querySelector('text')!.textContent;
    expect(legendText).toContain('A');
  });

  it.skip('applies animation styles when enabled', async () => {
    const data = [{ value: 100, label: 'A' }];
    chart.data = data;
    chart.animationEnabled = true;
    await chart.updateComplete;

    const path = chart.shadowRoot!.querySelector('path')!;
    expect(path.style.transform).toContain('scale(0)');

    // Wait for animation frame
    await new Promise((resolve) => requestAnimationFrame(resolve));
    await chart.updateComplete;

    expect(path.style.transform).toContain('scale(1)');
  });

  it('updates chart when data changes', async () => {
    const data = [{ value: 100, label: 'A' }];
    chart.data = data;
    await chart.updateComplete;

    expect(chart['total']).toBe(100);
    let paths = chart.shadowRoot!.querySelectorAll('path');
    expect(paths.length).toBe(1);

    chart.data = [{ value: 200, label: 'B' }];
    await chart.updateComplete;

    expect(chart['total']).toBe(200);
    paths = chart.shadowRoot!.querySelectorAll('path');
    expect(paths.length).toBe(1);
  });

  it('handles empty data gracefully', async () => {
    const paths = chart.shadowRoot!.querySelectorAll('path');
    expect(paths.length).toBe(0);
  });
});
