import { Component } from '@angular/core';
import { Busqueda } from '../interfaces/buscador.interface';
import { Service } from '../service/service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private service : Service){
    this.service.summonerInfo;
  }


    busqueda: Busqueda={
    summonerName:'L4D3d10s'
  }


  apiRequest(busqueda:Busqueda){
    this.service.summonerLastMatch(busqueda.summonerName);
  }

  sendKey(busqueda:Busqueda){
    this.service.sendkey(busqueda.summonerName);
  }
}
