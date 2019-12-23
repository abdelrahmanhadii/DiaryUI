import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  ngOnInit(): void {
    this.router.events.subscribe((event: any) => {
      if ( event.url === '/login' || event.url === '/register' ){
        this.btnState = false;
      }
    });
  }
  title = 'ToDoListUI';
  btnState:boolean = true;
  constructor(private router:Router, private rout:ActivatedRoute){
    
  }
  logout(){
    localStorage.removeItem('Token');
    this.router.navigate(['/login']);
  }
}
