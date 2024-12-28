import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';
import * as AdminActions from '../../../admin/actions';
import * as PartidoActions from '../../actions';

import { PartidosAdminComponent } from '../partidos-admin/partidos-admin.component';
import { PartidoDTO } from '../../models/partido.dto';


//import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@Component({
  selector: 'app-partidos-equipo-list',
  templateUrl: './partidos-equipo-list.component.html',
  styleUrls: ['./partidos-equipo-list.component.scss'],
})
export class PartidosEquipoListComponent  implements OnInit {
  selectedPartido: any = null;
  origen: string;
  teamId = 0;
  partidos: PartidoDTO[] = [];
  isTeamStaff = false;
  constructor(
    private store: Store<AppState>,
            private router: Router,
            private route: ActivatedRoute,
           private popoverController: PopoverController

    //private iab: InAppBrowser
  ) {}

  ngOnInit() {
    this.store.dispatch(AdminActions.searchTeamCatalog());
    this.store.dispatch(AdminActions.searchTeamRivalsCatalog());
    this.teamId = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.route.queryParamMap.subscribe(params => {
      this.origen = params.get('origen') || '';
    });
    this.store.dispatch(PartidoActions.getMatches4TeamsById({
      id : this.teamId}));
  }


  ngAfterViewInit(): void {

    this.store.select('partido').subscribe((partido) => {
      this.partidos = partido.partidosList
    });

    this.store.select('auth').subscribe((auth) => {
      this.isTeamStaff = auth.credentials.staffTeamIdist.includes(this.teamId);
      auth.credentials.staffTeamIdist
    });

  }

  goBack() {
    if(this.teamId >0){
      this.router.navigate(['/teams/plantilla', this.origen]);
    }else{
      //this.router.navigate(['/matches', this.equipo.id]);
    }

  }

  async presentPopover(event: Event) {
    const popover = await this.popoverController.create({
      component: PartidosAdminComponent, // Componente del contenido
      componentProps: {
        origen: this.origen,
        teamId: this.teamId,
        selectedPartido : this.selectedPartido
      },
      event, // Usa el evento para posicionar el popover
      translucent: true,
    });

    await popover.present();
  }

  navegarAWaze(ubicacion: string) {
    // Aquí obtendremos latitud y longitud de la ubicación para usarla en Waze
    const ubicacionRecuperada = JSON.parse(ubicacion);
    //const [lat, lng] = ubicacion.split(',').map(coord => parseFloat(coord));
    const wazeUrl = `waze://?ll=${ubicacionRecuperada.lat},${ubicacionRecuperada.lng}&navigate=yes`;
    window.open(wazeUrl, '_blank');
  }

  navegarAGoogleMaps(ubicacion: string) {
    // Aquí obtendremos latitud y longitud de la ubicación para usarla en Waze
    const ubicacionRecuperada = JSON.parse(ubicacion);
    //const [lat, lng] = ubicacion.split(',').map(coord => parseFloat(coord));
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${ubicacionRecuperada.lat},${ubicacionRecuperada.lng}`;
    window.open(mapsUrl, '_blank');
  }

  selectCard(partido: any): void {
    this.selectedPartido = this.selectedPartido === partido ? null : partido;
  }


}
