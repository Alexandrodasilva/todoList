import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface SchoolData {
  name: string;
  id: string;
}
@Injectable({
  providedIn: 'root'
})
export class SchoolService {

  private students: Array<SchoolData> = [
    {name: "marcos", id: '1'},
    {name: "alexandre", id: '2'},
    {name: "felipe", id: '3'},
  ];
  
  private teacher: Array<SchoolData> = [
    {name: "jorge", id: '1'},
    {name: "flavia", id: '2'},
    {name: "aliria", id: '3'},
  ];

  public getStudents(): Observable<Array<SchoolData>>{
    return of(this.students);
  }

  public getTeacher(): Observable<Array<SchoolData>>{
    return of(this.teacher);
  }
}
