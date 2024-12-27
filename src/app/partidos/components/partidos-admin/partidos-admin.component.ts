import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';

@Component({
  selector: 'app-partidos-admin',
  templateUrl: './partidos-admin.component.html',
  styleUrls: ['./partidos-admin.component.scss'],
})
export class PartidosAdminComponent  implements OnInit {
  @Input() origen: string;
  @Input() teamId: number;
   constructor(private store: Store<AppState>,
     private popoverController: PopoverController,
             private router: Router,
             private route: ActivatedRoute,
   ) {}

  ngOnInit() {}

  ngAfterViewInit(): void {

    /*this.store.select('team').subscribe((team) => {
      this.equipo = team.plantilla.equipo;

    });*/
  }

  async addMatch() {
    //this.router.navigate(['/matches/']); // Ejemplo de navegación manual
    this.router.navigate(['/matches/add', this.teamId], {
      queryParams: { origen: this.origen}
    });
    await this.popoverController.dismiss(); // Cierra el popover
  }
}
