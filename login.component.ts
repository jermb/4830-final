
import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";

import { AuthService } from "../authenticate/authenticate.service";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  isLoading = false;

  constructor(public authService: AuthService) {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(form.value.email, form.value.password);
  }
}

/*  ngOnInit(): void {
    this.SetFormState();
  }
  SetFormState(): void{
    this.loginForm = this.formbuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
  }
  onSubmit(){
    let userinfo = this.loginForm.value;
    this.userLogin(userinfo);
    this.loginForm.reset();
  }
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
  }*/
  

