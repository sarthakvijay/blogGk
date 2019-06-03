import { Component, OnInit } from '@angular/core';
import { BlogService } from './../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewOneComponent } from './../view-one/view-one.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-view-stream',
  templateUrl: './view-stream.component.html',
  styleUrls: ['./view-stream.component.css']
})
export class ViewStreamComponent implements OnInit {

  constructor(private blogService: BlogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private viewOneComponent: ViewOneComponent) { }

  blogAll: any;
  blogAllFiltered: any;
  streamName: any;
  ngOnInit() {
    this.allBlog();
    this.determineBlogStream();
  }

  blogread(details) {
    this.router.navigate(['/view-one'], { queryParams: { title: details.title, id: details.id } });
  }

  determineBlogStream() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.streamName = params['stream'];
    });
    this.blogAllFilter();
  }

  allBlog() {
    this.blogService.allRatedBlogs().subscribe(
      data => {
        this.blogAll = data;
      },
      error => {
        console.log('error occured');
        return false;
      }
    );
  }

  blogAllFilter(): Observable<any> {
    if (this.streamName === 'Competitive Exams') {
      this.blogAllFiltered = this.blogAll.filter(e => e.tags.includes('Competitive Exams'));
    } else {
      this.blogAllFiltered = this.blogAll.filter(e => e.stream === this.streamName);
    }
    return this.blogAllFiltered;
  }

}
