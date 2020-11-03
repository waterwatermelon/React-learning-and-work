class Wave {

    constructor({ canvas, offsetX ,fillStyle,speedX}) {
        this.canvas = canvas;
        this.offsetX = offsetX;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.fillStyle = fillStyle;
        this.speedX = speedX; 
        this.maxRange = 0.6;
        this.nowRange = 0;
        this.speedRange = 0.004;
        this.drawWave = this.drawWave.bind(this);
    }

    init () {
        console.log('[wave] init');
        // this.drawWave();

    }
    drawWave() {
        console.log('[wave] draw');
        console.log('this.canvas', this.canvas);
        console.log('this', this);
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');

        const points = [];
        const stepX = 10;
        const startX = 0;
        const waveHeight = 6;
        const waveWidth = 120;
        const canvasWidth = this.canvasWidth;
        const canvasHeight = this.canvasHeight;

        // 曲线移动
        this.offsetX = (this.offsetX + this.speedX) > this.canvasWidth ? 0 : (this.offsetX + this.speedX);
        if (this.nowRange < this.maxRange) {
            this.nowRange += this.speedRange;
        }
        
        // ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.beginPath();
        for (let x = startX; x <= this.canvasWidth; x += stepX) {
            const y1 = waveHeight * Math.sin(x * 2 * Math.PI / waveWidth - this.offsetX);

            points.push({ x, y1: y1 + (1 - this.nowRange) * this.canvasHeight });
            ctx.lineTo(x, y1 + (1 - this.nowRange) * this.canvasHeight);
        }
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(startX, canvasHeight);
        ctx.lineTo(points[0].x, points[0].y1);
        ctx.fillStyle = this.fillStyle;
        ctx.fill(); 
        console.log('points', points); 

    }
}

export default Wave;