import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  constructor(private blogService: BlogService) { }
  contactForm: FormGroup;
  subscribeForm: FormGroup;
  mailErrors: any;

  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mobile: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });

    this.subscribeForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]),
      jee: new FormControl(''),
      medical: new FormControl(''),
      exams: new FormControl('')
    });
  }

  emailContactForm() {
    this.blogService.validateForm(this.contactForm);
    console.log(this.contactForm.value.message);
    this.blogService.contactUsFormMail(this.contactForm.value).subscribe(
      data => {
        this.contactForm.reset();
        this.mailErrors = data;
      }, error => {
        this.contactForm.reset();
        this.mailErrors = (JSON.parse(JSON.stringify(error))).error.text;
      }
    );
  }

  subscribeFor() {
    if (this.subscribeForm.valid) {
      this.blogService.addingEmail(this.subscribeForm.value).subscribe(
        data => {
          this.subscribeForm.reset();
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


