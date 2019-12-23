import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  constructor(private service: AuthService, private router:Router) { 
    this.registerForm = new FormGroup({
      UserName: new FormControl(),
      Password: new FormControl(),
      Email: new FormControl()
   });
  }
  ngOnInit() {
  }
  login(){
    console.log(this.registerForm);
    this.service.register(this.registerForm.value).subscribe(a=>{
      if (a) {
        //this.router.navigate(['/allbooks']);
        localStorage.setItem('Token', a.token);
      }else{
        window.alert("check your inputs!");
      }
    });
  }

}
