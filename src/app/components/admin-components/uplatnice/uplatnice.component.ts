import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-uplatnice',
  templateUrl: './uplatnice.component.html',
  styleUrls: ['./uplatnice.component.scss']
})
export class UplatniceComponent implements OnInit {
  uplatnice: any;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.getUplatnice();
  }

  addUplatnica(uplatnica){
    this.adminService.saveUplatnica(uplatnica).subscribe((response) => {
      this.getUplatnice();
      alert('Uspjesno ste dodali uplatnicu')
    }, error => {
      alert('Error, nesto nije ok')
    });
  }

  getUplatnice(){
    this.adminService.getUplatnice().subscribe(response => {
        this.uplatnice = response;
    })
  }

}
