import { HttpClient, HttpParams } from "@angular/common/http";
import { ComponentFactoryResolver, Injectable, ɵɵsetComponentScope } from "@angular/core";
import { SummonerStats } from '../interfaces/summoner.interface';
import { SummonerByNameResponse } from '../interfaces/byname';
import { Match } from '../interfaces/match.interface';
import { MatchInfo, Participant } from '../interfaces/match.info.interface';
import { LastMatchSummonerInfo } from '../interfaces/last.match.summoner.info.interface';
import { Kda } from '../interfaces/kda.interface';


@Injectable()
export class Service{


  private apiKey:string = 'RGAPI-fd200537-73d1-4bc8-baec-9d62a6713a24';
  private matches:string ='' ;
  private puuid:string ='';
  private lastMatchInfo: LastMatchSummonerInfo[]=[];
  private participants:Participant[]=[];
  public kda : Kda = {kills:0,deaths:0,assists:0, championName:''};

        endpoints = {
          byName: 'https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name',
          matches:'https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/',
          lastMatch:'https://americas.api.riotgames.com/lol/match/v5/matches/'
        };

  public resultado: any;

         apiResultado = {
          assists:0,
          kills:0,
          deaths:0,
          champion: '',
          win: undefined
         };

  constructor(private http: HttpClient){
    console.log(this.resultado);
  }

    busqueda = {
    summonerName: 'L4D3d10s'
  };

  get summonerInfo(){

    const url = 'http://lolapp-env-1.eba-3euaguyk.us-east-1.elasticbeanstalk.com/lol/summoner/' + this.busqueda.summonerName;
    return this.http.get<SummonerStats>(url)
      .subscribe(response => {
        this.resultado = response;
      });
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


    const url = 'http://lolapp-env-1.eba-3euaguyk.us-east-1.elasticbeanstalk.com/lol/getLastMatchSummonerInfo/' + summoner;

    const resultado = this.http.get(url);
    resultado.subscribe(data => {
      this.apiResultado = {
        kills: (data as any).kills,
        assists: (data as any).assists,
        deaths: (data as any).deaths,
        champion:(data as any).championName,
        win: (data as any).win
      };
    });
  }



  byNameResponse(summoner:string){
    let params = new HttpParams()
      .set('api_key', this.apiKey);
    console.log(params);
    this.http.get<SummonerByNameResponse>(`${this.endpoints.byName}/${summoner}`,{params})
      .subscribe(response =>{
        this.puuid = response.puuid;
        console.log(this.puuid);
        this.matchesResponse(this.puuid,summoner);
      });

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
      const {kills, deaths, assists, championName} = lastMatchObj;
      this.kda.assists = assists;
      this.kda.deaths = deaths;
      this.kda.kills = kills;
      this.kda.championName = championName;
      console.log(this.kda);
      //this.summonerLastMatchInfo(respuesta);
      }
    );}

   /*  summonerLastMatchInfo(summonerLastMatchInfo:LastMatchSummonerInfo[]){
      console.log(summonerLastMatchInfo);
      this.lastMatchInfo = summonerLastMatchInfo;
      console.log(this.lastMatchInfo);
    } */
}
