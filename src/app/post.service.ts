import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage'; // Importa AngularFireStorage
import { finalize } from 'rxjs/operators';
import { AuthService } from './auth.service'; // Importa el servicio de autenticación

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private postsCollection: AngularFirestoreCollection<any>;

  constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    this.postsCollection = this.afs.collection('posts');
  }

  getPosts(): Observable<any[]> {
    return this.postsCollection.valueChanges({ idField: 'postId' });
  }

  addPost(postData: any, usuario: string | null): Promise<any> {
    // Verificar si se proporciona un nombre de usuario
    if (!usuario) {
      return Promise.reject('No se puede agregar un post sin un usuario');
    }

    // Agregar el nombre de usuario y la fecha de publicación
    postData.usuario = usuario;
    postData.fechaPublicacion = new Date();

    return this.postsCollection.add(postData);
  }

  addComment(postId: string, commentData: any): Promise<any> {
    return this.afs.collection(`posts/${postId}/comments`).add(commentData);
  }

  getComments(postId: string): Observable<any[]> {
    return this.afs.collection(`posts/${postId}/comments`).valueChanges({ idField: 'commentId' });
  }

  uploadImage(file: File): Promise<string> {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath); // Utiliza storage.ref() para obtener la referencia al archivo
    const uploadTask = this.storage.upload(filePath, file); // Sube el archivo al storage

    // Devuelve una promesa que resuelve la URL de descarga después de que la carga esté completa
    return new Promise<string>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            url => {
              resolve(url); // Resuelve la URL de descarga
            },
            error => {
              reject(error); // Rechaza la promesa si hay un error al obtener la URL
            }
          );
        })
      ).subscribe();
    });
  }
}