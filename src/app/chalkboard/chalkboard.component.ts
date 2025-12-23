import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chalkboard',
  standalone: true,
  imports: [],
  template: `
    <div class="chalkboard-container">
      <h2>Chalkboard (Remote App)</h2>
      <canvas #canvas (mousedown)="startDrawing($event)" (mousemove)="draw($event)" (mouseup)="stopDrawing()" (mouseleave)="stopDrawing()"></canvas>
      <div class="controls">
        <button (click)="clear()">Clear Board</button>
      </div>
    </div>
  `,
  styles: [`
    .chalkboard-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
      background: #1a1a1a;
      color: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0,0,0,0.3);
    }
    canvas {
      border: 2px solid #444;
      background: #000;
      cursor: crosshair;
      touch-action: none;
    }
    .controls {
      margin-top: 15px;
    }
    button {
      background: #3498db;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover { background: #2980b9; }
  `]
})
export class ChalkboardComponent implements AfterViewInit {
  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    canvas.width = 600;
    canvas.height = 400;
    this.ctx = canvas.getContext('2d')!;
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 3;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
  }

  startDrawing(event: MouseEvent) {
    this.drawing = true;
    const { offsetX, offsetY } = event;
    this.ctx.beginPath();
    this.ctx.moveTo(offsetX, offsetY);
  }

  draw(event: MouseEvent) {
    if (!this.drawing) return;
    const { offsetX, offsetY } = event;
    this.ctx.lineTo(offsetX, offsetY);
    this.ctx.stroke();
  }

  stopDrawing() {
    this.drawing = false;
  }

  clear() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

