import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from './../../services/blog.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private blogService: BlogService) { }

  requestedId: any;
  blogOneData: any;

  adminEditBlog: any;

  ngOnInit() {
    this.adminEditBlog = new FormGroup({
      title: new FormControl(''),
      content: new FormControl(''),
      image: new FormControl(''),
      subject: new FormControl(''),
      tags: new FormControl(''),
      stream: new FormControl(''),
      author: new FormControl(''),
      aboutAuthor: new FormControl(''),
      rating: new FormControl('')
    });

    this.determineBlogId();
    this.blogData();
  }

  determineBlogId() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.requestedId = params['id'];
      console.log(this.requestedId);
    });
  }

  blogData() {
    this.blogService.getOneBlog(this.requestedId).subscribe(
      (res) => {
        this.blogOneData = res;
        this.editBlogData(this.blogOneData);
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  editBlogData(details) {
    details.content = this.binary2String(details.content);
    this.adminEditBlog.patchValue(details);
  }

  addRatedBlog() {
    this.blogService.addRatedBlogs(this.adminEditBlog.value).subscribe(
      (res) => {
        this.deleteBlog();
        this.adminEditBlog.reset();
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  deleteBlog() {
    this.blogService.deleteRatedBlog(this.requestedId).subscribe(
      (res) => {
        // console.log(res.body);
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  text2Binary() {
    let s = this.adminEditBlog.get('content').value;
    console.log(s);
    s = unescape(encodeURIComponent(s));
    let chr, i = 0, out = '';
    const l = s.length;
    for (; i < l; i++) {
      chr = s.charCodeAt(i).toString(2);
      while (chr.length % 8 !== 0) { chr = '0' + chr; }
      out += chr;
    }
    this.adminEditBlog.patchValue({ 'content': out });
    this.addRatedBlog();
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
