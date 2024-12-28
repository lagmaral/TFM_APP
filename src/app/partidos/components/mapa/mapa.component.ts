import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as L from 'leaflet';
@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.scss'],
})
export class MapaModalComponent  implements OnInit {

  private map: L.Map;
  private marker: L.Marker;
  public ubicacionSeleccionada: { lat: number; lng: number; nombre:string };
  public busqueda: string;
  public customIcon = L.icon({
    iconUrl: 'assets/icon/balon.png', // Ruta a tu imagen personalizada
    iconSize: [40, 40], // Tamaño del ícono (ancho, alto)
    iconAnchor: [20, 40], // Punto del ícono que corresponde a la ubicación del marcador (centro inferior)
    popupAnchor: [0, -40] // Punto desde el cual se abrirá el popup en relación con el iconAnchor
  });

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.inicializarMapa();
  }

  ionViewDidEnter() {
    // Forzar la actualización del tamaño del mapa cuando el modal está completamente visible
    if (this.map) {
      this.map.invalidateSize();
    }
  }

  inicializarMapa() {
    // Coordenadas aproximadas de Vizcaya
    const vizcayaLat = 43.2630;
    const vizcayaLng = -2.9340;

    this.map = L.map('map').setView([vizcayaLat, vizcayaLng], 10);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      if (this.marker) {
        this.map.removeLayer(this.marker);
      }
      this.marker = L.marker(e.latlng, { icon: this.customIcon }).addTo(this.map);
      this.ubicacionSeleccionada = { lat: e.latlng.lat, lng: e.latlng.lng, nombre: '' };
    });
  }

  async buscarUbicacion() {
    if (this.busqueda) {
      //const url = `/api/search?format=json&q=${encodeURIComponent(this.busqueda)}`;
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.busqueda)}`;
      const response = await fetch(url);

      if (!response.ok) {
        console.error('Error al buscar la ubicación:', response.statusText);
        return;
      }

      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon, display_name  } = data[0];
        this.map.setView([lat, lon], 15); // Cambia el zoom al hacer clic en un resultado
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }
        this.marker = L.marker([lat, lon], { icon: this.customIcon }).addTo(this.map);
        this.ubicacionSeleccionada = { lat, lng: lon, nombre: display_name};
      } else {
        console.log('No se encontraron resultados para la búsqueda:', this.busqueda);
      }
    }
  }


  confirmarUbicacion() {
    this.modalController.dismiss(this.ubicacionSeleccionada);
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

}
