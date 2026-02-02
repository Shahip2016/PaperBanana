import { Agent } from '../core/Agent.js';

export class Stylist extends Agent {
    constructor() {
        super('Stylist', 'Visual Aesthetics');
    }

    async execute(context) {
        this.log('Extracting aesthetic parameters...');

        const theme = context.concepts.theme;
        const styles = {
            palette: this.getPalette(theme),
            typography: {
                family: 'Inter, sans-serif',
                headingSize: '16px',
                bodySize: '12px'
            },
            drawing: {
                strokeWidth: 2,
                cornerRadius: 8,
                shadows: true
            }
        };

        await new Promise(resolve => setTimeout(resolve, 600));
        return styles;
    }

    getPalette(theme) {
        const palettes = {
            'neural-tech': {
                primary: '#3b82f6',
                secondary: '#60a5fa',
                text: '#f8fafc',
                accent: '#f59e0b'
            },
            'academic-modern': {
                primary: '#fbbf24',
                secondary: '#f59e0b',
                text: '#0f172a',
                accent: '#2563eb'
            }
        };
        return palettes[theme] || palettes['academic-modern'];
    }
}
