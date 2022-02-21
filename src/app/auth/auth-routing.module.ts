import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAccountComponent } from './components/user-account/user-account.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


const routes: Routes = [
  {path: 'userAccess', component: UserAccountComponent},
  { path: 'reset-password', component: ResetPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
