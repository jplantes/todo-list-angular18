import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-delete-todos',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `
    <div class="text-center mt-5 cursor-pointer text-gray-500 transition-all hover:text-black">
      <i class="iconoir-trash"></i>
      Delete selected todos
    </div>
  `,
})
export class DeleteTodosComponent {

}
