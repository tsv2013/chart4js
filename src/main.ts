import './style.css';

import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import '../lib/components/word-cloud';
import '../lib/components/bar-chart';
import '../lib/components/pie-chart';
import '../lib/components/line-chart';
import '../lib/components/gauge-chart';
import '../lib/components/gantt-chart';
import '../lib/components/gantt-connector-line';
import './gantt-demo';

// Sample data for charts
const barData = [
  { category: 'A', value: 10 },
  { category: 'B', value: 20 },
  { category: 'C', value: 15 },
  { category: 'D', value: 25 },
  { category: 'E', value: 30 },
];

// Sample data for multiple datasets
const multiDatasetBarData = [
  { category: 'Q1', sales: 120, profit: 45, expenses: 75 },
  { category: 'Q2', sales: 150, profit: 60, expenses: 90 },
  { category: 'Q3', sales: 180, profit: 75, expenses: 105 },
  { category: 'Q4', sales: 210, profit: 90, expenses: 120 },
  { category: 'Q5', sales: 240, profit: 105, expenses: 135 },
  { category: 'Q6', sales: 270, profit: 120, expenses: 150 },
  { category: 'Q7', sales: 300, profit: 135, expenses: 165 },
  { category: 'Q8', sales: 330, profit: 150, expenses: 180 },
  { category: 'Q9', sales: 360, profit: 165, expenses: 195 },
  { category: 'Q10', sales: 390, profit: 180, expenses: 210 },
  { category: 'Q11', sales: 420, profit: 195, expenses: 225 },
  { category: 'Q12', sales: 450, profit: 210, expenses: 240 },
];

const pieData = [
  { label: 'Marketing', value: 300 },
  { label: 'Sales', value: 500 },
  { label: 'Development', value: 400 },
  { label: 'Support', value: 200 },
  { label: 'Administration', value: 100 },
];

const lineData = [
  {
    label: 'Revenue',
    data: [
      { x: 0, y: 100 },
      { x: 1, y: 120 },
      { x: 2, y: 150 },
      { x: 3, y: 140 },
      { x: 4, y: 180 },
      { x: 5, y: 200 },
      { x: 6, y: 190 },
    ],
  },
  {
    label: 'Costs',
    data: [
      { x: 0, y: 80 },
      { x: 1, y: 90 },
      { x: 2, y: 110 },
      { x: 3, y: 100 },
      { x: 4, y: 130 },
      { x: 5, y: 150 },
      { x: 6, y: 140 },
    ],
  },
  {
    label: 'Profit',
    data: [
      { x: 0, y: 20 },
      { x: 1, y: 30 },
      { x: 2, y: 40 },
      { x: 3, y: 40 },
      { x: 4, y: 50 },
      { x: 5, y: 50 },
      { x: 6, y: 50 },
    ],
  },
];

const simpleLineData = [
  {
    label: 'Temperature',
    data: [
      { x: 0, y: 15 },
      { x: 1, y: 18 },
      { x: 2, y: 22 },
      { x: 3, y: 25 },
      { x: 4, y: 23 },
      { x: 5, y: 20 },
      { x: 6, y: 17 },
    ],
  },
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
    .chart-controls {
      display: flex;
      justify-content: center;
      margin-top: 10px;
    }
    .chart-controls button {
      margin: 0 5px;
      padding: 5px 10px;
      background-color: #4a90e2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    .chart-controls button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
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
        <h2>Bar Chart Examples</h2>
        <div class="chart-row">
          <div class="chart-container">
            <h3>Simple Bar Chart</h3>
            <bar-chart
              .data=${barData}
              .showValues=${true}
              .showLegend=${false}
              .hoverEffects=${true}
            ></bar-chart>
          </div>
          <div class="chart-container">
            <h3>Multi-Dataset Bar Chart</h3>
            <bar-chart
              .data=${multiDatasetBarData}
              .showValues=${true}
              .showLegend=${true}
              .hoverEffects=${true}
              .datasets=${['sales', 'profit', 'expenses']}
            ></bar-chart>
          </div>
        </div>

        <h2>Pie Chart Example</h2>
        <div class="chart-row">
          <div class="chart-container">
            <h3>Interactive Pie Chart</h3>
            <pie-chart
              .data=${pieData}
              .showValues=${true}
              .showLegend=${true}
              .hoverEffects=${true}
            ></pie-chart>
          </div>
        </div>

        <h2>Line Chart Examples</h2>
        <div class="chart-row">
          <div class="chart-container">
            <h3>Simple Line Chart</h3>
            <line-chart
              .data=${simpleLineData}
              .showValues=${true}
              .showLegend=${true}
              .hoverEffects=${true}
              .showArea=${false}
            ></line-chart>
          </div>
          <div class="chart-container">
            <h3>Multi-Dataset Line Chart</h3>
            <line-chart
              .data=${lineData}
              .showValues=${true}
              .showLegend=${true}
              .hoverEffects=${true}
              .showArea=${true}
            ></line-chart>
          </div>
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

        <div class="chart-container">
          <h2>Gantt Chart</h2>
          <gantt-demo></gantt-demo>
        </div>
      </div>
    `;
  }
}

// Create and append the app root element
const appRoot = document.createElement('app-root');
document.body.appendChild(appRoot);
