import { Directive, ElementRef, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";

@Directive({
  selector: `[disable]`,
  standalone: true,
})
export class DisableDirective implements OnChanges {
  @Input()
  disable = false;
  elementTypes = ["input", "select", "button", "span"];
  constructor(private _el: ElementRef) { }
  ngOnChanges(changes: SimpleChanges): void {
    const elements = this.getElements();
    this.doReadOnly(elements);
  }
  getElements() {
    const elements =    this._el.nativeElement.querySelectorAll(this.elementTypes.join(","));
    return elements;
  }
  doReadOnly(elements: any) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].disabled = this.disable;
    }
  }
}
