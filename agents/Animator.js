import { Agent } from '../core/Agent.js';
import { Circle, Rectangle, Text } from '../core/Mobject.js';

export class Animator extends Agent {
    constructor() {
        super('Animator', 'Motion Graphics');
    }

    async execute(context) {
        this.log('Converting plan into Manim-style animations...');

        const { planner, stylist } = context;
        const { nodes, relationships } = planner;
        const { palette } = stylist;

        const mobjects = [];
        const animations = [];
        let currentTime = 0;

        // Create Mobjects for each node
        nodes.forEach((node, i) => {
            const id = `node-${i}`;
            const rect = new Rectangle(id, 140, 60);
            rect.position = { x: node.position.x, y: node.position.y };
            rect.color = palette.primary;

            const label = new Text(`${id}-label`, node.label);
            label.position = { x: node.position.x, y: node.position.y };
            label.color = palette.text;

            mobjects.push(rect, label);

            // Animation sequence
            animations.push({
                target: rect,
                type: 'fadeIn',
                startTime: currentTime,
                duration: 0.8
            });
            animations.push({
                target: label,
                type: 'write',
                startTime: currentTime + 0.2,
                duration: 1.0
            });

            currentTime += 0.5;
        });

        await new Promise(resolve => setTimeout(resolve, 1000));

        return {
            mobjects,
            animations,
            duration: currentTime + 1.0
        };
    }
}
