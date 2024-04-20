import {Component, ModuleWithProviders, NgModule} from '@angular/core';
import {LayoutComponent} from "./layout.component";
import {HeaderMenuComponent} from "./components/header/header-menu/header-menu.component";
import {HeaderComponent} from "./components/header/header.component";
import {ContentComponent} from "./components/content/content.component";
import {AsideComponent} from "./components/aside/aside.component";
import {ScriptsInitComponent} from "./components/scripts-init/scripts-init.component";
import {LayoutInitService, LayoutService, PAGE_INFO_TOKEN, PageInfoService} from "./core";
import {CommonModule} from "@angular/common";
import {RouterOutlet} from "@angular/router";
import {NAVIGATION_SERVICE_TOKEN, NavigationService} from "./core/navigation.service";

@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    HeaderMenuComponent,
    HeaderComponent,
    ContentComponent,
    AsideComponent,
    ScriptsInitComponent,
    RouterOutlet,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule {
  static forRoot(): ModuleWithProviders<LayoutModule> {
    return {
      ngModule: LayoutModule,
      providers: [
        LayoutService,
        LayoutInitService,
        {provide: PAGE_INFO_TOKEN, useClass: PageInfoService},
        {provide: NAVIGATION_SERVICE_TOKEN, useClass: NavigationService}
      ]
    }
  }
}
