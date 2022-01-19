import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsideComponent } from './aside.component';


@Component({
  selector: 'alchemist-aside',
  template: '',
})
export class MockedAlchemistAsideComponent {}

@Component({
  selector: 'mat-slider',
  template: '',
})
export class MockedMatSliderComponent {}

describe('AsideComponent', () => {
  let component: AsideComponent;
  let fixture: ComponentFixture<AsideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsideComponent, MockedAlchemistAsideComponent, MockedMatSliderComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
