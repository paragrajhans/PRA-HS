import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as data from './mock_data.json';

//Base mock URL to populate users data
const users_url = "http://localhost:3000/users";

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    //Interceptor to intercept the type of CRUD operation
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        //Indicates getting all users
        if (request.url === users_url && request.method === 'GET') {
            return of(new HttpResponse({
                status: 200,
                body: ((data) as any).default,
            }));
        }

        //Indicates adding a user
        if (request.method === 'POST') {
            let temp_data = (data as any).default;
            temp_data.push(JSON.parse(request.body));

            request = request.clone({
                body: temp_data,
            })

            return of(new HttpResponse({
                status: 200,
                body: temp_data,
            }));
        }

        //Indicates deleting a user
        if (request.method === 'DELETE') {
            let id = request.url.substring(request.url.lastIndexOf('/') + 1);
            let temp = (data as any).default;
            const index = temp.findIndex(x => x.id == id);
            if (index !== undefined) temp.splice(index, 1);

            request = request.clone({
                body: temp,
            })

            return of(new HttpResponse({
                status: 200,
                body: temp,
            }));
        }

        //Indicates updating a user
        if (request.method === 'PUT') {
            let temp = (data as any).default;
            let new_user = request.body;
            let user_id = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

            let a = [];
            a.push(JSON.parse(new_user));

            temp.forEach((element, index) => {
                if (element.id == user_id) {
                    temp[index] = a[0];
                }
            });

            request = request.clone({
                body: temp,
            })

            return of(new HttpResponse({
                status: 200,
                body: temp,
            }));

        }

        return next.handle(request);
    }

}