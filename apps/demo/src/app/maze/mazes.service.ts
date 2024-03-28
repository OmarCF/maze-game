import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Maze } from './shared/maze';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MazesService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    }),
  };
  private baseUrl = `${environment.baseUrl}/api`;
  constructor(public httpClient: HttpClient) {}

  getMazes(): Observable<string[]> {
    const mazes = this.httpClient.get<string[]>(
      `${this.baseUrl}/maze`,
      this.httpOptions
    );
    return mazes;
  }

  uploadMaze(file: File): Observable<string[]> {
    const data = new FormData();
    data.append('file', file);
    return this.httpClient.post<string[]>(`${this.baseUrl}/maze`, data);
  }

  getMaze(mazeName: string): Observable<Maze> {
    const maze = this.httpClient.get<Maze>(
      `${this.baseUrl}/maze/${mazeName}`,
      this.httpOptions
    );
    return maze;
  }
}
