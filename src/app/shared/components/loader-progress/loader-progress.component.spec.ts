import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderProgressComponent } from './loader-progress.component';

describe('LoaderProgressComponent', () => {
  let component: LoaderProgressComponent;
  let fixture: ComponentFixture<LoaderProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoaderProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LoaderProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
