import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { catchError, throwError } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import{TableModule} from 'primeng/table'
import { InputTextModule } from 'primeng/inputtext';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import { employee } from '../../models/employee';
@Component({
  selector: 'app-employees',
  standalone:true,
  imports:[
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    ButtonModule,
    TableModule,
    InputTextModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
  ],
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
//filter obj
seletedEmployee: employee[] = [];
value : string = '';
Employees: any[] = [];
  constructor
  (
    private _employee : EmployeeService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getEmployee()

  }

  getEmployee() : void{
    this._employee.getAllEmployees().subscribe((x : any) =>{
      this.Employees = x;

    })
  }
  onCheckboxChange(e:any) {
    const ids = e.map((i:any) => i.employeeId);

    console.log(ids);
    this._employee.deleteMultiple(ids).subscribe({
      next:() => {
        console.log('thực hiện xóa nhiều thành công:')
        this.getEmployee()
      },
      error: (err) => console.error('đã xảy ra lỗi khi cập nhập Employee', err)
    })
  }
  viewEmployee(data:any){
    const id: number = data.id
    // this._EmployeeServices.getEmployeeById(id).subscribe({
    //   next: (Employee: any) =>{
    //   this.viewForm.patchValue(Employee)
    //   this.showDialog('view')
    // },
    // error: (error: any)=> {
    //   console.error('Đã xảy ra lỗi:', error);
    // }
  // })
}

  UpdateEmployee(data:any){

  //   this.updateID = data.id
  //   this._EmployeeServices.getEmployeeById(id).subscribe({
  //     next: (Employee: any) =>{
  //     this.updateForm.patchValue(Employee)
  //     this.showDialog('update')
  //   },
  //   error: (error: any)=> {
  //     console.error('Đã xảy ra lỗi:', error);
  //   }
  // })
  // }
}
deleteEmployee(data : any){
  const id: number = data.id
  // this._adminServices.deleteAdmin(id).pipe(
  //   catchError(error => {
  //     console.error('Đã xảy ra lỗi khi xóa admin', error);
  //     return error
  //   })
  // ).subscribe(
  //   response => {
  //     console.log('Admin đã được xóa thành công');
  //     this.getAdmin();
  //   }
  // );
}

}
