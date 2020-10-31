import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public db:AngularFireDatabase, private router:Router) { }

  getListNeraca(){
    return this.db.list("/neraca").snapshotChanges()
  }

  simpanNeracaBaru(nama,pemilik,deskripsi){
    this.db.list("/neraca").push({"nama":nama,"pemilik":pemilik,"deskripsi":deskripsi})
    .then(()=>{
      this.router.navigate(['/dashboard'])
    })   
  }
}
