import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html' 
})

export class TodoListComponent implements OnInit {
  // COMPONENT STATE
  todos: Todo[] = []; // stores the list of todos fetched from the backend
  newTodo = { // stores the title and completion status for the new todo being created
    title: '',
    isComplete: false
  }
  isEditOpen: boolean = false; // tracks whether the edit modal is open or closed
  editTodo = {
    id: 0,
    title: '',
    isComplete: false,
    createdAt: ''
  }
  

  // INITIALIZE PRIVATE FIELDS
  constructor(private http: HttpClient, private todoService: TodoService) {}

  // USE EFFECT
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

  // EVENT HANDLERS
  onCreateHandler(): void {
    // verify newTodo object before sending to backend
    console.log('newTodo object:', this.newTodo);
    if (!this.newTodo) return;

    this.todoService.create(this.newTodo).subscribe({
      // handle successful creation
      next: () => {
        // reset newTodo form state
        this.newTodo = {
          title: '',
          isComplete: false
        }
        // reload page to show new todo in list
        this.load();
      },
      // handle error case
      error: (err: any) => console.error(err)
    })
  }

  onOpenEditModal(todo: Todo): void {
    console.log('editTodo state before :', this.editTodo);

    this.editTodo = { ...todo }; // create a copy of the todo to edit
    console.log('editTodo state after opening modal:', this.editTodo);

    this.isEditOpen = true; // open the edit modal
  }

  onCloseEditModal(): void {
    this.isEditOpen = false; // close the edit modal
  }

  onUpdateHandler(): void {
    console.log('Updating todo:', this.editTodo);

      this.todoService.update(this.editTodo.id, this.editTodo).subscribe({
      // handle successful update
      next: () => {
        this.isEditOpen = false; // close the edit modal
        this.load(); // reload page to show updated todo in list
      },
      // handle error case
      error: (err: any) => console.error(err)
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