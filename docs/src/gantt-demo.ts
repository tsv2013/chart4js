import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { GanttItem } from '../lib/components/gantt-chart';

@customElement('gantt-demo')
export class GanttDemo extends LitElement {
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 20px;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 20px;
    }

    .demo-container {
      max-width: 1200px;
      margin: 0 auto;
      border: 1px solid #ddd;
      border-radius: 4px;
      padding: 20px;
      background-color: #f9f9f9;
    }

    .controls {
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      gap: 10px;
    }

    button {
      padding: 8px 16px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background-color: #45a049;
    }
  `;

  @state() private _items: GanttItem[] = [
    {
      id: '1',
      title: 'Project Planning',
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 15),
      color: '#4CAF50',
      markers: [
        {
          date: new Date(2023, 0, 5),
          text: 'Kickoff',
          color: '#2196F3',
        },
        {
          date: new Date(2023, 0, 10),
          text: 'Review',
          color: '#FF9800',
        },
      ],
      links: [
        {
          from: '1',
          to: '2',
          fromDate: new Date(2023, 0, 15),
          toDate: new Date(2023, 0, 15),
        },
      ],
    },
    {
      id: '2',
      title: 'Requirements Gathering',
      start: new Date(2023, 0, 15),
      end: new Date(2023, 1, 1),
      color: '#2196F3',
      markers: [
        {
          date: new Date(2023, 0, 20),
          text: 'Stakeholder Meeting',
          color: '#9C27B0',
        },
      ],
      links: [
        {
          from: '2',
          to: '3',
          fromDate: new Date(2023, 1, 1),
          toDate: new Date(2023, 1, 1),
        },
      ],
    },
    {
      id: '3',
      title: 'Design Phase',
      start: new Date(2023, 1, 1),
      end: new Date(2023, 2, 1),
      color: '#FF9800',
      markers: [
        {
          date: new Date(2023, 1, 15),
          text: 'Design Review',
          color: '#E91E63',
        },
      ],
      links: [
        {
          from: '3',
          to: '4',
          fromDate: new Date(2023, 2, 1),
          toDate: new Date(2023, 2, 1),
        },
      ],
    },
    {
      id: '4',
      title: 'Development',
      start: new Date(2023, 2, 1),
      end: new Date(2023, 4, 1),
      color: '#9C27B0',
      markers: [
        {
          date: new Date(2023, 3, 1),
          text: 'Sprint Review',
          color: '#00BCD4',
        },
      ],
      links: [
        {
          from: '4',
          to: '5',
          fromDate: new Date(2023, 4, 1),
          toDate: new Date(2023, 4, 1),
        },
      ],
    },
    {
      id: '5',
      title: 'Testing',
      start: new Date(2023, 4, 1),
      end: new Date(2023, 5, 1),
      color: '#E91E63',
      markers: [
        {
          date: new Date(2023, 4, 15),
          text: 'QA Review',
          color: '#FFEB3B',
        },
      ],
      links: [
        {
          from: '5',
          to: '6',
          fromDate: new Date(2023, 5, 1),
          toDate: new Date(2023, 5, 1),
        },
      ],
    },
    {
      id: '6',
      title: 'Deployment',
      start: new Date(2023, 5, 1),
      end: new Date(2023, 5, 15),
      color: '#00BCD4',
      markers: [
        {
          date: new Date(2023, 5, 10),
          text: 'Go-Live',
          color: '#4CAF50',
        },
      ],
    },
  ];

  @state() private _showConnectors = true;

  private _toggleConnectors() {
    this._showConnectors = !this._showConnectors;
  }

  private _addRandomTask() {
    const lastTask = this._items[this._items.length - 1];
    const startDate = new Date(lastTask.end);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 15);

    const newId = (this._items.length + 1).toString();

    const newTask: GanttItem = {
      id: newId,
      title: `Task ${newId}`,
      start: startDate,
      end: endDate,
      color: this._getRandomColor(),
      markers: [
        {
          date: new Date(
            startDate.getTime() + (endDate.getTime() - startDate.getTime()) / 2,
          ),
          text: 'Milestone',
          color: this._getRandomColor(),
        },
      ],
      links: [
        {
          from: lastTask.id,
          to: newId,
          fromDate: new Date(lastTask.end),
          toDate: new Date(startDate),
        },
      ],
    };

    this._items = [...this._items, newTask];
  }

  private _getRandomColor(): string {
    const colors = [
      '#4CAF50',
      '#2196F3',
      '#FF9800',
      '#9C27B0',
      '#E91E63',
      '#00BCD4',
      '#FFEB3B',
      '#795548',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  private _handleRowClick(e: CustomEvent) {
    const item = e.detail.item;
    console.log('Clicked on task:', item.title);
    alert(`Clicked on task: ${item.title}`);
  }

  render() {
    return html`
      <h3>Project Timeline</h3>

      <div class="demo-container">
        <div class="controls">
          <button @click=${this._toggleConnectors}>
            ${this._showConnectors ? 'Hide' : 'Show'} Connectors
          </button>
          <button @click=${this._addRandomTask}>Add Random Task</button>
        </div>

        <gantt-chart
          .items=${this._items}
          .showConnectors=${this._showConnectors}
          @row-click=${this._handleRowClick}
        ></gantt-chart>
      </div>
    `;
  }
}
