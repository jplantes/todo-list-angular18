import { ChangeDetectionStrategy, Component, OnInit, computed, signal } from '@angular/core';
import { ItemTodoComponent } from '../../components/item-todo/item-todo.component';
import { NewTodoComponent } from '../../components/new-todo/new-todo.component';
import { DeleteTodosComponent } from '../../components/delete-todos/delete-todos.component';

import { v4 as uuidv4 } from 'uuid';

interface Todo {
  id: string;
  task: string;
  state: boolean;
}

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ItemTodoComponent, NewTodoComponent, DeleteTodosComponent],
  templateUrl: './todo-page.component.html',
})
export default class TodoPageComponent implements OnInit {
  
  public todos = signal<Todo[]>([
    {
      id: uuidv4(),
      state: false,
      task: 'Pasear al perro',
    },
    
    {
      id: uuidv4(),
      state: false,
      task: 'Cocinar',
    },
  ])

  public viewDelete = computed<boolean>( () => this.todos().some( value => value.state === true ));


  ngOnInit(): void {
  }
  
  public addTask(task: string) {
    
    if (task === '') return;
    const newTodo = {
      id: uuidv4(),
      state: false,
      task
    };
    
    this.todos.update(() => [...this.todos(), newTodo]);
    console.table( this.todos() );
  }

  public changetTodo(todo: Todo) {
    this.todos.update( values => {
      const key = values.findIndex(value => value.id === todo.id)
      values[key] = todo;

      return [...values]
    });
  }

  public deleteTodo(id: string) {
    this.todos.update( values => {
      const index = this.todos().findIndex(values => values.id === id);
      values.splice(index, 1);
  
      return [...values]
    });
  }

  public selectAllTodosSelected() {
    this.todos.update( values => values.filter( value => value.state === false ));
  }
}
