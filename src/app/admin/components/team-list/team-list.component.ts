import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../actions';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialo/confirmation-dialo.component';
import { PaginatedFilter } from '../../reducers';
import { EquipoDTO } from '../../models/equipo.dto';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TeamListComponent  implements OnInit {

  searchForm: FormGroup;
  baseUrl  = 'http://localhost:3000'
  displayedColumns: string[] = ['imagen', 'nombre', 'categoria', 'orden','visible','modificar','eliminar'];
  dataSource!: MatTableDataSource<EquipoDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private previousButton!: HTMLElement;
  private nextButton!: HTMLElement;
  private firstPageButton!: HTMLElement;
  private lastPageButton!: HTMLElement;

  totalItems = 0;
  currentPage = 0;
  pageSize = 50;
  paginated!:PaginatedFilter;


  nombre = new FormControl('');
  categoria = new FormControl('');


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.searchForm = this.fb.group(
      {
        nombre: this.nombre,
        categoria: this.categoria,
      }

    );
  }

  ngOnInit() {

  }



  loadData() {
    this.store.dispatch(AdminActions.searchTeamsWithFilters({
      paginated: {
        pageNumber: this.currentPage+1,
        recordsXPage: this.pageSize,
        filters: this.paginated.filters
    }}));
    this.controlPaginationButtons();
  }

  onSearch() {
    const filters = this.searchForm.value;
      // Filtrar solo las propiedades que tienen un valor definido
      const applyFilters = Object.keys(filters).reduce((acc, key) => {
        const value = filters[key as keyof typeof filters]; // Asegúrate de que key sea una clave válida
        if (value !== null && value !== '' && value !== undefined) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, any>); // O el tipo que necesites

      this.store.dispatch(AdminActions.setFilters({
        paginated: {
          pageNumber: this.currentPage+1,
          recordsXPage: this.pageSize,
          filters: applyFilters // Asegúrate de que applyFilters sea un objeto válido
        }
      }));


    //this.currentPage = 1; // Reiniciar a la primera página
    this.loadData();

  }

  onClear() {
    // Reinicia el formulario
    this.searchForm.reset();

    // Limpia los filtros en el store
    this.store.dispatch(AdminActions.clearFilters());

    // Reinicia la tabla, totalItems, y página actual
    this.dataSource = new MatTableDataSource<EquipoDTO>([]); // Datos vacíos
    this.dataSource.paginator = this.paginator; // Actualiza el paginador con los datos vacíos
    this.dataSource._updateChangeSubscription(); // Notifica a Angular de los cambios

    // Reinicia las propiedades de paginación
    this.totalItems = 0;
    this.currentPage = 0;

    // Forzar la detección de cambios para asegurar que el estado se sincroniza
    this.changeDetectorRef.detectChanges();
  }


  onDelete(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      //data: { message: `¿Está seguro de que desea eliminar?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el usuario confirmó, invoca el servicio para eliminar
        this.store.dispatch(AdminActions.deleteTeam({ id:element, paginated:this.paginated}));
      }
    });
  }

  moveUp(element: any){
    this.store.dispatch(AdminActions.changeOrderTeam({ id:Number(element), direccion: 'asc' ,paginated:this.paginated}));
  }

  moveDown(element:any){
    this.store.dispatch(AdminActions.changeOrderTeam({ id:Number(element), direccion: 'desc' ,paginated:this.paginated}));
  }

  onEdit(element: any) {
    this.store.dispatch(AdminActions.getTeamById({ id: Number(element) }));
  }

  onAdd() {
    this.router.navigate(['/admin/teams-detail']);
  }

  onPageComboChange(event: any) {

    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  controlPaginationButtons(){
    this.toggleButtonState(this.previousButton, this.currentPage === 0);
    this.toggleButtonState(this.firstPageButton, this.currentPage === 0);
    this.toggleButtonState(this.nextButton, this.shouldDisableNextButton(this.totalItems,this.pageSize,this.currentPage));
    this.toggleButtonState(this.lastPageButton, this.currentPage >= Math.ceil(this.totalItems / this.pageSize) - 1);
  }

  shouldDisableNextButton(
    totalItems: number,
    itemsPerPage: number,
    currentPage: number
  ): boolean {
    if (totalItems === 0) {
      return true; 7
    }
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    return currentPage+1 >= totalPages;
  }
  ngAfterViewInit(): void {

    this.store.select('admin').subscribe((admin) => {
      this.paginated = admin.filters;
      this.dataSource = new MatTableDataSource(admin.teamList.data);
      this.totalItems = admin.teamList.total;
      this.dataSource.paginator = this.paginator;

      if(this.previousButton && this.nextButton && this.firstPageButton && this.lastPageButton){
        this.controlPaginationButtons();
            // Eliminar tooltips de los botones
        this.removeTooltip(this.previousButton);
        this.removeTooltip(this.nextButton);
        this.removeTooltip(this.firstPageButton);
        this.removeTooltip(this.lastPageButton);
      }
    });



    // Obtener referencias a los botones del paginator
    this.previousButton = this.getButtonByClassName('mat-mdc-paginator-navigation-previous')!;
    this.nextButton = this.getButtonByClassName('mat-mdc-paginator-navigation-next')!;
    this.firstPageButton = this.getButtonByClassName('mat-mdc-paginator-navigation-first')!;
    this.lastPageButton = this.getButtonByClassName('mat-mdc-paginator-navigation-last')!;




    // Escuchar eventos de clic en los botones
    this.previousButton.addEventListener('click', () => this.handlePreviousClick());
    this.nextButton.addEventListener('click', () => this.handleNextClick());
    this.firstPageButton.addEventListener('click', () => this.handleFirstPageClick());
    this.lastPageButton.addEventListener('click', () => this.handleLastPageClick());

  }

  handleNextClick(): void {
    this.currentPage++;
    this.onSearch();

  }

  handleFirstPageClick(): void {
    this.currentPage=0;
    this.onSearch();
  }

  handlePreviousClick(): void {
    this.currentPage--;
    this.onSearch();
  }

  handleLastPageClick(): void {
    this.currentPage=Math.ceil(this.totalItems / this.pageSize) -1;
    this.onSearch();
  }



    toggleButtonState(button: HTMLElement, isDisabled: boolean): void {
      if (isDisabled) {
        button.classList.add('mat-paginator-disabled');
        button.setAttribute('disabled', 'true');
      } else {
        button.classList.remove('mat-paginator-disabled');
        button.removeAttribute('disabled');
      }
    }

    removeTooltip(button: HTMLElement): void {
      button.removeAttribute('title');
    }

    // Utilidad para obtener botones por clase
    private getButtonByClassName(className: string): HTMLElement | null {
      const element = document.querySelector(`.${className}`);
      return element ? (element as HTMLElement) : null;
    }

}
