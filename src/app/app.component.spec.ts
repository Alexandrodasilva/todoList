import { Element } from './../../node_modules/@types/jsdom/node_modules/parse5/dist/cjs/tree-adapters/default.d';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { elementAt, first } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Todo } from './models/model/Todo.model';
import { DebugElement } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let todoSignalsService: TodoSignalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AppComponent, BrowserAnimationsModule, NoopAnimationsModule],
      providers: [TodoSignalsService],
    })
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    todoSignalsService = TestBed.inject(TodoSignalsService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should set @Input( property correctly', () => {
    component.projectName = 'Testing Angular With Jest';

    fixture.detectChanges();

    expect(component.projectName).toEqual('Testing Angular With Jest')
  });

  it('shoult emit event with @Output() decorator correcty', () => {
    component.projectName = 'Testing my Angular application';

    component.outputEvent
    .pipe(
      first()
    ).subscribe({
      next: event => {
        expect(event).toEqual('Testing my Angular application');
        component.handleEmitEvent()
      }
    })
  });

  it('should create new todo correctyl and call service method', () => {
    jest.spyOn(todoSignalsService, 'updateTodos');
    const newTodo: Todo ={
      id: 10,
      title: 'Testing creating Todo',
      description: 'Test new Todo',
      done: true,
    }

    component.handleCreateTodo(newTodo);
    fixture.detectChanges();

    expect(todoSignalsService.updateTodos).toHaveBeenCalledWith(newTodo);
    expect(component.todoSignal()).toEqual([newTodo]);

  });

  it('should not render paragraph in the DOM', () => {
    const componenteDebugElement: DebugElement = fixture.debugElement;
    const Element: HTMLElement = componenteDebugElement.nativeElement;
    const paragraph = Element.querySelector('p')

    expect(paragraph).toBeNull();
  });

  it('should render paragraph correctly', () => {
    component.renderTestMessage = true;
    fixture.detectChanges();

    const componenteDebugElement: DebugElement = fixture.debugElement;
    const Element: HTMLElement = componenteDebugElement.nativeElement;
    const paragraph = Element.querySelector('p')

    expect(paragraph?.textContent).toEqual('Test your Angular Application')
  });

  it('should isDoned property to be false', () => {
    component.handleCheckIsDone();
    expect(component.isDoned).toBe(false);
  });

  it('', fakeAsync(() => {
    component.handleCheckIsDone();
    tick(200);
    expect(component.isDoned).toBe(true);
  }))
});
