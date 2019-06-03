import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BlogService } from './services/blog.service';
import { OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private blogService: BlogService) { }
  title = 'blog-ui';

  subscribeForm: FormGroup;

  ngOnInit() {
    this.subscribeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      jee: new FormControl(''),
      medical: new FormControl(''),
      exams: new FormControl('')
    });
  }

  subscribeF(subscribeForm: FormGroup): boolean {
    this.blogService.validateForm(subscribeForm);
    if (subscribeForm.valid) {
      this.blogService.addingEmail(subscribeForm.value).subscribe(
        data => {
          subscribeForm.reset();
          return true;
        },
        error => {
          return false;
        }
      );
    } else {
      return false;
    }
  }
}
