import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoEditComponent } from './todo-edit/todo-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
  declarations: [
    // register components, directives, and pipes here
    AppComponent,
    TodoListComponent,
    TodoEditComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, // required for any web app
    HttpClientModule, // required for HttpClient
    FormsModule, // required for ngModel
    AppRoutingModule, // required for routing configuration
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent], // specify the root component to bootstrap when the application starts
})
export class AppModule {}
