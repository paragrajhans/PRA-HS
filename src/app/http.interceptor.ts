import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as data from './mock_data.json';

const users_url = "http://localhost:3000/users";

@Injectable()
export class MockHttpCalIInterceptor implements HttpInterceptor {
    constructor(private injector: Injector) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (request.url === users_url && request.method === 'GET') {
            // console.log("Request Method : " + request.method);
            // console.log("Request URL : " + request.url);
            // console.log("Loaded from json : " + request.url);
            // console.log(request)

            return of(new HttpResponse({
                status: 200,
                body: ((data) as any).default,
            }));
        }
        if (request.method === 'POST') {
            console.log("Request Method : " + request.method);
            console.log("Request URL : " + request.url);
            console.log("Request Body : " + request.body);

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
        if (request.method === 'DELETE') {
            // console.log("Request Method : " + request.method);
            // console.log("Request URL : " + request.url);
            // console.log("Request Body : " + JSON.stringify(request.body));

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