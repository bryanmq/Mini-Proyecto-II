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
<<<<<<< HEAD
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
=======
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { AppRoutingModule } from './app-routing.module';
>>>>>>> 952f8213d0bc8fbcf012dfa33f524d11daa2d17f

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PresupuestoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
<<<<<<< HEAD
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
=======
    ReactiveFormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
    AppRoutingModule
>>>>>>> 952f8213d0bc8fbcf012dfa33f524d11daa2d17f
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
