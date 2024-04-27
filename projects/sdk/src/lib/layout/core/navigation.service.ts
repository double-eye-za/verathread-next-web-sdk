import {Injectable, InjectionToken} from "@angular/core";
import {Environment} from "../../model";
import {BehaviorSubject, Subject} from "rxjs";
import {Route, Routes} from "@angular/router";
import {loadRemoteModule} from "@angular-architects/module-federation";

export const NAVIGATION_SERVICE_TOKEN = new InjectionToken<Environment>('navigation.service');

export interface NavigationItem {
  id: string;
  title: string;
  subtitle?: string;
  root: boolean;
  path: string;
  remote: boolean;
  megaMenu?: string;
  outlet?: string;
  icon?: string;
  iconStyle?: string
  remoteEntry?: string;
  exposedModule?: string;
  moduleName?: string;
  authRequired?: boolean;
  hidden?: boolean;
  children?: Array<NavigationItem>;
  healthy?: boolean;
}

export type NavigationData = NavigationItem[]

@Injectable({providedIn: 'root'})
export class NavigationService {
  private _navigationDataChanged: BehaviorSubject<NavigationData> = new BehaviorSubject<NavigationData>([]);

  get navigationDataChanged(): Subject<NavigationData> {
    return this._navigationDataChanged;
  }

  get currentNavigationData(): NavigationData {
    return this._navigationDataChanged.value;
  }

  public setNavigationData(data: NavigationData) {
    this._navigationDataChanged.next(data)
  }

  public asRouterConfiguration(enrichRoute: (navItem: NavigationItem, route: Route) => void): Routes {
    return this.generateRoutes([], this.currentNavigationData, enrichRoute)
  }

  private generateRoutes(
    result: Routes,
    currentRoutes: NavigationData,
    enrichRoute: (navItem: NavigationItem, route: Route) => void, parent: Route | undefined = undefined
  ) {
    for (let i = 0; i < currentRoutes.length; i++) {
      const entry = currentRoutes[i] as NavigationItem;
      const isRemote = entry.remoteEntry && entry.exposedModule && entry.moduleName;
      const hasChildren = entry.children && entry.children.length > 0;
      const route: Route = {
        path: entry.path,
        outlet: entry.outlet,
        canActivate: [],
        canDeactivate: [],
      }

      if (!isRemote && !hasChildren) {
        continue
      }

      if (isRemote) {
        route.loadChildren = () => loadRemoteModule({
          type: 'module',
          remoteEntry: entry.remoteEntry!,
          exposedModule: entry.exposedModule!
        }).then(m => m[entry.moduleName!])
      }

      enrichRoute(entry, route)

      if (!parent) {
        result.push(route)
      } else if (parent) {
        if (!parent.children) {
          parent.children = []
        }

        parent.children?.push(route)
      }

      if (hasChildren) {
        this.generateRoutes(currentRoutes, entry.children!, enrichRoute, route)
      }
    }

    return result
  }
}
