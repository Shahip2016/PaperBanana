export class Mobject {
    constructor(id) {
        this.id = id;
        this.opacity = 0;
        this.position = { x: 0, y: 0 };
        this.scale = 1;
        this.rotation = 0;
        this.color = '#ffffff';
        this.strokeWidth = 2;
    }

    draw(ctx) {
        // Base draw implementation
    }
}

export class Circle extends Mobject {
    constructor(id, radius = 50) {
        super(id);
        this.radius = radius;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.strokeWidth;
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, this.radius * this.scale, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
    }
}

export class Rectangle extends Mobject {
    constructor(id, width = 100, height = 60) {
        super(id);
        this.width = width;
        this.height = height;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.strokeWidth;
        const w = this.width * this.scale;
        const h = this.height * this.scale;
        ctx.strokeRect(this.position.x - w / 2, this.position.y - h / 2, w, h);
        ctx.restore();
    }
}

export class Text extends Mobject {
    constructor(id, text, fontSize = 20) {
        super(id);
        this.text = text;
        this.fontSize = fontSize;
    }

    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = `${this.fontSize * this.scale}px Inter, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.text, this.position.x, this.position.y);
        ctx.restore();
    }
}
