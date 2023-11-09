import { Component } from '@angular/core';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.component.html',
  styleUrls: ['./luces.component.css']
})
export class LucesComponent {
  estadisticasActivas = false;

  toggleEstadisticas() {
    this.estadisticasActivas = !this.estadisticasActivas;
  }

  getBotonClase() {
    return this.estadisticasActivas ? 'boton-activo' : 'boton-inactivo';
  }
}

