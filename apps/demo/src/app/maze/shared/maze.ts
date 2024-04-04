export class Corner{
    public x: number;
    public y: number;
}

export class Cell {
    public x: number;
    public y: number;
    public c: number
    public visited: boolean;
    public corners: Corner[];
    public walls: boolean[];
    constructor(x: number, y: number, c: number) {
        this.x = x;
        this.y = y;
        this.c = c;
        this.corners = [
            {x: x * c, y: y * c},
            {x: x * c + c, y: y * c},
            {x: x * c + c, y: y * c + c},
            {x: x * c, y: y * c + c},
            {x: x * c, y: y * c}
        ];
        // top, right, bottom, left
        this.walls = [true, true, true, true];
        this.visited = false;
    }

    render(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < 4; i++) {
            if(this.walls[i]){
                this.paintLine(
                    ctx,
                    this.corners[i].x,
                    this.corners[i].y,
                    this.corners[i + 1].x,
                    this.corners[i + 1].y,
                    );
            }
        }
    }

    paintLine(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    markStart(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.fillRect(this.x * this.c, this.y * this.c, this.c, this.c);
    }

    markEnd(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        ctx.fillRect(this.x * this.c, this.y * this.c, this.c, this.c);
    }

    markPosition(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < 4; i++) {            
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.corners[i].x, this.corners[i].y);
            ctx.lineTo(this.corners[i + 1].x, this.corners[i + 1].y);
            ctx.stroke();
        }
    }
    
    clearPosition(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < 4; i++) {            
            ctx.strokeStyle = 'white';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(this.corners[i].x, this.corners[i].y);
            ctx.lineTo(this.corners[i + 1].x, this.corners[i + 1].y);
            ctx.stroke();
            ctx.clearRect(this.x * this.c, this.y * this.c, this.c, this.c);
        }
    }
}

export interface IMaze {
    name: string;
    configuration: string;
}
  
export class Maze implements IMaze {
    name = '';
    configuration = '';
}

export class ConfigItem {
    constructor(name) {
        this.name = name;        
    }
    public name: string;    
}
  