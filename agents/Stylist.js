import { Agent } from '../core/Agent.js';

export class Stylist extends Agent {
    constructor() {
        super('Stylist', 'Visual Aesthetics');
    }

    async execute(context) {
        this.log('Extracting aesthetic parameters...');

        const concepts = context.retriever;
        if (!concepts) throw new Error('No concepts found from Retriever.');

        const theme = concepts.theme || 'academic-modern';
        const styles = {
            palette: this.getPalette(theme),
            typography: {
                family: "'Inter', sans-serif",
                headingSize: '18px',
                bodySize: '14px'
            },
            drawing: {
                strokeWidth: 2,
                cornerRadius: 12,
                shadows: true
            }
        };

        await new Promise(resolve => setTimeout(resolve, 600));
        return styles;
    }

    getPalette(theme) {
        const palettes = {
            'neural-tech': {
                primary: '#3b82f6', // blue-500
                secondary: '#2563eb', // blue-600
                text: '#ffffff',
                accent: '#fbbf24' // amber-400
            },
            'academic-modern': {
                primary: '#6366f1', // indigo-500
                secondary: '#4338ca', // indigo-700
                text: '#ffffff',
                accent: '#fbbf24' // amber-400
            }
        };
        return palettes[theme] || palettes['academic-modern'];
    }
}
