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

  // getNeraca(username){
  //   return this.db.list("/neraca",ref=>ref.orderByChild('pemilik').equalTo(username)).snapshotChanges()
  // }

  getNeraca(idNeraca){
    return this.db.object("/neraca/"+idNeraca).snapshotChanges()
  }

  getNeracaByUsers(username){
    return this.db.list("/users/"+username+"/neracas").snapshotChanges()
  }

  simpanNeracaBaru(nama,pemilik,deskripsi){
    this.db.list("/neraca").push({"nama":nama,"pemilik":pemilik,"deskripsi":deskripsi})
    .then((x)=>{
      console.log("x: "+x.key)
      this.db.list("/users/"+pemilik+"/neracas").push({"id_neraca":x.key})
      this.router.navigate(['/dashboard'])
    })   
  }

  hapusNeraca(id){
    this.db.object("/neraca/"+id).remove()
  }

  simpanPemasukan(pemasukan,id){
    this.db.list("neraca/"+id+"/pemasukan").push({"sumber":pemasukan.sumber,"nominal":pemasukan.nominal,"user":pemasukan.user})
  }

  simpanPengeluaran(pengeluaran,id){
    this.db.list("neraca/"+id+"/pengeluaran").push({"sumber":pengeluaran.sumber,"nominal":pengeluaran.nominal,"user":pengeluaran.user})
  }

  resetNeraca(id){
    this.db.list("neraca/"+id+"/pengeluaran").remove()
    this.db.list("neraca/"+id+"/pemasukan").remove()
  }

  getPemasukan(id){
    return this.db.list("/neraca/"+id+"/pemasukan").snapshotChanges()
  }

  getPengeluaran(id){
    return this.db.list("/neraca/"+id+"/pengeluaran").snapshotChanges()
  }

  tambahUser(username,idNeraca){
    this.db.list("neraca/"+idNeraca+"/users").push({"username":username})
    this.db.list("users/"+username+"/neracas").push({"id_neraca":idNeraca})
  }

  getUsers(id){
    return this.db.list("neraca/"+id+"/users").snapshotChanges()
  }

  hapusUser(idUser,idNeraca){
    this.db.object("neraca/"+idNeraca+"/users/"+idUser).remove()
  }

  // getNeraca(){

  // }
}
