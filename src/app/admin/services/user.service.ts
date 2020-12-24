import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';

// @Injectable({ providedIn: 'root' })
@Injectable()
export class UserService {
  private readonly API = 'http://localhost:4000';

  constructor(
    private http: HttpClient
  ) {}

  getUsers(): Observable<any> {

    return this.http.get(`${this.API}/users`);
  }
  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.API}/users/${id}`);
  }


  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.API}/users/${user.id}`, user);
  }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.API}/users`, user);
  }
}
