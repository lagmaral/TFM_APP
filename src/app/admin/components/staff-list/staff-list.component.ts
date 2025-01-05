import { ChangeDetectorRef, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../actions';
import { StaffDTO } from '../../models/staff.dto';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialo/confirmation-dialo.component';
import { PaginatedFilter } from '../../reducers';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
  //encapsulation: ViewEncapsulation.Emulated
})
export class StaffListComponent  implements OnInit {


  displayedColumns: string[] = [ 'imagen', 'apellido1', 'apellido2', 'nombre','telefono', 'admin', 'anadir', 'modificar','eliminar'];
  dataSource!: MatTableDataSource<StaffDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  searchFormStaffList: FormGroup;
  baseUrl  = environment.apiUrl;

  private previousButton!: HTMLElement;
  private nextButton!: HTMLElement;
  private firstPageButton!: HTMLElement;
  private lastPageButton!: HTMLElement;

  listenersAdded = false;
  totalItems = 0;
  currentPage = 0;
  securityPage = 0;
  pageSize = 50;
  paginated!:PaginatedFilter;


  nombre = new FormControl('');
  apellido1 = new FormControl('');
  apellido2 = new FormControl('');


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog,
    private changeDetectorRef: ChangeDetectorRef
  ) {
    this.searchFormStaffList = this.fb.group(
      {
        nombre: this.nombre,
        apellido1: this.apellido1,
        apellido2: this.apellido2,
      }

    );
  }

  ngOnInit() {
    this.store.dispatch(AdminActions.clearFilters());
  }



  loadData() {
    this.store.dispatch(AdminActions.searchStaffWithFilters({
      paginated: {
        pageNumber: this.currentPage+1,
        recordsXPage: this.pageSize,
        filters: this.paginated.filters
    }}));

    this.controlPaginationButtonsStaff();
  }

  onSearch() {

    const filters = this.searchFormStaffList.value;
      // Filtrar solo las propiedades que tienen un valor definido
      const applyFilters = Object.keys(filters).reduce((acc, key) => {
        const value = filters[key as keyof typeof filters]; // Asegúrate de que key sea una clave válida
        if (value !== null && value !== '' && value !== undefined) {
          acc[key] = typeof value === 'string' ? value.toUpperCase() : value;
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
      console.log('onSearch - Staff '+JSON.stringify(applyFilters));
    this.loadData();

  }

  onClear() {
    // Reinicia el formulario
    this.searchFormStaffList.reset();


    // Reinicia las propiedades de paginación
    this.totalItems = 0;
    this.currentPage = 0;
    this.clearPagination();
  }

    clearPagination(){
      // Limpia los filtros en el store
      this.store.dispatch(AdminActions.clearFilters());

      // Reinicia la tabla, totalItems, y página actual
      this.dataSource = new MatTableDataSource<StaffDTO>([]); // Datos vacíos
      this.dataSource.paginator = this.paginator; // Actualiza el paginador con los datos vacíos
      this.dataSource._updateChangeSubscription(); // Notifica a Angular de los cambios



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
        this.store.dispatch(AdminActions.deleteStaff({ id:element, paginated: this.paginated}));
      }
    });
  }

  onAddTeam(element: any) {
    this.store.dispatch(AdminActions.getStaffTeamsById({ id: Number(element) }));
  }

  onEdit(element: any) {
    this.store.dispatch(AdminActions.getStaffById({ id: Number(element) }));
  }

  onAdd() {
    this.router.navigate(['/admin/staff-detail']);
  }

  onPageComboChange(event: any) {

    //this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.clearPagination();
    //this.loadData();
  }

  controlPaginationButtonsStaff(){
    console.log('controlPaginationButtons - Staff');
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
      this.dataSource = new MatTableDataSource(admin.staffList.data);
      this.totalItems = admin.staffList.total;
      this.dataSource.paginator = this.paginator;

      if(this.previousButton && this.nextButton && this.firstPageButton && this.lastPageButton){
        this.controlPaginationButtonsStaff();
      }
      if(!this.listenersAdded && this.firstPageButton){
            // Escuchar eventos de clic en los botones
        this.previousButton.addEventListener('click', () => this.handlePreviousClick());
        this.nextButton.addEventListener('click', () => this.handleNextClick());
        this.firstPageButton.addEventListener('click', () => this.handleFirstPageClick());
        this.lastPageButton.addEventListener('click', () => this.handleLastPageClick());
        this.listenersAdded = true;
      }
    });



    // Obtener referencias a los botones del paginator
    this.firstPageButton = document.getElementById('paginatorStaff-0')!;
    this.previousButton = document.getElementById('paginatorStaff-1')!;
    this.nextButton = document.getElementById('paginatorStaff-2')!;
    this.lastPageButton = document.getElementById('paginatorStaff-3')!;
    this.controlPaginationButtonsStaff();



    // Escuchar eventos de clic en los botones
   /* this.previousButton.addEventListener('click', () => this.handlePreviousClick());
    this.nextButton.addEventListener('click', () => this.handleNextClick());
    this.firstPageButton.addEventListener('click', () => this.handleFirstPageClick());
    this.lastPageButton.addEventListener('click', () => this.handleLastPageClick());*/

  }

  handleNextClick(): void {
    console.log('Pagina :'+this.currentPage+" - "+this.securityPage);
    this.currentPage++;
    this.securityPage++;
    this.onSearch();

  }

  handleFirstPageClick(): void {
    this.currentPage=0;
    this.securityPage = 0;
    this.onSearch();
  }

  handlePreviousClick(): void {
    console.log('Pagina :'+this.currentPage+" - ");
    this.currentPage--;
    this.securityPage--;
    this.onSearch();
  }

  handleLastPageClick(): void {
    this.currentPage=Math.ceil(this.totalItems / this.pageSize) -1;
    this.securityPage = Math.ceil(this.totalItems / this.pageSize) -1;
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

}


