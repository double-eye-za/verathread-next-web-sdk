import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";

@Injectable({providedIn: "root"})
export class GqlService {
  private _connectionErrors = new BehaviorSubject<Error[] | undefined>(undefined)

  get connectionErrors(): BehaviorSubject<Error[] | undefined> {
    return this._connectionErrors;
  }

  onConnectionError(errors: Error[]) {
    this._connectionErrors.error(errors)
  }
}
