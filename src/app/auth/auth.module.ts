import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthRoutingModule } from './auth-routing.module';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from '../shared/components/alert/alert.component';
@NgModule({
  declarations:[AlertComponent, UserAccountComponent,ResetPasswordComponent],
  imports: [
    CommonModule,
    AppMaterialModule, 
    AuthRoutingModule, 
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [AlertComponent, UserAccountComponent, ResetPasswordComponent]
})
export class AuthModule { }
