import { TestBed } from '@angular/core/testing';

import { ExemploTesteService } from './exemplo-teste.service';
import { TodoSignalsService } from './todo-signals.service';
import { Todo } from '../models/model/Todo.model';

describe('ExemploTesteService', () => {
  let service: ExemploTesteService;
  let todoService: TodoSignalsService;

  beforeEach(() => {
    service = TestBed.inject(ExemploTesteService);
    todoService = TestBed.inject(TodoSignalsService);
  });

  it('should return correct list', () => {
    service.getTestNameList().subscribe({
      next: list => {
        expect(list).toEqual([
          {
            id: 1,
            name: 'Test 1'
          },
          {
            id: 2,
            name: 'Test 2',
          }
        ]);
      },
    });
  });

  it('should return correct todo list', () => {
    jest.spyOn(todoService, 'updateTodos');
    const newTodo: Todo = {
      id: 1,
      title: 'New todo',
      description: 'Description for test',
      done: true
    }

    service.handleCreateTodo(newTodo).subscribe({
      next: todoList => {
        expect(todoList).toEqual([newTodo]);
        expect(todoService.updateTodos).toHaveBeenCalledWith(newTodo)
      }
    })
  })
});
