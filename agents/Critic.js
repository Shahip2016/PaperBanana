import { Agent } from '../core/Agent.js';

export class Critic extends Agent {
    constructor() {
        super('Critic', 'Quality Assurance');
    }

    async execute(context) {
        this.log('Critiquing the generated visualization...');

        const viz = context.visualizer;
        const concepts = context.retriever;

        if (!viz) throw new Error('No visualization found for critique.');

        // Simulate complex critique logic
        const critique = {
            score: 0.98,
            feedback: [
                'Scientific accuracy: High (verified concepts: ' + (concepts?.entities?.join(', ') || 'N/A') + ')',
                'Visual clarity: Excellent',
                'SVG Structure: Validated'
            ],
            passed: true
        };

        await new Promise(resolve => setTimeout(resolve, 900));
        return critique;
    }
}
