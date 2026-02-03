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
    const { palette, drawing, typography } = styles;

    const nodes = plan.nodes.map((node, i) => `
      <g transform="translate(${node.position.x}, ${node.position.y})" class="node" style="animation-delay: ${i * 0.1}s">
        <defs>
          <filter id="shadow-${i}" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
            <feOffset dx="2" dy="4" result="offsetblur" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.3" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient id="grad-${i}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${palette.primary};stop-opacity:1" />
            <stop offset="100%" style="stop-color:${palette.accent};stop-opacity:1" />
          </linearGradient>
        </defs>
        <rect width="140" height="60" rx="${drawing.cornerRadius}" 
              fill="url(#grad-${i})" filter="url(#shadow-${i})" />
        <text x="70" y="35" text-anchor="middle" fill="${palette.text}" 
              font-family="${typography.family}" font-size="${typography.bodySize}" font-weight="600">
          ${node.label}
        </text>
      </g>
    `).join('');

    return `
      <svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
          .node { cursor: pointer; transition: transform 0.2s; }
          .node:hover { transform: scale(1.05) translate(-2px, -2px); }
        </style>
        <rect width="100%" height="100%" fill="transparent" />
        ${nodes}
      </svg>
    `;
  }
}
