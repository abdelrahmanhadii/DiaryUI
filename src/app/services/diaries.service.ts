import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import constants from '../../assets/constants.json';
import { DiaryModel } from '../models/diary-model.js';

@Injectable({
  providedIn: 'root'
})
export class DiariesService {

  header = new HttpHeaders({'content-type': 'application/json'});
  constructor(private httpClient: HttpClient) { 
  }

  getAllDiaries(){
    if(!this.header.get('Authorization'))
      this.header = this.header.append('Authorization', `Bearer ${ localStorage.getItem('Token') }`);
    return this.httpClient.get<DiaryModel[]>(`${constants.baseApiUrl}/diaries/`, { headers:this.header });
  }

  createDiary(newDiary){
    return this.httpClient.post<any>(`${constants.baseApiUrl}/diaries`, newDiary, { headers:this.header });
  }

  completedDiary(id:number){
    return this.httpClient.get<any>(`${constants.baseApiUrl}/diaries/completed/${id}`, { headers:this.header });
  }

  deleteDiary(id:number){
    return this.httpClient.delete<any>(`${constants.baseApiUrl}/diaries/${id}`, { headers:this.header });
  }
}