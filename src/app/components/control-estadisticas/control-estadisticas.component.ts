import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environmet } from 'src/interface/config/environment';
import Chart from 'chart.js/auto';

interface LucesButton {
  id: number;
  nombreLed: string;
  TiempoUsoHoras: number;
  TiempoApagarHoras: number;
  TiempoUsoSegundos: number;
  TiempoApagarSegundos: number;
}

@Component({
  selector: 'app-control-estadisticas',
  templateUrl: './control-estadisticas.component.html',
  styleUrls: ['./control-estadisticas.component.css']
})
export class ControlEstadisticasComponent {
  lucesButtons: LucesButton[] = [
    { id: 1, nombreLed: 'Energia Consumida en la cocina', TiempoUsoHoras: 0, TiempoApagarHoras: 0, TiempoUsoSegundos: 0, TiempoApagarSegundos: 0 },
    { id: 2, nombreLed: 'Energia Consumida en la Sala', TiempoUsoHoras: 0, TiempoApagarHoras: 0, TiempoUsoSegundos: 0, TiempoApagarSegundos: 0 },
    { id: 3, nombreLed: 'Energia Consumida en el Baño', TiempoUsoHoras: 0, TiempoApagarHoras: 0, TiempoUsoSegundos: 0, TiempoApagarSegundos: 0 },
    { id: 4, nombreLed: 'Energia Consumida en la Habitacion', TiempoUsoHoras: 0, TiempoApagarHoras: 0, TiempoUsoSegundos: 0, TiempoApagarSegundos: 0 },
    { id: 5, nombreLed: 'Energia Consumida en el Garaje', TiempoUsoHoras: 0, TiempoApagarHoras: 0, TiempoUsoSegundos: 0, TiempoApagarSegundos: 0 }
  ];

  chartLabels: string[] = [];
  chartData: number[] = [];

  chart: Chart | undefined;

  constructor(private http: HttpClient) {}

  getDataFromServer() {
    const url1 = `${environmet.url}/Estadisticas/20231114`; // Reemplaza con la URL correcta para obtener datos del servidor
    this.http.get<any>(url1).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.lucesButtons = response.data;
          this.lucesButtons = response.data.map((button: LucesButton) => ({
            ...button,
            TiempoUsoSegundos: +(button.TiempoUsoHoras * 3600).toFixed(2), // Convertir tiempo de uso a segundos
            TiempoApagarSegundos: +(button.TiempoApagarHoras * 3600).toFixed(2),
          }));

          this.chartLabels = this.lucesButtons.map(button => button.nombreLed);
          this.chartData = this.lucesButtons.map(button => button.TiempoUsoSegundos);
          this.createChart();

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

  createChart() {
    const canvas = document.getElementById('usageChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Tiempo de uso por LED (segundos)',
            data: this.chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  }

}


