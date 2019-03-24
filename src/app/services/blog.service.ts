import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogService {
    imageData: Array<string>;
    constructor(private http: HttpClient) {

    }

    validateForm(formGroup: FormGroup): boolean {
        Object.values(formGroup.controls).forEach(ctrl => ctrl.markAsTouched());
        return formGroup.valid;
    }

    // addingBlog(detail): Observable<any> {
    //     const details = JSON.stringify(detail);
    //     return this.http.post('http://localhost:8080/api/blog', details, httpOptions);
    // }

    // getOneBlog(id): Observable<any> {
    //     return this.http.get('http://54.158.231.106:8080/api/blog/' + id);
    // }

    // getRatedOneBlog(id): Observable<any> {
    //     return this.http.get('http://54.158.231.106:8080/api/rated/blog/' + id);
    // }

    // allBlogs(): Observable<any> {
    //     return this.http.get('http://54.158.231.106:8080/api/blog');
    // }

    // allRatedBlogs(): Observable<any> {
    //     return this.http.get('http://54.158.231.106:8080/api/rated/blog');
    // }

    // addRatedBlogs(detail): Observable<any> {
    //     const details = JSON.stringify(detail);
    //     return this.http.post('http://54.158.231.106:8080/api/rated/blog', details, httpOptions);
    // }

    // addingEmail(detail): Observable<any> {
    //     const details = JSON.stringify(detail);
    //     return this.http.post('http://54.158.231.106:8080/api/email', details, httpOptions);
    // }

    addingBlog(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post('/server/api/blog', details, httpOptions);
    }

    getOneBlog(id): Observable<any> {
        return this.http.get('/server/api/blog/' + id);
    }

    getRatedOneBlog(id): Observable<any> {
        return this.http.get('/server/api/rated/blog/' + id);
    }

    allBlogs(): Observable<any> {
        return this.http.get('/server/api/blog');
    }

    allRatedBlogs(): Observable<any> {
        return this.http.get('/server/api/rated/blog');
    }

    addRatedBlogs(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post('/server/api/rated/blog', details, httpOptions);
    }

    addingEmail(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post('/server/api/email', details, httpOptions);
    }
}

