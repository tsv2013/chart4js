export class SVGHelper {
  private static readonly SVG_NS = 'http://www.w3.org/2000/svg';

  static createSVG(
    width: number,
    height: number,
    viewBox?: string,
  ): SVGSVGElement {
    const svg = document.createElementNS(this.SVG_NS, 'svg');
    svg.setAttribute('width', width.toString());
    svg.setAttribute('height', height.toString());
    if (viewBox) {
      svg.setAttribute('viewBox', viewBox);
    }
    return svg;
  }

  static createGroup(transform?: string): SVGGElement {
    const g = document.createElementNS(this.SVG_NS, 'g');
    if (transform) {
      g.setAttribute('transform', transform);
    }
    return g;
  }

  static createText(
    text: string,
    options: {
      x: number;
      y: number;
      anchor?: 'start' | 'middle' | 'end';
      transform?: string;
      dy?: string;
      fontSize?: string;
    },
  ): SVGTextElement {
    const textElement = document.createElementNS(this.SVG_NS, 'text');
    textElement.setAttribute('x', options.x.toString());
    textElement.setAttribute('y', options.y.toString());
    if (options.anchor) {
      textElement.setAttribute('text-anchor', options.anchor);
    }
    if (options.transform) {
      textElement.setAttribute('transform', options.transform);
    }
    if (options.dy) {
      textElement.setAttribute('dy', options.dy);
    }
    if (options.fontSize) {
      textElement.style.fontSize = options.fontSize;
    }
    textElement.textContent = text;
    return textElement;
  }

  static createLine(options: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    stroke?: string;
  }): SVGLineElement {
    const line = document.createElementNS(this.SVG_NS, 'line');
    line.setAttribute('x1', options.x1.toString());
    line.setAttribute('y1', options.y1.toString());
    line.setAttribute('x2', options.x2.toString());
    line.setAttribute('y2', options.y2.toString());
    if (options.stroke) {
      line.setAttribute('stroke', options.stroke);
    }
    return line;
  }

  static createRect(options: {
    x: number;
    y: number;
    width: number;
    height: number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  }): SVGRectElement {
    const rect = document.createElementNS(this.SVG_NS, 'rect');
    rect.setAttribute('x', options.x.toString());
    rect.setAttribute('y', options.y.toString());
    rect.setAttribute('width', options.width.toString());
    rect.setAttribute('height', options.height.toString());
    if (options.fill) {
      rect.setAttribute('fill', options.fill);
    }
    if (options.stroke) {
      rect.setAttribute('stroke', options.stroke);
    }
    if (options.strokeWidth) {
      rect.setAttribute('stroke-width', options.strokeWidth);
    }
    return rect;
  }

  static createPath(options: {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  }): SVGPathElement {
    const path = document.createElementNS(this.SVG_NS, 'path');
    path.setAttribute('d', options.d);
    if (options.fill) {
      path.setAttribute('fill', options.fill);
    }
    if (options.stroke) {
      path.setAttribute('stroke', options.stroke);
    }
    if (options.strokeWidth) {
      path.setAttribute('stroke-width', options.strokeWidth);
    }
    return path;
  }

  static createCircle(options: {
    cx: number;
    cy: number;
    r: number;
    fill?: string;
  }): SVGCircleElement {
    const circle = document.createElementNS(this.SVG_NS, 'circle');
    circle.setAttribute('cx', options.cx.toString());
    circle.setAttribute('cy', options.cy.toString());
    circle.setAttribute('r', options.r.toString());
    if (options.fill) {
      circle.setAttribute('fill', options.fill);
    }
    return circle;
  }
}
