import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {LayoutInitService, LayoutService} from "./core";
import {ActivatedRoute, NavigationCancel, NavigationEnd, Router} from "@angular/router";
import {filter, map, switchMap} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent implements OnInit, AfterViewInit {
  @ViewChild('ktHeader', { static: true }) ktHeader: ElementRef;

  headerCSSClasses: string | undefined;
  toolbarDisplay = false;
  contentContainerClasses = '';
  headerHTMLAttributes: any = {};
  displayHeader: boolean = true;

  constructor(
    private initService: LayoutInitService,
    private layout: LayoutService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.initService.init();

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => route.firstChild),
      switchMap(route => route ? route.data : of({})),
    ).subscribe((data: any) => {
      if (data && data['header']) {
        this.layout.updateHeader(data['header'])
      } else {
        this.layout.showHeader()
      }
    })
  }

  ngOnInit(): void {
    // build view by layout config settings
    // this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.toolbarDisplay = this.layout.getProp('toolbar.display') as boolean;
    this.contentContainerClasses = this.layout.getStringCSSClasses('contentContainer');
    // this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
    this.headerCSSClasses = this.layout.getStringCSSClasses('header');
    this.headerHTMLAttributes = this.layout.getHTMLAttributes('headerMenu');

    this.layout.layoutConfigSubject.subscribe(value => {
      if (value) {
        this.displayHeader = value.header.display;
        this.cdr.detectChanges();
      }
    })
  }

  ngAfterViewInit(): void {
    if (this.ktHeader) {
      for (const key in this.headerHTMLAttributes) {
        if (this.headerHTMLAttributes.hasOwnProperty(key)) {
          this.ktHeader.nativeElement.attributes[key] =
            this.headerHTMLAttributes[key];
        }
      }
    }
  }
}
