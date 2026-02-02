import { Orchestrator } from './core/Orchestrator.js';
import { Retriever } from './agents/Retriever.js';
import { Planner } from './agents/Planner.js';
import { Stylist } from './agents/Stylist.js';
import { Visualizer } from './agents/Visualizer.js';
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
        this.orchestrator.registerAgent('critic', new Critic());
    }

    initUI() {
        this.runBtn = document.getElementById('run-pipeline');
        this.userInput = document.getElementById('user-input');
        this.canvas = document.getElementById('canvas-container');
        this.agentItems = document.querySelectorAll('.agent-item');

        this.runBtn.addEventListener('click', () => this.handleRun());
    }

    async handleRun() {
        const input = this.userInput.value || "Default scientific pipeline concepts";
        this.runBtn.disabled = true;
        this.runBtn.textContent = 'Processing...';

        this.resetUI();

        try {
            // We simulate the pipeline and update UI per agent
            // This is a direct demo of the agentic workflow
            const context = await this.orchestrator.run(input);
            this.updateVisualization(context.visualization);
        } catch (error) {
            console.error(error);
        } finally {
            this.runBtn.disabled = false;
            this.runBtn.textContent = 'Run Pipeline';
        }
    }

    resetUI() {
        this.canvas.innerHTML = '<div class="spinner"></div>';
        this.agentItems.forEach(item => item.classList.remove('status-active'));
    }

    updateVisualization(viz) {
        if (viz && viz.data) {
            this.canvas.innerHTML = viz.data;
        }
    }
}

new App();
