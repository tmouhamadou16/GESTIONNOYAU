import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  public loginForm = this.fb.group({
    //email: ['', [Validators.required, Validators.email]],
    username: [localStorage.getItem('username') || '', [Validators.required]],
    //username: ['', [Validators.required]],
    password: ['', [Validators.required]],
    //remember: [false]
  });

  constructor(
    private router:Router, private fb: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getAllClients();
  }


  login(){
    //console.log(this.loginForm.value);
    this.authService.login(this.loginForm.value).subscribe(res=>{
      //if(this.loginForm.get('remember').value){}else{}
      const token = res['access_token'];
      if (token) {
        localStorage.setItem('username', this.loginForm.get('username').value); 
      } else {
        localStorage.removeItem('username');
      }
      this.router.navigateByUrl('/dashboard');
    },(err:any)=>{
      Swal.fire('Error', err.error.message, 'error');
    });
  }

  getAllClients(){
    this.authService.getAllClient(this.loginForm.value).subscribe(res=>{
      console.log(res);   
    });
  }

}
