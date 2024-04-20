import {Component, HostBinding, Inject, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import {AsyncPipe, NgClass, NgForOf, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {GravatarModule} from "ngx-gravatar";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {UntilDestroy} from "@ngneat/until-destroy";
import {TranslationModule, TranslationService} from "../../modules";

@UntilDestroy()
@Component({
  selector: 'app-user-inner',
  templateUrl: './user-inner.component.html',
  imports: [
    NgForOf,
    NgClass,
    NgIf,
    AsyncPipe,
    RouterLink,
    NgbTooltipModule,
    TranslationModule,
    GravatarModule
  ],
  standalone: true
})
export class UserInnerComponent implements OnInit, OnDestroy {
  @HostBinding('class')
  class = `menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg menu-state-primary fw-bold py-4 fs-6 w-275px`;
  @HostBinding('attr.data-kt-menu') dataKtMenu = 'true';

  language: LanguageFlag;
  user$: Observable<any>;
  langs = languages;
  userEmail: string;

  private unsubscribe: Subscription[] = [];

  constructor(
    // private auth: AuthService,
    private translationService: TranslationService
  ) {
    // auth.currentUser$.pipe(takeUntilDestroyed()).subscribe(u => {
    //   if (u) {
    //     this.userEmail = u.email;
    //   }
    // })
  }

  ngOnInit(): void {
    // this.user$ = this.auth.currentUserSubject.asObservable();
    this.setLanguage(this.translationService.getSelectedLanguage());
  }

  logout() {
    // this.auth.logout();
    document.location.reload();
  }

  selectLanguage(lang: string) {
    this.translationService.setLanguage(lang);
    this.setLanguage(lang);
    // document.location.reload();
  }

  setLanguage(lang: string) {
    this.langs.forEach((language: LanguageFlag) => {
      if (language.lang === lang) {
        language.active = true;
        this.language = language;
      } else {
        language.active = false;
      }
    });
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}

interface LanguageFlag {
  lang: string;
  name: string;
  flag: string;
  active?: boolean;
}

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: './assets/media/flags/united-kingdom.svg',
  },
];
