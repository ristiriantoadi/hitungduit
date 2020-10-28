import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    username: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    konfirmasiPassword: new FormControl()
  })

  constructor(public  afAuth: AngularFireAuth, public router:Router) { }

  ngOnInit(): void {
  }

  register(){
    var username = this.registerForm.get('username').value
    var email = this.registerForm.get('email').value
    var password = this.registerForm.get('password').value
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((cred)=>{
        console.log(cred.user)
        cred.user.updateProfile({
          displayName:username
        }).then(()=>{
          this.router.navigate(['/dashboard'])
        })
      })
  }

}
