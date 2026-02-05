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
        if (!userInput) {
            console.warn('Orchestrator: No input provided.');
            return null;
        }

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
            if (!agent) {
                console.warn(`Orchestrator: Agent ${agentId} not found.`);
                continue;
            }

            try {
                const result = await agent.process(context);
                context[agentId] = result;
            } catch (error) {
                console.error(`Orchestrator: Agent ${agentId} failed.`, error);
                // Decide if we should key going or stop. 
                // For now, mark as error in context and maybe continue if possible, 
                // but usually a pipeline breaks. 
                // We'll expose the error in the context for debugging.
                context.errors = context.errors || {};
                context.errors[agentId] = error.message;
            }
        }

        console.log('✅ Pipeline Complete.');
        return context;
    }
}
