import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LucesComponent } from './components/luces/luces.component';
import { PuertasComponent } from './components/puertas/puertas.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';
import { HttpClientModule } from '@angular/common/http';
import { ControlEstadisticasComponent } from './components/control-estadisticas/control-estadisticas.component';


@NgModule({
  declarations: [
    AppComponent,
    LucesComponent,
    PuertasComponent,
    EstadisticasComponent,
    ControlEstadisticasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
