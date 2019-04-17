import {Component, OnInit} from '@angular/core';
import {Wallet} from "../models/Wallet";
import {WalletService} from "./wallet.service";
import {Response} from "@angular/http";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {ToastsManager} from "ng2-toastr";

@Component({
    selector: 'app-wallet',
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
    wallet: Wallet;
    isRunning: boolean = true;
    message: string;
    withdrawnForm: FormGroup;

    constructor(private walletService: WalletService,
                private formBuilder: FormBuilder,
                public toastr: ToastsManager) {
    }

    ngOnInit() {
        this.withdrawnForm = this.formBuilder.group({
            'address': [null, Validators.required]
        });
        this.getWalletData();
    }

    private getWalletData() {
        this.isRunning = true;
        this.walletService.getWallet().subscribe(
            data => this.onGetWalletSuccess(data),
            error => this.onGetWalletFailed(error));
    }

    private onGetWalletSuccess(data: Response) {
        console.log('onGetWalletSuccess');
        this.isRunning = false;
        this.wallet = data.json();
        console.log(this.wallet);
    }

    private onGetWalletFailed(error: any) {
        console.log('onGetWalletFailed');
        this.isRunning = false;
        console.log(error);
    }

    withdraw() {
        console.log('withdraw to address ' + this.withdrawnForm.value);
        this.isRunning = true;
        this.walletService.withdraw(this.withdrawnForm.value).subscribe(
            data => this.onWithdrawSuccess(data),
            error => this.onWithdrawFailed(error));
    }

    private onWithdrawSuccess(data: Response) {
        console.log('onWithdrawSuccess');
        this.isRunning = false;
        var transactionStatus = data.json();
        if (transactionStatus.hash != null) {
            this.toastr.success('Transaction Status:' + transactionStatus.status);
        } else {
            this.toastr.warning(transactionStatus.status);
        }
        this.getWalletData();
        this.withdrawnForm.reset();
    }

    private onWithdrawFailed(error: any) {
        console.log('onWithdrawFailed');
        this.isRunning = false;
        this.toastr.warning('Couldn\'t perform withdrawal:' + error.json().message);
    }
}
