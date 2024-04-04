import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Maze } from '../shared/maze';
import { MazesService } from '../mazes.service';
import {MatSnackBar} from '@angular/material/snack-bar';
const DUMMY_FILE: string = '___dummy.txt';
@Component({
  selector: 'valant-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.less']
})
export class LoaderComponent implements OnInit {

  constructor(private mazesService: MazesService, private _snackBar: MatSnackBar) {}

  mazes: string[] = [];
  selectedFile: File = (() => {
    var blob = new Blob([''], {
      type: 'text/plain;charset=utf-8',
    });
    var file = new File([blob], DUMMY_FILE);
    return file;
  })();

  selectedMaze: string = '';
  currectMaze: Maze = (() => new Maze())();

  @Output()
  selectedMazEmitEvent = new EventEmitter();

  uploadFile(): void {
    if (this.selectedFile && this.selectedFile.name !== DUMMY_FILE) {
      this.mazesService.uploadMaze(this.selectedFile).subscribe((mazes) => {
        this.mazes = mazes;
        if (this.selectedMaze === '' && this.mazes.length > 0) {
          this.selectedMaze = this.mazes[0];
        }
        this._snackBar.open('File loaded');
      });
    }
  }

  fileChange(e: Event) {
    var anyEvent: any = e;
    var file =
      anyEvent.target && anyEvent.target.files
        ? anyEvent.target.files[0]
        : null;
    if (file != null) {
      this.selectedFile = file;
    }
  }

  ngOnInit(): void {
    this.getMazes();
  }

  getMazes(): void {
    this.mazesService.getMazes().subscribe((mazes) => {
      this.mazes = mazes;
      if (this.selectedMaze === '' && this.mazes.length > 0) {
        this.selectedMaze = this.mazes[0];
      }
    });
  }

  onMazeSelected(mazeName: string): void {
    this.selectedMaze = mazeName;

    this.mazesService.getMaze(mazeName).subscribe((maze) => {
      this.currectMaze = maze;
      this.selectedMazEmitEvent.next(maze);
    });
  }

}
