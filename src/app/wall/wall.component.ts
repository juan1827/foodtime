import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { AuthService } from '../auth.service'; 
import { Observable } from 'rxjs';

@Component({
  selector: 'app-wall',
  templateUrl: './wall.component.html',
  styleUrls: ['./wall.component.css']
})
export class WallComponent implements OnInit {
  posts$: Observable<any[]> | undefined;
  selectedFile: File | undefined;
  selectedFileUrl: string | ArrayBuffer | null = null;
  currentUser: string | null = null;

  constructor(private postService: PostService, private authService: AuthService) {}

  ngOnInit(): void {
    this.posts$ = this.postService.getPosts();

    this.authService.getUsername().subscribe(
      username => {
        this.currentUser = username;
      }
    );
  }

  async createPost(postForm: any): Promise<void> {
    if (!this.currentUser) {
      console.error('No se puede crear una publicación sin un usuario.');
      return;
    }

    let imageUrl: string | null = null;
    if (this.selectedFile) {
      try {
        imageUrl = await this.postService.uploadImage(this.selectedFile);
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        return;
      }
    }

    const postData = {
      title: postForm.value.title,
      content: postForm.value.content,
      imageUrl: imageUrl 
    };

    this.postService.addPost(postData, this.currentUser)
      .then(() => {
        postForm.resetForm();
        this.selectedFile = undefined; 
        this.selectedFileUrl = null;
      })
      .catch((error: any) => {
        console.error('Error al subir la publicación', error);
      });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.selectedFileUrl = e.target?.result ?? null;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }
}