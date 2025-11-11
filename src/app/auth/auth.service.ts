import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFormInterface } from './interfaces/register-form.interface';
import { LoginFormInterface } from './interfaces/login-form.interface';
import { tap } from 'rxjs';

// http://localhost:3000
//const URL = environment.urlServer;
const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http: HttpClient) { }

  register(userData: RegisterFormInterface){
    return this.http.post(`${URL}/user`, userData, {responseType: 'text'});
  }

  login(loginData: Partial<LoginFormInterface>){
    return this.http.post(`${URL}/user/login`, loginData)
    .pipe(tap((res:any)=>{
      //console.log(res['access_token']);
      localStorage.setItem('token', res['access_token']);
    }));
  }

  getAllUsers(){
    // let headers = new HttpHeaders({
    //   'token': localStorage.getItem('token')
    // });
    //console.log({headers});
    
    return this.http.get(`${URL}/user`);
  }

  getAllClient(credentials){
    // let headers = new HttpHeaders({
    //   'token': localStorage.getItem('token')
    // });
    const cl = this.http.get(`${URL}/client`,credentials);
    console.log(cl);
    
    return this.http.get(`${URL}/client`,credentials);
  }
}
