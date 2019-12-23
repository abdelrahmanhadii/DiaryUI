import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { default as constants } from '../../assets/constants.json';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  header = new HttpHeaders();
  constructor(private httpClient: HttpClient) { 
    this.header.append('content-type', 'application/json')
  }

  login(loginModel){
    console.log(`${constants.auth}/account/login`);
    console.log(loginModel);
    return this.httpClient.post<any>(`${constants.auth}/account/login`, loginModel, { headers:this.header });
  }

  register(regModel){
    return this.httpClient.post<any>(`${constants.auth}/account/register`, regModel, { headers:this.header });
  }
}
