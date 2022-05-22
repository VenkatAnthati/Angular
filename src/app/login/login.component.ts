import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../loginService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  title = 'exmaple2';
  loginForm:FormGroup;
  constructor(private formBuilder:FormBuilder, private loginService: LoginService){}
 ngOnInit(): void {
   this.createForm();
 }
  createForm() {
 this.loginForm = this.formBuilder.group({
   email: ['', Validators.required],
   password: ['', Validators.required]
 })
  }


  onSubmit(){
    if(this.loginForm.valid){
      console.log(" this form is valid")
      let payLoad:any;
      payLoad={
        email:this.loginForm.value.email,
        password: this.loginForm.value.password
      }
      this.loginService.postLoginForm(payLoad).subscribe((res:Response)  => {
        console.log("this service coming from nodejs Servers", res)
      });
      console.log("this payload: ",payLoad);
    }else{
      console.log("form not valid")
    }
  }

}
