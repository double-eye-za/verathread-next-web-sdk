import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { ResolveEnd, Router } from '@angular/router';
import {filter} from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';

import {LayoutService, LayoutType, PageInfoService} from "../../core";
import {
  DrawerComponent,
  MenuComponent, ScrollComponent,
  ScrollTopComponent,
  StickyComponent,
  ToggleComponent
} from "../../../kt/components";

import {Tooltip} from 'bootstrap';

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

  /**
   * A fix for bootstrap not removing tooltips when you use a tooltip on a link that navigates away
   * @param event
   */
  @HostListener('window:click')
  onClickAnywhereClearTooltips(event: number) {
    const tooltips: any = document.querySelectorAll('.bs-tooltip-auto');
    for (const item of tooltips) {
      item.remove();
    }
  }

  pluginsInitialization() {
    setTimeout(() => {
      new Tooltip("body", {
        selector: '[data-bs-toggle="tooltip"]',
        trigger: 'hover',
        html: true,
      })

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
