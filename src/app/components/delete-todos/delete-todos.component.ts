import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete-todos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  templateUrl: './delete-todos.component.html',
  styles: ``
})
export class DeleteTodosComponent {

}
