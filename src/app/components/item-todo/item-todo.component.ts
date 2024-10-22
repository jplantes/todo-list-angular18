import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, input, output, signal } from '@angular/core';

interface Todo {
  id: string;
  task: string;
  state: boolean;
}

@Component({
  selector: 'app-item-todo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './item-todo.component.html',
})
export class ItemTodoComponent implements OnInit {
  
  public todo = input<Todo>();
  
  public changeTodo = output<Todo>();
  public deleteTodo = output<Todo>();

  public checkItem = signal(this.todo()?.state);
  
  public changeSelection() {
    this.checkItem.update( value => !value );

    this.changeTodo.emit({
      ...this.todo()!,
      state: this.checkItem()!
    })
  }

  public deleteSelected() {
    this.deleteTodo.emit( this.todo()! );
  }
  
  ngOnInit(): void {
  //  console.log(this.todo())
  }
}
