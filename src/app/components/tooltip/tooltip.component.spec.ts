import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TooltipComponent } from './tooltip.component';
import { StateService } from 'src/app/services/state/state.service';

describe('TooltipComponent', () => {
  let component: TooltipComponent;
  let fixture: ComponentFixture<TooltipComponent>;
  let testBedService: StateService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TooltipComponent],
      providers: [StateService],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TooltipComponent);
    component = fixture.componentInstance;
    component.text = 'test Tooltip';
    fixture.detectChanges();
    testBedService = TestBed.get(StateService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test click outside document:click event handler', () => {
    testBedService.updateState('test Tooltip');
    (fixture.debugElement.nativeElement as HTMLElement).parentElement.click();
    fixture.detectChanges();
    expect(testBedService.selectedButton).toBe(null);
  });

  it('Test click inside document:click event handler', () => {
    testBedService.updateState('test Tooltip');
    (fixture.debugElement.nativeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(testBedService.selectedButton).toBe('test Tooltip');
  });

  it('Test Escape document:keyUp event handler', () => {
    testBedService.updateState('test Tooltip');
    component.keyUp(new KeyboardEvent('document:keyup', { code: 'Escape' }));
    fixture.detectChanges();
    expect(testBedService.selectedButton).toBe(null);
  });
  it('Test document:keyUp event handler', () => {
    testBedService.updateState('test Tooltip');
    component.keyUp(new KeyboardEvent('document:keyup', { code: 'c' }));
    fixture.detectChanges();
    expect(testBedService.selectedButton).toBe('test Tooltip');
  });
  it('Test not Escape document:scroll event handler tooltip above', async () => {
    fixture.debugElement.nativeElement.getBoundingClientRect = () => ({
      top: 1000,
      height: 10
    });
    component.onScroll();
    await new Promise(resolve => setTimeout(() => {
      component.onScroll();
      fixture.detectChanges();
      expect((fixture.debugElement.nativeElement as HTMLElement).classList.contains('top')).toBeTruthy();
      resolve();
    }, 400));
  });
  it('Test document:scroll event handler tooltip bellow', async () => {
    fixture.debugElement.nativeElement.getBoundingClientRect = () => ({
      top: -10,
      height: 10
    });
    component.onScroll();
    await new Promise(resolve => setTimeout(() => {
      component.onScroll();
      fixture.detectChanges();
      expect((fixture.debugElement.nativeElement as HTMLElement).classList.contains('bottom')).toBeTruthy();
      resolve();
    }, 400));
  });
});
