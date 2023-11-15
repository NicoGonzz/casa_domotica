import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EstadisticasComponent, LucesComponent, PuertasComponent } from 'src/app/components';
import { ControlEstadisticasComponent } from 'src/app/components/control-estadisticas';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'control_luces', component: LucesComponent},
  {path: 'control_puertas', component: PuertasComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
  {path: 'control-estadisticas', component: ControlEstadisticasComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
