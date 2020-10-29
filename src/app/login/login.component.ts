import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    // : new FormControl(),
    email: new FormControl(),
    password: new FormControl()
    // konfirmasiPassword: new FormControl()
  })

  constructor(public  afAuth: AngularFireAuth, public router:Router) { }

  ngOnInit(): void {
  }

  login(){
    // var  = this.registerForm.get('username').value
    var email = this.loginForm.get('email').value
    var password = this.loginForm.get('password').value
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      this.router.navigate(['/dashboard'])
    })
  }

}
