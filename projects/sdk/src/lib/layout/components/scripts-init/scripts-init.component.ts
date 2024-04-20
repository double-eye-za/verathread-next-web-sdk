import { Component, OnDestroy, OnInit } from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import {filter, take, takeUntil, takeWhile} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import {LayoutService, LayoutType, PageInfoService} from "../../core";
import {
  DrawerComponent,
  MenuComponent, ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent
} from "../../../kt/components";

@Component({
  selector: 'app-scripts-init',
  templateUrl: './scripts-init.component.html',
  standalone: true
})
export class ScriptsInitComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  private layoutConfig$: Observable<LayoutType> | undefined;

  constructor(
    private layout: LayoutService,
    private pageInfo: PageInfoService,
    private router: Router
  ) {
    const initPageInfo = () => {
      setTimeout(() => {
        this.pluginsReInitialization();
        this.pageInfo.calculateTitle();
        this.pageInfo.calculateBreadcrumbs();
      }, 10);
    };

    initPageInfo();
    // subscribe to router events
    this.router.events
      .pipe(filter((event) => event instanceof ResolveEnd))
      .subscribe(initPageInfo);
  }

  ngOnInit(): void {
    this.layoutConfig$ = this.layout.layoutConfigSubject.asObservable();
    const layoutUpdateSubscription = this.layoutConfig$.subscribe(() => {
      if (!this.layout.scriptsInitialized) {
        this.layout.scriptsInitialized = true;
        this.pluginsInitialization();
      } else {
        this.pluginsReInitialization();
      }
    });
    this.unsubscribe.push(layoutUpdateSubscription);
  }

  pluginsInitialization() {
    setTimeout(() => {
      ToggleComponent.bootstrap();
      ScrollTopComponent.bootstrap();
      DrawerComponent.bootstrap();
      StickyComponent.bootstrap();
      MenuComponent.bootstrap();
      ScrollComponent.bootstrap();
    }, 200);
  }

  pluginsReInitialization() {
    setTimeout(() => {
      ToggleComponent.reinitialization();
      ScrollTopComponent.reinitialization();
      DrawerComponent.reinitialization();
      StickyComponent.reInitialization();
      MenuComponent.reinitialization();
      ScrollComponent.reinitialization();
    }, 200);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
