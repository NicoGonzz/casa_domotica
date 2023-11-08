import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LucesComponent } from './components/luces/luces.component';
import { PuertasComponent } from './components/puertas/puertas.component';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';

const routes: Routes = [
  {path: '',redirectTo: 'home',pathMatch: 'full'},
  {path: 'control_luces', component: LucesComponent},
  {path: 'control_puertas', component: PuertasComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
  {path: 'home', loadChildren: () =>import('./modules').then(m => m.HomeModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
