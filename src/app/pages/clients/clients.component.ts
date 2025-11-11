import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SidebarService } from 'src/app/services/sidebar.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

    clients:any;
  constructor(
    private sibebarService: SidebarService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    // this.sibebarService.getClients().subscribe(
    //   (clients)=>{
    //     this.clients = clients
    //     console.log(clients);
    //   }
    // );
    //this.getAllClients();
  }

  // getAllClients(){
  //   const user = localStorage.getItem('token');
  //   this.userService.getAllClients(user).subscribe((res)=>{
  //     console.log(res);   
  //   });
  // }

}
