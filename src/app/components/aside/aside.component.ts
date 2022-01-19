import { Component, OnInit } from '@angular/core';

import { GameService } from '../../services/game.service';
import { Subscription } from 'rxjs/internal/Subscription';

declare var window: any;
const Game = window['Game'];

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  subscriptions: Subscription[];

  public startLabel = 'Pause';
  public interations = 0;



  public interval: number|null = 1500;
  private status = true;

  constructor(private service: GameService) {
    this.subscriptions = [];

    this.subscriptions[this.subscriptions.length] = this.service.getTurnCount().subscribe(count => {
      this.interations = count;
    });



  }

  ngOnInit(): void {

    setTimeout(()=>{
      this.service.start();
    }, 2000)

  }

  start(event: any) {

    if (this.status) {
      this.service.pause();
      this.status = false;
      this.startLabel = 'Start';
    } else {
      this.service.start();
      this.status = true;
      this.startLabel = 'Pause';
    }


  }

  stop(event: any) {
    Game.status = false;

  }
}
