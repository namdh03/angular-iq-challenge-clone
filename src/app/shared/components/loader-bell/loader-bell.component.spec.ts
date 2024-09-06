import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderBellComponent } from './loader-bell.component';

describe('LoaderBellComponent', () => {
  let component: LoaderBellComponent;
  let fixture: ComponentFixture<LoaderBellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderBellComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderBellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
