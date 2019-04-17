import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {RegisterService} from "./register.service";
import {CustomValidators} from "../../util/custom-validator";
import {User} from "../../models/User";
import {Response} from "@angular/http";
import {GlobalConstants} from "../../constants/global-constants";
import {UrlPaths} from "../../constants/url-paths";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {ConfigService} from "../../config.service";
import {AlertMessageHandler} from "../../util/AlertMessageHandler";

@Component({
    selector: 'app-register',
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})
export class RegisterComponent extends AlertMessageHandler implements OnInit { //de parametrizat login component sa faca auto login

    message: string;
    registerForm: FormGroup;
    isRunning:boolean=false;

    constructor(public configService: ConfigService,
                private cookieService: CookieService,private router: Router, private formBuilder: FormBuilder, private registerService: RegisterService) {
        super();
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'email': new FormControl(null, [CustomValidators.required, CustomValidators.email]),
            'username': new FormControl(null, [CustomValidators.required]),
            'password': new FormControl(null, [CustomValidators.required, CustomValidators.password]),
            'firstName': new FormControl(null, [CustomValidators.required]),
            'lastName': new FormControl(null, [CustomValidators.required])
        });
    }

    register(){
        console.log("register");
        let user:User=new User();
        user.email=this.registerForm.controls['email'].value;
        user.username=this.registerForm.controls['username'].value;
        user.password=this.registerForm.controls['password'].value;
        user.firstName=this.registerForm.controls['firstName'].value;
        user.lastName=this.registerForm.controls['lastName'].value;
        this.isRunning = true;
        this.registerService.register(user).subscribe(
            data => this.onRegisterSuccess(data),
            error => this.onRegisterFailed(error)
        );
    }

    private onRegisterSuccess(data: Response) {
        console.log("onRegisterSuccess");
        var token: string = data.json()[GlobalConstants.AUTH_TOKEN_NAME];
        console.log(token);
        this.cookieService.put(GlobalConstants.AUTH_TOKEN_NAME, token);
        this.configService.setToken(token);
        this.router.navigate([UrlPaths.WALLET]);
    }

    private onRegisterFailed(error: any) {
        this.isRunning = false;
        console.log("onRegisterFailed");
        this.message = error.json()["message"];
    }
}
