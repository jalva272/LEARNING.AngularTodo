import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';

// Define the routes for the application
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'todos', component: TodoListComponent, canActivate: [AuthGuard] },
  { path: 'todos/:id/edit', component: TodoEditComponent },
];

// Configure the router at the application's root level and export it for use in the AppModule
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

// This module sets up the routing for the application, defining the paths and their corresponding components.
export class AppRoutingModule {}
