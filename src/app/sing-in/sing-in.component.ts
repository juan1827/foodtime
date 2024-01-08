import { Component } from '@angular/core';

@Component({
  selector: 'app-sing-in',
  templateUrl: './sing-in.component.html',
  styleUrl: './sing-in.component.css'
})
export class SingInComponent {

  public user:any = {
    name:'',
    password:'',
  }

  enviar(){
    console.log(this.user)
  }
}
