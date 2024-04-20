import {Component, OnDestroy, OnInit,} from '@angular/core';
import {NavigationCancel, NavigationEnd, Router, RouterOutlet} from '@angular/router';
import {Subscription} from 'rxjs/internal/Subscription';
import {NgClass, NgIf} from "@angular/common";
import {AsideComponent} from "../aside/aside.component";
import {LayoutService} from "../../core";

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  imports: [
    RouterOutlet,
    NgClass,
    AsideComponent,
    NgIf
  ],
  standalone: true
})
export class ContentComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];

  asideCSSClasses: string | undefined;
  asideDisplay: boolean | undefined;

  constructor(private router: Router,
              private layout: LayoutService,
  ) {
  }

  ngOnInit(): void {
    this.routingChanges();
    this.asideDisplay = this.layout.getProp('aside.display') as boolean;
    this.asideCSSClasses = this.layout.getStringCSSClasses('aside');
  }

  routingChanges() {
    const routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd || event instanceof NavigationCancel) {
        // DrawerComponent.hideAll();
      }
    });
    this.unsubscribe.push(routerSubscription);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
