import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { AppRoutingModule } from './app-routing.module';
import { GastosComponent } from './components/gastos/gastos.component';
import {  Routes } from '@angular/router';
import { DetalleGastoComponent } from './components/detalle-gasto/detalle-gasto.component';
import { GastosPrincipalComponent } from './components/gastos-principal/gastos-principal.component';
import { GastosListaComponent } from './components/gastos-lista/gastos-lista.component';
import { EditarGastoComponent } from './components/editar-gasto/editar-gasto.component';

const routes: Routes = [
  { path: '', component: PresupuestoComponent },
  // { path: 'gastos', component: GastosComponent },

];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PresupuestoComponent,
    GastosComponent,
    DetalleGastoComponent,
    GastosPrincipalComponent,
    GastosListaComponent,
    EditarGastoComponent
  ],
  imports: [
    BrowserModule,
    // RouterModule.forRoot(routes, { enableTracing: true }),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
