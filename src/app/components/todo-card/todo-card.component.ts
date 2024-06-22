import { TodoSignalsService } from './../../services/todo-signals.service';
import { Component, OnInit, computed, inject } from '@angular/core';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { TodoKeyLocalStorage } from 'src/app/models/enum/TodoKeyLocalStorage';
import { Todo } from 'src/app/models/model/Todo.model';

@Component({
  selector: 'app-todo-card',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgTemplateOutlet,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './todo-card.component.html',
  styleUrls: []
})
export class TodoCardComponent implements OnInit {

  private TodoSignalsService = inject(TodoSignalsService);
  private todosSignal = this.TodoSignalsService.todosState;
  public todoList = computed(() => this.todosSignal())

  ngOnInit(): void {
    this.getTodosInLocalStorage();
  }

  getTodosInLocalStorage() {
    const todosDatas = localStorage.getItem(TodoKeyLocalStorage.TODO_LIST) as string;
    todosDatas && this.todosSignal.set(JSON.parse(todosDatas));
  }

  private saveTodosInLocalStorage(): void{
    this.TodoSignalsService.saveTodosInLocalStorage();
  }

  public handleDoneTodo(todoId: number): void{
    if(todoId){
      this.todosSignal.mutate((todos) => {
        const todoSelected = todos.find((todo) => todo?.id === todoId) as Todo;
        todoSelected && (todoSelected.done = true);
        this.saveTodosInLocalStorage()
      });
    }
  }

  public handleDeleteTodo(todo: Todo): void{
    if(todo){
      const index = this.todoList().indexOf(todo);
      if(index !== -1){
        this.todosSignal.mutate((todos) => {
          todos.splice(index, 1);
          this.saveTodosInLocalStorage()
        })
      }
    }
  }
}
