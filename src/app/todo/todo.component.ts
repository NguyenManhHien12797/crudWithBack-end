import { Component, OnInit } from '@angular/core';
import {Todo} from "../todo";
import {FormControl} from "@angular/forms";
import {TodoServiceService} from "../todo-service.service";

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoServiceService) { }

  ngOnInit(): void {
    this.todoService.getTodos().subscribe(next => {
      this.todoList = next;
    }, error => {
      console.log(error);
      }, () =>{
      console.log('complete');
      });
  }

  todoList: Todo[] = [];
  inputControl = new FormControl();
  toggleTodo(i: number){
    // console.log("hello")
    const todo = this .todoList[i];
    const todoData = {...todo,
      completed: !todo.completed
    } ;
    this .todoService.updateTodo( todoData).subscribe(next => {
      this .todoList[i].completed = next.completed;
    });
  };
  addTodo(){
    const todo: Partial<Todo> = {
      title: this .inputControl.value,
      completed: false
    } ;
    this .todoService.createTodo( todo).subscribe(next => {
      this .todoList.unshift(next);
      this .inputControl.setValue('');
    });
  };
  deleteTodo(i: number){
    const todo = this .todoList[i];
    this.todoService.deleteTodo(todo.id).subscribe(
      ( ) => {
        this.todoList = this .todoList.filter(
          t => t.id !== todo.id
        ) ;
      });
  };

}
