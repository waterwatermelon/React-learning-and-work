import React, { Component } from 'react'
import './box.css';

import Wave from './Wave';
export default class Box extends Component {


    componentDidMount() {
        const canvas = this.canvas;
        canvas.width = 280;
        canvas.height = 280;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        // const canvasWidth = canvas.width;
        // const canvasHeight = canvas.height;
        this.speedX = 0.04;
        this.offsetX = 0;
        this.maxRange = 0.6;
        this.nowRange = 0;
        this.speedRange = 0.04;
        this.drawCircle(); 
        this.wave1 = new Wave({ canvas ,offsetX: 0 ,colors: ['#F39C6B', '#A0563B'],speedX:0.04,waveHeight:4 });
        this.wave2 = new Wave({ canvas ,offsetX: 2 ,colors: ['rgba(243, 156, 107, 0.48)', 'rgba(160, 86, 59, 0.48)'],speedX:0.06,waveHeight:6});       
        this.wave1.init();
        this.wave2.init();
        requestAnimationFrame(this.drawWave);
    }
    drawWave = () => {
        const ctx = this.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.wave1.drawWave();
        this.wave2.drawWave();
        requestAnimationFrame(this.drawWave);
    }
    // 绘制水波 循环调用
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
        ctx.fillStyle = '#abcdef';
        ctx.fill();
        requestAnimationFrame(this.drawSin);

    }
    // 绘制容器 调用一次
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
