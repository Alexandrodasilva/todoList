import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector: '[fontWeightResizer]',
  standalone: true
})

export class fontWeightResizerDirective implements OnChanges {

  @Input('fontWeightResizer') public fontWeight!: string;
  public defaultFontWeight = 'normal';

  constructor(private el: ElementRef) {
    el.nativeElement.style.customProperty = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.el.nativeElement.style.fontWeight = this.fontWeight || this.defaultFontWeight
  }

}
