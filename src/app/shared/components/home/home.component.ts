import { Component, OnInit } from '@angular/core';
import * as AuthAction from '../../../auth/actions/auth.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(private store: Store,) {

   }

   ngOnInit(): void {
    const token = localStorage.getItem('p-token');
    if(token){
      this.store.dispatch(AuthAction.getUserByToken({ userId: token }));
    }
    const language = localStorage.getItem('p-prefer-language');
    if(language){
      this.store.dispatch(AuthAction.changeAppLanguage({ locale: language }));
    }

  }

}
