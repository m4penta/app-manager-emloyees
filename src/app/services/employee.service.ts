import { Observable, catchError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private baseUrl = 'http://localhost:8080/api/employee';
constructor( private http:HttpClient) { }

    // Hàm gọi API để lấy danh sách tất cả các employee
    getAllEmployees(): Observable<employee> {
      return this.http.get<employee>(this.baseUrl);
    }

    // Hàm gọi API để lấy thông tin của một employee theo ID
    getEmployeeById(id: number): Observable<employee> {
      return this.http.get<employee>(`${this.baseUrl}/${id}`);
    }

    // Hàm gọi API để tạo mới một employee
    createEmployee(employee: employee): Observable<employee> {
      return this.http.post<employee>(this.baseUrl, employee);
    }

    // Hàm gọi API để cập nhật thông tin của một employee
    updateemployee(id: number, employee: employee): Observable<employee> {
      return this.http.put<employee>(`${this.baseUrl}/${id}`, employee);
    }

    // Hàm gọi API để xóa một employee
    deleteEmployee(id: number): Observable<any> {
      return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
    }
    //Xóa nhiều employee dựa theo mảng id
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
