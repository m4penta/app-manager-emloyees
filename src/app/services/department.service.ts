import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Department, departmentRequest } from '../models/department';
@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private baseUrl = 'http://localhost:8080/api/department';
constructor(private http:HttpClient) { }
 // Hàm gọi API để lấy danh sách tất cả các Department
 getAllDepartments(): Observable<Department> {
  return this.http.get<Department>(this.baseUrl);
}

// Hàm gọi API để lấy thông tin của một Department theo ID
getDepartmentById(id: number): Observable<Department> {
  return this.http.get<Department>(`${this.baseUrl}/${id}`);
}

// Hàm gọi API để tạo mới một Department
createDepartment(Department: departmentRequest): Observable<departmentRequest> {
  return this.http.post<departmentRequest>(this.baseUrl, Department);
}

// Hàm gọi API để cập nhật thông tin của một Department
updateDepartment(id: number, Department: Department): Observable<Department> {
  return this.http.put<Department>(`${this.baseUrl}/${id}`, Department);
}

// Hàm gọi API để xóa một Department
deleteDepartment(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
}
//Xóa nhiều Department dựa theo mảng id
deleteMultiple(ids: number[]): Observable<any> {
  return this.http.delete(`${this.baseUrl}/deleteMultiple`, { body: ids })
    .pipe(
      catchError(error => {
        console.error('Failed to delete objects:', error);
        throw new Error('Failed to delete objects');
      })
    );
}
}
