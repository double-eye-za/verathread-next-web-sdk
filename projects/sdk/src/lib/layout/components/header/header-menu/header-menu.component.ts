import {Component, Inject, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {InlineSVGModule} from "ng-inline-svg-2";
import {NAVIGATION_SERVICE_TOKEN, NavigationService} from "../../../core/navigation.service";

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
    NgIf
  ],
  standalone: true,
  host: {id: 'layout-header-menu'}
})
export class HeaderMenuComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(NAVIGATION_SERVICE_TOKEN) public navigation: NavigationService
  ) {
  }

  ngOnInit(): void {
  }

  calculateMenuItemCssClass(url: string, root: string): string {
    return checkIsActive(this.router.url, url, root) ? 'active' : '';
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
