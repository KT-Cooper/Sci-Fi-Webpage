const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let ParticlesArray = [];

class Particle {
    constructor() {
        this.size = Math.random()*5 + 5;
        this.x = Math.random()*(canvas.width - 50) + (this.size + 10);
        this.y = Math.random()*(canvas.height - 50) + (this.size + 10);
        this.directionX = Math.random()*0.5 - 0.25;
        this.directionY = Math.random()*0.5 - 0.25;
    }

    update() {
        this.x -= this.directionX;
        this.y -= this.directionY;

        if(this.x - this.size < 0 || this.x + this.size > canvas.width) {
            this.directionX = -this.directionX;
        }

        if(this.y - this.size < 0 || this.y + this.size > canvas.height) {
            this.directionY = -this.directionY;
        }
    }

    draw() {
        context.beginPath();
        context.fillStyle = `rgba(200, 180, 192, 1)`;
        context.arc(this.x, this.y, this.size, 0, Math.PI*2);
        context.fill();
    }
}

const init = () => {
    ParticlesArray = [];
    let numberOfParticles = (canvas.width * canvas.height)/10000;
    for(let i = 0; i < numberOfParticles; i++) {
        ParticlesArray.push(new Particle());
    }
}

init();

const animate = () => {
    let lineOpacity = 0;
    context.clearRect(0 , 0, canvas.width, canvas.height);
    for(let i = 0; i < ParticlesArray.length; i++) {
        for(let j = i; j < ParticlesArray.length; j++) {
            let distX = ParticlesArray[j].x - ParticlesArray[i].x;
            let distY = ParticlesArray[j].y - ParticlesArray[i].y;
            let distance = Math.sqrt((distX * distX) + (distY * distY));
            lineOpacity = 1 - distance/75;
            if(distance < 75) {
                context.beginPath();
                context.lineWidth = 2;
                context.strokeStyle = `rgba(180, 180, 180, ${lineOpacity})`;
                context.moveTo(ParticlesArray[j].x, ParticlesArray[j].y);
                context.lineTo(ParticlesArray[i].x, ParticlesArray[i].y);
                context.stroke();
            }
        }
        ParticlesArray[i].update();
        ParticlesArray[i].draw();
    }

    requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})