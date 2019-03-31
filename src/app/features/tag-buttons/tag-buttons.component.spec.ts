import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagButtonsComponent } from './tag-buttons.component';

describe('TagButtonsComponent', () => {
  let component: TagButtonsComponent;
  let fixture: ComponentFixture<TagButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
