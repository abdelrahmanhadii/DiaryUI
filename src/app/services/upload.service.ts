import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable, from } from 'rxjs';
import { finalize, tap, switchMap, last, map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  task: AngularFireUploadTask;
  downloadURL: string;
  constructor(private storage: AngularFireStorage) { }
  
  startUpload(file: File) {
    const path = `image/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path); 
    this.task = this.storage.upload(path, file);

    return this.task.snapshotChanges().pipe(
    last(),
    switchMap(x => from(x.ref.getDownloadURL()))
     );

    // this.task.snapshotChanges().pipe(
    //   switchMap((x1) => from(x1.ref..getDownloadURL()))
    // )
    // .subscribe(x => console.log(x));
  }
}