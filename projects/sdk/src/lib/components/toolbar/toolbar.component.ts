import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgClass} from "@angular/common";
import {PageTitleComponent} from "../header";
import {LayoutService} from "../../layout/core";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  imports: [
    InlineSVGModule,
    PageTitleComponent,
    NgClass
  ],
  standalone: true,
  host: {
    id: 'toolbar',
    class: 'toolbar py-5 py-lg-5',
  }
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('ktPageTitle', { static: true }) ktPageTitle: ElementRef | undefined;
  pageTitleAttributes: {
    [attrName: string]: string | boolean;
  } | undefined;
  toolbarContainerCssClasses: string = 'toolbar-container';
  pageTitleCssClasses: string = '';

  constructor(private layout: LayoutService) {}

  ngOnInit(): void {
    this.toolbarContainerCssClasses = this.layout.getStringCSSClasses('toolbarContainer');
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');
  }

  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (
          this.pageTitleAttributes.hasOwnProperty(key) &&
          this.ktPageTitle.nativeElement
        ) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }
}
