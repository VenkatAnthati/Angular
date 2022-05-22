import { Injectable } from "@angular/core";
import {HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
  })
  export class LoginService {

constructor(private http: HttpClient){}

    postLoginForm(payLoad: any) {
        let header = new HttpHeaders({
            'Content-Type': 'application/json'
        });
        console.log("from angular payload", payLoad)
        return this.http.post<any>('http://localhost:3000/product',payLoad, { headers: header})
    }
  
  }