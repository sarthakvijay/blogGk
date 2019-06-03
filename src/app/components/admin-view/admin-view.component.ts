import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import { Router } from '@angular/router';
import { AdminOneComponent } from '../admin-one/admin-one.component';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AddBlogComponent } from './../add-blog/add-blog.component';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private blogService: BlogService,
    private router: Router,
    private adminOneComponent: AdminOneComponent,
    private addBlogComponent: AddBlogComponent) { }

  blogAdminAll: any;
  blogAllRatedOnes: any;
  blogCalled: false;

  ngOnInit() {
    this.allBlog();
    this.allBlogRatedOnes();
  }

  blogread(details) {
    this.router.navigate(['/admin-one'], { queryParams: { title: details.title, id: details.id } });
  }

  allBlog() {
    this.blogService.allBlogs().subscribe(
      data => {
        this.blogAdminAll = data;
        // this.binary2String(this.blogAdminAll);
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  binary2String(blogAdmin) {
    for (let a = 0; a < blogAdmin.length; a++) {
      const s = blogAdmin[a].content;
      let i = 0, chr, out = '';
      const l = s.length;
      for (; i < l; i += 8) {
        chr = parseInt(s.substr(i, 8), 2).toString(16);
        out += '%' + ((chr.length % 2 === 0) ? chr : '0' + chr);
      }
      this.blogAdminAll[a].content = decodeURIComponent(out);
    }
  }

  allBlogRatedOnes() {
    this.blogService.allRatedBlogs().subscribe(
      data => {
        this.blogAllRatedOnes = data;
      },
      error => {
        console.log('error occured');
      }
    );
  }

  deleteExisting(details) {
    this.blogService.deleteFromRatedBlogs(details.id).subscribe(
      res => {
        console.log('inside this delete rated blog function');
      },
      error => {
        console.log('some error happened');
      }
    );
    this.allBlogRatedOnes();
    this.reloadPage();
  }

  addToEdit(details) {
    console.log('inside the edit function', details.id);
    this.blogService.addingBlog(details).subscribe(
      res => {
        console.log('inside the addToedit response function');
      },
      error => {
        console.log('inside the addToEdit error function function');
      }
    );
    this.deleteExisting(details);
  }

  deleteEditOnes(details) {
    console.log('inside delete edit ones function');
    this.blogService.deleteRatedBlog(details.id).subscribe(
      resp => {
        console.log('deleted from edit table ');
      },
      error => {
        console.log('some error occured');
      }
    );
    this.allBlog();
    this.reloadPage();
  }

  reloadPage() {
    this.ngOnInit();
  }


}
