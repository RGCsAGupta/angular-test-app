import { TooltipDirective } from './tooltip.directive';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TooltipComponent } from 'src/app/components/tooltip/tooltip.component';
import { StateService } from 'src/app/services/state/state.service';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-test',
  template: `  <div class="button">
    <button class="btn" appTooltip="Button test">Click Me 1!</button>
  </div>`,
  styles: []
})
class TestComponent implements OnInit {
  constructor() { }

  ngOnInit(): void { }
}


describe('TooltipDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testBedService: StateService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TooltipComponent,
        TooltipDirective,
        TestComponent
      ],
      providers: [
        StateService
      ]
    }).overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [TooltipComponent], declarations: [] } });

    fixture = TestBed.createComponent(TestComponent);
    testBedService = TestBed.get(StateService);
    fixture.detectChanges();
  });
  it('TestDirective should add tooltip class to parent element', () => {
    const parentEl = fixture.debugElement.query(By.css('.button'));
    expect((parentEl.nativeElement as HTMLElement).classList.contains('tooltip')).toBeTruthy();
  });
  it('Test button onclick event handler', () => {
    const buttonEl = fixture.debugElement.query(By.css('button'));
    (buttonEl.nativeElement as HTMLElement).click();
    fixture.detectChanges();
    expect(testBedService.selectedButton).toBe('Button test');
  });
});
