import {InjectionToken, ModuleWithProviders, NgModule} from "@angular/core";
import {GraphQLConfiguration} from "../modules";

export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('env');

export interface Environment {
  production: boolean
  appVersion: string
  isMockEnabled: boolean
  graphQl: GraphQLConfiguration
}

@NgModule({})
export class EnvironmentModule {
  public static forRoot(environment: Environment): ModuleWithProviders<EnvironmentModule> {
    return {
      ngModule: EnvironmentModule,
      providers: [
        {
          provide: ENVIRONMENT_TOKEN, // you can also use InjectionToken
          useValue: environment
        }
      ]
    };
  }
}
