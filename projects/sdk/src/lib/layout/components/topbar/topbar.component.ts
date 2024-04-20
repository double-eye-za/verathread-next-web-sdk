import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {InlineSVGModule} from "ng-inline-svg-2";
import {NgClass, NgIf} from "@angular/common";
import {NotificationsInnerComponent} from "../../../partials/notifications-inner/notifications-inner.component";
import {GravatarModule} from 'ngx-gravatar';
import { UntilDestroy } from '@ngneat/until-destroy';
import {UserInnerComponent} from "../../../partials/user-inner/user-inner.component";
import {ThemeModeSwitcherComponent} from "../../partials/theme-mode-switcher/theme-mode-switcher.component";
import {LayoutService} from "../../core";
import {RouterOutlet} from "@angular/router";

@UntilDestroy()
@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  imports: [
    InlineSVGModule,
    NgClass,
    NgIf,
    NotificationsInnerComponent,
    ThemeModeSwitcherComponent,
    GravatarModule,
    UserInnerComponent,
    RouterOutlet
  ],
  standalone: true,
  host: {id: 'header-topbar'}
})
export class TopbarComponent implements OnInit {
  toolbarButtonMarginClass = 'ms-1 ms-lg-3';
  toolbarButtonHeightClass = 'w-30px h-30px w-md-40px h-md-40px';
  toolbarUserAvatarHeightClass = 'symbol-30px symbol-md-40px';
  toolbarButtonIconSizeClass = 'svg-icon-1';
  headerLeft: string = 'menu';
  userEmail: string = 'default';
  userSlotFilled: boolean;

  constructor(private layout: LayoutService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.headerLeft = this.layout.getProp('header.left') as string;
  }

  onUserOutletFilled() {
    setTimeout(() => {
      this.userSlotFilled = true
      this.cdr.detectChanges();
    })
  }
}
