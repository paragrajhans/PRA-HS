import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from './user';

const users_url = "http://localhost:3000/users";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    let private_options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    private_options.headers.append("Accept", "application/json");
    private_options.headers.append("Access-Control-Allow-Origin", "*");

    return this.http.get<User[]>(users_url, private_options);
  }

  saveUser(val): Observable<User> {
    console.log(val);
    let private_options = {
      headers: new HttpHeaders({ "Content-Type": "application/json" })
    };
    private_options.headers.append("Accept", "application/json");
    private_options.headers.append("Access-Control-Allow-Origin", "*");

    return this.http.post<any>(users_url, val, private_options).pipe(
      tap(data => console.log(data)),

    );
  }


}
