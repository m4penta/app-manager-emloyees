import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of, throwError } from 'rxjs';
import { Admin } from '../models/admin';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = 'http://localhost:8080/api/admins'; // URL của API Spring Boot

  constructor(private http: HttpClient) { }

  // Hàm gọi API để lấy danh sách tất cả các admin
  getAllAdmins(): Observable<Admin> {
    return this.http.get<Admin>(this.baseUrl);
  }

  // Hàm gọi API để lấy thông tin của một admin theo ID
  getAdminById(id: number): Observable<Admin> {
    return this.http.get<Admin>(`${this.baseUrl}/${id}`);
  }

  // Hàm gọi API để tạo mới một admin
  createAdmin(admin: Admin): Observable<Admin> {
    return this.http.post<Admin>(this.baseUrl, admin);
  }

  // Hàm gọi API để cập nhật thông tin của một admin
  updateAdmin(id: number, admin: Admin): Observable<Admin> {
    return this.http.put<Admin>(`${this.baseUrl}/${id}`, admin);
  }

  // Hàm gọi API để xóa một admin
  deleteAdmin(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
  //Xóa nhiều admin dựa theo mảng id
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
