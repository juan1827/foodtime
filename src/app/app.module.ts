import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { UsComponent } from './us/us.component';
import { ServicesComponent } from './services/services.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WallComponent } from './wall/wall.component';
import { initializeApp } from '@angular/fire/app';
import { getFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';

// Define las rutas como un array de objetos
const routes: Routes = [
  { path: 'singin', component: SinginComponent },
  { path: 'wall', component: WallComponent },
  // ... otras rutas ...
  { path: '', redirectTo: '/singin', pathMatch: 'full' }, // Ruta predeterminada
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsComponent,
    ServicesComponent,
    SinginComponent,
    SingupComponent,
    FooterComponent,
    WallComponent,
    UploadComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes),
    ToastrModule.forRoot(),
    ReactiveFormsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
