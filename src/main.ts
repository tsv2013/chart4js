import './style.css';
import typescriptLogo from './typescript.svg';
import viteLogo from '/vite.svg';
import { setupCounter } from './counter';
import { render, html } from 'lit';

import { BarChart } from '../lib/components/bar-chart';
import { PieChart } from '../lib/components/pie-chart';
import { LineChart } from '../lib/components/line-chart';

export const charts = [BarChart, PieChart, LineChart];

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

// Create the main template
const template = html`
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
  </div>
  <div class="chart-container">
    <h1>Chart4JS Examples</h1>
    <div class="chart-row">
      <div class="chart-wrapper">
        <h2>Bar Chart</h2>
        <bar-chart
          width="600"
          height="400"
          title="Bar Chart Example"
          .data=${barData}
          color="#1f77b4"
        ></bar-chart>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-wrapper">
        <h2>Pie Chart</h2>
        <pie-chart
          width="600"
          height="400"
          title="Pie Chart Example"
          .data=${pieData}
          innerRadius="50"
        ></pie-chart>
      </div>
    </div>
    <div class="chart-row">
      <div class="chart-wrapper">
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
    </div>
  </div>
`;

// Render the template to the app container
render(template, document.querySelector<HTMLDivElement>('#app')!);

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!);

// Add some basic styles
const style = document.createElement('style');
style.textContent = `
  .chart-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #333;
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
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  h2 {
    text-align: center;
    margin-top: 0;
    color: #555;
  }
`;
document.head.appendChild(style);
