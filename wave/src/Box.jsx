import React, { Component } from 'react'
import './box.css'
export default class Box extends Component {


    componentDidMount() {
        const canvas = this.canvas;
        canvas.width = 400;
        canvas.height = 400;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        this.speedX = 0.04;
        this.offsetX = 0;
        this.maxRange = 0.6;
        this.nowRange = 0;
        this.speedRange = 0.04;
        // const ctx = canvas.getContext('2d');
        this.drawCircle();
        requestAnimationFrame(this.drawSin);
    }
    drawSin = () => {
        const canvas = this.canvas;
        const ctx = canvas.getContext('2d');

        const points = [];
        const stepX = 10;
        const startX = 0;
        const waveHeight = 6;
        const waveWidth = 120;
        const canvasWidth = this.canvasWidth;
        const canvasHeight = this.canvasHeight;

        this.offsetX = (this.offsetX + this.speedX) > this.canvasWidth ? 0 : (this.offsetX + this.speedX);
        if (this.nowRange < this.maxRange) {
            this.nowRange += this.speedRange;
        }

        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        ctx.beginPath();
        for (let x = startX; x <= this.canvasWidth; x += stepX) {
            const y1 = waveHeight * Math.sin(x * 2 * Math.PI / waveWidth - this.offsetX);

            points.push({ x, y1: y1 + (1 - this.nowRange) * this.canvasHeight });
            ctx.lineTo(x, y1 + (1 - this.nowRange) * this.canvasHeight);
        }
        ctx.lineTo(canvasWidth, canvasHeight);
        ctx.lineTo(startX, canvasHeight);
        ctx.lineTo(points[0].x, points[0].y1);
        // ctx.stroke();
        ctx.fillStyle = '#abcdef';
        ctx.fill();
        requestAnimationFrame(this.drawSin);

    }
    drawCircle = () => {
        const ctx = this.canvas.getContext('2d');
        const lineWidth = 6;
        const r = this.canvasWidth / 2;
        const cR = r - lineWidth;
        ctx.save();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = '#aaa';
        ctx.beginPath();
        ctx.arc(r, r, cR, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.restore();
        ctx.clip();
    }
    render() {
        return (
            <div className='box'>
                <canvas ref={c => this.canvas = c}></canvas>
            </div>
        )
    }
}
