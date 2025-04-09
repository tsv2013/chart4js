# Charts4JS

A lightweight, dependency-free chart library built with Lit and TypeScript.

## Features

- Pure SVG-based charts
- No external dependencies (except Lit)
- TypeScript support
- Customizable and extensible
- Responsive design
- Configurable animations

## Installation

```bash
npm install charts4js
```

## Usage

```typescript
import { BarChart, PieChart, LineChart } from 'charts4js';

// Bar Chart
const barData = [
  { category: 'A', value: 10 },
  { category: 'B', value: 20 },
  { category: 'C', value: 15 },
];

// Pie Chart
const pieData = [
  { label: 'Red', value: 30 },
  { label: 'Blue', value: 20 },
  { label: 'Green', value: 50 },
];

// Line Chart
const lineData = [
  { x: 0, y: 10 },
  { x: 1, y: 15 },
  { x: 2, y: 12 },
  { x: 3, y: 18 },
];
```

### HTML

```html
<!-- Bar Chart -->
<bar-chart
  .data="${barData}"
  width="600"
  height="400"
  title="Sample Bar Chart"
  animationEnabled="true"
></bar-chart>

<!-- Pie Chart -->
<pie-chart
  .data="${pieData}"
  width="400"
  height="400"
  title="Sample Pie Chart"
  animationEnabled="true"
></pie-chart>

<!-- Line Chart -->
<line-chart
  .data="${lineData}"
  width="600"
  height="400"
  title="Sample Line Chart"
  animationEnabled="true"
></line-chart>
```

## Components

### BaseChart

Base component that all charts extend from.

Properties:

- `width`: number (default: 600)
- `height`: number (default: 400)
- `title`: string
- `data`: any[]
- `margin`: { top: number, right: number, bottom: number, left: number }
- `animationEnabled`: boolean (default: true) - Controls whether animations are enabled
- `animationDuration`: number (default: 800) - Duration of animations in milliseconds

### BarChart

Properties:

- All BaseChart properties
- `xKey`: string (default: 'category')
- `yKey`: string (default: 'value')
- `color`: string (default: '#1f77b4')

### PieChart

Properties:

- All BaseChart properties
- `valueKey`: string (default: 'value')
- `labelKey`: string (default: 'label')
- `innerRadius`: number (default: 0)
- `colors`: string[] (default: d3-like color scheme)

### LineChart

Properties:

- All BaseChart properties
- `xKey`: string (default: 'x')
- `yKey`: string (default: 'y')
- `color`: string (default: '#1f77b4')
- `lineWidth`: number (default: 2)
- `showPoints`: boolean (default: true)
- `pointRadius`: number (default: 4)

### GaugeChart

Properties:

- All BaseChart properties
- `value`: number (default: 0)
- `min`: number (default: 0)
- `max`: number (default: 100)
- `warningValue`: number (default: 70)
- `criticalValue`: number (default: 90)
- `startAngle`: number (default: -90)
- `endAngle`: number (default: 90)
- `arcThickness`: number (default: 30)
- `showTicks`: boolean (default: true)
- `showLabels`: boolean (default: true)
- `numTicks`: number (default: 5)
- `units`: string (default: '')
- `precision`: number (default: 0)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build
npm run build

# Run tests
npm test
```

## License

MIT
