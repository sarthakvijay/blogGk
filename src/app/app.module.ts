import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from './services/blog.service';
import { HttpClientModule } from '@angular/common/http';
import { ViewBlogComponent } from './components/view-blog/view-blog.component';
import { ViewOneComponent } from './components/view-one/view-one.component';
import { TruncatePipe } from './pipes/truncatePipe';
import { AdminViewComponent } from './components/admin-view/admin-view.component';
import { AdminOneComponent } from './components/admin-one/admin-one.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { TagButtonsComponent } from './features/tag-buttons/tag-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    AddBlogComponent,
    ViewBlogComponent,
    ViewOneComponent,
    TruncatePipe,
    AdminViewComponent,
    AdminOneComponent,
    AdminEditComponent,
    ViewStreamComponent,
    TagButtonsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [BlogService, ViewOneComponent, AdminOneComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
