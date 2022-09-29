import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';
import { Participant } from '../interfaces/match.info.interface';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private service:Service) {
  }

 get historial(){
  console.log(this.service.historial);
  return this.service.historial;
 }

 buscarSummoner(summoner:string){
  let resultado = this.service.buscarSummoner(summoner)
  console.log(resultado);
 }
}
