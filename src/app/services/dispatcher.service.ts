import { Injectable } from "@angular/core";
import { Action, Store } from "@ngrx/store";

@Injectable({
    providedIn: 'root',
  })
  export class Dispatcher {
    constructor(private store$: Store<any>) {}

    dispatch(action: Action): void {
        return this.store$.dispatch(action);
    }
  }