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
  ultimaAperturaPuertaPrincipal: string | null = null; // Guardará la hora de la última apertura
  ultimaAperturaPuertaGarage: string | null = null;

  puertasButtons: PuertasButton[] = [
    { id: 6, estado: 'CLOSE' },
    { id: 7, estado: 'CLOSE' }
  ];

  constructor(private http: HttpClient) {}


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
            this.ultimaAperturaPuertaPrincipal = this.obtenerHoraActual();
          } else if (puertaId === 7 && nuevoEstado === 'OPEN') {
            //this.vecesAbiertaPuertaGarage++;
            this.ultimaAperturaPuertaGarage = this.obtenerHoraActual();
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

  getEstadoBoton(puertaId: number): string {
    const puerta = this.puertasButtons.find(p => p.id === puertaId);

    if (puerta) {
      switch (puerta.estado) {
        case 'OPEN':
          return 'Abierta';
        case 'CLOSE':
          return 'Cerrada';
        default:
          return 'Estado Desconocido';
      }
    }

    return 'Estado Desconocido';
  }

  getBotonColor(puertaId: number): string {
    const puerta = this.puertasButtons.find(puerta => puerta.id === puertaId);
    return puerta?.estado === 'CLOSE' ? 'boton-rojo' : puerta?.estado === 'OPEN' ? 'boton-verde' : 'boton-azul';  }
    private obtenerHoraActual(): string {
      const ahora = new Date();
      const horas = ahora.getHours().toString().padStart(2, '0');
      const minutos = ahora.getMinutes().toString().padStart(2, '0');
      const segundos = ahora.getSeconds().toString().padStart(2, '0');
      return `${horas}:${minutos}:${segundos}`;
    }
}

