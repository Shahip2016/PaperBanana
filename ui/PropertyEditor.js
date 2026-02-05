export class PropertyEditor {
    constructor(elementId) {
        this.container = document.getElementById(elementId);
    }

    inspect(data) {
        this.container.innerHTML = ''; // Clear container

        const wrapper = document.createElement('div');
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'column';
        wrapper.style.gap = '0.5rem';

        // Entity Label
        const p = document.createElement('p');
        p.innerHTML = `<strong>Entity:</strong> ${this.escapeHtml(data.label)}`;
        wrapper.appendChild(p);

        // Color Field
        const colorField = this.createField('Color');
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.value = '#fbbf24';
        colorInput.style.width = '100%';
        colorInput.style.height = '30px';
        colorInput.style.border = 'none';
        colorInput.style.borderRadius = '4px';
        colorField.appendChild(colorInput);
        wrapper.appendChild(colorField);

        // Label Text Field
        const labelField = this.createField('Label Text');
        const textInput = document.createElement('input');
        textInput.type = 'text';
        textInput.value = data.label;
        textInput.style.width = '100%';
        textInput.style.background = 'rgba(0,0,0,0.2)';
        textInput.style.border = '1px solid var(--border-color)';
        textInput.style.color = 'white';
        textInput.style.padding = '4px';
        textInput.style.borderRadius = '4px';
        labelField.appendChild(textInput);
        wrapper.appendChild(labelField);

        // Apply Button
        const btn = document.createElement('button');
        btn.className = 'btn btn-primary';
        btn.style.fontSize = '0.8rem';
        btn.style.marginTop = '1rem';
        btn.style.width = '100%';
        btn.textContent = 'Apply Changes';
        btn.onclick = () => {
            console.log('Applied changes for', data.label, { color: colorInput.value, text: textInput.value });
        };
        wrapper.appendChild(btn);

        this.container.appendChild(wrapper);
    }

    createField(labelText) {
        const div = document.createElement('div');
        div.className = 'field';
        const label = document.createElement('label');
        label.style.fontSize = '0.75rem';
        label.textContent = labelText;
        div.appendChild(label);
        return div;
    }

    escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}
