import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BlogService {

    url = environment.baseUrl;

    data: Array<string>;

    private userUrl = `${this.url}/api/test/user`;
    private pmUrl = `${this.url}/api/test/pm`;
    private adminUrl = `${this.url}/api/test/admin`;

    constructor(private http: HttpClient) {
    }

    validateForm(formGroup: FormGroup): boolean {
        Object.values(formGroup.controls).forEach(ctrl => ctrl.markAsTouched());
        return formGroup.valid;
    }

    addingBlog(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post(`${this.url}/api/blog`, details, httpOptions);
    }

    getOneBlog(id): Observable<any> {
        return this.http.get(`${this.url}/api/blog/` + id);
    }

    getRatedOneBlog(id): Observable<any> {
        return this.http.get(`${this.url}/api/rated/blog/` + id);
    }

    allBlogs(): Observable<any> {
        return this.http.get(`${this.url}/api/blog`);
    }

    allRatedBlogs(): Observable<any> {
        return this.http.get(`${this.url}/api/rated/blog`);
    }

    addRatedBlogs(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post(`${this.url}/api/rated/blog`, details, httpOptions);
    }

    deleteRatedBlog(id): Observable<any> {
        return this.http.delete(`${this.url}/api/blog/` + id);
    }

    addingEmail(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post(`${this.url}/api/email`, details, httpOptions);
    }

    branchesAvailableMains(rankDetailsArray): Observable<any> {
        return this.http.post(`${this.url}/api/databaseQuery/calculated`, rankDetailsArray);
    }

    branchesAvailableAdvance(rankDetailsArray): Observable<any> {
        return this.http.post(`${this.url}/api/databaseQuery/iitCalculated`, rankDetailsArray);
    }


    getJosaaInstituteNames(): Observable<any> {
        return this.http.get(`${this.url}/api/databaseQuery/instituteNames`);
    }

    getJosaaIitInstituteNames(): Observable<any> {
        console.log('inside iit institute name function');
        return this.http.get(`${this.url}/api/databaseQuery/iitInstituteNames`);
    }

    contactUsFormMail(detail): Observable<any> {
        const details = JSON.stringify(detail);
        return this.http.post(`${this.url}/api/email/smtp`, httpOptions);
    }

    deleteFromRatedBlogs(id): Observable<any> {
        return this.http.delete(`${this.url}/api/rated/blog/${id}`);
    }

    //  api relating to jwt authenticatio token

    getUserBoard(): Observable<string> {
        return this.http.get(this.userUrl, { responseType: 'text' });
    }

    getPMBoard(): Observable<string> {
        return this.http.get(this.pmUrl, { responseType: 'text' });
    }

    getAdminBoard(): Observable<string> {
        return this.http.get(this.adminUrl, { responseType: 'text' });
    }

}

