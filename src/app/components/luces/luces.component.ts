import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { environmet } from 'src/interface/config/environment';
import Chart from 'chart.js/auto'; // Importa Chart.js

interface LucesButton {
  id: number;
  estado: string;
}

@Component({
  selector: 'app-luces',
  templateUrl: './luces.component.html',
  styleUrls: ['./luces.component.css']
})
export class LucesComponent implements OnInit{
  estadisticasActivas = false;
  lucesButtons: LucesButton[] = [
    { id: 1, estado: 'LOW' },
    { id: 2, estado: 'LOW' },
    { id: 3, estado: 'LOW' },
    { id: 4, estado: 'LOW' },
    { id: 5, estado: 'LOW' }
  ];
  private tiempoEncendido: number[] = [0, 0, 0, 0, 0];
  private potenciaNominal = 50; // Puedes ajustar esto según la potencia nominal de tus luces
// Datos para las gráficas
  chartLabels: string[] = ['Cocina', 'Sala', 'Baño', 'Habitacion', 'Garaje'];
  chartData: number[] = [10, 0, 100, 0, 1000];
  chart: Chart | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.createChart(); // Llama al método para crear la gráfica cuando se inicie el componente
    setInterval(() => {
      this.updateChartData(); // Actualiza los datos de la gráfica periódicamente
    }, 1000)
  }

  toggleEstadisticas() {
    this.estadisticasActivas = !this.estadisticasActivas;

  }

  /*getDataFromServer() {
    const url1 = `${environmet.url}/Estadisticas/20231114`; // Reemplaza con la URL correcta para obtener datos del servidor
    this.http.get<any>(url1).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.lucesButtons = response.data;
        } else {
          console.error('Error al obtener datos del servidor');
        }
      },
      (error) => {
        console.error('Error al obtener datos del servidor', error);
      }
    );
  }*/

  private traerDataServidor(luzId: number, nuevoEstado: string) {
    const url = `${environmet.url}/Orden/${luzId}`;
    const body = { statusLed: nuevoEstado };
    this.http.patch(url, body).subscribe(
      (response) => {
        console.log('Orden actualizada', response);
        const luz = this.lucesButtons.find(luz => luz.id === luzId);
        if (luz) {
          luz.estado = nuevoEstado;
        }
      },
      (error) => {
        console.error('Error al actualizar la orden', error);
      }
    );
    if (nuevoEstado === 'HIGH') {
      this.iniciarConteoTiempo(luzId);
    }
  }
  private actualizarEstadoServidor(luzId: number, nuevoEstado: string) {
    const url = `${environmet.url}/Orden/${luzId}`;
    const body = { statusLed: nuevoEstado };

    this.http.patch(url, body).subscribe(
      (response) => {
        console.log('Orden actualizada', response);
        const luz = this.lucesButtons.find(luz => luz.id === luzId);
        if (luz) {
          luz.estado = nuevoEstado;
        }
      },
      (error) => {
        console.error('Error al actualizar la orden', error);
      }
    );
    if (nuevoEstado === 'HIGH') {
      this.iniciarConteoTiempo(luzId);
    }
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
  getBotonColor(id: number): string {
    const luz = this.lucesButtons.find(luz => luz.id === id);
    return luz?.estado === 'LOW' ? 'boton-rojo' : luz?.estado === 'HIGH' ? 'boton-verde' : 'boton-azul';
  }
  private iniciarConteoTiempo(id: number) {
    setInterval(() => {
      const luz = this.lucesButtons.find(luz => luz.id === id);
      if (luz?.estado === 'HIGH') {
        this.tiempoEncendido[id - 1]++;
      }
    }, 1000); // Actualiza cada segundo
  }



  public calcularEnergia(luzId: number): number {
    return this.potenciaNominal * this.tiempoEncendido[luzId - 1];
  }
  get EnergiaTotal(): number {
    let energiaTotal = 0;
    for (let i = 0; i < this.tiempoEncendido.length; i++) {
      energiaTotal += this.calcularEnergia(i + 1);
    }
    return energiaTotal;
  }
  createChart() {
    const canvas = document.getElementById('energyChart') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: this.chartLabels,
          datasets: [{
            label: 'Consumo de energía por habitación',
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
  updateChartData() {
    if (this.chart) {
      // Actualiza los datos del gráfico con el cálculo de energía por habitación
      for (let i = 0; i < this.chartData.length; i++) {
        this.chartData[i] = this.calcularEnergia(i + 1);
      }

      // Actualiza los datos en el gráfico y lo renderiza
      this.chart.data.datasets[0].data = this.chartData;
      this.chart.update();
    }
  }
}

