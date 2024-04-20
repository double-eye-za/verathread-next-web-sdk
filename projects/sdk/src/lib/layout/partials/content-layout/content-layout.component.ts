import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AsyncPipe, NgClass, NgIf} from "@angular/common";
import {ContentComponent} from "../../components/content/content.component";
import {LayoutService} from "../../core";

@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  imports: [
    NgClass,
    AsyncPipe,
    NgIf,
    ContentComponent
  ],
  standalone: true,
  styles: [`
    .no-gutter {
      .container, .container-xxl, .container-fluid, .container-sm, .container-md, .container-lg, .container-xl {
        padding: 0 !important;
        --bs-gutter-x: 0 !important;
      }
    }

    .content-with-toolbar {
      /*padding-top: 160px;*/
    }
  `]
})
export class ContentLayoutComponent implements OnInit, AfterViewInit {
  @Input()
  gutter = true;

  @ViewChild('toolbarProjection', {static: true}) toolbarProjection: ElementRef

  contentContainerClasses = '';

  constructor(
    private layout: LayoutService
  ) {
  }

  ngOnInit(): void {
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
  }

  ngAfterViewInit(): void {
    if (this.hasContentProjection()) {
      this.layout.toolbarEnabled()
    } else {
      this.layout.toolbarDisabled()
    }
  }

  hasContentProjection() {
    if (!this.toolbarProjection) {
      return false;
    }

    const detailContentProjection: NodeList = (this.toolbarProjection.nativeElement as HTMLElement).childNodes

    if (detailContentProjection) {
      for (let x = 0; x < detailContentProjection.length; x++) {
        if (detailContentProjection && detailContentProjection.item(x)) {
          // @ts-ignore
          if (detailContentProjection.item(x).nodeType !== 8) {
            return true // nodeType == 8 means is a comment
          }
        }
      }
    }

    return false
  }
}
