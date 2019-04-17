import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {CustomValidators} from "../../util/custom-validator";
import {ResetPasswordService} from "./reset-password.service";
import {User} from "../../models/User";
import {Response} from "@angular/http";
import {UrlPaths} from "../../constants/url-paths";

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
    message: string;
    resetPasswordForm: FormGroup;
    sptoken: string;

    constructor(private router: Router, private formBuilder: FormBuilder, private route: ActivatedRoute, private resetPasswordService:ResetPasswordService) {
        this.sptoken = this.route.snapshot.queryParams['sptoken'];
    }

    ngOnInit() {
        this.resetPasswordForm = this.formBuilder.group({
            'password1': new FormControl(null, [CustomValidators.password]),
            'password2': new FormControl(null, [CustomValidators.password])
        });
    }

    resetPassword() {
        console.log("resetPassword");
        var user:User=new User();
        user.password=this.resetPasswordForm.controls["password1"].value;
        this.resetPasswordService.resetPassword(user,this.sptoken).subscribe(
            data => this.onResetSuccess(data),
            error => this.onResetFailed(error)
        );
    }

    passwordsMatch() {
        return this.resetPasswordForm.controls['password1'].value === this.resetPasswordForm.controls['password2'].value;
    }

    areValid() {
        return (this.resetPasswordForm.valid) || !(this.resetPasswordForm.controls['password1'].touched && this.resetPasswordForm.controls['password2'].touched);
    }


    private onResetFailed(data: any) {
        console.log("onResetFailed");
        this.message = data.json()["message"];
    }

    private onResetSuccess(data: Response) {
        console.log("onResetSuccess");
        this.router.navigate([UrlPaths.LOGIN, {
            message: 'Your password has been reset'
        }]);
    }
}
