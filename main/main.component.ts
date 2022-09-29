import { Component } from '@angular/core';
import { Busqueda } from '../interfaces/buscador.interface';
import { Service } from '../service/service';
import { Key } from '../interfaces/key.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private service : Service){
  }


    busqueda: Busqueda={
    summonerName:'INVOCADOR'
  }

  apiRequest(busqueda:Busqueda){
    this.service.buscarSummoner(busqueda.summonerName);
    //this.service.byNameResponse(busqueda.summonerName);
  }
}
