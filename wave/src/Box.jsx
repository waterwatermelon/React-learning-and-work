import React, { Component } from 'react'
import './box.css'
export default class Box extends Component {


    componentDidMount() {
        const canvas = this.canvas;
        canvas.width = 400;
        canvas.height = 400;
        this.canvasWidth = canvas.width;
        this.canvasHeight = canvas.height;
        const ctx = canvas.getContext('2d');
        this.drawSin(ctx);
    }
    drawSin = (ctx) => {
        // calc point position
        const points = [];
        const startX = 20;
        const stepX = 20;
        const offsetX = 0;
        const offsetY = 200;
        const waveHeight = 20;
        const waveWidth = 120;
        const canvasWidth = this.canvasWidth;
        const canvasHeight = this.canvasHeight;
        for (let x = startX; x < this.canvasWidth; x += stepX) {
            const y = waveHeight * Math.sin(x * 2 * Math.PI / waveWidth - offsetX) + offsetY;
            points.push({ x, y });
            ctx.lineTo(x,y);
        }
        ctx.lineTo(canvasWidth,canvasHeight);
        ctx.lineTo(startX,canvasHeight);
        ctx.lineTo(points[0].x,points[0].y);
        ctx.stroke();
    }
    render() {
        return (
            <div className='box'>
                <canvas ref={c => this.canvas = c}></canvas>
            </div>
        )
    }
}
