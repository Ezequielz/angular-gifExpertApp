import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UXyeFEuXasKK02Oy7RLaKXYV1wpFE7R7';
  private _historial: string[] = [];

  //TODO cambiar any por su tipo
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {}

  buscarGifs( query:string = '') {

    // controla la busqueda mayuscula y minuscula, poniendola siempre en lowercase
    query = query.trim().toLowerCase();

    // controla que si la busqueda NO ! esta incluida en el array la inserte
    if( !this._historial.includes( query ) ){
      
      // cargar la ultima busqueda al inicio del array
      this._historial.unshift( query );

      // controla que solo se vean las ultimas 10 busquedas
      this._historial = this._historial.splice(0,10);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this.apiKey}&q=${query}&limit=10`)
        .subscribe( ( resp )=> {
          console.log(resp.data)
          this.resultados = resp.data

        });

  }


}
