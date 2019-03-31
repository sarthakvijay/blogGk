import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-one',
  templateUrl: './admin-one.component.html',
  styleUrls: ['./admin-one.component.css']
})
export class AdminOneComponent implements OnInit {

  blogOneData: any;
  blogOtherData: any;
  requestedId: any;
  constructor(private blogService: BlogService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }
  blogId: any;

  ngOnInit() {
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
        this.blogOneData.content = this.binary2String(this.blogOneData.content);
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  blogRating() {
    this.router.navigate(['admin-edit'], { queryParams: { id: this.requestedId } });
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
