import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listNeraca;
  constructor(public data: DataService,public router:Router,public auth:AuthService,public afAuth:AngularFireAuth) { 
    // data.getListNeraca().subscribe(actions=>{
    //   this.listNeraca=[]
    //   actions.forEach(action=>{
    //   this.listNeraca.push({'key':action.payload.key,'value':action.payload.val()})
    //   })
    //   // console.log(this.listNeraca[0].value.nama)
    // })
    // console.log("yes")

    this.afAuth.authState.subscribe(user => {
      if (user){
        console.log("displayname: "+user.displayName)
        data.getNeracaByUsers(user.displayName).subscribe(actions=>{
          console.log("if")
          var listKeyNeraca=[]
          // console.log(actions)
          actions.forEach(action=>{
            listKeyNeraca.push(action.payload.val())
            // const neraca = action.payload.val().id_neraca
            // console.log(action.payload.val())
            // data.getNeraca().subscribe(action=>{
            //   this.listNeraca = this.listNeraca.map(neraca=>{
            //       if (neraca.id_neraca == action.payload.key){
            //         neraca={'key':neraca.key,'value':action.payload.val()}
            //         console.log(neraca)
            //         return neraca
            //       }
            //   })
            //   // console.log(this.listNeraca)
            // })
          })
          // console.log(listKeyNeraca)
          this.listNeraca=[]
          listKeyNeraca.forEach(key=>{
            data.getNeraca(key.id_neraca).subscribe(action=>{
              this.listNeraca.push({'value':action.payload.val(),'key':key.id_neraca})
            })
          })
          console.log(this.listNeraca)
          // this.listNeraca = this.listNeraca.map((neraca)=>{
          //   data.getNeraca(neraca.id_neraca).subscribe(action=>{
          //     return {'value':action.payload.val()}
          //   })
          // })
          // console.log(this.listNeraca)
        })
      } 
      // else {
        // this.isLoggedIn=false
        // this.user=null
        // this.userDisplayName=""
        // localStorage.setItem('user', null);
      // }
    })
    // data.getNeracaByUsers

  }

  goToBuatBaru(){
    this.router.navigate(['/neraca-baru'])
  }

  ngOnInit(): void {
  }

  hapusNeraca(id){
    this.data.hapusNeraca(id)
  }

}
