import {Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges, OnDestroy} from "@angular/core";

@Directive({
  selector: `[data-bs-toggle="tooltip"]`,
  standalone: true,
})
export class TooltipFixDirective implements OnDestroy {
  @Input()
  disable = false;
  elementTypes = ["input", "select", "button", "span"];
  constructor(private _el: ElementRef) { }

  ngOnDestroy(): void {
    console.log('destroy tooltip')
  }
}
