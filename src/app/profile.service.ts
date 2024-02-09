import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  constructor(private firestore: AngularFirestore) {}

  // Métodos para obtener y actualizar la información del perfil
  getProfile(userId: string): Observable<any> {
    return this.firestore.collection('profiles').doc(userId).valueChanges();
  }

  updateProfile(userId: string, profileData: any): Promise<void> {
    return this.firestore.collection('profiles').doc(userId).set(profileData, { merge: true });
  }
}