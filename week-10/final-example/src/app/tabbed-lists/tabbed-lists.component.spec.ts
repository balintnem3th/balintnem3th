import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabbedListsComponent } from './tabbed-lists.component';

describe('TabbedListsComponent', () => {
  let component: TabbedListsComponent;
  let fixture: ComponentFixture<TabbedListsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabbedListsComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabbedListsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
