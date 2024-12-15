// modal-control.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModalControlService {
  private closeModalSubject = new Subject<void>();

  // Observable para que los componentes se suscriban
  closeModal$ = this.closeModalSubject.asObservable();

  // Método para cerrar el modal
  closeModal() {
    this.closeModalSubject.next(); // Emite el evento para cerrar el modal
  }
}
