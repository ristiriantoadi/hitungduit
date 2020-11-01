import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-neraca',
  templateUrl: './neraca.component.html',
  styleUrls: ['./neraca.component.css']
})
export class NeracaComponent implements OnInit {

  pemasukans = []
  pengeluarans = []
  neracaId

  inputPemasukan = new FormGroup({
    sumber: new FormControl(),
    nominal: new FormControl()
  })
  inputPengeluaran = new FormGroup({
    sumber: new FormControl(),
    nominal: new FormControl()
  })
  balance=0

  constructor(public auth:AuthService,public data:DataService,public route:ActivatedRoute,public router:Router) { 
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
      // this.neracaId = parseInt(params.get('id'));
      this.neracaId = params.get('id')
      console.log(this.neracaId)
      // this.neracaId = id;

      this.data.getPemasukan(this.neracaId).subscribe(actions=>{
        // this.listNeraca=[]
        actions.forEach(action=>{
          this.pemasukans.push(action.payload.val())
          // console.log(action.payload.val())
        })
        this.data.getPengeluaran(this.neracaId).subscribe(actions=>{
          // this.listNeraca=[]
          actions.forEach(action=>{
          this.pengeluarans.push(action.payload.val())
            // console.log(action.payload.val())
          })
          this.setBalance()
        })
      // console.log(this.pemasukans[0].sumber)
      // console.log(action)
      })
    })
  }

  tambahPemasukan(){
    // console.log("hello")
    // console.log(this.inputPemasukan.get('sumber').value)
    var sumber = this.inputPemasukan.get('sumber').value
    var nominal = this.inputPemasukan.get('nominal').value

    this.pemasukans.push({
      "sumber":sumber,
      "user":this.auth.userDisplayName,
      "nominal":nominal
    })

    this.inputPemasukan.setValue({sumber:"",nominal:""})

    this.setBalance()
  }

  hapus(sumber){
    //cek pemasukan
    this.pemasukans = this.pemasukans.filter((pemasukan)=>{
      if(pemasukan.sumber != sumber){
        return pemasukan
      }
    })
    //cek pengeluaran
    this.pengeluarans = this.pengeluarans.filter((pengeluaran)=>{
      if(pengeluaran.sumber != sumber){
        return pengeluaran
      }
    })

    this.setBalance()
  }

  setBalance(){
    console.log("halo")
    var balance=0
    this.pemasukans.forEach(pemasukan => {
      balance+=pemasukan.nominal
    });
    this.pengeluarans.forEach(pengeluaran => {
      balance-=pengeluaran.nominal
    });

    this.balance=balance
  }

  tambahPengeluaran(){
    var sumber = this.inputPengeluaran.get('sumber').value
    var nominal = this.inputPengeluaran.get('nominal').value

    this.pengeluarans.push({
      "sumber":sumber,
      "user":this.auth.userDisplayName,
      "nominal":nominal
    })

    this.setBalance()

    this.inputPengeluaran.setValue({sumber:"",nominal:""})
  }

  simpan(){
    this.data.resetNeraca(this.neracaId)
    this.pemasukans.forEach(pemasukan=>{
      this.data.simpanPemasukan(pemasukan,this.neracaId)
    })

    this.pengeluarans.forEach(pengeluaran=>{
      this.data.simpanPengeluaran(pengeluaran,this.neracaId)
    })

    this.router.navigate(['/dashboard'])
  }

}
