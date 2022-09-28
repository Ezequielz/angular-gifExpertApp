import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UXyeFEuXasKK02Oy7RLaKXYV1wpFE7R7';
  private servicioUrl: string = 'https://api.giphy.com/v1/gifs';
  private _historial: string[] = [];
  public resultados: Gif[] = []

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

  this._historial =  JSON.parse(localStorage.getItem('historial')!) || []

  this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []


  }

  buscarGifs( query:string = '') {

    // controla la busqueda mayuscula y minuscula, poniendola siempre en lowercase
    query = query.trim().toLowerCase();

    // controla que si la busqueda NO ! esta incluida en el array la inserte
    if( !this._historial.includes( query ) ){
      
      // cargar la ultima busqueda al inicio del array
      this._historial.unshift( query );

      // controla que solo se vean las ultimas 10 busquedas
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify( this._historial ))
    }

    const params = new HttpParams()
          .set('api_key', this.apiKey)
          .set('limit', '10')
          .set('q', query);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`, { params })
        .subscribe( ( resp )=> {
          console.log(resp.data)
          this.resultados = resp.data
          localStorage.setItem('resultados', JSON.stringify( this.resultados ))

        });

  }


}
