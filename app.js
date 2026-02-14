import { Orchestrator } from './core/Orchestrator.js';
import { Retriever } from './agents/Retriever.js';
import { Planner } from './agents/Planner.js';
import { Stylist } from './agents/Stylist.js';
import { Visualizer } from './agents/Visualizer.js';
import { Animator } from './agents/Animator.js';
import { Critic } from './agents/Critic.js';

class App {
    constructor() {
        this.orchestrator = new Orchestrator();
        this.initAgents();
        this.initUI();
    }

    initAgents() {
        this.orchestrator.registerAgent('retriever', new Retriever());
        this.orchestrator.registerAgent('planner', new Planner());
        this.orchestrator.registerAgent('stylist', new Stylist());
        this.orchestrator.registerAgent('visualizer', new Visualizer());
        this.orchestrator.registerAgent('animator', new Animator());
        this.orchestrator.registerAgent('critic', new Critic());
    }

    initUI() {
        this.runBtn = document.getElementById('run-pipeline');
        this.userInput = document.getElementById('user-input');
        this.canvas = document.getElementById('canvas-container');
        this.agentItems = document.querySelectorAll('.agent-item');

        this.orchestrator.onAgentStatusChange = (agentId, status) => {
            this.updateAgentStatusUI(agentId, status);
        };

        this.runBtn.addEventListener('click', () => this.handleRun());
    }

    async handleRun() {
        const input = this.userInput.value || "Default scientific pipeline concepts";
        this.runBtn.disabled = true;
        this.runBtn.classList.add('loading');
        this.runBtn.textContent = 'Orchestrating...';

        this.resetUI();

        try {
            const context = await this.orchestrator.run(input);
            if (context && context.errors) {
                console.error('Pipeline had errors:', context.errors);
                // Could act on specific errors here
            }
            if (context) {
                this.updateVisualization(context);
            }
        } catch (error) {
            console.error("App: Fatal error in pipeline execution", error);
        } finally {
            this.runBtn.disabled = false;
            this.runBtn.classList.remove('loading');
            this.runBtn.textContent = 'Run Pipeline';
        }
    }

    updateAgentStatusUI(agentId, status) {
        const item = document.querySelector(`.agent-item[data-agent="${agentId}"]`);
        if (!item) return;

        if (status === 'working') {
            item.classList.add('status-active');
            item.classList.add('pulse');
        } else if (status === 'done') {
            item.classList.remove('pulse');
            item.classList.add('status-complete');
        } else if (status === 'error') {
            item.classList.remove('pulse');
            item.classList.add('status-error');
        }
    }

    resetUI() {
        this.canvas.innerHTML = '<div class="loader"></div>';
        this.agentItems.forEach(item => {
            item.classList.remove('status-active', 'status-complete', 'status-error', 'pulse');
        });
    }

    updateVisualization(context) {
        const { visualizer, animator } = context;
        if (visualizer && visualizer.data) {
            this.canvas.innerHTML = visualizer.data;
        }

        if (animator) {
            this.setupAnimation(animator);
        }
    }

    setupAnimation(animData) {
        // We will implement this in the UI enhancement phase
        console.log("Animation data ready", animData);
    }
}

new App();
