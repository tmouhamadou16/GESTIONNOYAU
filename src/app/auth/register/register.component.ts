import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formSubmitted = false;
  Roles: any = ['admin', 'user'];

  public registerForm = this.fb.group({
    username:['', [Validators.required]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required]],
    password2:['', [Validators.required]],
    //role:['', [Validators.required]]
  },{
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) { }

  register(){
    //console.log(this.registerForm.value);
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    this.authService.register(this.registerForm.value).subscribe(res => {
      //console.log(res);
      Swal.fire('succès', 'Utilisateur créé avec succès', 'success');
    }, (err) =>{
      const errorServer = JSON.parse(err.error);
      //console.log(errorServer);
      Swal.fire('Erreur', errorServer.message, 'error');
    }
  );
  }

  get roles(){
    return this.registerForm.get('role');
  }

  changeRole(event){
    //console.log(evento.target.value);
    this.roles.setValue(event.target.value,{
      onlySelf: true
    })
  }

  campoInvalid(comp: string): boolean{
    if (this.registerForm.get(comp).invalid && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  constrasenasInvalid(){
    const pass1 = this.registerForm.get('password').value;
    const pass2 = this.registerForm.get('password2').value;
    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    }else{
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string){
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control.value === pass2Control) {
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({noEsgual: true});
      }
    }
  }
}
