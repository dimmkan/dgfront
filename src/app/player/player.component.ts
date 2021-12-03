import {Component, OnInit, TemplateRef} from '@angular/core';
import {Player, PlayerService} from "../services/player.service";
import {ActivatedRoute, Params} from "@angular/router";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {FormArray, FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  player: Player|any
  friends: Player[] = []
  form: FormGroup|any
  selectedResouse: string = 'money'
  valueResourse: number = 0

  constructor(
    public playerService: PlayerService,
    private route: ActivatedRoute,
    public modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.player = this.playerService.getById(params.id)
      this.friends = this.playerService.players.filter(
        p => p._id != params.id)
    })
    this.form = new FormGroup({
      checkArray: new FormArray([])
    })
  }

  openModalPresent(content: TemplateRef<any>) {
    this.modalService.open(content, {backdropClass: 'light-dark-backdrop', size: 'xl'})
  }

  givePresent(cancel: TemplateRef<any>, present: TemplateRef<any>) {
    if (this.player.outPresCnt === 0){
      this.modalService.open(cancel, {backdropClass: 'light-dark-backdrop', size: 'xl'})
    }
    else {
      this.modalService.open(present, {backdropClass: 'light-dark-backdrop', size: 'xl'})
    }

  }

  onCheckboxChange($event: Event) {
    const checkArray: FormArray = this.form.get('checkArray') as FormArray;

    // @ts-ignore
    if ($event.target.checked) {
      // @ts-ignore
      checkArray.push(new FormControl($event.target.value));
    } else {
      let i: number = 0;
      // @ts-ignore
      checkArray.controls.forEach((item: FormControl) => {
        // @ts-ignore
        if (item.value == $event.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  sendPresent() {
    const ids = this.form.value.checkArray
    this.playerService.http.put(`http://localhost:3300/api/player/givepresent/${this.player._id}`, {
      ids,
      resourse: this.selectedResouse,
      count: this.valueResourse
    })
      .subscribe( () => {
        if(this.player.outPresCnt - ids.length < 0) {
          this.player.outPresCnt = 0
        }else {
          this.player.outPresCnt -= ids.length
        }
      })
  }
}
