import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastSpinnerService {
  private loadingSubject = new BehaviorSubject<boolean>(false); // Para controlar el estado del spinner
  loading$ = this.loadingSubject.asObservable(); // Observable para que los componentes puedan suscribirse

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {}

  // Mostrar Toast con color y mensaje personalizado
  async showToast(
    message: string,
    duration: number = 3000,
    type: 'success' | 'danger' = 'success' // Podemos pasar 'success' o 'danger' como tipo
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      color: type, // 'success' para verde, 'danger' para rojo
      position: 'bottom',
      cssClass: 'toast-custom',
    });

    await toast.present();
  }

  showSpinner() {
    this.loadingSubject.next(true); // Activamos el spinner
  }

  hideSpinner() {
    this.loadingSubject.next(false); // Desactivamos el spinner
  }
}
