import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Busqueda } from '../interfaces/buscador.interface';
import { Service } from '../service/service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent  {

  constructor(private service:Service) {

  }

  @Output() onSummonerSearch: EventEmitter<Busqueda> = new EventEmitter();
   @Output() onInputKey:EventEmitter<Busqueda> = new EventEmitter();

  @Input() busqueda: Busqueda= {
    summonerName: ''
  }


  buscar(){
      this.onSummonerSearch.emit(this.busqueda)
  }

  sendKey(){
      this.onInputKey.emit(this.busqueda)
  }
}
