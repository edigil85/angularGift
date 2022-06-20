import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent  {

  constructor(private gifService: GifsService) { }

  get historial(){
    return this.gifService.historial
  }
  
  buscar(historia: string){
      this.gifService.buscarGifs(historia)
  }
}
