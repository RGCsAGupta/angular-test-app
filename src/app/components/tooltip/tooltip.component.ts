import { Component, Input, ElementRef, HostListener, OnInit } from '@angular/core';
import { StateService } from 'src/app/services/state/state.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent implements OnInit {
  @Input() text: string;
  constructor(private elementRef: ElementRef, private stateService: StateService) {
    (this.elementRef.nativeElement as HTMLElement).classList.add('tooltip__text');
    this.resetOrientation = _.throttle(this.resetOrientation, 250);
  }

  ngOnInit(): void {
    this.resetOrientation();
  }
  @HostListener('document:keyup', ['$event']) keyUp(event: KeyboardEvent): void {
    if (event.code === 'Escape') {
      event.stopPropagation();
      this._hide();
    }
  }
  @HostListener('document:click', ['$event']) onClickOutside(event: MouseEvent): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      event.stopPropagation();
      this._hide();
    }
  }

  @HostListener('document:scroll') onScroll(): void {
    this.resetOrientation();
  }
  private resetOrientation(): void {
    if (this.elementRef) {
      const { top, height } = this.elementRef.nativeElement.getBoundingClientRect();
      if (top < (height + 40)) {
        (this.elementRef.nativeElement as HTMLElement).classList.remove('top');
        (this.elementRef.nativeElement as HTMLElement).classList.add('bottom');
      } else {
        (this.elementRef.nativeElement as HTMLElement).classList.remove('bottom');
        (this.elementRef.nativeElement as HTMLElement).classList.add('top');
      }
    }
  }

  private _hide(): void {
    this.stateService.updateState(null);
  }
}
