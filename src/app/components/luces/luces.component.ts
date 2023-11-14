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
  private tiempoEncendido: number[] = [0, 0, 0, 0, 0];
  private potenciaNominal = 50; // Puedes ajustar esto según la potencia nominal de tus luces


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
}

