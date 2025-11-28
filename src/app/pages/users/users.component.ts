import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy{
  @ViewChild(DataTableDirective, { static: false })
  dtElement: DataTableDirective | undefined;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  // dtOptions: ADTSettings = {};
  // dtTrigger: Subject<ADTSettings> = new Subject<ADTSettings>();
  users: UserModel[]=[];
  
  constructor(
    private authService: AuthService
  ) { }

    ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      searching: true,
      processing: true,
      responsive: true,
      info: true
      //language: {url:'CDN: datatables.french...'}
      // Add other DataTables options here                                                                                                         
    };
    this.getAllUsers();
  }

  getAllUsers(){
    this.authService.getAllUsers().subscribe((res:any)=>{
      //console.log(res);
      this.users = res;
      this.dtTrigger.next(null);
    });
  }
  

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

}
