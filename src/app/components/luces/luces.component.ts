import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environmet } from 'src/interface/config/environment';

interface LucesButton {
  id: number;
  estado: string;
}

@Component({
  selector: 'app-luces',
  templateUrl: './luces.component.html',
  styleUrls: ['./luces.component.css']
})
export class LucesComponent {
  estadisticasActivas = false;
  lucesButtons: LucesButton[] = [
    { id: 1, estado: 'OFF' },
    { id: 2, estado: 'OFF' },
    { id: 3, estado: 'OFF' },
    { id: 4, estado: 'OFF' },
    { id: 5, estado: 'OFF' }
  ];

  constructor(private http: HttpClient) {}

  toggleEstadisticas() {
    this.estadisticasActivas = !this.estadisticasActivas;
  }

  private actualizarEstadoServidor(luzId: number, nuevoEstado: string) {
    const url = `${environmet.url}/Orden/${luzId}`;
    const body = { statusLed: nuevoEstado };

    this.http.patch(url, body).subscribe(
      (response) => {
        console.log('Orden actualizada', response);

        // Actualizar el estado local después de actualizar en el servidor
        const luz = this.lucesButtons.find(luz => luz.id === luzId);
        if (luz) {
          luz.estado = nuevoEstado;
        }
      },
      (error) => {
        console.error('Error al actualizar la orden', error);
      }
    );
  }

  EncenderOrden(luzId: number) {
    const luz = this.lucesButtons.find(luz => luz.id === luzId);
    if (luz) {
      const nuevoEstado = luz.estado === 'LOW' ? 'HIGH' : 'LOW';
      this.actualizarEstadoServidor(luzId, nuevoEstado);
    }
  }
  getEstadoLuz(luzId: number): string {
    const luz = this.lucesButtons.find(luz => luz.id === luzId);
    return luz?.estado || 'OFF';
  }

}

