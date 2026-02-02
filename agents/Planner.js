import { Agent } from '../core/Agent.js';

export class Planner extends Agent {
    constructor() {
        super('Planner', 'Architecture Planning');
    }

    async execute(context) {
        this.log('Designing structural plan for the illustration...');

        const concepts = context.concepts;
        const plan = {
            layoutType: this.determineLayout(concepts),
            nodes: this.generateNodes(concepts),
            connections: concepts.relationships,
            grouping: 'hierarchical'
        };

        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate complex planning
        return plan;
    }

    determineLayout(concepts) {
        if (concepts.entities.length > 5) return 'grid';
        return 'flowchart';
    }

    generateNodes(concepts) {
        return concepts.entities.map((entity, index) => ({
            id: entity.toLowerCase(),
            label: entity,
            position: { x: 100 + (index * 150), y: 200 },
            type: index === 0 ? 'input' : 'process'
        }));
    }
}
