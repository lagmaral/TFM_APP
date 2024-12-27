import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { EquipoDTO } from 'src/app/admin/models/equipo.dto';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-equipo-admin',
  templateUrl: './equipo-admin.component.html',
  styleUrls: ['./equipo-admin.component.scss'],
})
export class EquipoAdminComponent  implements OnInit {
  @Input() origen: string;
  equipo : EquipoDTO = new EquipoDTO(0,0,'','',0,false,'');

  constructor(private store: Store<AppState>,
    private popoverController: PopoverController,
            private router: Router,
            private route: ActivatedRoute,
  ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {

    this.store.select('team').subscribe((team) => {
      this.equipo = team.plantilla.equipo;

    });
  }

  async manageMatches() {
    console.log('Manage Team option selected');
    console.log('Param00: '+this.equipo.id);
    console.log('Param01: '+this.origen);
    //this.router.navigate(['/matches/']); // Ejemplo de navegación manual
    //this.router.navigate(['/matches', this.equipo.id]);
    this.router.navigate(['/matches', this.equipo.id], {
      queryParams: { origen: this.origen}
    });
    await this.popoverController.dismiss(); // Cierra el popover
  }





}
