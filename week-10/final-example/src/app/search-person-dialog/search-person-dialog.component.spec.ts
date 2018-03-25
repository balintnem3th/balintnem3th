import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPersonDialogComponent } from './search-person-dialog.component';

describe('SearchPersonComponent', () => {
  let component: SearchPersonDialogComponent;
  let fixture: ComponentFixture<SearchPersonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPersonDialogComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPersonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
