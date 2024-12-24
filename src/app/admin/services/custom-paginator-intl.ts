import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  constructor(private translate: TranslateService) {
    super();
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
      this.getRangeLabel = (page: number, pageSize: number, length: number) =>
        translations['paginator.rangeLabel']
          .replace('{{start}}', (page * pageSize + 1).toString())
          .replace('{{end}}', Math.min((page + 1) * pageSize, length).toString())
          .replace('{{length}}', length.toString());
    });
  }
}
