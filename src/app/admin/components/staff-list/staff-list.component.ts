import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import * as AdminActions from '../../actions';
import { StaffDTO } from '../../models/staff.dto';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent  implements OnInit {
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<StaffDTO>();
  displayedColumns: string[] = ['nombre'/*, 'date', 'actions'*/];
  totalResults = 0;
  currentPage = 1;
  pageSize = 50;
  lastFilters: any = {};


  nombre = new FormControl('');
  apellido1 = new FormControl('');
  apellido2 = new FormControl('');
  //@ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private router: Router
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
      this.dataSource = new MatTableDataSource(admin.staffList);
      this.totalResults = admin.staffList.length;//response.total;
    });

    this.loadData();

  }

  loadData(filters = this.lastFilters) {
    this.lastFilters = filters;
    this.store.dispatch(AdminActions.searchStaffWithFilters({ id:this.currentPage, limit:50, filters}));
  }

  onSearch() {
    const filters = this.searchForm.value;
    this.currentPage = 1; // Reiniciar a la primera página
    this.loadData(filters);
  }

  onClear() {
    this.searchForm.reset();
    this.onSearch();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.loadData(this.lastFilters);
  }

  sortData() {

  }

  onEdit(element: any) {
    //this.router.navigate(['/admin/staff-detail', element.id], { state: { filters: this.lastFilters, page: this.currentPage } });
  }

  onAdd() {
    //this.router.navigate(['/admin/staff-detail', 3], { state: { filters: this.lastFilters, page: this.currentPage } });
    this.router.navigate(['/admin/staff-detail'], { state: { filters: this.lastFilters, page: this.currentPage } });
  }

  ngOnDestroy() {
    console.log('StaffListComponent destruido');
  }

}
function compare(name: any, name1: any, isAsc: boolean): number {
  throw new Error('Function not implemented.');
}

