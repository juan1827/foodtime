import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsComponent } from './us/us.component';
import { ServicesComponent } from './services/services.component';
import { SingInComponent } from './sing-in/sing-in.component';
import { SingUpComponent } from './sing-up/sing-up.component';

const routes: Routes = [
  {path:'',component: HomeComponent}, 
  {path:'us', component: UsComponent},
  {path:'services', component: ServicesComponent},
  {path:'sing-in', component:SingInComponent},
  {path:'sing-up', component:SingUpComponent},
  {path:'**', redirectTo: '', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
