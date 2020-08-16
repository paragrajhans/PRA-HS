import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user';

//Base mock URL to populate users data
const users_url = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private_options = {
    headers: new HttpHeaders({ "Content-Type": "application/json", })
  }

  constructor(private http: HttpClient) { }

  //Get users 
  getUsers(): Observable<User[]> {
    this.private_options.headers.append("Accept", "application/json");
    this.private_options.headers.append("Access-Control-Allow-Origin", "*");

    return this.http.get<User[]>(users_url, this.private_options).pipe(
      tap(data => console.log(data)));
  }

  //Save user
  saveUser(val): Observable<User> {
    this.private_options.headers.append("Accept", "application/json");
    this.private_options.headers.append("Access-Control-Allow-Origin", "*");

    return this.http.post<any>(users_url, val, this.private_options).pipe(
      tap(data => console.log(data)),

    );
  }

  //Delete user
  deleteUser(id: number): Observable<User> {
    const url = `${users_url}/${id}`;
    this.private_options.headers.append("Accept", "application/json");
    this.private_options.headers.append("Access-Control-Allow-Origin", "*");
    return this.http.delete<User>(url, this.private_options).pipe(
      tap(data => console.log(data)),
    );
  }

  //Update user
  updateUser(user): Observable<User> {
    this.private_options.headers.append("Accept", "application/json");
    this.private_options.headers.append("Access-Control-Allow-Origin", "*");
    return this.http.put<any>(users_url, user, this.private_options).pipe(
      tap(_ => console.log(`updated product`)));
  }

}
