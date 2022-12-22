import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GastosPrincipalComponent } from './components/gastos-principal/gastos-principal.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';

const routes: Routes = [
  { path: '', component: PresupuestoComponent },
  { path: 'gastos', component: GastosPrincipalComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }