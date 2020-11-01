import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  listNeraca;
  constructor(public data: DataService,public router:Router) { 
    data.getListNeraca().subscribe(actions=>{
      this.listNeraca=[]
      actions.forEach(action=>{
      this.listNeraca.push({'key':action.payload.key,'value':action.payload.val()})
      })
      // console.log(this.listNeraca[0].value.nama)
    })

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
