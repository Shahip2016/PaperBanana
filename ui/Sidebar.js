export class Sidebar {
    constructor(listId) {
        this.list = document.getElementById(listId);
        this.items = this.list.querySelectorAll('.agent-item');
    }

    updateStatus(agentId, status) {
        const item = Array.from(this.items).find(i => i.dataset.agent === agentId);
        if (item) {
            item.classList.remove('status-active', 'status-done', 'status-error');
            item.classList.add(`status-${status}`);

            if (status === 'working') {
                item.classList.add('status-active');
            }
        }
    }

    addLog(agentId, message) {
        console.log(`[${agentId}] ${message}`);
        // Potential UI log implementation here
    }

    reset() {
        this.items.forEach(item => {
            item.classList.remove('status-active', 'status-done', 'status-error');
        });
    }
}
