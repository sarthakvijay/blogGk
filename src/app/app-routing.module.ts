import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ViewOneComponent } from './components/view-one/view-one.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminOneComponent } from './components/admin-one/admin-one.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './pipes/auth.guard';
import { RoleGuard } from './pipes/role.guard';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { CounsellingComponent } from './features/counseling/counselling/counselling.component';
import { RankCalculatorComponent } from './features/counseling/rank-calculator/rank-calculator.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddBlogComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'view-all',
    component: ViewBlogComponent
  },
  {
    path: '',
    component: ViewBlogComponent
  },
  {
    path: 'view-one',
    component: ViewOneComponent
  },
  {
    path: 'admin-view',
    component: AdminViewComponent,
    canActivate: [RoleGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'admin-one',
    component: AdminOneComponent,
    canActivate: [RoleGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'admin-edit',
    component: AdminEditComponent,
    canActivate: [RoleGuard],
    data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'view-stream',
    component: ViewStreamComponent
  },
  {
    path: 'auth/login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: RegisterComponent
  },
  {
    path: 'about-us',
    component: AboutUsComponent
  },
  {
    path: 'contact-us',
    component: ContactComponent
  },
  {
    path: 'counselling',
    component: RankCalculatorComponent
  },
  {
    path: 'jeeMainsCounselling',
    component: RankCalculatorComponent
  },
  {
    path: '',
    redirectTo: 'view-all',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
