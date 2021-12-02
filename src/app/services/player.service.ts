import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

export interface Player {
  _id: number;
  props: [];
  resourses: [];
  outPresCnt: number;
}

@Injectable({providedIn: 'root'})
export class PlayerService{

  players: Player[] = []
  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.reloadPlayers()
  }

  reloadPlayers(){
    this.http.get<Player[]>('http://localhost:3300/api/player')
      .subscribe(response  => {
        this.players = response
      })
  }


}