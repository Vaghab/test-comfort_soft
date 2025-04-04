import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LibraryComponent } from './library-component/library.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LibraryComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'test-comfort_soft';
}
