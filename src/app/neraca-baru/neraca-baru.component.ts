import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-neraca-baru',
  templateUrl: './neraca-baru.component.html',
  styleUrls: ['./neraca-baru.component.css']
})
export class NeracaBaruComponent implements OnInit {


  neracaBaruForm = new FormGroup({
    nama: new FormControl(),
    // username: new FormControl(),
    deskripsi: new FormControl()
  })

  constructor(public data:DataService,public auth:AuthService) { }

  ngOnInit(): void {
  }

  simpan(){
    var nama=this.neracaBaruForm.get('nama').value
    var deskripsi=this.neracaBaruForm.get('deskripsi').value
    var pemilik = this.auth.userDisplayName;

    this.data.simpanNeracaBaru(nama,pemilik,deskripsi)
    
  }

}
