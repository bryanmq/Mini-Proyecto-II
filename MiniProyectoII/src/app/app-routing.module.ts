import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosComponent } from './components/gastos/gastos.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';

const routes: Routes = [
  { path: '', component: PresupuestoComponent },
  { path: 'gastos', component: GastosComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }