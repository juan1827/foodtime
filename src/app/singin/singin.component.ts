import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Asegúrate de importar ToastrService

@Component({
  selector: 'app-singin',
  templateUrl: './singin.component.html',
  styleUrls: ['./singin.component.css'],
})
export class SinginComponent {
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService 
  ) {}

  login() {
    this.authService
      .loginUser(this.email, this.password)
      .then(() => {
        console.log('Sesión iniciada');
        this.toastr.success('Inicio de sesión exitoso', 'Éxito', {
          timeOut: 2500,
        });
        this.router.navigate(['wall']);
      })
      .catch((error) => {
        console.error('Error al iniciar sesión:', error);
        this.toastr.error('Error al iniciar sesión: ' + error.message, 'Error', {
          timeOut: 2500,
        });
      });
  }
}