import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VerMaisPage } from './ver-mais.page';

describe('VerMaisPage', () => {
  let component: VerMaisPage;
  let fixture: ComponentFixture<VerMaisPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
