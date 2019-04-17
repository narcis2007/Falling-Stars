/**
 * Created by Narcis2007 on 09.10.2016.
 */
import {Validators, FormControl, ValidatorFn, AbstractControl} from '@angular/forms';

export class CustomValidators extends Validators { //must return an error or null if no errors occured
    static email(c: FormControl) {
        let EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        return EMAIL_REGEXP.test(c.value) ? null : {
                invalidEmail: true
            };
    }

    static password(c: FormControl) {
        let PASSWORD_REGEXP = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;

        return PASSWORD_REGEXP.test(c.value) ? null : {
                invalidPassword: true
            };
    }

    static min(min: number): ValidatorFn {

        return (control: AbstractControl): {[key: string]: any} => {
            return control.value >= min ? null : {
                    invalidMin: true
                };
        };
    }

    static max(max: number): ValidatorFn {

        return (control: AbstractControl): {[key: string]: any} => {
            return control.value <= max ? null : {
                    invalidMax: true
                };
        };
    }


    static url(c: FormControl) {
        let PASSWORD_REGEXP = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/i;

        return PASSWORD_REGEXP.test(c.value) ? null : {
                invalidUrl: true
            };
    }

}