import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {LayoutService, PAGE_INFO_TOKEN, PageInfoService, PageLink} from "../../../layout/core";

@Component({
  selector: 'app-page-title',
  templateUrl: './page-title.component.html',
  imports: [
    NgIf,
    AsyncPipe,
    NgForOf,
    NgClass,
    RouterLink
  ],
  standalone: true,
  host: {id: 'page-title'}
})
export class PageTitleComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  showTitle: boolean = true;
  showBC: boolean = true;
  title$: Observable<string> | undefined;
  description$: Observable<string> | undefined;
  bc$: Observable<Array<PageLink>> | undefined;
  pageTitleCssClass: string = '';
  pageTitleDirection: string = 'row';

  constructor(
    @Inject(PAGE_INFO_TOKEN) private pageInfo: PageInfoService,
    private layout: LayoutService
  ) {
  }

  ngOnInit(): void {
    this.title$ = this.pageInfo.title.asObservable();
    this.description$ = this.pageInfo.description.asObservable();
    this.bc$ = this.pageInfo.breadcrumbs.asObservable();
    this.showTitle = this.layout.getProp('pageTitle.display') as boolean;
    this.showBC = this.layout.getProp('pageTitle.breadCrumbs') as boolean;
    this.pageTitleCssClass = this.layout.getStringCSSClasses('pageTitle');
    this.pageTitleDirection = this.layout.getProp(
      'pageTitle.direction'
    ) as string;
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
