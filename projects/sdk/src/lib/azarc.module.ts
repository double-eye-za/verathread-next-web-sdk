import {ModuleWithProviders, NgModule} from "@angular/core";
import {TranslationModule} from "./modules";
import {TranslateModule} from "@ngx-translate/core";
import {TooltipFixDirective} from "./directives/tooltip-fix.directive";

@NgModule({
  declarations: [],
  imports: [
    TranslateModule.forRoot(),
    TranslationModule
  ]
})
export class AzarcModule {
  static forRoot(): ModuleWithProviders<AzarcModule> {
    return {
      ngModule: AzarcModule,
      providers: []
    }
  }
}
