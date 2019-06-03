import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { TokenStorageService } from '../auth/token-storage.service';
import { AuthLoginInfo } from '../auth/login-info';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  returnUrl: any;
  authAuthorities: any;
  loginButNotAdmin: boolean;
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginButNotAdmin = false;
    this.gettingUserLoginData();
  }

  gettingUserLoginData() {
    if (sessionStorage.getItem('AuthAuthorities')) {
      this.authAuthorities = (JSON.parse(sessionStorage.getItem('AuthAuthorities')))[0].authority;
      console.log(this.authAuthorities);
      if (this.authAuthorities !== 'ROLE_ADMIN') {
        this.loginButNotAdmin = true;
        console.log(this.loginButNotAdmin);
      }
    }
  }

  onSubmit() {
    console.log(this.form);

    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUsername(data.username);
        this.tokenStorage.saveAuthorities(data.authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
        this.router.navigate([this.returnUrl]);
        this.gettingUserLoginData();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  logout() {
    this.tokenStorage.signOut();
    this.reloadPage();
  }
}
