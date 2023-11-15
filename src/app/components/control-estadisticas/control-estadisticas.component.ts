import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environmet } from 'src/interface/config/environment';

interface LucesButton {
  id: number;
  nombreLed: string;
  TiempoUsoHoras: number;
  TiempoApagarHoras: number;
}

@Component({
  selector: 'app-control-estadisticas',
  templateUrl: './control-estadisticas.component.html',
  styleUrls: ['./control-estadisticas.component.css']
})
export class ControlEstadisticasComponent {
  lucesButtons: LucesButton[] = [
    { id: 1, nombreLed: 'Led1', TiempoUsoHoras: 0, TiempoApagarHoras: 0 },
    { id: 2, nombreLed: 'Led2', TiempoUsoHoras: 0, TiempoApagarHoras: 0 },
    { id: 3, nombreLed: 'Led3', TiempoUsoHoras: 0, TiempoApagarHoras: 0 },
    { id: 4, nombreLed: 'Led4', TiempoUsoHoras: 0, TiempoApagarHoras: 0 },
    { id: 5, nombreLed: 'Led5', TiempoUsoHoras: 0, TiempoApagarHoras: 0 }
  ];
  constructor(private http: HttpClient) {}

  getDataFromServer() {
    const url1 = `${environmet.url}/Estadisticas/20231114`; // Reemplaza con la URL correcta para obtener datos del servidor
    this.http.get<any>(url1).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.lucesButtons = response.data;
          console.log(response.data);
        } else {
          console.error('Error al obtener datos del servidor');
        }
      },
      (error) => {
        console.error('Error al obtener datos del servidor', error);
      }
    );
  }
}
