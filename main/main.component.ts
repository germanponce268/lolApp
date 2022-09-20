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
    this.service.summonerInfo;
  }


    busqueda: Busqueda={
    summonerName:'INVOCADOR'
  }
    key: Key = {
      keyValue: ''
    }

  apiRequest(busqueda:Busqueda){
    this.service.summonerLastMatch(busqueda.summonerName);
  }

  /* sendKey(key:Key){
    console.log('la key', key.keyValue);
    this.service.sendKey(key.keyValue);
  } */
}
