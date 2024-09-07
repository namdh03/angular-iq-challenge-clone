import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderWobblingComponent } from './loader-wobbling.component';

describe('LoaderWobblingComponent', () => {
  let component: LoaderWobblingComponent;
  let fixture: ComponentFixture<LoaderWobblingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderWobblingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderWobblingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
