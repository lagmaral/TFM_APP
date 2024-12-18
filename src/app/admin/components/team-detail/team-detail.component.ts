import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { StaffDTO } from '../../models/staff.dto';
import { ActivatedRoute, Router } from '@angular/router';
import * as AdminActions from '../../actions';
import { AppState } from 'src/app/app.reducers';
import { Store } from '@ngrx/store';
import { PaginatedFilter } from '../../reducers';
import { EquipoDTO } from '../../models/equipo.dto';


@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.scss'],
})
export class TeamDetailComponent  implements OnInit {

  //@Input() inputDTO?: StaffDTO;
  detailForm: FormGroup;
  isEditMode = false;
  team!: EquipoDTO;
  nombre = new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(100)]);
  categoria = new FormControl('', [Validators.required, Validators.minLength(5),Validators.maxLength(100)]);
  isActive= new FormControl(false);

  paginated!: PaginatedFilter;
  //staffId!: number;
  selectedImage:  File | null = null;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    // Inicializa el FormGroup
    this.detailForm = this.fb.group({
      nombre: this.nombre,
      categoria: this.categoria,
      isActive: this.isActive
    });
  }

  onFileSelected(event: FileList) {
      if (event.length > 0) {
        this.selectedImage = event.item(0); // Obtiene el primer archivo seleccionado
      }
    }

  ngOnInit(): void {

    this.store.select('admin').subscribe((admin) => {
      this.team = admin.loadedTeam;
      this.paginated = admin.filters;
      this.detailForm.get('isActive')?.setValue(admin.loadedTeam.activo);
      this.detailForm.get('nombre')?.setValue(admin.loadedTeam.nombre);
      this.detailForm.get('categoria')?.setValue(admin.loadedTeam.descripcion);


      if(admin.loadedTeam.id && admin.loadedTeam.id>0){
        this.isEditMode = true;
      }else{
        this.isEditMode = false;
      }
    });

  }



  onCancel(): void {
    this.store.dispatch(AdminActions.cleanDetail());
    this.router.navigate(['/admin/teams']);
  }
  // Manejo del formulario al enviarlo
  onSubmit(): void {


    if (this.detailForm.valid) {
      const item = new FormData();

      item.append('id', this.team.id.toString());
      item.append('nombre', this.detailForm.get('nombre')?.value);
      item.append('descripcion', this.detailForm.get('categoria')?.value);
      item.append('activo', this.detailForm.get('isActive')?.value);

      if (this.selectedImage) {
        item.append('image', this.selectedImage);
      }
      if(this.isEditMode){
        this.store.dispatch(AdminActions.modifyTeam({id:this.team.id, item , paginated: this.paginated }));
      }else{
        this.store.dispatch(AdminActions.saveNewTeam({ item, paginated: this.paginated }));
      }

    } else {
      // Marcar los controles como tocados para mostrar errores
      this.detailForm.markAllAsTouched();
    }
  }



  getErrorMessage(control: AbstractControl, field: string): string {
    if (control.hasError('required')) {
      return `ERRORS.${field}.REQUIRED`;
    }
    if (control.hasError('minlength')) {
      return `ERRORS.${field}.MIN_LENGTH`;
    }
    if (control.hasError('maxlength')) {
      return `ERRORS.${field}.MAX_LENGTH`;
    }
    if (control.hasError('pattern') && field === 'TELEFONO') {
      return `ERRORS.PHONE.INVALID`;
    }
    if (control.hasError('minimumAge')) {
      return `ERRORS.BIRTHDATE.MIN_AGE`;
    }
    if (control.hasError('invalidDateFormat')) {
      return `ERRORS.BIRTHDATE.INVALID_FORMAT`;
    }
    return '';
  }
}
