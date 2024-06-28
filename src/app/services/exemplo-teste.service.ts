import { Injectable } from '@angular/core';
import { TodoSignalsService } from './todo-signals.service';
import { Observable, of } from 'rxjs';
import { Todo } from '../models/model/Todo.model';

@Injectable({
  providedIn: 'root'
})
export class ExemploTesteService {

  public testNameList: Array<{ id: number, name: string }> = [
    {
      id: 1,
      name: 'Test 1'
    },
    {
      id: 2,
      name: 'Test 2'
    }
  ];

  constructor(private todoSignalsService: TodoSignalsService




  ) { }

  public getTestNameList(): Observable<Array<{ id: number, name: string }>> {
    return of(this.testNameList);
  }

  public handleCreateTodo(todo: Todo): Observable<Array<Todo>> {
    if (todo) {
      this.todoSignalsService.updateTodos(todo);
    }
    return of(this.todoSignalsService.todosState());
  }
}
