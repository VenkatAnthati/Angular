//app.component.ts
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatTable } from '@angular/material/table';
import { Sort } from '@angular/material/sort';

export interface UsersData {
  studentname: string;
  course: string;
  age: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, studentname: 'Numa', age: '40', course: 'Artificial Intelligence'},
  {id: 1560608796014, studentname: 'angelena', age: '22', course: 'Machine Learning'},
  {id: 1560608787815, studentname: 'John', age: '23', course: 'Robotic Process Automation'},
  {id: 1560608805101, studentname: 'Keith',  age: '44',course: 'Blockchain'}
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  displayedColumns: string[] = ['id', 'studentname', 'age', 'course', 'action'];
  dataSource = ELEMENT_DATA;
  editIndex:number=-1;
  
  
  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) {
    this.dataSource = this.dataSource.slice();
  }
  
  sortData(sort: Sort) {
    const data = this.dataSource.slice();
    if (!sort.active || sort.direction === '') {
      this.dataSource = data;
      return;
    }

    this.dataSource = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'studentname': return this.compare(a.studentname, b.studentname, isAsc);
        case 'age': return this.compare(a.age, b.age, isAsc);
        case 'fat': return this.compare(a.course, b.course, isAsc);
        default: return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  openDialog(action:any, obj:any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj:any){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      studentname:row_obj.studentname,
      age:row_obj.age,
      course:row_obj.course
    });
    this.table.renderRows();
    
  }
  updateRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.studentname = row_obj.studentname;
        value.age = row_obj.age;
        value.course = row_obj.course;
      }
      return true;
    });
  }
  deleteRowData(row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }
  changeValue(coulum:string, row_obj:any){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        console.log("before Value: ",value);
        if(coulum == 'studentname'){
          value.studentname = row_obj.studentname;
        }else if(coulum == 'age'){
          value.age = row_obj.age;
        }else  if(coulum == 'course'){
          value.course = row_obj.course;
        }
        console.log("after Value: ",value);
      }
      
      return true;
    });

  }
}