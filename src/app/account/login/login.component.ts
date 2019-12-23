import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  constructor(private service: AuthService, private router:Router) { 
    this.loginForm = new FormGroup({
      UserName: new FormControl(),
      Password: new FormControl()
   });
  }
  ngOnInit() {
  }
  login(){
    console.log(this.loginForm);
    this.service.login(this.loginForm.value).subscribe(a=>{
      if (a) {
        this.router.navigate(['/diaries']);
        localStorage.setItem('Token', a.token);
      }else{
        window.alert("check your inputs!");
      }
    });
  }
}
