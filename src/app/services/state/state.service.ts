import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class StateService {
	private _selectedButton: string = null;

	// Observable state source
	private stateSource = new BehaviorSubject<string>(null);
	// Observable state stream
	state = this.stateSource.asObservable();
	// service command
	updateState(selectedButton: string) {
		this._selectedButton = selectedButton;
		this.stateSource.next(selectedButton);
	}
	public get selectedButton(): string {
		return this._selectedButton;
	}
}
