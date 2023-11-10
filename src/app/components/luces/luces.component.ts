import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environmet } from 'src/interface/config/environment';

@Component({
  selector: 'app-luces',
  templateUrl: './luces.component.html',
  styleUrls: ['./luces.component.css']
})
export class LucesComponent {
  estadisticasActivas = false;

  constructor(private http: HttpClient) {}

  toggleEstadisticas() {
    this.estadisticasActivas = !this.estadisticasActivas;
  }

  getBotonClase() {
    return this.estadisticasActivas ? 'boton-activo' : 'boton-inactivo';
  }
  EncenderOrden(orderId: number, statusLed: string) {
    console.log('Estoy funcionando');
    const url = `${environmet.url}`;
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

