import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { SummonerStats, Perks } from '../interfaces/summoner.interface';
import { Busqueda } from '../interfaces/buscador.interface';

@Injectable()
export class Service{


  public resultado: any;

         apiResultado = {
          assists:0,
          kills:0,
          deaths:0,
          champion: '',
          win: undefined
         }

  constructor(private http: HttpClient){
    console.log(this.resultado)
  }

    busqueda = {
    summonerName: 'L4D3d10s'
  }

  get summonerInfo(){
    const url = 'http://localhost:8080/lol/summoner/' + this.busqueda.summonerName;
    return this.http.get<SummonerStats>(url)
      .subscribe(response => {
        this.resultado = response;
      })
  }

  get resultadoPartida():string{
    let resultado :string = '';
   if(this.apiResultado.win){
    return resultado = 'VICTORIA';
   }else {
    return resultado = 'DERROTA';
   }

  }

   summonerLastMatch(summoner:string){

    const url = 'http://localhost:8080/lol/getLastMatchSummonerInfo/' + summoner;

    const resultado = this.http.get(url)
    resultado.subscribe(data => {
      this.apiResultado = {
        kills: (data as any).kills,
        assists: (data as any).assists,
        deaths: (data as any).deaths,
        champion:(data as any).championName,
        win: (data as any).win
      }
    })
  }

  sendKey(summoner:string){
    const url = 'http://localhost:8080/lol/apiKey/' + summoner;
    console.log('la url',url);
    const resultado = this.http.post(url,summoner)
    resultado.subscribe(data=>{
      console.log(data);
    })
  }



}
