import {Component, OnInit} from '@angular/core';
import {LoginService} from './login.service';
import {ConfigService} from '../../config.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {GlobalConstants} from '../../constants/global-constants';
import {UrlPaths} from '../../constants/url-paths';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertMessageHandler} from "../../util/AlertMessageHandler";



@Component({
    selector: 'app-login',
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})
export class LoginComponent extends AlertMessageHandler implements OnInit {
    rememberMe: boolean = false;
    message: string;
    initialPage:string;
    loginForm: FormGroup;
    isRunning:boolean=false;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private loginService: LoginService,
                public configService: ConfigService,
                private cookieService: CookieService,
                private formBuilder: FormBuilder) {
        super();
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.message = params['message'];
            this.initialPage=params['initialPage'];
        });

        if(this.authenticated()){
            this.redirectToInitialPage();
        }


        this.loginForm = this.formBuilder.group({
            'username':[null, Validators.required],
            'password':[null, Validators.required]
        });

    }

    private redirectToInitialPage() {
        if (this.initialPage == null || this.initialPage == 'undefined') {
            this.router.navigate([UrlPaths.WALLET]);
        } else {
            this.router.navigate([this.initialPage]);
        }
    }

    private authenticated() {
        let token: string = localStorage.getItem(GlobalConstants.AUTH_TOKEN_NAME);//I have to verify if the token has not yet expired

        if (token == null)
            token = this.cookieService.get(GlobalConstants.AUTH_TOKEN_NAME);

        if (token != null) {
            console.log(token);
            this.configService.setToken(token);

        }
        return token != null;
    }

    toggleRememberMe() {
        this.rememberMe = !this.rememberMe;
    }

    login(event) {
        this.isRunning=true;
        this.loginService.authenticateUser(this.loginForm.value).subscribe(
            data => this.onLoginSuccess(data),
            error => this.onLoginFailed(error)
        );
    }

    onLoginSuccess(data) {
        var token: string = data.json()[GlobalConstants.AUTH_TOKEN_NAME];
        console.log(token);
        if (this.rememberMe) {
            console.log("rememberMe");
            localStorage.setItem(GlobalConstants.AUTH_TOKEN_NAME, token);
        }
        this.cookieService.put(GlobalConstants.AUTH_TOKEN_NAME, token);
        this.configService.setToken(token);
        this.redirectToInitialPage();
        this.isRunning=false;
    }

    onLoginFailed(data) {
        console.log("login failed");
        if(data.json()["message"]){
            this.message = data.json()["message"];
        } else{
            this.message = "Unexpected Error Occured";
        }

        this.isRunning=false;
    }

    forgotPasswordRedirect(){
        this.router.navigate([UrlPaths.FORGOT_PASSWORD]);
    }
    registerRedirect(){
        this.router.navigate([UrlPaths.REGISTER]);
    }

}
