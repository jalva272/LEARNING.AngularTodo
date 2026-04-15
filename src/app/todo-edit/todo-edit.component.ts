import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-edit',
  templateUrl: './todo-edit.component.html',
  styleUrls: ['./todo-edit.component.css']
})
export class TodoEditComponent implements OnInit {
  id: number = 0;
  todo!: Todo; // use definite assignment assertion to tell TypeScript that this field will be assigned a value before it's accessed

  constructor(private route: ActivatedRoute, private todoService: TodoService, private router: Router) {}

  ngOnInit(): void {
    // extract id from url using ActivatedRoute
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    //console.log('id:', this.id);

    this.load();
  }

  load(): void {
    this.todoService.getById(this.id).subscribe({
      next: (data: Todo) => {
        console.log('todo before assignment:', this);
        this.todo = data;
        console.log('todo after assignment:', this.todo);
      },
      error: (err: any) => console.error(err)
    })
  }

  save(): void {
    this.todoService.update(this.todo.id, this.todo).subscribe({
      next: (data: Todo) => {
        // navigate back to the todo list after successful update
        this.router.navigate(['/todos']);
      },
      error: (err: any) => console.error(err)
    })
  }

  cancel(): void {
    // navigate back to the todo list without saving changes
    this.router.navigate(['/todos']);
  }
}
