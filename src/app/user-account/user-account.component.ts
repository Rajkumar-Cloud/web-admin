import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../_service/user.service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userLoginform: FormGroup;
  loading = false;
  submitted = false;

  constructor(private fb:FormBuilder, private router: Router, private userService: UserService) { 
    this.userService = fb.group({

    });
  }

  ngOnInit() {  
    this.userLoginform = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
    });
  }

  get f() { return this.userLoginform.controls; }

  submitForm() {
    this.submitted = true;
    console.log(this.userLoginform.getRawValue());
    if(this.userLoginform.invalid) {
      return;
    }
    this.loading = true;
  }

}
