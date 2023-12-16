import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/employees';


  constructor(private http: HttpClient) {
    
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  GetDataBase(): Observable<any> {
    return this.http.get(this.apiUrl );
  }

  PostDataBase(name: string): Observable<any> {
    return this.http.post(this.apiUrl, { name },this.httpOptions);
  }
  
  PutDataBase(id: number, name: string): Observable<any> {
    const updateUrl = `${this.apiUrl}/${id}`;
    const body = { name };
    return this.http.put(updateUrl, body,this.httpOptions);
  }

  DeleteDataBase(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${id}`;
    return this.http.delete(deleteUrl, this.httpOptions);
  }
  
}
