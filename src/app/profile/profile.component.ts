import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProfileService } from '../profile.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userId: string | null = null;
  profile: any = {
  
  };
  private unsubscribe$ = new Subject<void>();

  constructor(private authService: AuthService, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.authService.getAuthState()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        if (user) {
          this.userId = user.uid;
          this.getProfileData();
        }
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getProfileData(): void {
    if (this.userId) {
      this.profileService.getProfile(this.userId)
        .pipe(
          takeUntil(this.unsubscribe$),
          catchError(error => {
            console.error('Error al obtener el perfil:', error);
            return of(null); // Devolver un observable nulo para evitar errores
          })
        )
        .subscribe(profile => {
          if (profile) {
            this.profile = {
              image: profile.image || '',
              name: profile.name || '',
              username: profile.username || '',
              email: profile.email || '',
              birthdate: profile.birthdate || '',
              city: profile.city || '',
              phone: profile.phone || '',
              description: profile.description || '',
              animal: profile.animal || ''
            };
          } else {
            console.error('El perfil está vacío o no se pudo recuperar.');
            // Asignar valores predeterminados si el perfil está vacío
            this.profile = {
              image: '',
              name: '',
              username: '',
              email: '',
              birthdate: '',
              city: '',
              phone: '',
              description: '',
              animal: ''
            };
          }
        });
    }
  }
  updateProfile(): void {
    if (this.userId && this.profile) {
      this.profileService.updateProfile(this.userId, this.profile)
        .then(() => {
          console.log('Perfil actualizado exitosamente');
        })
        .catch(error => {
          console.error('Error al actualizar el perfil:', error);
        });
    }
  }
}