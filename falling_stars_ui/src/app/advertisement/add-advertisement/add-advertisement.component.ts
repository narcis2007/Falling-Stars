import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from "@angular/forms";
import {CustomValidators} from "../../util/custom-validator";
import {AdvertisementService} from "../advertisement.service";
import {Advertisement} from "../../models/Advertisement";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-add-advertisement',
    templateUrl: 'add-advertisement.component.html',
    styleUrls: ['add-advertisement.component.css']
})
export class AddAdvertisement implements OnInit {

    message: string;
    addAdvertisementForm: FormGroup;
    keyWords:Array<string>;
    keyWord:string;
    keyWordTouched:boolean=false;
    constructor(private formBuilder: FormBuilder,
                private advertisementService: AdvertisementService, public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.buildForm();

    }

    private buildForm() {
        this.addAdvertisementForm = this.formBuilder.group({
            'text': new FormControl(null, [CustomValidators.required]),
            'url': new FormControl(null, [CustomValidators.required, CustomValidators.url]),
            'keyWords': new FormControl(null, [CustomValidators.required])
        });
    }
    addKeyWord(){
        if(this.keyWords==null)
            this.keyWords=[];
        this.keyWords.push(this.keyWord);
        console.log(this.keyWords);
        this.addAdvertisementForm.patchValue({keyWords:this.keyWords});
        console.log(this.addAdvertisementForm);
    }
    touchKeyWord(){
        this.keyWordTouched=true;
        console.log("keyWordTouched");
    }

    addLinkAdvertisement(){
        console.log("addLinkAdvertisement");
        let link:Advertisement=new Advertisement();
        link.text=this.addAdvertisementForm.controls['text'].value;
        link.url=this.addAdvertisementForm.controls['url'].value;
        link.keyWords=this.addAdvertisementForm.controls['keyWords'].value;
        this.advertisementService.addAdvertisement(link).subscribe(
            data => this.onAddAdvertisementSuccess(data),
            error => this.onAddAdvertisementFailed(error)
        );
    }

    onAddAdvertisementSuccess(data){
        this.buildForm();
        this.keyWords=null;
        this.keyWord=null;
        this.toastr.success("New advertisement added");
    }

    private onAddAdvertisementFailed(error: any) {
        console.log("onAddAdvertisementFailed");
        this.toastr.error("Can't do that");
        this.message = error.json()["message"];
    }

}
