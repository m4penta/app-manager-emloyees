import { AdminService } from './../../services/admin.services';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { Dialog, DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { ToastModule } from 'primeng/toast';
import { ProgressBarModule } from 'primeng/progressbar';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { catchError, throwError } from 'rxjs';
import { Admin } from '../../models/admin';
import { LocalStorageService } from '../../services/localStorage.services';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginVisible: boolean = true;
  dialogCloseAble: boolean = false;
  loginForm!: FormGroup;
  allData!: any;
  constructor(
    private _adminServices: AdminService,
    private formBuilder: FormBuilder,
    private _localStorageServices: LocalStorageService,
    private _auth : AuthService,
    private _router : Router,
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this._adminServices.getAllAdmins().subscribe((x) => (this.allData = x));
  }
  onLogin(): void {
    const data: any = this.loginForm.value;

    const username : string = data.username
    const pass : string = data.password
    const result : any = this._auth.authenticate(username, pass)
    console.log(result)
    if (this.loginForm.valid && result == true) {
      this._localStorageServices.setItem('user', data)
      this.closeModal()
      this._router.navigateByUrl('/home')
    }
  }

  closeModal(): void {
    this.loginVisible = false;
  }
}
