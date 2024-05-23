import {ModuleWithProviders, NgModule} from "@angular/core";
import {GraphQLConfiguration} from "../graphql/graphql.module";
import {Level, Logger, LOGGER_LEVEL} from "./logger.service";

@NgModule()
export class LoggingModule {
  static forRoot(level: Level = Level.LOG): ModuleWithProviders<LoggingModule> {
    return {
      ngModule : LoggingModule,
      providers: [
        Logger,
        { provide: LOGGER_LEVEL, useValue: level },
      ],
    };
  }
}

