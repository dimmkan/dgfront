import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {PlayerComponent} from "./player/player.component";

const routes: Routes = [
  {path: '', component: HomepageComponent},
  {path: 'player/:id', component: PlayerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
