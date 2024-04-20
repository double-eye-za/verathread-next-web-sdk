import { Injectable } from '@angular/core';
import { ILayout } from './default-layout.config';
import { LayoutService } from './layout.service';
import {distinctUntilChanged} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LayoutInitService {
  constructor(private layout: LayoutService) {}

  init() {
    this.layout.initConfig();
  }

  update(fieldsToUpdate: Partial<ILayout>) {
    this.layout.updateConfig(fieldsToUpdate);
  }
}
