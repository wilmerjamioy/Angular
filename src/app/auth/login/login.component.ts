import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { LoginRequest } from 'src/app/services/auth/loginRequest';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginError:string="";
  loginForm=this.formBuilder.group({
    email:['fwjamioyt@gmail.com',[Validators.required,Validators.email]],
    password:['',Validators.required]

  })

  constructor(private formBuilder:FormBuilder, private router:Router, private loginService:LoginService){}
  get email(){
    return this.loginForm.controls.email
  }
  get password(){
    return this.loginForm.controls.password
  }

  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData)=>{
          console.log(userData)
        },
        error:(errorData)=>{
          console.error(errorData)
          this.loginError=errorData;
        },
        complete:()=>{
          console.info("login completo")
          this.router.navigateByUrl('/inicio');
          this.loginForm.reset();
        }

      });
    
    }
    else {
      this.loginForm.markAllAsTouched()
      alert("error al ingresar los datos")
    }
  }
}
