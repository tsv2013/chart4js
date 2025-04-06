import { describe, it, expect } from 'vitest';
import { SVGHelper } from './svg-helper';

describe('SVGHelper', () => {
  describe('createSVG', () => {
    it('should create an SVG element with correct attributes', () => {
      const svg = SVGHelper.createSVG(100, 200, '0 0 100 200');
      expect(svg.tagName).toBe('svg');
      expect(svg.getAttribute('width')).toBe('100');
      expect(svg.getAttribute('height')).toBe('200');
      expect(svg.getAttribute('viewBox')).toBe('0 0 100 200');
    });
  });

  describe('createGroup', () => {
    it('should create a group element with transform', () => {
      const g = SVGHelper.createGroup('translate(10,20)');
      expect(g.tagName).toBe('g');
      expect(g.getAttribute('transform')).toBe('translate(10,20)');
    });

    it('should create a group element without transform', () => {
      const g = SVGHelper.createGroup();
      expect(g.tagName).toBe('g');
      expect(g.getAttribute('transform')).toBeNull();
    });
  });

  describe('createText', () => {
    it('should create a text element with all options', () => {
      const text = SVGHelper.createText('Hello', {
        x: 10,
        y: 20,
        anchor: 'middle',
        transform: 'rotate(45)',
        dy: '.35em',
        fontSize: '16px',
      });
      expect(text.tagName).toBe('text');
      expect(text.getAttribute('x')).toBe('10');
      expect(text.getAttribute('y')).toBe('20');
      expect(text.getAttribute('text-anchor')).toBe('middle');
      expect(text.getAttribute('transform')).toBe('rotate(45)');
      expect(text.getAttribute('dy')).toBe('.35em');
      expect(text.style.fontSize).toBe('16px');
      expect(text.textContent).toBe('Hello');
    });
  });

  describe('createLine', () => {
    it('should create a line element with stroke', () => {
      const line = SVGHelper.createLine({
        x1: 0,
        y1: 0,
        x2: 100,
        y2: 100,
        stroke: '#ddd',
      });
      expect(line.tagName).toBe('line');
      expect(line.getAttribute('x1')).toBe('0');
      expect(line.getAttribute('y1')).toBe('0');
      expect(line.getAttribute('x2')).toBe('100');
      expect(line.getAttribute('y2')).toBe('100');
      expect(line.getAttribute('stroke')).toBe('#ddd');
    });
  });

  describe('createRect', () => {
    it('should create a rect element with fill', () => {
      const rect = SVGHelper.createRect({
        x: 10,
        y: 20,
        width: 30,
        height: 40,
        fill: 'blue',
      });
      expect(rect.tagName).toBe('rect');
      expect(rect.getAttribute('x')).toBe('10');
      expect(rect.getAttribute('y')).toBe('20');
      expect(rect.getAttribute('width')).toBe('30');
      expect(rect.getAttribute('height')).toBe('40');
      expect(rect.getAttribute('fill')).toBe('blue');
    });
  });

  describe('createPath', () => {
    it('should create a path element with all options', () => {
      const path = SVGHelper.createPath({
        d: 'M0 0L100 100',
        fill: 'none',
        stroke: 'black',
        strokeWidth: '2',
      });
      expect(path.tagName).toBe('path');
      expect(path.getAttribute('d')).toBe('M0 0L100 100');
      expect(path.getAttribute('fill')).toBe('none');
      expect(path.getAttribute('stroke')).toBe('black');
      expect(path.getAttribute('stroke-width')).toBe('2');
    });
  });

  describe('createCircle', () => {
    it('should create a circle element with fill', () => {
      const circle = SVGHelper.createCircle({
        cx: 50,
        cy: 50,
        r: 10,
        fill: 'red',
      });
      expect(circle.tagName).toBe('circle');
      expect(circle.getAttribute('cx')).toBe('50');
      expect(circle.getAttribute('cy')).toBe('50');
      expect(circle.getAttribute('r')).toBe('10');
      expect(circle.getAttribute('fill')).toBe('red');
    });
  });
});
