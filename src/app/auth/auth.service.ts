import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFormInterface } from './interfaces/register-form.interface';
import { LoginFormInterface } from './interfaces/login-form.interface';
import { tap } from 'rxjs';
import { UpdateUserPasswordInterface } from './interfaces/update-user-password.interface';

// http://localhost:3000
//const URL = environment.urlServer;
const URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
constructor(private http: HttpClient) { }

  register(userData: Partial<RegisterFormInterface>){
    return this.http.post(`${URL}/user`, userData, {responseType: 'text'});
  }

  login(loginData: Partial<LoginFormInterface>){
    return this.http.post(`${URL}/user/login`, loginData)
    .pipe(tap((res:any)=>{
      // console.log(res['username']);
      // console.log(res['userId']);
      localStorage.setItem('token', res['access_token']);
      //localStorage.setItem('userId', res['userId']);
      //localStorage.setItem('username', res['username']);
    }));
  }

  get token():string{
    return localStorage.getItem('token');
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

  deleteUser(id: number){
    // let headers = new HttpHeaders({
    //   'token': this.token
    // });

    return this.http.delete(`${URL}/user/${id}`);
  }

  // changePassword(id: number, changePass: ChangePasswordInterface){
  //  let headers = new HttpHeaders({
  //     'token': this.token
  //   });

  //   return this.http.patch(`${URL}/user/${id}`, changePass);
  // }

  changePassword(id: any, updatePasswordUserInterface){
  //  let headers = new HttpHeaders({
  //     'token': this.token
  //   });

    return this.http.patch(`${URL}/user/${id}`, updatePasswordUserInterface, {responseType: 'text'});
  }
}
