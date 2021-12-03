import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

export interface Present {
  _id: string;
  sender: string;
  recipient: string;
  resourse: string;
  resVal: number;
}

@Injectable({providedIn: 'root'})
export class PresentService{

  presents: Present[] = []
  constructor(
    public http: HttpClient,
  ) {
    this.reloadPresents()
  }

  reloadPresents(){
    this.http.get<Present[]>('http://localhost:3300/api/present')
      .subscribe(response  => {
        this.presents = response
      })
  }


}
