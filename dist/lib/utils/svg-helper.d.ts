export declare class SVGHelper {
    private static readonly SVG_NS;
    static createSVG(width: number, height: number, viewBox?: string): SVGSVGElement;
    static createGroup(transform?: string): SVGGElement;
    static createText(text: string, options: {
        x: number;
        y: number;
        anchor?: 'start' | 'middle' | 'end';
        transform?: string;
        dy?: string;
        fontSize?: string;
        fill?: string;
        stroke?: string;
        strokeWidth?: string;
    }): SVGTextElement;
    static createLine(options: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
        stroke?: string;
        strokeWidth?: string;
    }): SVGLineElement;
    static createRect(options: {
        x: number;
        y: number;
        width: number;
        height: number;
        fill?: string;
        stroke?: string;
        strokeWidth?: string;
    }): SVGRectElement;
    static createPath(options: {
        d: string;
        fill?: string;
        stroke?: string;
        strokeWidth?: string;
    }): SVGPathElement;
    static createCircle(options: {
        cx: number;
        cy: number;
        r: number;
        fill?: string;
        stroke?: string;
        strokeWidth?: string;
    }): SVGCircleElement;
}
