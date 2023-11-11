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

  getTextoBoton() {
    return this.estadisticasActivas ? 'ON' : 'OFF';
  }
  getBotonClase() {
    return this.estadisticasActivas ? 'boton-activo' : 'boton-inactivo';
  }
  private actualizarEstadoServidor() {
    console.log('Estoy funcionando');
    // Lógica para actualizar el estado en el servidor
    // Puedes agregar aquí la lógica que sea necesaria
  }

  EncenderOrden(orderId: number, statusLed: string) {


    const url = `${environmet.url}/Orden/${orderId}`;
    console.log('Estoy funcionando aca' + url);
    const body = { statusLed };

    this.http.patch(url, body).subscribe(
      (response) => {
        console.log('Orden actualizada', response);
      },
      (error) => {
        console.error('Error al actualizar la orden', error);
      }
    );
  }

}

