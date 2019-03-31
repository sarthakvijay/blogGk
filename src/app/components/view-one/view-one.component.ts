import { Component, OnInit, Inject } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-view-one',
  templateUrl: './view-one.component.html',
  styleUrls: ['./view-one.component.css']
})
export class ViewOneComponent implements OnInit {

  blogOneData: any;
  blogOtherData: any;
  requestedId: any;
  pageUrl: any;
  constructor(private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document) { }
  blogId: any;

  ngOnInit() {
    this.determineBlogId();
    this.blogData();
    this.allBlog();
    this.pageUrl = this.document.location.href;
  }

  determineBlogId() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.requestedId = params['id'];
      console.log(this.requestedId);
    });
  }

  blogData() {
    this.blogService.getRatedOneBlog(this.requestedId).subscribe(
      (res) => {
        this.blogOneData = res;
        this.blogOneData.content = this.binary2String(this.blogOneData.content);
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  allBlog() {
    this.blogService.allRatedBlogs().subscribe(
      data => {
        this.blogOtherData = data;
        // for (let a = 0; a < this.blogOtherData.length; a++) {
        //   const s = this.blogOtherData[a].content;
        //   this.blogOtherData[a].content = this.binary2String(s);
        // }
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  binary2String(s) {
    let i = 0, chr, out = '';
    const l = s.length;
    for (; i < l; i += 8) {
      chr = parseInt(s.substr(i, 8), 2).toString(16);
      out += '%' + ((chr.length % 2 === 0) ? chr : '0' + chr);
    }
    return decodeURIComponent(out);
  }

}
