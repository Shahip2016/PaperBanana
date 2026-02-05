export class Agent {
    constructor(name, role) {
        this.name = name;
        this.role = role;
        this.status = 'idle';
        this.onStatusChange = null;
    }

    async process(context) {
        this.updateStatus('working');
        const snippet = context.rawInput && context.rawInput.length > 50
            ? context.rawInput.substring(0, 50) + '...'
            : context.rawInput;

        this.log(`Starting work on input: "${snippet}"`);

        try {
            const result = await this.execute(context);
            this.updateStatus('done');
            return result;
        } catch (error) {
            this.updateStatus('error');
            this.log(`Failed: ${error.message}`);
            throw error;
        }
    }

    updateStatus(status) {
        this.status = status;
        if (this.onStatusChange) {
            this.onStatusChange(this.name.toLowerCase(), status);
        }
    }

    async execute(context) {
        throw new Error('Method "execute" must be implemented by concrete agents.');
    }

    log(message) {
        console.log(`%c[${this.name}]`, 'color: #fbbf24; font-weight: bold', message);
    }
}
