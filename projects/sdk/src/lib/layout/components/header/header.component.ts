import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild,} from '@angular/core';
import {NavigationCancel, NavigationEnd, Router, RouterLink} from '@angular/router';
import {Subscription} from 'rxjs';
import {InlineSVGModule} from "ng-inline-svg-2";
import {HeaderMenuComponent} from "./header-menu/header-menu.component";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {TopbarComponent} from "../topbar/topbar.component";
import {MenuComponent} from "../../../kt/components";
import {LayoutService} from "../../core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    InlineSVGModule,
    HeaderMenuComponent,
    NgIf,
    TopbarComponent,
    RouterLink,
    NgOptimizedImage,
    NgClass,
  ],
  standalone: true,
  host: { id: 'layout-header' }
})
export class HeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  headerContainerCssClasses: string = '';
  asideDisplay: boolean = true;
  headerLeft: string = 'menu';
  pageTitleCssClasses: string = '';
  pageTitleAttributes: { [attrName: string]: string | boolean; } | undefined;
  headerDisplay: boolean;

  @ViewChild('ktPageTitle', {static: true}) ktPageTitle: ElementRef | undefined;

  private unsubscribe: Subscription[] = [];

  constructor(private layout: LayoutService, private router: Router) {
    this.routingChanges();
  }

  ngOnInit(): void {
    this.headerContainerCssClasses = this.layout.getStringCSSClasses('headerContainer');
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.headerLeft = this.layout.getProp('header.left') as string;
    this.pageTitleCssClasses = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleAttributes = this.layout.getHTMLAttributes('pageTitle');

    this.layout.layoutConfigSubject.subscribe(value => {
      if (value) {
        this.headerDisplay = value.header.display
      }
    })
  }

  ngAfterViewInit() {
    if (this.ktPageTitle) {
      for (const key in this.pageTitleAttributes) {
        if (this.pageTitleAttributes.hasOwnProperty(key)) {
          this.ktPageTitle.nativeElement.attributes[key] =
            this.pageTitleAttributes[key];
        }
      }
    }
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        MenuComponent.reinitialization();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
