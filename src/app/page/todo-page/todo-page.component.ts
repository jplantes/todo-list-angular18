import { ChangeDetectionStrategy, Component, OnInit, computed, inject, signal } from '@angular/core';
import { ItemTodoComponent } from '../../components/item-todo/item-todo.component';
import { NewTodoComponent } from '../../components/new-todo/new-todo.component';
import { DeleteTodosComponent } from '../../components/delete-todos/delete-todos.component';

import { v4 as uuidv4 } from 'uuid';
import { TodosService } from '../../services/todos.service';
import { Todo } from '../../interfaces/todos.interface';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemTodoComponent, NewTodoComponent, DeleteTodosComponent],
  templateUrl: './todo-page.component.html',
})
export default class TodoPageComponent implements OnInit {

  private todoService = inject( TodosService);
  
  public todos = signal<Todo[]>([]);

  public viewDelete = computed<boolean>( () => this.todos().some( value => value.state === true ));

  ngOnInit(): void {
    this.todoService.getTodos().subscribe( resp => {
      this.todos.set( resp );
    });

  }
  
  public addTask(task: string) {
    if (task === '') return;
    
    const newTodo = {
      id: uuidv4(),
      state: false,
      task
    };
    
    this.todoService.newTodo( newTodo ).subscribe( resp => {
      this.todos.update(() => [...this.todos(), resp])
    });
  }

  public changetTodo(todo: Todo) {

    this.todoService.updateTodo( todo ).subscribe();

    this.todos.update( values => {
      const key = values.findIndex(value => value.id === todo.id)
      values[key] = todo;

      return [...values]
    });
  }

  public deleteTodo(id: string) {
    this.todoService.deleteTodo( id ).subscribe();

    this.todos.update( values => {
      const index = this.todos().findIndex(values => values.id === id);
      values.splice(index, 1);
  
      return [...values]
    });
  }

  public selectAllTodosSelected() {
    const removeTodos = this.todos().filter( value => value.state === true );
    removeTodos.forEach( todo => this.deleteTodo( todo.id ));
  }
}
