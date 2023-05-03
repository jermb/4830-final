import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Userloginfo } from './userloginfo';
import { AuthService } from '../authenticate/authenticate.service';
import { AuthGuard } from '../authenticate/authenticate.guard';


@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

  constructor(public auth: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.auth.login(form.value.username, form.value.password);
  }
}

/*import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Userloginfo } from './userloginfo';
//import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  datasaved = false;
  message: string;
  status:string;

  isLoading = false;

  constructor(private formbuilder: FormBuilder, public userLoginfo: Userloginfo) {}

  ngOnInit(): void {
    this.SetFormState();
  }
  SetFormState(): void{
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
  })
  }
  onSubmit(){
    let userinfo = this.loginForm.value;
    //this.userLogin(userinfo);
    this.loginForm.reset();
  }
  /*
  userLogin(logininfo:Userloginfo) {
    this.accountservice.userlogin(logininfo).subscribe(
      (resResult) =&gt; {
       let resp=JSON.stringify(resResult);
       console.log(resp);
        this.datasaved = true;
        this.message = resResult['msg'];
        this.status = resResult['status'];
        if(resResult['status']=='success'){
        localStorage.setItem('Loginuser',resp)
        }else{
          localStorage.removeItem('Loginuser');
        }
       this.loginForm.reset();
      }
    )
  }
  */
  /*
  onLogin(form: NgForm){
    if (form.invalid){
      return;
    }
    this.isLoading = true;
    this.userLoginfo.login(form.value.email, form.value.password);
  } */
// }
