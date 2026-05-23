import { Injectable } from '@angular/core';
import { Mesure } from '../models/mesure.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UpdateClientFormInterface } from '../../interfaces/update-client.interface';
import { AddMesureFormInterface } from '../interfaces/add-mesure.interface';

@Injectable({
  providedIn: 'root'
})
export class MesuresService {

  private mesures : Mesure[];
  API_LINK = 'http://localhost:3000/mesure';
  API_LINKMC = 'http://localhost:3000/mesure/mesureClient';

  constructor(
    private http: HttpClient
  ) { }

  getMesures():Observable<Mesure[]>{
    return this.http.get<Mesure[]>(this.API_LINK);
   }

   getMesureById(id: number): Observable<Mesure>{
    return this.http.get<Mesure>(this.API_LINK + `/${id}`);
   }

   getMesureClientById(clientId: number): Observable<Mesure>{
    return this.http.get<Mesure>(this.API_LINKMC + `/${clientId}`);
   }

   addMesure(mesureData: Partial<AddMesureFormInterface>): Observable<any>{
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const params = new HttpParams().set('access_token', token);
    //   return this.http.post(this.link, mesure, {params});
    // }
    return this.http.post(this.API_LINK, mesureData, {responseType: 'text'});
   }


   updateMesure(id: string, updateMesureData: Partial<Mesure>){
     return this.http.put(this.API_LINK + `/${id}`, updateMesureData, {responseType: 'text'});
    //  const putMesure = this.http.put(this.link, mesure);
    //  console.log(putMesure);
   }

   deleteMesure(id: number){
    return this.http.delete(this.API_LINK + `/${id}`);
   }
}
