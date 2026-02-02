export class Orchestrator {
    constructor() {
        this.agents = new Map();
        this.pipeline = [
            'retriever',
            'planner',
            'stylist',
            'visualizer',
            'critic'
        ];
        this.currentTask = null;
        this.history = [];
    }

    registerAgent(id, agent) {
        this.agents.set(id, agent);
    }

    async run(userInput) {
        this.currentTask = userInput;
        let context = {
            rawInput: userInput,
            concepts: null,
            plan: null,
            styles: null,
            visualization: null,
            critique: null
        };

        console.log('🚀 Starting PaperBanana Pipeline...');

        for (const agentId of this.pipeline) {
            const agent = this.agents.get(agentId);
            if (!agent) {
                console.warn(`Agent ${agentId} not registered. Skipping...`);
                continue;
            }

            const result = await agent.process(context);
            context[agentId === 'retriever' ? 'concepts' :
                agentId === 'planner' ? 'plan' :
                    agentId === 'stylist' ? 'styles' :
                        agentId === 'visualizer' ? 'visualization' : 'critique'] = result;

            this.history.push({ agent: agentId, result });
        }

        console.log('✅ Pipeline Complete.');
        return context;
    }
}
