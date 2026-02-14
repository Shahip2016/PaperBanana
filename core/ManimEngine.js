export class ManimEngine {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.mobjects = [];
        this.animations = [];
        this.isPlaying = false;
        this.startTime = 0;
        this.duration = 0;
    }

    add(mobject) {
        this.mobjects.push(mobject);
    }

    play(animationSequence) {
        this.animations = animationSequence;
        this.duration = Math.max(...this.animations.map(a => a.startTime + a.duration));
        this.isPlaying = true;
        this.startTime = performance.now();
        this.requestFrame();
    }

    requestFrame() {
        if (!this.isPlaying) return;
        requestAnimationFrame((time) => this.render(time));
    }

    render(time) {
        if (!this.isPlaying) return;

        const elapsed = (time - this.startTime) / 1000; // in seconds

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update mobjects based on animations
        this.animations.forEach(anim => {
            if (elapsed >= anim.startTime && elapsed <= anim.startTime + anim.duration) {
                const progress = (elapsed - anim.startTime) / anim.duration;
                this.applyAnimation(anim, progress);
            } else if (elapsed > anim.startTime + anim.duration) {
                this.applyAnimation(anim, 1);
            }
        });

        // Draw all mobjects
        this.mobjects.forEach(m => m.draw(this.ctx));

        if (elapsed < this.duration) {
            this.requestFrame();
        } else {
            this.isPlaying = false;
        }
    }

    applyAnimation(anim, progress) {
        const { target, type, startValue, endValue } = anim;

        switch (type) {
            case 'fadeIn':
                target.opacity = progress;
                break;
            case 'move':
                target.position.x = startValue.x + (endValue.x - startValue.x) * progress;
                target.position.y = startValue.y + (endValue.y - startValue.y) * progress;
                break;
            case 'scale':
                target.scale = startValue + (endValue - startValue) * progress;
                break;
            case 'write':
                // For simplicity, just fade in text for now
                target.opacity = progress;
                break;
        }
    }

    stop() {
        this.isPlaying = false;
    }
}
