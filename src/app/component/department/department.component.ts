
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { catchError, throwError } from 'rxjs';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import { Department, departmentRequest } from '../../models/department';
import { DepartmentService } from '../../services/department.service';
import { Admin } from '../../models/admin';
import { AdminService } from '../../services/admin.services';

@Component({
  selector: 'app-department',
  standalone: true,
  imports: [
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
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent implements OnInit {
  //filter obj
  deparmentStatus: any[] = [];
  dSelectDw: any | undefined;
  admenu: any;
  selectAdmin: undefined;
  seletedDepartment: Department[] = [];
  value: string = '';
  Departments: any[] = [];
  newArr: any[] = [];
  //create
  createVisible: boolean = false;
  createForm!: FormGroup;
  constructor(
    private _Department: DepartmentService,
    private formBuilder: FormBuilder,
    private _admin: AdminService
  ) {}

  ngOnInit() {
    const currentDate = new Date();

    this.getDepartment();
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      status: ['', Validators.required],
      createdBy: ['', Validators.required],
      createdAt: [currentDate],
      establishedDate: [currentDate],
    });
    this.deparmentStatus = [
      { name: 'Đang hoạt động', code: 'active' },
      { name: 'Chưa hoạt động', code: 'offline' },
    ];

    this._admin.getAllAdmins().subscribe((x) => {
      this.admenu = x;
      this.newArr = this.admenu.map((item: { name: String }) => {
        return { name: item.name };
      });
    });
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      const formData: Department = this.createForm.value;
      const Status: any = formData.status;
      const resultStatus = Status['name'];
      const ad: any = formData.createdBy;
      const resultAd = ad['name'];

      const department: departmentRequest =  {
        name: formData.name,
        description: formData.description,
        status: resultStatus,
        createdBy: resultAd,
        createdAt: formData.createdAt,
        establishedDate: formData.establishedDate,
      };
      this._Department.createDepartment(department).subscribe({
        next: (response) => {
          console.log('Phòng ban đã được tạo mới:', response);
          this.closeModal('create');
          this.getDepartment();
          this.createForm.reset();
        },
        error: (error) => {
          console.error('Đã xảy ra lỗi khi tạo mới phòng ban:', error);
        },
      });
      this.closeModal('create');
    }
  }

  getDepartment(): void {
    this._Department.getAllDepartments().subscribe((x: any) => {
      this.Departments = x;
    });
  }
  onCheckboxChange(e: any) {
    const ids = e.map((i: any) => i.DepartmentId);

    console.log(ids);
    this._Department.deleteMultiple(ids).subscribe({
      next: () => {
        console.log('thực hiện xóa nhiều thành công:');
        this.getDepartment();
      },
      error: (err) =>
        console.error('đã xảy ra lỗi khi cập nhập Department', err),
    });
  }
  showDialog(name: string) {
    if (name == 'create') {
      this.createVisible = true;
    } else if (name == 'view') {
      //  this.viewVisible = true
    } else if (name == 'update') {
      // this.updateVisible = true
    }
  }
  closeModal(name: string) {
    if (name == 'create') {
      this.createVisible = false;
    } else if (name == 'view') {
      //this.viewVisible = false
    } else if (name == 'update') {
      // this.updateVisible = false
    }
  }
  viewDepartment(data: any) {
    const id: number = data.id;
    // this._DepartmentServices.getDepartmentById(id).subscribe({
    //   next: (Department: any) =>{
    //   this.viewForm.patchValue(Department)
    //   this.showDialog('view')
    // },
    // error: (error: any)=> {
    //   console.error('Đã xảy ra lỗi:', error);
    // }
    // })
  }

  UpdateDepartment(data: any) {
    //   this.updateID = data.id
    //   this._DepartmentServices.getDepartmentById(id).subscribe({
    //     next: (Department: any) =>{
    //     this.updateForm.patchValue(Department)
    //     this.showDialog('update')
    //   },
    //   error: (error: any)=> {
    //     console.error('Đã xảy ra lỗi:', error);
    //   }
    // })
    // }
  }
  deleteDepartment(data: any) {
    const id: number = data.departmentId;
    console.log(id)
    this._Department.deleteDepartment(id).pipe(
      catchError(error => {
        console.error('Đã xảy ra lỗi khi xóa admin', error);
        return error
      })
    ).subscribe(
      response => {
        console.log('Admin đã được xóa thành công');
        this.getDepartment();
      }
    );
  }
}
