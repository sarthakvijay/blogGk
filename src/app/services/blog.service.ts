import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogService {

    constructor(private http: HttpClient) {

    }

    validateForm(formGroup: FormGroup): boolean {
        Object.values(formGroup.controls).forEach(ctrl => ctrl.markAsTouched());
        return formGroup.valid;
    }

    addingBlog(detail) {
        const details = JSON.stringify(detail);
        console.log('inside the service adding blog function');
        return this.http.post('/server/api/blog', details, httpOptions);
    }

    getOneBlog(id) {
        return this.http.get('server/api/blog/' + id);
    }

    getRatedOneBlog(id) {
        return this.http.get('server/api/rated/blog/' + id);
    }

    allBlogs() {
        return this.http.get('/server/api/blog');
    }

    allRatedBlogs() {
        return this.http.get('/server/api/rated/blog');
    }

    addRatedBlogs(detail) {
        const details = JSON.stringify(detail);
        console.log('inside the rated adding blog function');
        return this.http.post('/server/api/rated/blog', details, httpOptions);
    }

    addingEmail(detail) {
        const details = JSON.stringify(detail);
        console.log('inside the email add function');
        return this.http.post('/server/api/email', details, httpOptions);
    }
}

