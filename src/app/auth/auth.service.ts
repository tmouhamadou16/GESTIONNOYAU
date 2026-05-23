import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterFormInterface } from './interfaces/register-form.interface';
import { LoginFormInterface } from './interfaces/login-form.interface';
import { tap } from 'rxjs';
import { UpdateUserPasswordInterface } from './interfaces/update-user-password.interface';
import { UpdateUserFormInterface } from './interfaces/update-user-form.interface';

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
    return this.http.get(`${URL}/user`);
  }


  deleteUser(id: number){
    return this.http.delete(`${URL}/user/${id}`);
  }

  // changePassword(id: number, changePass: ChangePasswordInterface){
  //  let headers = new HttpHeaders({
  //     'token': this.token
  //   });

  //   return this.http.patch(`${URL}/user/${id}`, changePass);
  // }

  changePassword(id: any, updatePasswordUserInterface){
    return this.http.patch(`${URL}/user/${id}`, updatePasswordUserInterface, {responseType: 'text'});
  }

  getUserById(id: number){
    return this.http.get(`${URL}/user/${id}`);
  }

  updateUser(id: string, updateUserData: Partial<UpdateUserFormInterface>){
    return this.http.put(`${URL}/user/updateUser/${id}`, updateUserData, {responseType: 'text'});
  }
}
