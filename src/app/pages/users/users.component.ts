import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { AuthService } from 'src/app/auth/auth.service';
import { UserModel } from 'src/app/auth/models/user.model';
import Swal from 'sweetalert2';

declare var $:any;


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
  users: UserModel[]=[];

  formSubmitted = false;
    Roles: any = ['admin', 'user'];
  
    public registerForm = this.fb.group({
      username:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
    });

    public changePassword = this.fb.group({
      oldPassword: [''],
      newPassword: ['']
    });
  
  constructor(
      private fb: FormBuilder,
      private router: Router,
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

  createUser(){
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(res => {
          //console.log(res);
          Swal.fire({
            icon: 'success',
            title: 'Exit',
            text: 'Utilisateur créé avec succès',
            showConfirmButton: true
          }).then((result)=>{
            location.reload();
          });
      }, (err)=>{
        const errorService = JSON.parse(err.error);
        Swal.fire('Error', errorService.message, 'error');
      })
  }

  changePass(id: number){
    let idUser = id;
    console.log(idUser);
    $('#changePass').modal("toggle");
    $('#changePass').modal("show");
  //  document.getElementById('changePass'),{
  //     toggle: true,
  //     show: true
  //   };
  }

  passwordChange(){

  }

  deleteUser(id: number){
    // if (id == localStorage.getItem('userId')) {
    //   Swal.fire('Error', 'Vous ne pouvez pas supprimer un utilisateur actif', 'error');
    // }else{

    // }
    Swal.fire({
      icon: 'question',
      title: 'Voulez-vous supprimer cet utilisateur',
      showCancelButton: true,
      confirmButtonText: 'Confirmer'
    }).then((result)=>{
      if (result.isConfirmed) {
        this.authService.deleteUser(id).subscribe((res:any)=>{
        Swal.fire({
          icon: 'success',
          title: 'User Supprimer avec Succés',
          confirmButtonText: 'Ok'
        }).then((result)=>{
          if (result) {
            location.reload();
          }
        })
      });
      }
    });
  }
  

  ngOnDestroy(): void{
    this.dtTrigger.unsubscribe();
  }

  
    campoInvalid(comp: string): boolean{
      if (this.registerForm.get(comp).invalid && this.formSubmitted) {
        return true;
      }else{
        return false;
      }
    }

}
