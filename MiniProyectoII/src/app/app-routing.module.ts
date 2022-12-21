import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';

const routes: Routes = [
  { path: '', component: PresupuestoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }