import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { EstadisticasComponent, LucesComponent, PuertasComponent } from 'src/app/components';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'control_luces', component: LucesComponent},
  {path: 'control_puertas', component: PuertasComponent},
  {path: 'estadisticas', component: EstadisticasComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
