import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  private pSelectedButton: string = null;

  // Observable state source
  private stateSource = new BehaviorSubject<string>(null);
  // Observable state stream
  state = this.stateSource.asObservable();
  // service command
  updateState(selectedButton: string) {
    this.pSelectedButton = selectedButton;
    this.stateSource.next(selectedButton);
  }
  public get selectedButton(): string {
    return this.pSelectedButton;
  }
}
