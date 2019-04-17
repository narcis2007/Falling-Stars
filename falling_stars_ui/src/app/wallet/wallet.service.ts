import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ConfigService} from "../config.service";
import {ApiPaths} from "../constants/api-paths";
import {Wallet} from "../models/Wallet";

@Injectable()
export class WalletService {

    constructor(private http: Http, private configService: ConfigService) {
    }

    getWallet() {
        return this.http.get(this.configService.getFullUrl(ApiPaths.WALLET), {headers: this.configService.getHeadersWithToken()});
    }

    withdraw(wallet: Wallet) {
        return this.http.post(this.configService.getFullUrl(ApiPaths.WALLET) + '/withdraw', JSON.stringify(wallet), {headers: this.configService.getHeadersWithToken()});
    }

}
