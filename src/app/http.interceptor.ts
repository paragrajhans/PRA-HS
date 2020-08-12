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
            console.log("Request Method : " + request.method);
            console.log("Request URL : " + request.url);
            console.log("Loaded from json : " + request.url);

            return of(new HttpResponse({
                status: 200,
                body: ((data) as any).default,
            }));
        }
        return next.handle(request);
    }

}