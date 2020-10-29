import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user
  userDisplayName
  isLoggedIn
  constructor(public  afAuth:  AngularFireAuth,public router:Router) { 
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

  ngOnInit(): void {
  }

  async logout(){
    await this.afAuth.signOut();
    localStorage.removeItem('user');
    console.log("logout")
    this.router.navigate(['/'])
  }
}
