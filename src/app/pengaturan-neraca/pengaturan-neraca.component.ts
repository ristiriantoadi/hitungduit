import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DataService } from '../service/data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-pengaturan-neraca',
  templateUrl: './pengaturan-neraca.component.html',
  styleUrls: ['./pengaturan-neraca.component.css']
})
export class PengaturanNeracaComponent implements OnInit {

  users;
  userForm = new FormGroup({
    username: new FormControl()
  });

  idNeraca;

  
  constructor(public data:DataService,public route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
    // let id = parseInt(params.get('id'));
      this.idNeraca = params.get('id')
      console.log("Id Neraca: "+this.idNeraca) 
      this.data.getUsers(this.idNeraca).subscribe(actions=>{
        this.users=[]
        actions.forEach(action=>{
          console.log(action.payload.val())
          this.users.push({'key':action.payload.key,'value':action.payload.val()})
        })
        console.log("User: "+this.users)  
      }) 
    })
  }
    

  tambahUser(){
    var username=this.userForm.get('username').value
    this.data.tambahUser(username,this.idNeraca)
    this.userForm.setValue({username:''})

  }

  hapus(userId){
    this.data.hapusUser(userId,this.idNeraca)
  }



}
