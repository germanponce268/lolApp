import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Busqueda } from '../interfaces/buscador.interface';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent  {

  @Output() onSummonerSearch: EventEmitter<Busqueda> = new EventEmitter();

  @Input() busqueda: Busqueda= {
    summonerName: ''
  }


  buscar(){
      this.onSummonerSearch.emit(this.busqueda)
  }


}
