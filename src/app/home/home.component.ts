import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pemasukans = []
  pengeluarans = []

  inputPemasukan = new FormGroup({
    sumber: new FormControl(),
    nominal: new FormControl()
  })
  inputPengeluaran = new FormGroup({
    sumber: new FormControl(),
    nominal: new FormControl()
  })
  balance=0
  

  constructor() { }

  ngOnInit(): void {
  }

  tambahPemasukan(){
    // console.log("hello")
    // console.log(this.inputPemasukan.get('sumber').value)
    var sumber = this.inputPemasukan.get('sumber').value
    var nominal = this.inputPemasukan.get('nominal').value

    this.pemasukans.push({
      "sumber":sumber,
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
      "nominal":nominal
    })

    this.setBalance()

    this.inputPengeluaran.setValue({sumber:"",nominal:""})
  }

}
