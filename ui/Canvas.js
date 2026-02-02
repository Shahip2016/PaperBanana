export class Canvas {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.svg = null;
    }

    render(visualization) {
        if (!visualization || !visualization.data) return;

        this.container.innerHTML = visualization.data;
        this.svg = this.container.querySelector('svg');
        this.setupInteractions();
    }

    setupInteractions() {
        if (!this.svg) return;

        const groups = this.svg.querySelectorAll('g');
        groups.forEach(group => {
            group.style.cursor = 'pointer';
            group.addEventListener('mouseenter', () => {
                group.querySelector('rect').style.filter = 'brightness(1.2)';
            });
            group.addEventListener('mouseleave', () => {
                group.querySelector('rect').style.filter = 'none';
            });
            group.addEventListener('click', (e) => {
                e.stopPropagation();
                this.onElementSelect(group);
            });
        });
    }

    onElementSelect(element) {
        const label = element.querySelector('text').textContent.trim();
        const event = new CustomEvent('elementSelected', { detail: { label, element } });
        window.dispatchEvent(event);
    }
}
