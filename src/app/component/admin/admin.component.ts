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
  //update
  updateVisible: boolean = false;
  updateForm!: FormGroup;
  updateID!: number;
  selectUpdate: any = {
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
    this.updateForm = this.formBuilder.group({
      username: [this.selectUpdate.username, [Validators.required]],
      password: [this.selectUpdate.password, [Validators.required]],
      name: [this.selectUpdate.name, [Validators.required]]
    });
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
  onUpdate():void{
    if(this.updateForm.valid){
      const formData = this.updateForm.value
      this._adminServices.updateAdmin(this.updateID,formData).subscribe({
        next: (res) =>{
          console.log('admin đã được tạo mới:', res);
          this.closeModal('update')
          this.getAdmin()
        },
        error:(err) => console.error('đã xảy ra lỗi khi cập nhập admin', err)
      })
      this.closeModal('update')
    }
  }
  getAdmin(): void {
    this._adminServices.getAllAdmins()
      .subscribe((x: any) => {
        this.admins = x;

      });
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
    const id: number = data.id
    this.updateID = data.id
    this._adminServices.getAdminById(id).subscribe({
      next: (admin: any) =>{
      this.updateForm.patchValue(admin)
      this.showDialog('update')
    },
    error: (error: any)=> {
      console.error('Đã xảy ra lỗi:', error);
    }
  })
  }
  showDialog(name: string) {
    if (name == 'create'){
      this.createVisible = true;
    }else if(name == 'view'){
      this.viewVisible = true

    }else if(name == 'update'){
      this.updateVisible = true
    }

  }
  closeModal(name: string){
    if (name == 'create'){
      this.createVisible = false;
    }else if(name == 'view'){
      this.viewVisible = false
    }else if(name == 'update'){
      this.updateVisible = false
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

