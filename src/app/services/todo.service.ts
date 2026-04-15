import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Todo } from '../models/todo';

@Injectable({
    providedIn: 'root'
})

export class TodoService {
    private baseUrl = `${environment.apiBaseUrl}/todo`;

    constructor(private http: HttpClient) {}

    // GET /api/todo
    getAll(): Observable<Todo[]> {
        return this.http.get<Todo[]>(this.baseUrl);
    }

    // GET /api/todo/{id}
    getById(id: number): Observable<Todo> {
        return this.http.get<Todo>(`${this.baseUrl}/${id}`);
    }

    // POST /api/todo
    create(item: Partial<Todo>): Observable<Todo> {
        return this.http.post<Todo>(this.baseUrl, item);
    }

    // PUT /api/todo/{id}
    update(id: number, item: Todo): Observable<Todo> {
        return this.http.put<Todo>(`${this.baseUrl}/${id}`, item);
    }

    // DELETE /api/todo/{id}
    delete(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}

