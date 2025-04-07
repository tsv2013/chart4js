import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

/**
 * Calculates the degree for the gauge indicator based on value, min, and max
 */
function calcDegree(value: number, min: number, max: number): number {
  return -180 * (1 - (value - min) / (max - min));
}

/**
 * A gauge chart component that displays a value within a range
 * with warning and critical thresholds.
 */
@customElement('gauge-chart')
export class GaugeChart extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
      --gauge-background: #f5f5f5;
      --gauge-normal: #4caf50;
      --gauge-warning: #ff9800;
      --gauge-critical: #f44336;
      --gauge-text: #333;
      --gauge-value-color: #333;
      --gauge-size: 400px;
      --gauge-animation-duration: 1.3s;
      --gauge-animation-timing: ease-in-out;
    }
    .gauge__container {
      width: var(--gauge-size);
      height: calc(var(--gauge-size) / 2);
      position: relative;
      overflow: hidden;
      background-color: var(--gauge-background);
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    .gauge__title {
      position: absolute;
      top: 10px;
      width: 100%;
      text-align: center;
      font-size: 18px;
      font-weight: bold;
      color: var(--gauge-text);
      z-index: 30;
    }
    .gauge__arc-scale {
      z-index: 1;
      position: absolute;
      background-color: var(--gauge-normal);
      width: var(--gauge-size);
      height: calc(var(--gauge-size) / 2);
      top: 0;
      border-radius: var(--gauge-size) var(--gauge-size) 0px 0px;
    }
    .gauge__indicator {
      position: absolute;
      width: var(--gauge-size);
      height: calc(var(--gauge-size) / 2);
      top: calc(var(--gauge-size) / 2);
      margin-left: auto;
      margin-right: auto;
      border-radius: 0px 0px var(--gauge-size) var(--gauge-size);
      transform-origin: center top;
      transition: all var(--gauge-animation-duration)
        var(--gauge-animation-timing);
    }
    .gauge__arc-center {
      z-index: 10;
      position: absolute;
      background-color: var(--gauge-background);
      width: calc(var(--gauge-size) - 150px);
      height: calc((var(--gauge-size) - 150px) / 2);
      top: 75px;
      margin-left: 75px;
      margin-right: auto;
      border-radius: var(--gauge-size) var(--gauge-size) 0px 0px;
    }
    .gauge__indicator--warning {
      z-index: 2;
      background-color: var(--gauge-warning);
    }
    .gauge__indicator--critical {
      z-index: 3;
      background-color: var(--gauge-critical);
    }
    .gauge__indicator--text {
      position: relative;
      top: 0;
      width: 75px;
      left: calc(100% - 75px);
      text-align: center;
      color: var(--gauge-text);
      font-size: 14px;
    }
    .gauge__indicator--value {
      z-index: 5;
      border-top: 3px solid var(--gauge-value-color);
      box-shadow: 0px 4px 24px rgba(0, 0, 0, 0.22);
      transition: all var(--gauge-animation-duration)
        var(--gauge-animation-timing);
    }
    .gauge__value-text {
      position: absolute;
      width: 100%;
      bottom: 0;
      z-index: 20;
      text-align: center;
      font-size: 40px;
      font-weight: bold;
      color: var(--gauge-value-color);
      transition: color var(--gauge-animation-duration)
        var(--gauge-animation-timing);
    }
    .gauge__min-text {
      position: absolute;
      width: 75px;
      bottom: 0;
      left: 0;
      z-index: 20;
      text-align: center;
      color: var(--gauge-text);
      font-size: 14px;
    }
    .gauge__max-text {
      position: absolute;
      width: 75px;
      bottom: 0;
      right: 0px;
      z-index: 20;
      text-align: center;
      color: var(--gauge-text);
      font-size: 14px;
    }
    .gauge__status {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      z-index: 25;
      transition: color var(--gauge-animation-duration)
        var(--gauge-animation-timing);
    }
    .gauge__status--normal {
      color: var(--gauge-normal);
    }
    .gauge__status--warning {
      color: var(--gauge-warning);
    }
    .gauge__status--critical {
      color: var(--gauge-critical);
    }
    .gauge__tick {
      position: absolute;
      width: 2px;
      height: 10px;
      background-color: var(--gauge-text);
      bottom: 0;
      transform-origin: bottom center;
    }
    .gauge__tick-label {
      position: absolute;
      font-size: 12px;
      color: var(--gauge-text);
      transform-origin: top center;
      text-align: center;
      width: 30px;
      left: -15px;
    }
    .gauge__value-text--pulse {
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
  `;

  @property({ type: Number }) value = 0;
  @property({ type: Number }) min = 0;
  @property({ type: Number }) max = 100;
  @property({ type: Number }) warning = 50;
  @property({ type: Number }) critical = 75;
  @property({ type: String }) units = '';
  @property({ type: String }) title = '';
  @property({ type: String }) size = '400px';
  @property({ type: String }) theme = 'default';
  @property({ type: Boolean }) showTicks = false;
  @property({ type: Number }) tickCount = 5;
  @property({ type: Boolean }) animate = true;
  @property({ type: Boolean }) pulseOnChange = false;
  @property({ type: String }) animationDuration = '1.3s';
  @property({ type: String }) animationTiming = 'ease-in-out';

  @state() private status = 'normal';
  @state() private statusText = 'Normal';
  @state() private previousValue = 0;
  @state() private shouldPulse = false;

  private themes = {
    default: {
      background: '#f5f5f5',
      normal: '#4caf50',
      warning: '#ff9800',
      critical: '#f44336',
      text: '#333',
      valueColor: '#333',
    },
    dark: {
      background: '#2c2c2c',
      normal: '#4caf50',
      warning: '#ff9800',
      critical: '#f44336',
      text: '#e0e0e0',
      valueColor: '#ffffff',
    },
    blue: {
      background: '#e3f2fd',
      normal: '#2196f3',
      warning: '#ff9800',
      critical: '#f44336',
      text: '#333',
      valueColor: '#1565c0',
    },
  };

  updated(changedProperties: Map<string, object>) {
    if (
      changedProperties.has('value') ||
      changedProperties.has('warning') ||
      changedProperties.has('critical')
    ) {
      this.updateStatus();

      if (changedProperties.has('value') && this.pulseOnChange) {
        this.shouldPulse = true;
        setTimeout(() => {
          this.shouldPulse = false;
        }, 2000);
      }
    }

    if (changedProperties.has('theme')) {
      this.applyTheme();
    }

    if (changedProperties.has('size')) {
      this.updateSize();
    }

    if (
      changedProperties.has('animationDuration') ||
      changedProperties.has('animationTiming')
    ) {
      this.updateAnimation();
    }
  }

  private updateStatus() {
    if (this.value >= this.critical) {
      this.status = 'critical';
      this.statusText = 'Critical';
    } else if (this.value >= this.warning) {
      this.status = 'warning';
      this.statusText = 'Warning';
    } else {
      this.status = 'normal';
      this.statusText = 'Normal';
    }
  }

  private applyTheme() {
    const theme =
      this.themes[this.theme as keyof typeof this.themes] ||
      this.themes.default;
    this.style.setProperty('--gauge-background', theme.background);
    this.style.setProperty('--gauge-normal', theme.normal);
    this.style.setProperty('--gauge-warning', theme.warning);
    this.style.setProperty('--gauge-critical', theme.critical);
    this.style.setProperty('--gauge-text', theme.text);
    this.style.setProperty('--gauge-value-color', theme.valueColor);
  }

  private updateSize() {
    this.style.setProperty('--gauge-size', this.size);
  }

  private updateAnimation() {
    this.style.setProperty(
      '--gauge-animation-duration',
      this.animationDuration,
    );
    this.style.setProperty('--gauge-animation-timing', this.animationTiming);
  }

  private generateTicks() {
    if (!this.showTicks) return [];

    const ticks = [];
    const range = this.max - this.min;
    const step = range / (this.tickCount - 1);

    for (let i = 0; i < this.tickCount; i++) {
      const value = this.min + step * i;
      const degree = calcDegree(value, this.min, this.max);
      const position = 50 + Math.cos((degree * Math.PI) / 180) * 45;
      const left = 50 + Math.sin((degree * Math.PI) / 180) * 45;

      ticks.push({
        value,
        degree,
        position,
        left,
      });
    }

    return ticks;
  }

  render() {
    const indicatorValue = `rotate(${calcDegree(this.value, this.min, this.max)}deg)`;
    const warningValue = `rotate(${calcDegree(this.warning, this.min, this.max)}deg)`;
    const criticalValue = `rotate(${calcDegree(this.critical, this.min, this.max)}deg)`;

    const warningText = `${this.warning} ${this.units}`;
    const criticalText = `${this.critical} ${this.units}`;
    const valueText = `${(this.value / (this.units === 'kW' ? 1000 : 1)).toFixed(2)} ${this.units}`;
    const minText = `${this.min} ${this.units}`;
    const maxText = `${this.max} ${this.units}`;

    const ticks = this.generateTicks();
    const valueTextClass = this.shouldPulse
      ? 'gauge__value-text gauge__value-text--pulse'
      : 'gauge__value-text';

    return html`
      <div
        class="gauge__container"
        role="meter"
        aria-valuenow="${this.value}"
        aria-valuemin="${this.min}"
        aria-valuemax="${this.max}"
        aria-valuetext="${valueText} (${this.statusText})"
      >
        ${this.title ? html`<div class="gauge__title">${this.title}</div>` : ''}
        <div class="gauge__arc-scale"></div>
        <div
          class="gauge__indicator gauge__indicator--warning"
          style="transform: ${warningValue}"
        >
          <div class="gauge__indicator--text">${warningText}</div>
        </div>
        <div
          class="gauge__indicator gauge__indicator--critical"
          style="transform: ${criticalValue}"
        >
          <div class="gauge__indicator--text">${criticalText}</div>
        </div>
        <div
          class="gauge__indicator gauge__indicator--value"
          style="transform: ${indicatorValue}"
        ></div>
        <div class="gauge__arc-center"></div>
        ${this.showTicks
          ? html`
              ${ticks.map(
                (tick) => html`
                  <div
                    class="gauge__tick"
                    style="left: ${tick.left}%; transform: rotate(${tick.degree}deg);"
                  ></div>
                  <div
                    class="gauge__tick-label"
                    style="left: ${tick.left}%; transform: rotate(${tick.degree}deg); bottom: 20px;"
                  >
                    ${tick.value}
                  </div>
                `,
              )}
            `
          : ''}
        <div class="${valueTextClass}">${valueText}</div>
        <div class="gauge__min-text">${minText}</div>
        <div class="gauge__max-text">${maxText}</div>
        <div class="gauge__status gauge__status--${this.status}">
          ${this.statusText}
        </div>
      </div>
    `;
  }
}
