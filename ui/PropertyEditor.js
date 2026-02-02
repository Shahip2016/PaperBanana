export class PropertyEditor {
    constructor(elementId) {
        this.container = document.getElementById(elementId);
    }

    inspect(data) {
        this.container.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 0.5rem;">
                <p><strong>Entity:</strong> ${data.label}</p>
                <div class="field">
                    <label style="font-size: 0.75rem;">Color</label>
                    <input type="color" value="#fbbf24" style="width: 100%; height: 30px; border: none; border-radius: 4px;">
                </div>
                <div class="field">
                    <label style="font-size: 0.75rem;">Label Text</label>
                    <input type="text" value="${data.label}" style="width: 100%; background: rgba(0,0,0,0.2); border: 1px solid var(--border-color); color: white; padding: 4px; border-radius: 4px;">
                </div>
                <button class="btn btn-primary" style="font-size: 0.8rem; margin-top: 1rem; width: 100%;">Apply Changes</button>
            </div>
        `;
    }
}
