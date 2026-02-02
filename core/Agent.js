export class Agent {
    constructor(name, role) {
        this.name = name;
        this.role = role;
        this.status = 'idle';
    }

    async process(input) {
        this.status = 'working';
        console.log(`[${this.name}] Starting work on: ${input.substring(0, 30)}...`);
        try {
            const result = await this.execute(input);
            this.status = 'done';
            return result;
        } catch (error) {
            this.status = 'error';
            console.error(`[${this.name}] Error:`, error);
            throw error;
        }
    }

    async execute(input) {
        throw new Error('Method "execute" must be implemented by concrete agents.');
    }

    log(message) {
        console.log(`[${this.name}] ${message}`);
    }
}
