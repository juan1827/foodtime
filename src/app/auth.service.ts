import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'; // Importa los operadores necesarios aquí



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {}

  // Método para registrar un nuevo usuario
  registerUser(username: string, email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        
        // Verifica que user no sea null antes de acceder a su uid
        if (user) {
          // Almacena información adicional del usuario en Firestore
          return this.firestore.collection('users').doc(user.uid).set({
            username: username,
            email: email,
            // Otros campos que desees almacenar
          });
        } else {
          // Manejo de la situación en la que user es null
          console.error('User is null after registration');
          throw new Error('User is null after registration');
        }
      })
      .catch((error) => {
        console.error('Error registering user:', error);
        throw error;
      });
  }
  loginUser(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }
  getAuthState(): Observable<any> {
    return this.afAuth.authState;
  }

  logout() {
    this.afAuth.signOut();
  }
   // Método para obtener el nombre de usuario del usuario autenticado
  getUsername(): Observable<string | null> {
    return this.afAuth.authState.pipe(
      // Mapear el estado de autenticación para obtener el nombre de usuario del documento de usuario en Firestore
      switchMap(user => {
        if (user) {
          return this.firestore.collection('users').doc(user.uid).valueChanges();
        } else {
          return of(null); // Si no hay usuario autenticado, devolver null
        }
      }),
      map((userData: any) => {
        return userData ? userData.username : null; // Devolver el nombre de usuario si existe, de lo contrario, devolver null
      })
    );
  }
}