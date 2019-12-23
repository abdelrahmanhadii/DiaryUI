import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiariesService } from 'src/app/services/diaries.service';
import { DiaryModel } from 'src/app/models/diary-model';
import { FormGroup, FormControl } from '@angular/forms';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-list-diaries',
  templateUrl: './list-diaries.component.html',
  styleUrls: ['./list-diaries.component.css']
})
export class ListDiariesComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
  }
  createDiaryForm:FormGroup;
  allDiaries: DiaryModel[];
  selectedFiles: FileList;
  intervalId: any;
  constructor(private diaryService:DiariesService, private uploadService: UploadService) {
    let d = new Date();
    console.log(d.getMinutes());
    this.intervalId = setInterval(() => {
      this.checkDate();
    }, 5000);
    this.getAllDiaries();
    this.createDiaryForm = new FormGroup({
      Title: new FormControl(),
      Description: new FormControl(),
      DueDate: new FormControl(),
      Image: new FormControl()
    });
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }  

  clicked(diary){
    diary.completed = !diary.completed;
    this.diaryService.completedDiary(diary.id).subscribe();
  }

  createDiary(){
    this.uploadSingle().subscribe(a=>{
      if(a){
        this.createDiaryForm.get('Image').setValue(a);
        this.diaryService.createDiary(this.createDiaryForm.value).subscribe(
          a=>{
            this.allDiaries.push(this.createDiaryForm.value);
          }
        );
      }
    }
  );
    
    
  }

  deleteDiary(id){
    this.diaryService.deleteDiary(id).subscribe(
      a=>{
        this.allDiaries = this.allDiaries.filter( a => a.id !== id )
      }
    );    
  }

  getAllDiaries(){
    this.diaryService.getAllDiaries().subscribe( a => {
      this.allDiaries = a;
    });
  }

  uploadSingle() {
    return this.uploadService.startUpload(this.selectedFiles.item(0));
  }

  checkDate(){
    if(this.allDiaries){
      var d2;
      var d;
      this.allDiaries.forEach(element => {
        d = new Date();
        d2 = new Date(element.dueDate);
        // d.getMinutes() === d2.getMinutes() && d.getHours() === d2.getHours() && d.getDay() === d2.getDay()
        // && d.getMonth() === d2.getMonth() && d.getFullYear() === d2.getFullYear()
        if ( d.getTime() > d2.getTime() && ! element.Notified ) {
          window.alert(`Diary: ${element.title} is Expired!!!`);
          element.Notified = true;
        }
      });
    }
  }
}
