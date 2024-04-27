import {ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NAVIGATION_SERVICE_TOKEN, NavigationItem, NavigationService} from "../../../core/navigation.service";
import {DisableDirective} from "../../../../directives/disable.directive";
import {NgbTooltip} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-header-menu',
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss'],
  imports: [
    RouterLinkActive,
    RouterLink,
    NgClass,
    InlineSVGModule,
    NgForOf,
    NgIf,
    DisableDirective,
    NgbTooltip
  ],
  standalone: true,
  host: {id: 'layout-header-menu'}
})
export class HeaderMenuComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(NAVIGATION_SERVICE_TOKEN) public navigation: NavigationService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.navigation.navigationDataChanged.subscribe(() => {
      this.cdr.detectChanges()
    })
  }

  calculateMenuItemCssClass(url: string, root: string): string {
    return checkIsActive(this.router.url, url, root) ? 'active' : '';
  }

  preventIfRequired($event: MouseEvent, nav: NavigationItem) {
    if (!nav.healthy) {
      $event.preventDefault();
    }
  }
}

const getCurrentUrl = (pathname: string): string => {
  return pathname.split(/[?#]/)[0];
};

const checkIsActive = (pathname: string, url: string, root: string) => {
  const current = getCurrentUrl(pathname);
  if (!current || !url) {
    return false;
  }

  if (current === url) {
    return true;
  }

  if (current.indexOf(root) == 1 && current.indexOf(url) > -1) {
    return true;
  }

  return false;
};
