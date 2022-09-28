import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'UXyeFEuXasKK02Oy7RLaKXYV1wpFE7R7';
  private _historial: string[] = [];

  get historial() {
   
    return [...this._historial];
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
    }


    console.log(this._historial);

  }


}
