import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../services/player.service";


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(
    public playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.playerService.reloadPlayers()
  }

}
