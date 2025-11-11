import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  API_LINK = 'http://localhost:3000/client';

  menu:any[]=[{
    title:'dashboard',
    icon:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {title:'Users', url:'users'},
      {title:'Clients', url:'clients'},
      {title:'Products', url:'products'},
      {title:'Stock', url:'stock'},
    ]
  }];
constructor(
    private http: HttpClient
  ) { }

  getClients(){
    return this.http.get(this.API_LINK);
  }

  getClientById(id: number){
    return this.http.get(this.API_LINK + `/${id}`);
  }
}
