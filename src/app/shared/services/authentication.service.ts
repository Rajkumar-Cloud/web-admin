import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  constructor() { 
    // this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    // this.currentUser = this.currentUserSubject.asObservable();
  }
  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }
  // login(username: string, password: string) {
  //   return this.http.post<any>(`/users/authenticate`, { username, password })
  //       .pipe(map(user => {            
  //           if (user && user.token) {                
  //               localStorage.setItem('currentUser', JSON.stringify(user));
  //               this.currentUserSubject.next(user);
  //           }
  //           return user;
  //       }));
  // }
}
