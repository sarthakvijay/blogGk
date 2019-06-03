import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankCalculatorComponent } from './rank-calculator.component';

describe('RankCalculatorComponent', () => {
  let component: RankCalculatorComponent;
  let fixture: ComponentFixture<RankCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankCalculatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
