import { AdminService } from './../../services/admin.services';
import { Component, OnInit, ViewChild } from '@angular/core';
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
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import { NgIf } from '@angular/common';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-admin',
  standalone: true,
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
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  selectedAdmin : any[] = [];
  value : string = '';
  admins: any[] = [];

  //create
  createVisible: boolean = false;
  createForm!: FormGroup;
  //view
  viewVisible: boolean = false;
  viewForm!: FormGroup
  selectAd: any = {
    username: '',
    password: '',
    name: ''
  };
  constructor(
    private _adminServices: AdminService ,
    private formBuilder: FormBuilder
    ) {

  }

  ngOnInit() {
    this.getAdmin()
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required,],
      password: ['', Validators.required],
      username: ['', Validators.required]

    })
    this.viewForm = this.formBuilder.group({
      username: [{ value: this.selectAd.username, disabled: true }],
      password: [{ value: this.selectAd.password, disabled: true }],
      name: [{ value: this.selectAd.name, disabled: true }]
    })
  }
  onSubmit(): void {
    if (this.createForm.valid) {
      const formData = this.createForm.value;
      console.log(formData);
      this._adminServices.createAdmin(formData).subscribe({
        next: (response) => {
          console.log('Admin đã được tạo mới:', response);
          this.closeModal('create');
          this.getAdmin()
        },
        error: (error) => {
          console.error('Đã xảy ra lỗi khi tạo mới admin:', error);
        }
      });
      this.closeModal('create')
    }
  }
  getAdmin(): void {
    this._adminServices.getAllAdmins()
      .subscribe((x: any) => {
        this.admins = x;

      });
  }
  showDialog(name: string) {
    if (name == 'create'){
      this.createVisible = true;
    }else if(name == 'view'){
      this.viewVisible = true

    }

}

  onCheckboxChange(e:any) {
    const ids = e.map((i:any) => i.id);
    console.log(ids)
  }
  viewAdmin(data:any){
    const id: number = data.id
    this._adminServices.getAdminById(id).subscribe({
      next: (admin: any) =>{
      this.viewForm.patchValue(admin)
      this.showDialog('view')
    },
    error: (error: any)=> {
      console.error('Đã xảy ra lỗi:', error);
    }
  })

  }
  UpdateAdmin(data:any){
    console.log(data.id)
  }
  closeModal(name: string){
    if (name == 'create'){
      this.createVisible = false;
    }else if(name == 'view'){
      this.viewVisible = false
    }

  }

  deleteAdmin(data : any){
    const id: number = data.id
    this._adminServices.deleteAdmin(id).pipe(
      catchError(error => {
        console.error('Đã xảy ra lỗi khi xóa admin', error);
        return error
      })
    ).subscribe(
      response => {
        console.log('Admin đã được xóa thành công');
        this.getAdmin();
      }
    );
  }
  }

