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
}
