import { AfterViewInit, Directive, ElementRef, Input, Renderer2 } from "@angular/core";

@Directive({
  selector: '[appPaginatorId]'
})
export class PaginatorIdDirective implements AfterViewInit {
  @Input('appPaginatorId') id: string;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngAfterViewInit() {
    const buttons = this.el.nativeElement.querySelectorAll('button');
    buttons.forEach((button: HTMLElement, index: number) => {
      this.renderer.setAttribute(button, 'id', `${this.id}-${index}`);
    });
  }
}
