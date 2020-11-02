import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user
  userDisplayName
  isLoggedIn
  constructor(public  afAuth:  AngularFireAuth,public router:Router,public db:AngularFireDatabase) { 
    this.afAuth.authState.subscribe(user => {
      if (user){
        this.user = user;
        this.userDisplayName = user.displayName
        localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggedIn=true
        console.log(this.userDisplayName)
      } else {
        this.isLoggedIn=false
        this.user=null
        this.userDisplayName=""
        localStorage.setItem('user', null);
        
      }
    })
  }

  // getAuth():Observable<User[]>{
  //   return {user:}
  // }

  getIsLoggedIn(){
    if(this.user == null){
      return true
    }else{
      return false;
    }
  }

  register(username,email,password){
    // var username = this.registerForm.get('username').value
    // var email = this.registerForm.get('email').value
    // var password = this.registerForm.get('password').value
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then((cred)=>{
        console.log(cred.user)
        cred.user.updateProfile({
          displayName:username
        }).then(()=>{
          this.db.list("/users").push({"username":username})
          this.router.navigate(['/dashboard'])
        })
      })
  }

  login(email,password){
    // var  = this.registerForm.get('username').value
    // var email = this.loginForm.get('email').value
    // var password = this.loginForm.get('password').value
    this.afAuth.signInWithEmailAndPassword(email, password)
    .then(()=>{
      setTimeout(() => {  this.router.navigate(['/dashboard']) },500);
    })
  }

  logout(){
    this.afAuth.signOut().then(()=>{
      localStorage.removeItem('user');
      console.log("logout")
      this.router.navigate(['/'])
    })
    
  }


}
