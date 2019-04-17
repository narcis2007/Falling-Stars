import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl} from '@angular/forms';
import {ForgotPasswordService} from "./forgot-password.service";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {UrlPaths} from '../../constants/url-paths';
import {CustomValidators} from "../../util/custom-validator";
import {User} from "../../models/User";

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.component.html',
    styleUrls: ['forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
    message: string;
    forgotPasswordForm: FormGroup;

    constructor(private router: Router, private formBuilder: FormBuilder, private forgotPasswordService: ForgotPasswordService) {
    }

    ngOnInit() {
        this.forgotPasswordForm = this.formBuilder.group({
            'email': new FormControl(null, [CustomValidators.required, CustomValidators.email])
        });
    }

    resetPassword() {
        var user:User=new User();
        user.email=this.forgotPasswordForm.controls['email'].value;
        this.forgotPasswordService.sendEmail(user).subscribe(
            data => this.onSendSuccess(data),
            error => this.onSendFailed(error)
        );
    }

    private onSendSuccess(data: Response) {
        console.log("onSendSuccess");
        this.router.navigate([UrlPaths.LOGIN, {
            message: 'An email with instructions to reset your password has been sent.'
        }]);
    }

    private onSendFailed(data: any) {
        console.log("onSendFailed");
        this.message = data.json()["message"];
    }
}
