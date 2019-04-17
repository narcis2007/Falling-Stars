import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {WebsiteService} from "../website.service";
import {ToastsManager} from "ng2-toastr";
import {CustomValidators} from "../../util/custom-validator";
import {Website} from "../../models/Website";
import {AnimationService} from "../animation.service";
import {Response} from "@angular/http";
import {Animation} from "../../models/Animation";


@Component({
    selector: 'app-register-website',
    templateUrl: 'register-website.component.html',
    styleUrls: ['register-website.component.css']
})
export class RegisterWebsiteComponent implements OnInit {//TODO: clear error message after success

    message: string;
    websiteForm: FormGroup;
    keyWords: Array<string>;
    keyWord: string;
    keyWordTouched: boolean = false;
    animations:Animation[];

    constructor(private formBuilder: FormBuilder,
                private websiteService: WebsiteService,
                private animationService:AnimationService,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.animationService.getAnimations().subscribe(
            data => this.onGetAnimationsSuccess(data),
            error => this.onGetAnimationsFailed(error)
        );
        this.buildForm();
    }

    private buildForm() {
        this.websiteForm = this.formBuilder.group({
            'name': new FormControl(null, [CustomValidators.required]),
            'keyWords': new FormControl(null, [CustomValidators.required]),
            'maxWords': new FormControl(null, [CustomValidators.required, CustomValidators.min(1), CustomValidators.max(10)]),
            'inAnimation': new FormControl(null, [CustomValidators.required]),//required temporary, in the future we want to not set the animations at first
            'outAnimation': new FormControl(null, [CustomValidators.required])

        });
    }

    addKeyWord() {
        if (this.keyWords == null)
            this.keyWords = [];
        this.keyWords.push(this.keyWord);
        console.log(this.keyWords);
        this.websiteForm.patchValue({keyWords: this.keyWords});
        console.log(this.websiteForm);
    }

    touchKeyWord() {
        this.keyWordTouched = true;
        console.log("keyWordTouched");
    }

    addWebsite() {
        var website: Website = new Website();
        website.name = this.websiteForm.controls['name'].value;
        website.keyWords = this.websiteForm.controls['keyWords'].value;
        website.maxWords = this.websiteForm.controls['maxWords'].value;
        website.inAnimationId=this.websiteForm.controls['inAnimation'].value;
        website.outAnimationId=this.websiteForm.controls['outAnimation'].value;
        this.websiteService.addWebsite(website).subscribe(
            data => this.onAddWebsiteSuccess(data),
            error => this.onAddWebsiteFailed(error)
        );
    }

    onAddWebsiteSuccess(data) {
        this.buildForm();
        this.keyWords = null;
        this.keyWord = null;
        this.keyWordTouched = false;
        this.toastr.success("Website added");
    }

    private onAddWebsiteFailed(error: any) {
        console.log("onAddWebsiteFailed");
        this.toastr.error("Can't do that");
        this.message = error.json()["message"];
    }

    private onGetAnimationsFailed(error: any) {

    }

    private onGetAnimationsSuccess(data: Response) {
        console.log("onGetAnimationsSuccess");
        this.animations=data.json();
    }
}
