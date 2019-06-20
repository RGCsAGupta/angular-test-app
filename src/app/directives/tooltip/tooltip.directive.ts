import { Directive, ElementRef, Input, ViewContainerRef, OnInit, ComponentFactoryResolver, AfterViewInit, HostListener, ComponentRef } from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { StateService } from 'src/app/services/state/state.service';

@Directive({
	selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, AfterViewInit {
	@Input('appTooltip')
	private _text: string;
	public get text(): string {
		return this._text;
	}
	toolTipComponentFactory: any;
	tooltipComponentRef: ComponentRef<TooltipComponent>;
	constructor(
		private _viewContainer: ViewContainerRef,
		private _componentFactoryResolver: ComponentFactoryResolver,
		private _elementRef: ElementRef,
		private _stateService: StateService,
	) { }

	ngOnInit() {
		(<HTMLElement>this._elementRef.nativeElement).parentElement.classList.add('tooltip');
		this.toolTipComponentFactory = this._componentFactoryResolver.resolveComponentFactory(TooltipComponent);
	}
	ngAfterViewInit(): void {
		this._stateService.state
			.subscribe(selectedButton => {
				this.showHide(this.text === selectedButton)
			})
	}

	@HostListener('click', ['$event'])
	onclick(event: MouseEvent) {
		event.stopPropagation();
		this._stateService.updateState(this.text);
	}
	showHide(state) {
		this._viewContainer.clear();
		if (state) {
			this.tooltipComponentRef = this._viewContainer.createComponent(this.toolTipComponentFactory);
			this.tooltipComponentRef.instance.text = this.text;
		}
	}
}
