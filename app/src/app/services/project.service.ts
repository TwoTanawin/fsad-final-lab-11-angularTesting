import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable({
 providedIn: 'root'
})
export class ProjectService {
    private baseUrl = 'http://localhost:3500/projects';

    constructor(
        private http: HttpClient,
        private authService: AuthService
    ) {}

    private getHeaders(): HttpHeaders {
        const token = this.authService.getToken();
        return new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
      }
    

    create(project: Object): Observable<any> {
        return this.http.post(`${this.baseUrl}`, project, { headers: this.getHeaders() })
    }

    get(id: String): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
    }

    getAll(): Observable<any> {
        return this.http.get(`${this.baseUrl}`, { headers: this.getHeaders() })
    }

    update(id: String, project: Object): Observable<any> {
        return this.http.put(`${this.baseUrl}/${id}`, project, { headers: this.getHeaders() })
    }

    delete(id: String): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`, { headers: this.getHeaders() })
    }
}
