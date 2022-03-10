import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";
import { User } from '../models/users';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject:BehaviorSubject<User>;
  private user:Observable<User>;
  constructor(private router:Router, private http: HttpClient) {
      this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
      this.user = this.userSubject.asObservable();
  }
  
  // getAll(){
  //   return this.http.get<User[]>('/users');
  // }

  // getById(id: number){
  //   return this.http.get('/users/' +id);
  // }

  register(User: any){
    return this.http.post(`${environment.apiUrl}/register.php`, User);
  }

}
