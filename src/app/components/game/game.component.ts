import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

// import './style.css';

// import * as boilerplate from './lib/boilerplate.js';
// // import * as crafty from '../lib/crafty.js';
// import * as game from './lib/game';
// import * as components from './lib/components.js';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // $('#game').width('100%');
    // $('#game').height('100%');
  }

}
