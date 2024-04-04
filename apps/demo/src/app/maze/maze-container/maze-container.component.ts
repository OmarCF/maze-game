import { Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Cell, ConfigItem, Maze } from '../shared/maze';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'valant-maze-container',
  templateUrl: './maze-container.component.html',
  styleUrls: ['./maze-container.component.less']
})
export class MazeContainerComponent implements OnInit {

  title = 'mazes-app';

  currentMaze: Maze = (() => new Maze())();


  @ViewChild('myCanvas', { static: true}) myCanvas!: ElementRef<HTMLCanvasElement>;

  public cellSize = 1;
  public columns = 1;
  public rows = 1;
  public cells: Cell[];
  public configuration: ConfigItem[];  
  public context: CanvasRenderingContext2D;
  public startCell: Cell;
  public endCell: Cell;
  public currentCell: Cell;
  public currentIndex = 0;
  public previousIndex = -1;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    const canvas: HTMLCanvasElement = this.myCanvas.nativeElement;
    this.context = canvas.getContext('2d');
    this.cellSize = 100;
    this.columns = 500 / this.cellSize;
    this.rows = 500 / this.cellSize;
  }

  updateMaze(e: Maze) {
    this.currentMaze = e;
    this.configuration = this.getConfiguration(this.currentMaze.configuration);
    const size = this.columns > this.rows ? this.columns : this.rows;
    this.cellSize = Math.round(500 / size);
    this.myCanvas.nativeElement.height = this.cellSize * this.columns;
    this.currentCell = undefined;
    this.currentIndex = 0;
    this.previousIndex = -1;
    this.drawMaze();
    this.setInitialPosition();
  }

  getConfiguration(config: string) {
    let result = [];
    if (config) {      
      let _rows = config.split('\r\n');
      this.columns = _rows.length;
      this.rows = _rows[0].length;
      for (let i = 0; i < _rows.length; i++) {        
        for (let j = 0; j < _rows[i].length; j++) {
          let cell = new ConfigItem(_rows[i][j]);
          result.push(cell);
        }
      }
    }
    return result;
  }

  setInitialPosition() {
    let conf = this.configuration;
    for (let i = 0; i < conf.length; i++) {
      if (conf[i].name.toLowerCase() === 's') {
          this.cells[i].markPosition(this.context);
          
      }
    }
  }

  drawMaze() {
    this.context.clearRect(0, 0, 500, 500);
    this.cells = [];
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        const cell = new Cell(j, i, this.cellSize);        
        this.cells.push(cell);
      }
    }
    
    for(let i = 0; i < this.cells.length; i++) {
      if(this.configuration && this.configuration.length > 0 && this.configuration[i].name.toLocaleLowerCase() == 's') {
        this.startCell = this.cells[i];
        this.currentIndex = i;
        this.currentCell = this.cells[i];
        this.cells[i].markStart(this.context);
        this.cells[i].walls = [false, false, false, false];
      } else if(this.configuration && this.configuration.length > 0 && this.configuration[i].name.toLocaleLowerCase() == 'o') {
        this.cells[i].walls = [false, false, false, false];
      } else if(this.configuration && this.configuration.length > 0 && this.configuration[i].name.toLocaleLowerCase() == 'e') {
        this.cells[i].markEnd(this.context);
        this.cells[i].walls = [false, false, false, false];
        this.endCell = this.cells[i];
      }
      this.cells[i].render(this.context);
    }
  }

  checkNeighbors(x: number, y: number, postition: string) {
    let neighborsPosition = [
      {x: x, y: y - 1},
      {x: x + 1, y: y},
      {x: x, y: y + 1},
      {x: x - 1, y: y},
    ];    
    let testingNeighbor: Cell;
    let possibleIndex = 0
    switch (postition) {
      case 'north': 
        possibleIndex = this.cellIndex(neighborsPosition[0].x, neighborsPosition[0].y);
        break;
      case 'east':
        possibleIndex = this.cellIndex(neighborsPosition[1].x, neighborsPosition[1].y);
        break;
      case 'south':
        possibleIndex = this.cellIndex(neighborsPosition[2].x, neighborsPosition[2].y);
        break;
      case 'west':
        possibleIndex = this.cellIndex(neighborsPosition[3].x, neighborsPosition[3].y);
        break;
    }
    testingNeighbor = this.cells[possibleIndex];
    
    if (testingNeighbor && this.configuration[possibleIndex].name.toLocaleLowerCase() === 'o' ) {
      this.cells[this.currentIndex].clearPosition(this.context);
      this.previousIndex = this.currentIndex;
      this.currentIndex = possibleIndex;
      this.currentCell = testingNeighbor;
      this.cells[this.currentIndex].markPosition(this.context);
    } else if(testingNeighbor && this.configuration[possibleIndex].name.toLocaleLowerCase() === 'e' ) {
      this.cells[this.currentIndex].clearPosition(this.context);
      this.previousIndex = this.currentIndex;
      this.currentIndex = possibleIndex;
      this.currentCell = testingNeighbor;
      this.cells[this.currentIndex].markPosition(this.context);
      this._snackBar.open('You win!!!');
      this.updateMaze(this.currentMaze);
    }
  }

  north() {
    this.checkNeighbors(this.currentCell.x, this.currentCell.y, 'north');
  }

  south() {
    this.checkNeighbors(this.currentCell.x, this.currentCell.y, 'south');
  }

  west() {
    this.checkNeighbors(this.currentCell.x, this.currentCell.y, 'west');
  }
  east() {
    this.checkNeighbors(this.currentCell.x, this.currentCell.y, 'east');
  }

  private cellIndex(x: number, y: number) {
    if(x < 0 || y < 0 || x > this.rows -1 || y > this.columns - 1) {
      return -1;
    }
    return y * this.rows + x;
  }

}
