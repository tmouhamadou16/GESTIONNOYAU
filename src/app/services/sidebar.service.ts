import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientModel } from '../pages/models/client.model';
import { AddClientFormInterface } from '../pages/interfaces/add-client.interface';
import { UpdateClientFormInterface } from '../pages/interfaces/update-client.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  API_LINK = 'http://localhost:3000/client';

  menu:any[]=[{
    title:'Dashboard',
    icon:'nav-icon fas fa-tachometer-alt',
    submenu:[
      {title:'Users', url:'users'},
      {title:'Clients', url:'clients'},
      {title:'Mesures', url:'mesures'},
      {title:'Produits', url:'produits'},
      {title:'Stock', url:'stock'},
    ]
  }];
constructor(
    private http: HttpClient
  ) { }
// <!------------ Debut Clients ------------------->

  getClients(): Observable<any>{
    // const httpOptions = {
    // //   headers: new HttpHeaders({
    // //     'Authorization': 'Bearer ' + localStorage.getItem('token')
    // //   })
    // // };
    return this.http.get(this.API_LINK);
  }

  getClientById(id: number){
    return this.http.get(this.API_LINK + `/${id}`);
  }

  addClient(clientData: Partial<AddClientFormInterface>){
    return this.http.post(this.API_LINK, clientData, {responseType: 'text'});
  }

  updateClient(id: string, updateClientData: Partial<UpdateClientFormInterface>){
      return this.http.put(this.API_LINK + `/${id}`, updateClientData, {responseType: 'text'});
    }

  deleteClient(id: number){
    return this.http.delete(this.API_LINK + `/${id}`);
  }
  // <!-----------Fin Clients --------------------->
}
