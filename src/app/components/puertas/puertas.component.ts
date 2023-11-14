import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environmet } from 'src/interface/config/environment';

interface PuertasButton {
  id: number;
  estado: string;
}

@Component({
  selector: 'app-puertas',
  templateUrl: './puertas.component.html',
  styleUrls: ['./puertas.component.css']
})
export class PuertasComponent {
  estadisticasActivas = false;
  puertaPrincipalEstado = 'CLOSE';
  puertaGarageEstado = 'CLOSE';
  vecesAbiertaPuertaPrincipal = 0;

  puertasButtons: PuertasButton[] = [
    { id: 6, estado: 'CLOSE' },
    { id: 7, estado: 'CLOSE' }
  ];

  constructor(private http: HttpClient) {}

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

  private actualizarEstadoServidor(puertaId: number, nuevoEstado: string) {
    const url = `${environmet.url}/Orden/${puertaId}`;

    // Ajusta las propiedades del cuerpo según lo que espere tu backend
    let body: any;

    if (nuevoEstado === 'OPEN' || nuevoEstado === 'CLOSE') {
      // Ajusta las propiedades según lo que espere tu backend
      body = { StadoPuerta: nuevoEstado, Opendegrees: nuevoEstado === 'OPEN' ? 90 : 0, Closedegrees: 0 };
    } else {
      body = { statusPuerta: nuevoEstado };
    }

    this.http.patch(url, body).subscribe(
      (response) => {
        console.log('Estado de puerta actualizado', response);
        const puerta = this.puertasButtons.find(puerta => puerta.id === puertaId);
        if (puerta) {
          puerta.estado = nuevoEstado;
          if (puertaId === 6 && nuevoEstado === 'OPEN') {
            this.vecesAbiertaPuertaPrincipal++;
          }
        }
      },
      (error) => {
        console.error('Error al actualizar el estado de la puerta', error);
      }
    );
  }

  AccionPuerta(puertaId: number) {
    const puerta = this.puertasButtons.find(puerta => puerta.id === puertaId);
    if (puerta) {
      const nuevoEstado = puerta.estado === 'CLOSE' ? 'OPEN' : 'CLOSE';
      this.actualizarEstadoServidor(puertaId, nuevoEstado);
    }
  }

  getEstadoPuerta(puertaId: number): string {
    const puerta = this.puertasButtons.find(puerta => puerta.id === puertaId);
    return puerta?.estado || 'CLOSE';
  }

  getBotonColor(puertaId: number): string {
    const puerta = this.puertasButtons.find(puerta => puerta.id === puertaId);
    return puerta?.estado === 'CLOSE' ? 'boton-rojo' : puerta?.estado === 'OPEN' ? 'boton-verde' : 'boton-azul';
  }

}

