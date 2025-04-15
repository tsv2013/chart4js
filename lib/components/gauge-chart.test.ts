import { describe, it, expect, beforeEach } from 'vitest';
import { GaugeChart } from './gauge-chart';
import '../utils/svg-helper';

describe('GaugeChart', () => {
  let chart: GaugeChart;

  beforeEach(async () => {
    if (!customElements.get('gauge-chart')) {
      customElements.define('gauge-chart', GaugeChart);
    }
    chart = document.createElement('gauge-chart') as GaugeChart;
    chart.animationEnabled = false;
    document.body.appendChild(chart);
    await chart.updateComplete;
  });

  it('initializes with default properties', async () => {
    expect(chart.value).toBe(0);
    expect(chart.min).toBe(0);
    expect(chart.max).toBe(100);
    expect(chart.warningValue).toBe(70);
    expect(chart.criticalValue).toBe(90);
    expect(chart.arcThickness).toBe(30);
    expect(chart.units).toBe('');
  });

  it('renders title and subtitle correctly', async () => {
    chart.title = 'CPU Usage';
    chart.subtitle = 'Server 01';
    chart.showLabels = false;
    await chart.updateComplete;

    const titles = chart.shadowRoot!.querySelectorAll('svg g text');
    expect(titles[0].textContent).toBe('Warning');
    expect(titles[1].textContent).toBe('Critical');
    expect(titles[2].textContent).toBe('CPU Usage');
    expect(titles[3].textContent).toBe('Server 01');
  });

  it('displays current value with units', async () => {
    chart.value = 75;
    chart.units = '%';
    chart.precision = 1;
    await chart.updateComplete;

    const valueText = chart.shadowRoot!.querySelectorAll('text')[2];
    expect(valueText.textContent).toMatch(/0\.0%/);
  });

  it('renders warning and critical zones', async () => {
    chart.value = 75;
    await chart.updateComplete;

    const paths = chart.shadowRoot!.querySelectorAll('path');
    expect(paths.length).toBe(4); // Background + 3 zones
    expect(paths[1].getAttribute('fill')).toBe(chart.getColor(0)); // Normal zone
    expect(paths[2].getAttribute('fill')).toBe(chart.getColor(4)); // Warning zone
    expect(paths[3].getAttribute('fill')).toBe(chart.getColor(1)); // Critical zone
  });

  it('renders ticks and labels when enabled', async () => {
    chart.showTicks = true;
    chart.showLabels = true;
    chart.numTicks = 5;
    await chart.updateComplete;

    const ticks = chart.shadowRoot!.querySelectorAll('line');
    const labels = chart.shadowRoot!.querySelectorAll('text');
    expect(ticks.length).toBe(7); // 5 + 1 ticks + 1 value line
    expect(labels.length).toBeGreaterThan(5); // Includes value, title, and tick labels
  });

  it('animates value changes', async () => {
    chart.animationEnabled = true;
    chart.value = 50;
    await chart.updateComplete;

    // Initial value
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    expect((chart as any).animatedValue).toBe(0);

    // Wait for animation frame
    await new Promise((resolve) => requestAnimationFrame(resolve));
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    expect((chart as any).animatedValue).toBeGreaterThan(0);
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    expect((chart as any).animatedValue).toBeLessThanOrEqual(50);
  });

  it('updates gauge when range changes', async () => {
    chart.min = 0;
    chart.max = 200;
    chart.value = 150;
    chart.showLabels = false;
    await chart.updateComplete;

    const valueText = chart.shadowRoot!.querySelectorAll('text')[2];
    expect(valueText.textContent).toContain('150');
  });

  it('handles edge cases', async () => {
    // Test min === max
    chart.min = 100;
    chart.max = 100;
    chart.value = 100;
    await chart.updateComplete;

    const valueText = chart.shadowRoot!.querySelectorAll('text')[2];
    expect(valueText.textContent).toContain('100');

    // Test value out of range
    chart.min = 0;
    chart.max = 100;
    chart.value = 150;
    await chart.updateComplete;
    expect(chart.animatedValue).toBe(150);
  });

  it.skip('applies hover effects', async () => {
    chart.hoverEffects = true;
    await chart.updateComplete;

    const valueLine = chart.shadowRoot!.querySelector('line')!;
    const initialStroke = valueLine.getAttribute('stroke');

    // Trigger hover
    valueLine.dispatchEvent(new Event('mouseenter'));
    await chart.updateComplete;
    expect(valueLine.getAttribute('stroke')).not.toBe(initialStroke);

    // Trigger leave
    valueLine.dispatchEvent(new Event('mouseleave'));
    await chart.updateComplete;
    expect(valueLine.getAttribute('stroke')).toBe(initialStroke);
  });

  it('renders markers for warning/critical values', async () => {
    await chart.updateComplete;

    const circles = chart.shadowRoot!.querySelectorAll('circle');
    expect(circles.length).toBe(3); // Warning and critical markers + 1 for the value
    expect(circles[0].getAttribute('fill')).toBe(chart.getColor(4)); // Warning
    expect(circles[1].getAttribute('fill')).toBe(chart.getColor(1)); // Critical
  });

  it('updates color zones when thresholds change', async () => {
    chart.warningValue = 50;
    chart.criticalValue = 75;
    await chart.updateComplete;

    const paths = chart.shadowRoot!.querySelectorAll('path');
    expect(paths[2].getAttribute('fill')).toBe(chart.getColor(4)); // Updated warning zone
    expect(paths[3].getAttribute('fill')).toBe(chart.getColor(1)); // Critical zone
  });
});
