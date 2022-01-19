import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';

import { AlchemistCoreModule } from '@s-ayers/alchemist-ng/core';
import { LayoutModule } from '@s-ayers/alchemist-ng/layout';

import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { AsideComponent } from './components/aside/aside.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



const routes: Routes = [
  {
    path: '',
    component: GameComponent,
  }
];


@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    MatSliderModule,
    AlchemistCoreModule,
    LayoutModule,
    RouterModule.forRoot(
      routes,
      // { enableTracing: false, relativeLinkResolution: 'legacy' } // <-- debugging purposes only
      // <-- debugging purposes only
    ),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
