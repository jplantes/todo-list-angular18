import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Todo } from '../interfaces/todos.interface';

@Injectable({
  providedIn: 'root'
})
export class TodosService {

  #baseUrl = 'http://localhost:3000/todos';

  private http = inject(HttpClient);

  public getTodos() {
    return this.http.get<Todo[]>(`${ this.#baseUrl }`);
  }

  public newTodo( todo: Todo ) {
    return this.http.post<Todo>(`${ this.#baseUrl }`, todo);
  }

  public updateTodo( todo: Todo ){
    return this.http.patch<Todo>(`${ this.#baseUrl }/${ todo.id }`, todo);
  }

  public deleteTodo( id: string ){
    return this.http.delete<Todo>(`${ this.#baseUrl }/${ id }`);
  }

}
