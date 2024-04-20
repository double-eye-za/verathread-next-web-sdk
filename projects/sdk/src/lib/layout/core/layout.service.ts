import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as objectPath from 'object-path';
import {
  ILayout,
  DefaultLayoutConfig,
  ILayoutCSSVariables, IHeader,
} from './default-layout.config';

const LAYOUT_CONFIG_LOCAL_STORAGE_KEY = `layoutConfig`;

export type LayoutType = ILayout | undefined;

export const getEmptyCSSVariables = (): ILayoutCSSVariables => {
  return {
    body: new Map(),
  };
};

export function getEmptyHTMLAttributes(): {
  [key: string]: {
    [attrName: string]: string | boolean;
  };
} {
  return {
    asideMenu: {},
    headerMobile: {},
    headerMenu: {},
    headerContainer: {},
    pageTitle: {},
  };
}

export function getEmptyCssClasses(): {
  [key: string]: string[];
} {
  return {
    header: [],
    headerContainer: [],
    headerMobile: [],
    headerMenu: [],
    aside: [],
    asideMenu: [],
    asideToggle: [],
    toolbar: [],
    toolbarContainer: [],
    content: [],
    contentContainer: [],
    footerContainer: [],
    sidebar: [],
    pageTitle: [],
  };
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  public layoutConfigSubject: BehaviorSubject<LayoutType> = new BehaviorSubject<LayoutType>(undefined);
  public scriptsInitialized: boolean;

  // scope list of css classes
  private classes: {
    [key: string]: string[];
  } = getEmptyCssClasses();

  // scope list of html attributes
  private attrs: {
    [key: string]: {
      [attrName: string]: string | boolean;
    };
  } = getEmptyHTMLAttributes();

  // scope list of body css variables
  private cssVariables: ILayoutCSSVariables | undefined;

  constructor() {}

  initConfig(): void {
    const configFromLocalStorage = localStorage.getItem(
      LAYOUT_CONFIG_LOCAL_STORAGE_KEY
    );
    if (configFromLocalStorage) {
      try {
        this.layoutConfigSubject.next(JSON.parse(configFromLocalStorage));
        return;
      } catch (error) {
        this.removeConfig();
        console.error('config parse from local storage', error);
      }
    }
    this.layoutConfigSubject.next(DefaultLayoutConfig);

    // init base layout
    this.initLayout();
    this.initHeader();
    this.initPageTitle();
    this.initToolbar();
    this.initContent();
    this.initAside();
    this.initFooter();
  }

  private removeConfig(): void {
    localStorage.removeItem(LAYOUT_CONFIG_LOCAL_STORAGE_KEY);
  }

  refreshConfigToDefault(): void {
    this.setConfigWithPageRefresh(undefined);
  }

  getConfig(): ILayout {
    const config = this.layoutConfigSubject.value;
    if (!config) {
      return DefaultLayoutConfig;
    }

    return config;
  }

  setConfig(config: LayoutType) {
    if (!config) {
      this.removeConfig();
    } else {
      localStorage.setItem(
        LAYOUT_CONFIG_LOCAL_STORAGE_KEY,
        JSON.stringify(config)
      );
    }
    this.layoutConfigSubject.next(config);
  }

  updateConfig(fieldsToUpdate: Partial<ILayout>) {
    const config = this.layoutConfigSubject.value;
    if (!config) {
      return;
    }

    const updatedConfig = { ...config, ...fieldsToUpdate };
    this.classes = getEmptyCssClasses();
    this.cssVariables = getEmptyCSSVariables();
    this.attrs = Object.assign({}, getEmptyHTMLAttributes());
    this.layoutConfigSubject.next(updatedConfig);

    // init base layout
    this.initLayout();
    this.initHeader();
    this.initPageTitle();
    this.initToolbar();
    this.initContent();
    this.initAside();
    this.initFooter();
  }

  hideHeader() {
    const config = Object.assign({}, this.layoutConfigSubject.value);
    if (!config) {
      return;
    }

    config.header.display = false;
    document.body.classList.add('app-blank');
    this.layoutConfigSubject.next(config);
  }

  showHeader() {
    const config = Object.assign({}, this.layoutConfigSubject.value);
    if (!config) {
      return;
    }

    if (config.header.display) {
      return;
    }

    config.header.display = true;
    document.body.classList.remove('app-blank');
    this.layoutConfigSubject.next(config);
  }

  updateHeader(datum: any) {
    const config = Object.assign({}, this.layoutConfigSubject.value);
    if (!config) {
      return;
    }

    Object.assign(config.header, datum)
    this.initHeader()
    this.layoutConfigSubject.next(config);
  }

  toolbarEnabled() {
    const config = this.layoutConfigSubject.value;
    if (!config) {
      return;
    }
    config.toolbar.display = true;
    this.initToolbar();
  }

  toolbarDisabled() {
    const config = this.layoutConfigSubject.value;
    if (!config) {
      return;
    }
    config.toolbar.display = false;
    this.initToolbar();
  }

  setConfigWithoutLocalStorageChanges(config: LayoutType) {
    this.layoutConfigSubject.next(config);
  }

  setConfigWithPageRefresh(config: LayoutType) {
    this.setConfig(config);
    document.location.reload();
  }

  /**************************************************************************/
  // HELPERS
  /**************************************************************************/

  getProp(path: string): string | boolean | undefined | Object {
    const layoutConfig = this.layoutConfigSubject.value;
    if (!layoutConfig) {
      return;
    }

    return objectPath.get(layoutConfig, path);
  }

  setCSSClass(path: string, classesInStr: string) {
    const cssClasses = this.classes[path];
    if (!cssClasses) {
      this.classes[path] = [];
    }
    classesInStr
      .split(' ')
      .forEach((cssClass: string) => this.classes[path].push(cssClass));
  }

  getCSSClasses(path: string): string[] {
    const cssClasses = this.classes[path];
    if (!cssClasses) {
      return [];
    }

    return cssClasses;
  }

  getStringCSSClasses(path: string) {
    return this.getCSSClasses(path).join(' ');
  }

  getHTMLAttributes(path: string): { [attrName: string]: string | boolean; } {
    const attributesObj = this.attrs[path];
    if (!attributesObj) {
      return {};
    }
    return attributesObj;
  }

  setHTMLAttribute(path: string, attrKey: string, attrValue: string | boolean) {
    const attributesObj = this.attrs[path];
    if (!attributesObj) {
      this.attrs[path] = {};
    }
    this.attrs[path][attrKey] = attrValue;
  }

  /**************************************************************************/
  // INIT
  /**************************************************************************/

  private initLayout() {
    document.body.setAttribute('id', 'kt_body');

    const selfBodyClass = (
      this.getProp('main.body.class') || ''
    ).toString();
    if (selfBodyClass) {
      const bodyClasses: string[] = selfBodyClass.split(' ');
      bodyClasses.forEach((cssClass) => document.body.classList.add(cssClass));
    }
  }

  private initHeader() {
    this.setCSSClass(
      'headerContainer',
      this.getProp('header.width') === 'fluid'
        ? 'container-fluid'
        : 'container-xxl'
    );

    const fixedDesktop = this.getProp('header.fixed.desktop') as boolean;
    if (fixedDesktop) {
      document.body.classList.add('header-fixed');
    }

    const tabletAndMobile = this.getProp('header.fixed.tabletAndMobile') as boolean;
    if (tabletAndMobile) {
      document.body.classList.add('header-tablet-and-mobile-fixed');
    }

    if (!this.getProp('header.display')) {
      document.body.classList.add('app-blank');
    } else {
      document.body.classList.remove('app-blank');
    }
  }

  private initPageTitle() {
    const display = this.getProp('pageTitle.display') as boolean;
    if (!display) {
      return;
    }

    const direction = this.getProp('pageTitle.direction') as string;
    if (direction === 'column') {
      this.setCSSClass('pageTitle', 'flex-column');
      this.setCSSClass('pageTitle', 'align-items-start');
    } else {
      this.setCSSClass('pageTitle', 'align-items-center');
      this.setCSSClass('pageTitle', 'flex-wrap');
    }
    this.setCSSClass('pageTitle', 'me-3');

    const responsive = this.getProp('pageTitle.responsive') as boolean;

    if (responsive) {
      this.setCSSClass('pageTitle', 'mb-5');
      this.setCSSClass('pageTitle', 'mb-lg-0');
      this.setHTMLAttribute('pageTitle', 'data-kt-swapper', true);
      this.setHTMLAttribute(
        'pageTitle',
        'data-kt-swapper-mode',
        'prepend'
      );

      const responsiveBreakpoint = this.getProp(
        'pageTitle.responsiveBreakpoint'
      ) as string;
      const responsiveTarget = this.getProp(
        'pageTitle.responsiveTarget'
      ) as string;
      this.setHTMLAttribute(
        'pageTitle',
        'data-kt-swapper-parent',
        `{ default: '#kt_content_container', '${responsiveBreakpoint}': '${responsiveTarget}'}`
      );
    }
  }

  private initToolbar() {
    const display = this.getProp('toolbar.display') as boolean;
    if (!display) {
      document.body.classList.remove(
        'toolbar-enabled',
        'toolbar-tablet-and-mobile-fixed',
        'toolbar-fixed'
      );
      return;
    }

    document.body.classList.add('toolbar-enabled');
    const widthClass = this.getProp('toolbar.width') as string;
    this.setCSSClass(
      'toolbarContainer',
      widthClass === 'fluid' ? 'container-fluid' : 'container-xxl'
    );

    const fixedDesktop = this.getProp(
      'toolbar.fixed.desktop'
    ) as boolean;
    if (fixedDesktop) {
      document.body.classList.add('toolbar-fixed');
    }

    const fixedTabletAndMobileMode = this.getProp(
      'toolbar.fixed.tabletAndMobileMode'
    ) as boolean;
    if (fixedTabletAndMobileMode) {
      document.body.classList.add('toolbar-tablet-and-mobile-fixed');
    }

    // Height setup
    const type = this.getProp('toolbar.layout') as string;
    if (type === 'toolbar1') {
      const height = this.getProp(
        'toolbar.layouts.toolbar1.height'
      ) as string;
      const heightAndTabletMobileMode = this.getProp(
        'toolbar.layouts.toolbar1.heightAndTabletMobileMode'
      ) as string;

      const imagePath = this.getProp('main.body.backgroundImage') as string;
      if (imagePath) {
        let bodyStyles: string = 'background-image: url(' + imagePath + ')';
        document.body.setAttribute('style', bodyStyles);
      }

      let bodyStyles: string = '';

      if (height) {
        bodyStyles += ` --bs-toolbar-height: ${height};`;
      }

      if (heightAndTabletMobileMode) {
        bodyStyles += ` --bs-toolbar-height-tablet-and-mobile: ${heightAndTabletMobileMode};`;
      }

      document.body.setAttribute('style', bodyStyles);
    }
  }

  private initContent() {
    const width = this.getProp('content.width') as string;
    this.setCSSClass(
      'contentContainer',
      width === 'fluid' ? 'container-fluid' : 'container-xxl'
    );
  }

  private initAside() {
    const display = this.getProp('aside.display') as boolean;
    if (!display) {
      return;
    }

    // Enable Aside
    document.body.classList.add('aside-enabled');
    const theme = this.getProp('aside.theme') as string;
    this.setCSSClass('aside', `aside-${theme}`);
    const fixed = this.getProp('aside.fixed') as boolean;
    if (fixed) {
      document.body.classList.add('aside-fixed');
    }

    const minimized = this.getProp('aside.minimized') as boolean;
    if (minimized) {
      document.body.setAttribute('data-kt-aside-minimize', 'on');
    }

    // Hoverable on minimize
    const hoverable = this.getProp('aside.hoverable') as boolean;
    if (hoverable) {
      this.setCSSClass('aside', `aside-hoverable`);
    }
  }

  private initFooter() {
    const width = this.getProp('footer.width') as string;
    this.setCSSClass(
      'footerContainer',
      width === 'fluid' ? 'container-fluid' : 'container-xxl'
    );
  }
}
