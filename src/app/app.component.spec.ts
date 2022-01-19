import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AsideComponent} from './components/aside/aside.component';;

@Component({
  selector: 'alchemist-app',
  template: '',
})
export class MockedAlchemistAppComponent {}

@Component({
  selector: 'alchemist-aside',
  template: '',
})
export class MockedAlchemistAsideComponent {}

@Component({
  selector: 'mat-slider',
  template: '',
})
export class MockedMatSliderComponent {
  @Input()
  public value = 0;
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        AsideComponent,
        MockedAlchemistAppComponent,
        MockedAlchemistAsideComponent,
        MockedMatSliderComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'conways-crafty-life'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('conways-crafty-life');
  });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   console.log(compiled.querySelector('title').textContent);
  //   console.log(compiled.querySelector('title'));
  //   expect(compiled.querySelector('title').textContent).toContain('ConwaysCraftyLife');
  // });
});
