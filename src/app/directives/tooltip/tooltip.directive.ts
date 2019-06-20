import {
  Directive,
  ElementRef,
  Input,
  ViewContainerRef,
  OnInit,
  ComponentFactoryResolver,
  AfterViewInit,
  HostListener,
  ComponentRef
} from '@angular/core';
import { TooltipComponent } from '../../components/tooltip/tooltip.component';
import { StateService } from 'src/app/services/state/state.service';

@Directive({
  selector: '[appTooltip]'
})
export class TooltipDirective implements OnInit, AfterViewInit {
  @Input('appTooltip')
  private pText: string;
  public get text(): string {
    return this.pText;
  }
  toolTipComponentFactory: any;
  tooltipComponentRef: ComponentRef<TooltipComponent>;
  constructor(
    private viewContainer: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private elementRef: ElementRef,
    private stateService: StateService,
  ) { }

  ngOnInit() {
    (this.elementRef.nativeElement as HTMLElement).parentElement.classList.add('tooltip');
    this.toolTipComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TooltipComponent);
  }
  ngAfterViewInit(): void {
    this.stateService.state
      .subscribe(selectedButton => {
        this.showHide(this.text === selectedButton);
      });
  }

  @HostListener('click', ['$event'])
  onclick(event: MouseEvent) {
    event.stopPropagation();
    this.stateService.updateState(this.text);
  }
  showHide(state) {
    this.viewContainer.clear();
    if (state) {
      this.tooltipComponentRef = this.viewContainer.createComponent(this.toolTipComponentFactory);
      this.tooltipComponentRef.instance.text = this.text;
    }
  }
}
