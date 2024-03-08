import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() { }
    // Lưu dữ liệu vào localStorage
    setItem(key: string, value: any): void {
      localStorage.setItem(key, JSON.stringify(value));
    }

    // Lấy dữ liệu từ localStorage
    getItem(key: string): any {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }

    // Xóa dữ liệu khỏi localStorage
    removeItem(key: string): void {
      localStorage.removeItem(key);
    }
}
