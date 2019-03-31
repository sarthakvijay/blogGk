import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ViewOneComponent } from './../view-one/view-one.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.css']
})
export class ViewBlogComponent implements OnInit {

  constructor(private blogService: BlogService,
    private router: Router,
    private viewOneComponent: ViewOneComponent) { }

  blogAll: any;
  blogCalled: false;
  blogAllFiltered: any;
  ngOnInit() {
    this.allBlog();
  }

  blogread(details) {
    this.router.navigate(['/view-one'], { queryParams: { title: details.title, id: details.id } });
  }

  allBlog() {
    this.blogService.allRatedBlogs().subscribe(
      data => {
        this.blogAll = data;
        // this.binary2String(this.blogAll);
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  blogAllFilter(str): Observable<any> {
    this.blogAllFiltered = this.blogAll.filter(e => e.stream === str);
    console.log('hi i am here for loking');
    return this.blogAllFiltered;
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
      this.blogAll[a].content = decodeURIComponent(out);
    }
  }

}
