import { Observable, take, tap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Features } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class LibraryService {
  private readonly http = inject(HttpClient);

  private readonly api: string = 'https://apidata.mos.ru/v1';
  private readonly my_api_key: string = 'd0d43f1e-47cc-457a-9255-7d5f6efa86ff';

  private librariesCaptionID: number | null = null;

  private getLibrariesID(): void {
    this.http
      .get(`${this.api}/datasets?api_key=${this.my_api_key}`, {
        params: {
          $filter: "substringof(Caption, 'Библиотеки') eq true",
        },
      })
      .pipe(
        take(1),
        tap((res: any) => {
          this.librariesCaptionID = res.Items[0].Id;
        })
      )
      .subscribe();
  }

  public getAllLibraries(): Observable<Features> {
    this.getLibrariesID();
    return this.http.get<Features>(
      `${this.api}/features/${this.librariesCaptionID}/?api_key=${this.my_api_key}`
    );
  }
}
