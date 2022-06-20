import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SerchGIFResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private api_key:string = 'E5mO6buIufzyEqVgy0vWCPNYO8qNOP9q';
  private _historial: string[] =[];
  public resultados: Gif[]=[];
  private limit: number=15;
  private servicioUrl:string='https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
   this._historial=JSON.parse(localStorage.getItem('Historial')!) || []
   this.resultados=JSON.parse(localStorage.getItem('Resultados')!) || []
  }

  get historial(){
     return [...this._historial]; 
  }

  buscarGifs(query: string){
    query= query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);
      localStorage.setItem('Historial', JSON.stringify(this._historial));
    }

    const params = new HttpParams()
    .set('api_key',this.api_key)
    .set('limit',this.limit)
    .set('q',query);
  

   this.http.get<SerchGIFResponse>(`${this.servicioUrl}/search`, {params})
      .subscribe( (resp: SerchGIFResponse)=>{
        console.log(resp.data);
        this.resultados=resp.data;
        localStorage.setItem('Resultados', JSON.stringify(this.resultados));
      })

  
  }

}
