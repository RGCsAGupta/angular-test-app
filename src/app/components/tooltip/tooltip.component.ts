import { Component, Input, AfterViewInit, HostListener, ViewEncapsulation, ElementRef, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state/state.service';

@Component({
	selector: 'app-tooltip',
	templateUrl: './tooltip.component.html',
	styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
	ngOnInit(): void {
		this.resetOrientation();
	}
	@Input() text: string;
	constructor(private _elementRef: ElementRef, private _stateService: StateService) {
		(<HTMLElement>this._elementRef.nativeElement).classList.add('tooltip__text');
	}

	@HostListener('document:keyup', ['$event']) keyUp(event: KeyboardEvent): void {
		if (event.code === 'Escape') {
			event.stopPropagation();
			this._hide();
		}
	}
	@HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent): void {
		if (!this._elementRef.nativeElement.contains(event.target)) {
			event.stopPropagation();
			this._hide();
		}
	}

	@HostListener('document:scroll') onScroll(): void {
			this.resetOrientation();
	}
	private resetOrientation(): void {
		if (this._elementRef) {
			const { top, height } = this._elementRef.nativeElement.getBoundingClientRect();
			if (top < (height + 100)) {
				(<HTMLElement>this._elementRef.nativeElement).classList.remove('top');
				(<HTMLElement>this._elementRef.nativeElement).classList.add('bottom');
			}
			else {
				(<HTMLElement>this._elementRef.nativeElement).classList.remove('bottom');
				(<HTMLElement>this._elementRef.nativeElement).classList.add('top');
			}
		}
	}

	private _hide(): void {
		this._stateService.updateState(null);
	}
}
