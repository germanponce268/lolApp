import { HttpClient, HttpParams } from "@angular/common/http";
import {  Injectable } from "@angular/core";
import { SummonerByNameResponse } from '../interfaces/byname';
import { MatchInfo, Participant } from '../interfaces/match.info.interface';
import { LastMatchSummonerInfo } from '../interfaces/last.match.summoner.info.interface';
import { Kda } from '../interfaces/kda.interface';
import { switchMap } from "rxjs";


@Injectable()
export class Service{


  private apiKey:string = 'RGAPI-da45aaed-6bab-4731-aba7-72c53f5c63e0';
  private matches:string='' ;
  private puuid:string ='';
  private summonersList: string[] = [];
  private lastMatchInfo: LastMatchSummonerInfo[]=[];
  private participants:Participant[]=[];
  private lastGameId :string = '';
  public kda : Kda = {kills:0,deaths:0,assists:0, championName:'', win:false};

        endpoints = {
          byName: 'https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name',
          matches:'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/',
          lastMatch:'https://americas.api.riotgames.com/lol/match/v5/matches/'
        };

  constructor(private http: HttpClient){
    this.summonersList = JSON.parse(localStorage.getItem('summoners')!) || [];
  }

    busqueda = {
    summonerName: 'L4D3d10s'
  };

  get historial():string[]{
    return [...this.summonersList];
  }

  get resultadoPartida():string{
    let resultado :string = '';
   if(this.kda.win){
    return resultado = 'VICTORIA';
   }else {
    return resultado = 'DERROTA';
   }

  }

  buscarSummoner(summoner:string){

    let lastGameId = '';

    let params = new HttpParams().set('api_key', this.apiKey);
    this.http.get<SummonerByNameResponse>(`${this.endpoints.byName}/${summoner}`, {params})
      .subscribe(summonerInfo=>{
        this.http.get<string>(`${this.endpoints.matches}${summonerInfo.puuid}/ids`, {params})
        .subscribe(matches =>{
          lastGameId = matches[0];
          this.http.get<MatchInfo>(`${this.endpoints.lastMatch}${lastGameId}`, {params})
          .subscribe(response=>{
            this.participants = response.info.participants;
            let respuesta =this.participants.filter(participant=>{
               return participant.summonerName === summoner;
            })
            this.lastMatchInfo = respuesta;
            Object.assign(this.kda, this.lastMatchInfo[0])

          })
        })
      });

   /*  let params2 = new HttpParams().set('limit','10')
            .set('api_key', this.apiKey);
    this.http.get<string>(`${this.endpoints.matches}${this.puuid}/ids`,{params:params2})
      .subscribe(response=>{
        this.matches = response;
        this.lastGameId = this.matches[0];
        console.log('2do req' , this.lastGameId);
      }) */
     /*  let params3 = new HttpParams().set('api_key', this.apiKey);

      this.http.get<MatchInfo>(`${this.endpoints.lastMatch}${this.lastGameId}`, {params:params3})
        .subscribe(response=>{
          console.log(response);
        }) */
  }

 /*  byNameResponse(summoner:string){
    let params = new HttpParams()
      .set('api_key', this.apiKey);
    console.log(params);
    this.http.get<SummonerByNameResponse>(`${this.endpoints.byName}/${summoner}`,{params})
      .subscribe(response =>{
        this.puuid = response.puuid;
        console.log(this.puuid);
        this.matchesResponse(this.puuid,summoner);
      });
      if(!this.summonersList.includes(summoner)){
      this.summonersList.unshift(summoner);
      this.summonersList = this.summonersList.splice(0.10);
      localStorage.setItem('summoners', JSON.stringify(this.summonersList));
}
  }

  matchesResponse(puuid:string, summoner:string){
    let params = new HttpParams()
      .set('limit', '10')
      .set('api_key', this.apiKey);

    this.http.get<string>(`${this.endpoints.matches}${puuid}/ids` ,{params})
      .subscribe((response:string) =>{
        this.matches = response;
        const lastMatch = this.matches[0];
        console.log(lastMatch);
        this.lastMatchInfoResponse(lastMatch,summoner);
      });

  }

  lastMatchInfoResponse(lastMatch:string, summoner:string){
    let params = new HttpParams()
      .set('api_key', this.apiKey);

    this.http.get<MatchInfo>(`${this.endpoints.lastMatch}${lastMatch}`,{params})
      .subscribe(response =>{
        console.log(response.info.participants);
        this.participants = response.info.participants;
        let respuesta = this.participants.filter(participant=>{
         return participant.summonerName === summoner;
      });
      console.log('lastmatchinfo',respuesta);
      this.lastMatchInfo = respuesta;
      const lastMatchObj = this.lastMatchInfo[0];
      Object.assign(this.kda, lastMatchObj);
      console.log(this.kda);
      }
    );} */

}
