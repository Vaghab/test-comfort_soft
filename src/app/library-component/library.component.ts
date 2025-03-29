import { AutoCompleteModule } from 'primeng/autocomplete';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageModule } from 'primeng/image';
import { map } from 'rxjs';

import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
  Signal,
} from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { Library } from '../interfaces/interfaces';
import { LibraryCardComponent } from '../library-card/library-card.component';
import { LibraryService } from '../services/library.service';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss'],
  imports: [
    FormsModule,
    DataViewModule,
    ButtonModule,
    AutoCompleteModule,
    ImageModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [DialogService, DynamicDialogRef],

  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryComponent implements OnInit {
  private readonly libraryService = inject(LibraryService);
  private readonly destroyed = inject(DestroyRef);
  private readonly dialogService = inject(DialogService);

  public readonly searchForm = new FormGroup<{
    search: FormControl<string | null>;
  }>({
    search: new FormControl(''),
  });

  public librariesVisible: boolean = false;
  public librariesToShow: Library[] = [];

  private libs: Signal<Library[]> = toSignal(
    this.libraryService.getAllLibraries().pipe(
      map((libraries: any) =>
        libraries.features.map((feat: any) => ({
          name: feat.properties.attributes.FullName,
          address: feat.properties.attributes.ObjectAddress[0].Address,
        }))
      )
    )
  );

  ngOnInit(): void {
    this.librariesToShow = this.libs();
    this.searchForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyed))
      .subscribe();
  }

  toSearch(): void {
    const searchValue: string =
      this.searchForm.value.search?.trim().toLowerCase() || '';

    this.librariesToShow = searchValue
      ? this.libs().filter((library: any) =>
          library.name.toLowerCase().includes(searchValue)
        )
      : this.libs();

    this.librariesVisible = this.librariesToShow.length > 0;
  }

  viewLibrayCard(lib: Library) {
    this.dialogService.open(LibraryCardComponent, {
      header: 'Библиотека',
      data: lib,
      dismissableMask: true,
    });
  }

  highlightText(text: string, searchValue: string): string {
    return searchValue
      ? text.replace(
          new RegExp(searchValue, 'gi'),
          (match: string) => `<span class="highlight">${match}</span>`
        )
      : text;
  }
}
