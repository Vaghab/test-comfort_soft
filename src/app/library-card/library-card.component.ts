import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Library } from '../interfaces/interfaces';

@Component({
  selector: 'app-library-card',
  templateUrl: './library-card.component.html',
  styleUrls: ['./library-card.component.scss'],
  standalone: true,
  imports: [DialogModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryCardComponent {
  @Input() library: Library | null = null;

  readonly config = inject(DynamicDialogConfig);
}
