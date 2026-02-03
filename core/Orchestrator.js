export class Orchestrator {
    constructor() {
        this.agents = new Map();
        this.pipeline = ['retriever', 'planner', 'stylist', 'visualizer', 'critic'];
        this.onAgentStatusChange = null;
    }

    registerAgent(id, agent) {
        agent.onStatusChange = (agentId, status) => {
            if (this.onAgentStatusChange) this.onAgentStatusChange(agentId, status);
        };
        this.agents.set(id, agent);
    }

    async run(userInput) {
        let context = {
            rawInput: userInput,
            retriever: null, // concepts
            planner: null,   // plan
            stylist: null,   // styles
            visualizer: null, // visualization
            critic: null     // critique
        };

        console.log('🚀 Starting PaperBanana Pipeline...');

        for (const agentId of this.pipeline) {
            const agent = this.agents.get(agentId);
            if (!agent) continue;

            const result = await agent.process(context);
            context[agentId] = result;
        }

        console.log('✅ Pipeline Complete.');
        return context;
    }
}
