import { Component, OnInit, ViewChild } from '@angular/core';
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

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent  implements OnInit {
  searchForm: FormGroup;

  displayedColumns: string[] = [ 'apellido1', 'apellido2', 'nombre','telefono', 'admin','modificar','eliminar'];
  dataSource!: MatTableDataSource<StaffDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  totalItems = 0;
  currentPage = 1;
  pageSize = 50;
  paginated!:PaginatedFilter;//filters: any = {};


  nombre = new FormControl('');
  apellido1 = new FormControl('');
  apellido2 = new FormControl('');

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group(
      {
        nombre: this.nombre,
        apellido1: this.apellido1,
        apellido2: this.apellido2,
      }

    );
  }

  ngOnInit() {
     this.store.select('admin').subscribe((admin) => {
      this.paginated = admin.filters;
      this.dataSource = new MatTableDataSource(admin.staffList.data);
      this.totalItems = admin.staffList.total;

      this.dataSource.paginator = this.paginator;
      /*this.paginator.length = this.totalItems;
      this.paginator.pageIndex = this.currentPage; // Angular usa base 0 para pageIndex
      this.paginator.pageSize = this.pageSize;*/
    });

    this.loadData();

  }



  loadData(/*filters = this.lastFilters*/) {
    this.store.dispatch(AdminActions.searchStaffWithFilters({
      paginated: {
        pageNumber: this.currentPage,
        recordsXPage: this.pageSize,
        filters: this.paginated.filters
    }}));



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
          pageNumber: this.currentPage,
          recordsXPage: this.pageSize,
          filters: applyFilters // Asegúrate de que applyFilters sea un objeto válido
        }
      }));


    this.currentPage = 1; // Reiniciar a la primera página
    this.loadData();
  }

  onClear() {
    this.searchForm.reset();
    this.store.dispatch(AdminActions.clearFilters());
    this.onSearch();
  }

  onDelete(element: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '350px',
      data: { message: `¿Está seguro de que desea eliminar?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el usuario confirmó, invoca el servicio para eliminar
        this.store.dispatch(AdminActions.deleteStaff({ id:element}));
      }
    });
  }

  onPageChange(event: any) {

    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();

  }

  onEdit(element: any) {
    this.store.dispatch(AdminActions.getStaffById({ id: Number(element) }));
    //this.router.navigate(['/admin/staff-detail', element], { state: { filters: this.lastFilters, page: this.currentPage } });
  }

  onAdd() {
    this.router.navigate(['/admin/staff-detail']/*, { state: { filters: this.filters, page: this.currentPage } }*/);
  }

  ngOnDestroy() {
    console.log('StaffListComponent destruido');
  }

}
function compare(name: any, name1: any, isAsc: boolean): number {
  throw new Error('Function not implemented.');
}

