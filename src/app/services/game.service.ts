import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


declare var Game:any;

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private turnCount = new Subject<number>();

  private interval = 1000;

  constructor() { }

  start() {
    if (!Game.intervalID) {
      Game.start();
      Game.intervalID = setTimeout(() => {this.turnCallback()}, this.interval);
    } else {
      this.unpause();
    }
  }

  turnCallback() {
    Game.turn();
    this.sendTurnCount(Game.iterations);
    if (Game.status) {
      setTimeout(() => {this.turnCallback()}, this.interval)
    }
  }

  pause() {
    Game.status = false;
  }

  unpause() {
    Game.status = true;
    Game.intervalID =  setTimeout(() => {this.turnCallback()}, this.interval);

  }


  clearTurnCount() {
    this.turnCount.next();
  }

  sendTurnCount(count: number) {
    this.turnCount.next(count);
  }

  getTurnCount(): Observable<number> {
    return this.turnCount.asObservable();
  }

  // clearInterval( ) {
  //   this.turnCount.next();
  // }

  sendInterval(value: number) {
    this.interval = value;
    Game.interval = this.interval;
  }

  // getInterval(): Observable<number> {
  //   return this.turnCount.asObservable();
  // }


}
