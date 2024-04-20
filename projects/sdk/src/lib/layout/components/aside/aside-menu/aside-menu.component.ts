import { Component, OnInit } from '@angular/core';
import {InlineSVGModule} from "ng-inline-svg-2";
import {RouterLink, RouterLinkActive} from "@angular/router";

@Component({
  selector: 'app-aside-menu',
  templateUrl: './aside-menu.component.html',
  styleUrls: ['./aside-menu.component.scss'],
  imports: [
    InlineSVGModule,
    RouterLink,
    RouterLinkActive
  ],
  standalone: true,
  host: { id: 'layout-aside-menu' }
})
export class AsideMenuComponent implements OnInit {
  appAngularVersion: string = '1.0.0';
  appPreviewChangelogUrl: string = '';

  constructor() {}

  ngOnInit(): void {}
}
