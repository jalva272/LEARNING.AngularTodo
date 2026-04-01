import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html' 
})

export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private http: HttpClient, private todoService: TodoService) {}

  ngOnInit(): void {
    this.load(); 
  }

  load(): void {
    this.todoService.getAll().subscribe({
      next: (data: Todo[]) => {
        console.log('JSON data received from backend:', data); 
        this.todos = data;
      }, 
      error: (error: any) => {
        console.error('Error fetching data from backend:', error);
      }
    })

  }

}

































// import { Component, OnInit } from '@angular/core';
// import { TodoService } from '../services/todo.service';
// import { Todo } from '../models/todo';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-todo-list',
//   templateUrl: './todo-list.component.html'
// })
// export class TodoListComponent implements OnInit {
//   //todos: Todo[] = [];
//   todos:any;
//   userdata:any;

//   constructor(private http: HttpClient,private todoService: TodoService) {}

//   ngOnInit(): void {
//     this.load();
//   }

//   load(): void {
//     //this.todoService.getAll().subscribe(items => (this.todos = items));

//     // this.todoService.getAll().subscribe((response) => {
//     //   this.todos = response;
//     // });

//     this.http.get('https://projectapi.gerasim.in/api/RealEstate/GetAllCustomers').subscribe((response:any) => {
//       //debugger;
//       this.todos = response;
//     });

//     this.getallUser();
//   }

//   getallUser(){
//     this.http.get("https://jsonplaceholder.typicode.com/posts").subscribe((result:any)=>{
//         this.userdata = result;
//         console.log('userdata:', this.userdata);
//     })
//   }

//   toggleComplete(item: Todo): void {
//     const updated = { ...item, isComplete: !item.isComplete };
//     this.todoService.update(item.id, updated).subscribe(() => this.load());
//   }

//   remove(item: Todo): void {
//     this.todoService.delete(item.id).subscribe(() => this.load());
//   }

// }