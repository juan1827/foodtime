import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';



@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css'],
})
export class SingupComponent {
  username: string = '';
  email: string = '';
  password1: string = '';
  password2: string = '';

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  register() {
    if (this.password1 !== this.password2) {
      this.showError('Las contraseñas no coinciden');
      return;
    }

    this.authService
      .registerUser(this.username, this.email, this.password1)
      .then(() => {
        this.showSuccess('¡Usuario registrado!');
        this.router.navigate(['/singin']);
      })
      .catch((error) => {
        this.showError('Error durante el registro: ' + error.message);
      });
  }

  public showSuccess(message: string) {
    this.toastr.success(message, 'Éxito', { timeOut: 2500 });
  }

  public showError(message: string) {
    this.toastr.error(message, 'Error', { timeOut: 2500 });
  }
}