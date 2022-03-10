import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
// import { AlertService } from 'src/app/shared/services/alert.service';
import { UserService } from 'src/app/shared/services/user.service';
import { MustMatch } from 'src/app/_helpers/must-match.validator';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

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
  userReg_arr: any;

  constructor(private formBuilder:FormBuilder, private router: Router, private route: ActivatedRoute,
    private authService: AuthenticationService, private userService: UserService, private toastr: ToastrService) { 
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
  
  onRegisterSubmit() {    
    this.reg_submitted = true;
    if(this.userRegisterform.invalid) {
      return;
    }
    this.userReg_arr = {
        first_name: this.userRegisterform.controls['fullname'].value,
        email: this.userRegisterform.controls['useremailId'].value,
        mobileno: this.userRegisterform.controls['usermobileno'].value,        
        password: this.userRegisterform.controls['userNewpassword'].value,
    }
    // console.log(this.userRegisterform.controls['fullname']+':'+this.userRegisterform.controls['fullname'].value);
    this.loading_reg = true;
    this.userService.register(this.userReg_arr).pipe(first()).subscribe({
      next: (response: any) => {
          this.loading_reg = false;  
          if(response.success == 1) {      
            this.toastr.success(response.message,"Successfully registered!");
          } else {
            this.toastr.error(response.message, "Existing user!");
          }
          this.router.navigate(['../user-account'], {relativeTo: this.route});
      } ,
      error: error => {
         this.toastr.error("Problem to registered", error.message);
          this.loading = false;
      }
    });
  }
  
  onReset() {
    this.reg_submitted = false;
    this.userRegisterform.reset();
  }


}
