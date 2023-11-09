import { Component } from '@angular/core';

@Component({
  selector: 'app-puertas',
  templateUrl: './puertas.component.html',
  styleUrls: ['./puertas.component.css']
})
export class PuertasComponent {
  estadisticasActivas = false;
  puertaPrincipalEstado = 'Cerrada';
  puertaGarageEstado = 'Cerrada';
  vecesAbiertaPuertaPrincipal = 0;

  toggleEstadisticas() {
    this.estadisticasActivas = !this.estadisticasActivas;
  }

  getBotonClase() {
    return this.estadisticasActivas ? 'boton-activo' : 'boton-inactivo';
  }

  abrirPuertaPrincipal() {
    this.puertaPrincipalEstado = 'Abierta';
    this.vecesAbiertaPuertaPrincipal++;
  }

  cerrarPuertaPrincipal() {
    this.puertaPrincipalEstado = 'Cerrada';
  }

  abrirPuertaGarage() {
    this.puertaGarageEstado = 'Abierta';
  }

  cerrarPuertaGarage() {
    this.puertaGarageEstado = 'Cerrada';
  }
}

