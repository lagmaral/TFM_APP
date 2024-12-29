import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducers';


@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent  implements OnInit {

  isLoading: boolean = false;
  partidoLoading:  boolean = false;
  authLoading:  boolean = false;
  teamLoading:  boolean = false;
  adminLoading:  boolean = false;

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {}

  ngAfterViewInit(): void {
    //this.isLoading$ = this.store.pipe(select(selectGlobalLoading));
    /*this.isLoading$.subscribe((isLoading) => {
      console.log('Estado de isLoading:', isLoading);
    });*/

    this.store.select('partido').subscribe((partido) => {
      this.partidoLoading = partido.loading;
      this.changeState();
    });
    this.store.select('auth').subscribe((auth) => {
      this.authLoading = auth.loading;
      this.changeState();
    });
    this.store.select('team').subscribe((team) => {
      this.teamLoading = team.loading;
      this.changeState();
    });
    this.store.select('admin').subscribe((admin) => {
      this.adminLoading = admin.loading;
      this.changeState();
    });

  }

  changeState(){
    if(this.partidoLoading
      || this.partidoLoading
      || this.partidoLoading
      || this.partidoLoading
    ){
      this.isLoading = true;

    }else
      this.isLoading = false;
  }
}
