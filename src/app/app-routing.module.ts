import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UsComponent } from './us/us.component';
import { ServicesComponent } from './services/services.component';
import { SinginComponent } from './singin/singin.component';
import { SingupComponent } from './singup/singup.component';
import { WallComponent } from './wall/wall.component';
import { UploadComponent } from './upload/upload.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {path:'',component: HomeComponent}, 
  {path:'us', component: UsComponent},
  {path:'services', component: ServicesComponent},
  {path:'singin', component:SinginComponent},
  {path:'upload', component: UploadComponent},
  {path:'wall', component:WallComponent},
  {path:'profile', component:ProfileComponent},
  {path:'singup', component:SingupComponent},
  {path:'', redirectTo: '/singin', pathMatch: 'full'},
  {path:'', redirectTo: '/profile', pathMatch: 'full'},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
