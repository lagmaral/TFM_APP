import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeService implements OnDestroy {
  private isLargeScreenSubject = new BehaviorSubject<boolean>(window.innerWidth >= 1024);
  isLargeScreen$ = this.isLargeScreenSubject.asObservable();

  private resizeListener = () => {
    this.isLargeScreenSubject.next(window.innerWidth >= 1024);
  };

  constructor() {
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy(): void {
    window.removeEventListener('resize', this.resizeListener);
  }
}
