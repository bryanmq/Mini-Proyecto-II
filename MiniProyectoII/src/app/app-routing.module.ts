import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarGastoComponent } from './components/editar-gasto/editar-gasto.component';
import { GastosPrincipalComponent } from './components/gastos-principal/gastos-principal.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';

const routes: Routes = [
  { path: '', component: PresupuestoComponent },
  { path: 'gastos/:id', component: GastosPrincipalComponent },
  { path: 'editar-gasto/:id', component: EditarGastoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
