import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserAccountComponent implements OnInit {
  userLoginform: FormGroup;
  userRegisterform: FormGroup;
  loading = false;
  loading_reg = false;
  submitted = false;
  reg_submitted = false;
  returnUrl: string;

  constructor(private formBuilder:FormBuilder, private router: Router, private route: ActivatedRoute,
    private authService: AuthenticationService, private userService: UserService, private alertService : AlertService) { 
      // if(this.authService.currentUserValue) {
      //   this.router.navigate(['/']);
      // }
  }

  ngOnInit() {
    this.userLoginform = this.formBuilder.group({
      username: ['',Validators.compose([Validators.required, Validators.email])],
      password: ['',Validators.compose([Validators.required, Validators.minLength(8)])]
    });
    this.userRegisterform = this.formBuilder.group({
      fullname: ['',Validators.compose([Validators.required])],
      useremailId: ['',Validators.compose([Validators.required, Validators.email])],
      usermobileno: ['',Validators.compose([Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10)])],
      userNewpassword: ['',Validators.compose([Validators.required, Validators.minLength(8)])],
      userConfirmpassword: ['', Validators.required]
    },{
      validator: MustMatch('userNewpassword', 'userConfirmpassword')
    });
    // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.userLoginform.controls; }
  get fr() { return this.userRegisterform.controls; }

  onLoginSubmit() {    
    this.submitted = true;
    if(this.userLoginform.invalid) {
      return;
    }
    this.loading = true;    

  }
  
  onRegisterSubmit() { this.alertService.clear();
    this.reg_submitted = true;
    this.alertService.clear();
    if(this.userRegisterform.invalid) {
      return;
    }
    // console.log(this.userRegisterform.controls['fullname']+':'+this.userRegisterform.controls['fullname'].value);
    this.loading_reg = true;
    this.userService.register(this.userRegisterform.value).pipe(first()).subscribe({
      next: () => {
          this.alertService.success("Registration Successful", 'Success Registeration');
          this.router.navigate(['../user-account'], {relativeTo: this.route});
      } ,
      error: error => {
          this.alertService.error(error);
          this.loading = false;
      }
    });
  }
  
  onReset() {
    this.reg_submitted = false;
    this.userRegisterform.reset();
  }

  private displaySuccess() {
    this.alertService.success("Profile photo successfully uploaded!",
      { autoClose: false }
    );
  }

}
