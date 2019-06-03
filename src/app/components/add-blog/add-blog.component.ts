import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BlogService } from './../../services/blog.service';
import { Observable, throwError } from 'rxjs';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { FORMERR } from 'dns';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  blogform: FormGroup;
  validMessage: ' ';
  previewCont: any;
  authAuthorities: any;
  authUsername: any;
  authToken: any;

  constructor(private blogService: BlogService,
    private router: Router) { }

  ngOnInit() {
    this.blogform = new FormGroup({
      title: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required),
      image: new FormControl('', Validators.required),
      tags: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      stream: new FormControl('', Validators.required),
      author: new FormControl('', Validators.required),
      aboutAuthor: new FormControl('', Validators.required),
      days: new FormControl('', Validators.required)
    });

    this.gettingUserLoginData();
  }

  gettingUserLoginData() {
    if (sessionStorage.getItem('AuthAuthorities')) {
      this.authAuthorities = (JSON.parse(sessionStorage.getItem('AuthAuthorities')))[0].authority;
      this.authToken = sessionStorage.getItem('AuthToken');
      this.authUsername = sessionStorage.getItem('AuthUsername');
    }
  }

  addBlogData() {
    this.blogService.validateForm(this.blogform);
    if (this.blogform.valid) {
      this.blogService.addingBlog(this.blogform.value).subscribe(
        data => {
          if (this.authAuthorities === 'ROLE_ADMIN') {
            this.router.navigate(['admin-view']);
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          return false;
        }
      );
    } else {
      console.log('blogform is not valid');
    }
  }

  text2Binary() {
    if (this.blogform.valid) {
      let s = this.blogform.get('content').value;
      console.log(s);
      s = unescape(encodeURIComponent(s));
      let chr, i = 0, out = '';
      const l = s.length;
      for (; i < l; i++) {
        chr = s.charCodeAt(i).toString(2);
        while (chr.length % 8 !== 0) { chr = '0' + chr; }
        out += chr;
      }
      this.blogform.patchValue({ 'content': out });
      this.addBlogData();
    } else {
      this.blogService.validateForm(this.blogform);
    }
  }

  insertAtCursor(v) {
    let s = this.blogform.get('content').value;
    s += v;
    this.blogform.patchValue({ 'content': s });
  }

  previewContent() {
    console.log('calles this function');
    this.previewCont = this.blogform.value;
    console.log(this.previewCont);
  }
}
