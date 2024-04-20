import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule, TranslateService} from '@ngx-translate/core';
import {TRANSACTION_SVC_TOKEN} from "./translation.service";

@NgModule({
  imports: [CommonModule, TranslateModule],
  exports: [TranslateModule],
  providers: [
    {provide: TRANSACTION_SVC_TOKEN, useClass: TranslateService},
  ]
})
export class TranslationModule {}
