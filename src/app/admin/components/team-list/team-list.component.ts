import { Component, OnInit, ViewChild } from '@angular/core';
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
})
export class TeamListComponent  implements OnInit {

  searchForm: FormGroup;
  baseUrl  = 'http://localhost:3000'
  displayedColumns: string[] = ['imagen', 'nombre', 'categoria', 'orden','visible','modificar','eliminar'];
  dataSource!: MatTableDataSource<EquipoDTO>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  totalItems = 0;
  currentPage = 1;
  pageSize = 50;
  paginated!:PaginatedFilter;


  nombre = new FormControl('');
  categoria = new FormControl('');


  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router,
    private dialog: MatDialog
  ) {
    this.searchForm = this.fb.group(
      {
        nombre: this.nombre,
        categoria: this.categoria,

      }

    );
  }

  ngOnInit() {
    this.store.select('admin').subscribe((admin) => {
      this.paginated = admin.filters;
      this.dataSource = new MatTableDataSource(admin.teamList.data);
      this.totalItems = admin.teamList.total;

      this.dataSource.paginator = this.paginator;
        /*this.paginator.length = this.totalItems;
        this.paginator.pageIndex = this.currentPage; // Angular usa base 0 para pageIndex
        this.paginator.pageSize = this.pageSize;*/
    });

    this.loadData();

  }



  loadData() {
    this.store.dispatch(AdminActions.searchTeamsWithFilters({
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

  }

  moveDown(element:any){

  }

  onPageChange(event: any) {

    /*this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();*/

  }

  onEdit(element: any) {
    this.store.dispatch(AdminActions.getTeamById({ id: Number(element) }));
  }

  onAdd() {
    this.router.navigate(['/admin/teams-detail']);
  }



}

