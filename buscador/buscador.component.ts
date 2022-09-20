import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Busqueda } from '../interfaces/buscador.interface';
import { Service } from '../service/service';
import { Key } from '../interfaces/key.interface';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent  {

  constructor(private service:Service) {

  }

  @Output() onSummonerSearch: EventEmitter<Busqueda> = new EventEmitter();
   /* @Output() onInputKey:EventEmitter<Key> = new EventEmitter(); */

  @Input() busqueda: Busqueda= {
    summonerName: ''
  }

 /*   @Input()key : Key= {
      keyValue: ''
  } */


  buscar(){
      this.onSummonerSearch.emit(this.busqueda)
  }

 /*  sendKey(){
      this.onInputKey.emit(this.key)
  } */
}
