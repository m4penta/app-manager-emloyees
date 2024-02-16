import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { AdminComponent } from './component/admin/admin.component';
import { DepartmentComponent } from './component/department/department.component';
import { EmployeesComponent } from './component/employees/employees.component';

export const routes: Routes = [
  {path:'', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'admin', component: AdminComponent},
  {path:'department', component: DepartmentComponent},
  {path:'employees', component: EmployeesComponent}
];
