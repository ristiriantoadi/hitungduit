import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isLoggedIn
  constructor(public router:Router,public afAuth:AngularFireAuth,public auth:AuthService) {
    // this.user = auth.user
    // this.userDisplayName = auth.userDisplayName
    // this.isLoggedIn = auth.isLoggedIn 
    this.afAuth.authState.subscribe(user => {
      if (user){
        // this.user = user;
        // this.userDisplayName = user.displayName
        // localStorage.setItem('user', JSON.stringify(this.user));
        this.isLoggedIn=true
        // console.log(this.userDisplayName)
      } else {
        this.isLoggedIn=false
        // this.user=null
        // this.userDisplayName=""
        // localStorage.setItem('user', null);
        
      }
    })
  }

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  canActivate(){
    // console.log(this.isLoggedIn)
    if (this.auth.getIsLoggedIn()){
      console.log("hello")
      return true
    }else{
      console.log("yes")
      this.router.navigate(['/login'])
      return false
    }
  }
  
}
