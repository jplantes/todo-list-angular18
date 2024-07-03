import { ChangeDetectionStrategy, Component, ElementRef, ViewChild, output, signal } from '@angular/core';

@Component({
  selector: 'app-new-todo',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './new-todo.component.html',
  styles: ``
})
export class NewTodoComponent {

  @ViewChild('newTask') newTask!: ElementRef;

  public outTask = output<string>()

  public newTodo() {
    this.outTask.emit(this.newTask.nativeElement.value);
    this.newTask.nativeElement.value = '';
  }
}
