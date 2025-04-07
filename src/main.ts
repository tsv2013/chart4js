import './style.css';

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../lib/components/word-cloud';
import '../lib/components/bar-chart';
import '../lib/components/pie-chart';
import '../lib/components/line-chart';
import '../lib/components/gauge-chart';

// Sample data for charts
const barData = [
  { category: 'A', value: 10 },
  { category: 'B', value: 20 },
  { category: 'C', value: 15 },
  { category: 'D', value: 25 },
  { category: 'E', value: 30 },
];

const pieData = [
  { label: 'Category A', value: 30 },
  { label: 'Category B', value: 20 },
  { label: 'Category C', value: 15 },
  { label: 'Category D', value: 25 },
  { label: 'Category E', value: 10 },
];

const lineData = [
  { x: 0, y: 0 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 4 },
  { x: 4, y: 3 },
  { x: 5, y: 5 },
  { x: 6, y: 2 },
];

@customElement('app-root')
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
    }
    .chart-container {
      margin-bottom: 2rem;
      padding: 1rem;
      background-color: #f9f9f9;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }
    h2 {
      color: #555;
      margin-bottom: 1rem;
      text-align: center;
    }
    .chart-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
    .chart-wrapper {
      flex: 1;
      margin: 0 15px;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  `;

  private sampleWords = [
    ['JavaScript', 100],
    ['TypeScript', 90],
    ['React', 85],
    ['Vue', 80],
    ['Angular', 75],
    ['Lit', 70],
    ['Web Components', 65],
    ['HTML', 60],
    ['CSS', 55],
    ['Node.js', 50],
    ['Express', 45],
    ['Next.js', 40],
    ['GraphQL', 35],
    ['REST', 30],
    ['API', 25],
    ['Testing', 20],
  ];

  private colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD'];

  render() {
    return html`
      <div class="container">
        <h1>Chart4JS Examples</h1>

        <div class="chart-container">
          <h2>Bar Chart</h2>
          <bar-chart
            width="600"
            height="400"
            title="Bar Chart Example"
            .data=${barData}
            color="#1f77b4"
          ></bar-chart>
        </div>

        <div class="chart-container">
          <h2>Pie Chart</h2>
          <pie-chart
            width="600"
            height="400"
            title="Pie Chart Example"
            .data=${pieData}
            innerRadius="50"
          ></pie-chart>
        </div>

        <div class="chart-container">
          <h2>Line Chart</h2>
          <line-chart
            width="600"
            height="400"
            title="Line Chart Example"
            .data=${lineData}
            color="#2ca02c"
            lineWidth="3"
            showPoints
            pointRadius="5"
          ></line-chart>
        </div>

        <div class="chart-container">
          <h2>Gauge Chart</h2>
          <gauge-chart
            value="65"
            min="0"
            max="100"
            warning="50"
            critical="75"
            units="%"
            title="CPU Usage"
          ></gauge-chart>
        </div>

        <div class="chart-container">
          <h2>Word Cloud</h2>
          <word-cloud
            .words=${this.sampleWords}
            .colors=${this.colors}
            .options=${{
              spiralResolution: 1.5,
              spiralLimit: 360 * 3,
              lineHeight: 1,
              xWordPadding: 5,
              yWordPadding: 5,
              weightFactor: 30,
              topN: 15,
              maxHeight: 300,
              padding: 20,
            }}
            style="height: 300px;"
          ></word-cloud>
        </div>
      </div>
    `;
  }
}

// Create and append the app root element
const appRoot = document.createElement('app-root');
document.body.appendChild(appRoot);
