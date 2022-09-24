import { Component, OnInit } from '@angular/core';
import { Service } from '../service/service';


@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  styleUrls: ['./resultados.component.css']
})
export class ResultadosComponent {

    public serviceInit: Service;

    constructor(private service:Service){
      this.serviceInit=this.service;
    }





}
