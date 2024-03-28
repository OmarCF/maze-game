import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MazeContainerComponent } from './maze-container/maze-container.component';
import { LoaderComponent } from './loader/loader.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';



@NgModule({
  declarations: [
    MazeContainerComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  exports: [
    MazeContainerComponent
  ]
})
export class MazeModule { }
