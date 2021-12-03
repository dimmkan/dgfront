import { Component, OnInit } from '@angular/core';
import {PresentService} from "../services/present.service";

@Component({
  selector: 'app-present',
  templateUrl: './present.component.html',
  styleUrls: ['./present.component.scss']
})
export class PresentComponent implements OnInit {

  constructor(public presentService:PresentService) { }

  ngOnInit(): void {
    this.presentService.reloadPresents()
  }

}
