import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ViewOneComponent } from './components/view-one/view-one.component';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminOneComponent } from './components/admin-one/admin-one.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';

const routes: Routes = [
  {
    path: 'add',
    component: AddBlogComponent
  },
  {
    path: 'view-all',
    component: ViewBlogComponent
  },
  {
    path: 'view-one',
    component: ViewOneComponent
  },
  {
    path: 'admin-view',
    component: AdminViewComponent
  },
  {
    path: 'admin-one',
    component: AdminOneComponent
  },
  {
    path: 'admin-edit',
    component: AdminEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
