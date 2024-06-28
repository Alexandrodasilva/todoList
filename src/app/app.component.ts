import { Component, EventEmitter, Input, OnInit, Output, WritableSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TodoCardComponent } from './components/todo-card/todo-card.component';
import { SchoolData, SchoolService } from './services/school.service';
import { Observable, filter, from, map, of, switchMap, zip } from 'rxjs';
import { TodoSignalsService } from './services/todo-signals.service';
import { Todo } from './models/model/Todo.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HeaderComponent, TodoCardComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'todo-list';
  @Input() public projectName!: string;
  @Output() public  outputEvent = new EventEmitter<string>();
  public todoSignal!: WritableSignal<Array<Todo>>;
  public students: Array<SchoolData> = [];
  public teachers: Array<SchoolData> = [];
  private zipSchoolResponse$ = zip(
    this.getStudents(),
    this.getTeacher()
  );
  private ages = of(20,30,40,50,60,70)
  private peopleDatas = from([
    {name: 'marcos', age: 20, profession: 'Software Developer'},
    {name: 'Júlia', age: 30, profession: 'UX Design'},
    {name: 'Jorge', age: 25, profession: 'Scrum Master'},
  ]);
  private studentUserId = '2';
  public renderTestMessage = false;
  public isDoned = false;

  constructor(
    private schoolService: SchoolService,
    private todoSignalsService: TodoSignalsService
  ){}

  ngOnInit(): void {
    //this.getSchoolDatas(); exemplo do operador zip e of
    //this.getMultipliedAges(); exemplo map e of
   // this.getPeopleProfessions();// exemplo from e map
   //this.handleFindStudentsById(); exemplo switchMap
  }

  public handleEmitEvent(): void {
    this.outputEvent.emit(this.projectName);
  }

  public handleCreateTodo(todo: Todo): void{
    if(todo){
      this.todoSignalsService.updateTodos(todo);
      this.todoSignal = this.todoSignalsService.todosState;
    }
  }

  public handleCheckIsDone(): void{
    setTimeout(() => {
      this.isDoned = true;
    }, 200);
  }

  public handleFindStudentsById(): void{
    this.getStudents().pipe(
      switchMap(students => this.findStudentsById(students, this.studentUserId))
    ).subscribe({
      next: response => console.log('retorno estudante: ', response)
    })
  }

  public findStudentsById(students: Array<SchoolData>, userId: string): Observable<(SchoolData | undefined)[]>{
    return of([students.find(student => student.id === userId)]);
  }

  public getPeopleProfessions(): void{
    this.peopleDatas
    .pipe(
      filter(people => people.profession === 'Software Developer'),
      map( people => people.name)
    )
    .subscribe({ next: response => console.log('Nome: ', response)})
  }

  public getMultipliedAges(): void{
    this.ages
    .pipe(map((age) => age * age))
    .subscribe({
      next: (response) => console.log('Idade multiplicada', response)
    })
  }

  public getSchoolDatas(): void{
    this.zipSchoolResponse$.subscribe({
      next: (response) => {
        console.log('students', response[0]);
        console.log('teachers', response[1]);
      },
    });
  }

  private getStudents(): Observable<Array<SchoolData>>{
    return this.schoolService.getStudents();
  }

  private getTeacher(): Observable<Array<SchoolData>>{
    return this.schoolService.getTeacher();
  }

}
