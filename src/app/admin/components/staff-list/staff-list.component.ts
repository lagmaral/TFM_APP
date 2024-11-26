import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-staff-list',
  templateUrl: './staff-list.component.html',
  styleUrls: ['./staff-list.component.scss'],
})
export class StaffListComponent  implements OnInit {
  searchForm: FormGroup;
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['name', 'date', 'actions'];
  totalResults = 0;
  currentPage = 0;
  pageSize = 50;
  lastFilters: any = {};


  nombre = new FormControl('');
  apellido1 = new FormControl('');
  apellido2 = new FormControl('');


 // dataSource = new MatTableDataSource<any>(/* your data */);

  constructor(
    private fb: FormBuilder,
    //private myService: MyService,
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
    this.loadData();

  }

  loadData(filters = this.lastFilters, pageIndex = this.currentPage) {
    this.lastFilters = filters;
    /*this.myService
      .getData({
        filters,
        page: pageIndex,
        size: this.pageSize,
      })
      .subscribe((response) => {
        this.dataSource.data = response.items;
        this.totalResults = response.total;
      });*/
  }

  onSearch() {
    const filters = this.searchForm.value;
    this.currentPage = 0; // Reiniciar a la primera página
    this.loadData(filters, this.currentPage);
  }

  onClear() {
    this.searchForm.reset();
    this.onSearch();
  }

  onPageChange(event: any) {
    this.currentPage = event.pageIndex;
    this.loadData(this.lastFilters, this.currentPage);
  }

  sortData() {

  }

  onEdit(element: any) {
    this.router.navigate(['/detail', element.id], { state: { filters: this.lastFilters, page: this.currentPage } });
  }

  onAdd() {
    this.router.navigate(['/add'], { state: { filters: this.lastFilters, page: this.currentPage } });
  }
}
function compare(name: any, name1: any, isAsc: boolean): number {
  throw new Error('Function not implemented.');
}

