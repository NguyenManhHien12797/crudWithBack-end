import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {Todo} from "./todo";

@Injectable({
  providedIn: 'root'
})
export class TodoServiceService {

  constructor(private http: HttpClient) { }

  private readonly API_URL = 'https://jsonplaceholder.typicode.com/todos'

  getTodos(count = 10): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.API_URL).pipe(
      map(data => data.filter((todo, i) => i <count)))
  }

  createTodo( todo: Partial<Todo> ): Observable<Todo> {
    return this.http.post<Todo>(this.API_URL, todo);
  }

  deleteTodo(id : number): Observable<any> {
    return this .http.delete(
      `${this.API_URL}/${id}`
    ) ;
  }

  updateTodo( todo: Todo) : Observable<Todo> {
    return this.http.patch<Todo>(
      `${this.API_URL}/${todo.id}`, todo);
  }
}
