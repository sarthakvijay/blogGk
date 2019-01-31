import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import { Router } from '@angular/router';
import { AdminOneComponent } from '../admin-one/admin-one.component';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';


@Component({
  selector: 'app-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.css']
})
export class AdminViewComponent implements OnInit {

  constructor(private blogService: BlogService,
    private router: Router,
    private adminOneComponent: AdminOneComponent) { }

  blogAdminAll: any;
  blogCalled: false;

  ngOnInit() {
    this.allBlog();
  }

  blogread(details) {
    this.router.navigate(['/admin-one'], { queryParams: { title: details.title, id: details.id } });
  }

  allBlog() {
    this.blogService.allBlogs().subscribe(
      data => {
        this.blogAdminAll = data;
        this.binary2String(this.blogAdminAll);
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
      this.blogAdminAll[a].content =  decodeURIComponent(out);
    }
  }

}
