import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-match.validator';
@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class UserAccountComponent implements OnInit {
  userLoginform: FormGroup;
  userRegisterform: FormGroup;
  loading = false;
  loading_reg = false;
  submitted = false;
  reg_submitted = false;

  constructor(private formBuilder:FormBuilder) { 
    
  }

  ngOnInit() {  
    this.userLoginform = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.userRegisterform = this.formBuilder.group({
      fullname: ['',Validators.compose([Validators.required])],
      useremailId: ['',Validators.compose([Validators.required, Validators.email])],
      usermobileno: ['',Validators.compose([Validators.required, Validators.maxLength(10)])],
      userNewpassword: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
      userConfirmpassword: ['',Validators.compose([Validators.required])]
    },{
      validator: MustMatch('userNewpassword', 'userConfirmpassword')
    });
  }

  get f() { return this.userLoginform.controls; }
  get fr() { return this.userRegisterform.controls; }

  onLoginSubmit() {
    this.submitted = true;
    if(this.userLoginform.invalid) {
      return;
    }
    this.loading = true;
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.userLoginform.value, null, 4));


  }
  
  onRegisterSubmit() {
    this.reg_submitted = true;
    if(this.userRegisterform.invalid) {
      return;
    }
  }

}
