import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import { PaginatedFilter } from '../reducers';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  paginated!:PaginatedFilter;
  constructor(private translate: TranslateService,
        private store: Store<AppState>,
  ) {
    super();
    this.store.select('admin').subscribe((admin) => {
      this.paginated = admin.filters;
    });
    this.getTranslations();

  }


  // Cargar las traducciones
  private getTranslations(): void {
    this.translate.get([
      'paginator.itemsPerPageLabel',
      'paginator.nextPageLabel',
      'paginator.previousPageLabel',
      'paginator.firstPageLabel',
      'paginator.lastPageLabel',
      'paginator.rangeLabel'
    ]).subscribe((translations) => {
      this.itemsPerPageLabel = translations['paginator.itemsPerPageLabel'];
      this.nextPageLabel = translations['paginator.nextPageLabel'];
      this.previousPageLabel = translations['paginator.previousPageLabel'];
      this.firstPageLabel = translations['paginator.firstPageLabel'];
      this.lastPageLabel = translations['paginator.lastPageLabel'];
      this.getRangeLabel = (page: number, pageSize: number, length: number) =>{
        const totalPages = Math.ceil(length / pageSize);
        //console.log('DEF: '+page+" - "+pageSize+" - "+length);
        //console.log('STA: '+this.paginated.pageNumber+" - "+this.paginated.recordsXPage+" - "+length);
        return translations['paginator.rangeLabel']
        .replace('{{start}}', this.paginated.pageNumber.toString())
        .replace('{{end}}', totalPages.toString())
        .replace('{{length}}', length.toString());
      }

        /*translations['paginator.rangeLabel']
          .replace('{{start}}', (page * pageSize + 1).toString())
          .replace('{{end}}', Math.min((page + 1) * pageSize, length).toString())
          .replace('{{length}}', length.toString());*/
    });
  }
}
