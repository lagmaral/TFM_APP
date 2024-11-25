import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { selectCurrentLanguage } from '../../selectors/auth.selector';
import { ModalControlService } from '../../services/modal.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent implements OnInit {

  isSignup = false; // Alternar entre login y signup
  constructor(private modalController: ModalController,
    private modalControlService: ModalControlService,
    private store: Store,
    private translate: TranslateService
  ) {
    this.translate.setDefaultLang('es');
  }

  ngOnInit(): void {
    this.store.select(selectCurrentLanguage).subscribe((language) => {
      this.translate.use(language);
    });

    this.modalControlService.closeModal$.subscribe(() => {
      this.closeModal(); // Método que cierra el modal
    });
  }

  getModalTitle(): string {
    return this.isSignup ? 'REGISTER.TITLE' : 'LOGIN.TITLE';
  }

  switchToSignup() {
    this.isSignup = true;
  }

  switchToLogin() {
    this.isSignup = false;
  }

  closeModal() {
    this.modalController.dismiss();
  }

}
