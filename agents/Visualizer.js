import { Agent } from '../core/Agent.js';

export class Visualizer extends Agent {
    constructor() {
        super('Visualizer', 'Rendering Engine');
    }

    async execute(context) {
        this.log('Generating SVG visualization...');

        const { plan, styles } = context;
        const svgContent = this.renderSVG(plan, styles);

        await new Promise(resolve => setTimeout(resolve, 1200));
        return {
            type: 'svg',
            data: svgContent,
            dimensions: { width: 800, height: 600 }
        };
    }

    renderSVG(plan, styles) {
        const nodes = plan.nodes.map(node => `
      <g transform="translate(${node.position.x}, ${node.position.y})">
        <rect width="120" height="50" rx="${styles.drawing.cornerRadius}" 
              fill="${styles.palette.primary}" stroke="${styles.palette.accent}" stroke-width="${styles.drawing.strokeWidth}" />
        <text x="60" y="30" text-anchor="middle" fill="${styles.palette.text}" font-family="${styles.typography.family}" font-size="${styles.typography.bodySize}">
          ${node.label}
        </text>
      </g>
    `).join('');

        return `
      <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <style>@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&amp;display=swap');</style>
        </defs>
        <rect width="100%" height="100%" fill="transparent" />
        ${nodes}
      </svg>
    `;
    }
}
