import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin/admin.service';

@Component({
  selector: 'app-uplatnice',
  templateUrl: './uplatnice.component.html',
  styleUrls: ['./uplatnice.component.scss']
})
export class UplatniceComponent implements OnInit {
  uplatnice: any[];

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
  }

  addUplatnica(uplatnica){
    this.adminService.saveUplatnica(uplatnica).subscribe((response) => {
      alert('Uspjesno ste dodali uplatnicu')
    }, error => {
      alert('Error, nesto nije ok')
    });
  }

}
