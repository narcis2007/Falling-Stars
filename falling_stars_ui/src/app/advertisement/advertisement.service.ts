///<reference path="../constants/api-paths.ts"/>
import {Injectable} from '@angular/core';
import {Advertisement} from "../models/Advertisement";
import {Headers, Http} from "@angular/http";
import {ApiPaths} from "../constants/api-paths";
import {ConfigService} from "../config.service";

@Injectable()
export class AdvertisementService {

    constructor(private http: Http, private configService: ConfigService) {
    }

    addAdvertisement(linkAdvertisement: Advertisement) {
        console.log(linkAdvertisement);
        var creds = JSON.stringify(linkAdvertisement);

        return this.http.post(this.configService.getFullUrl(ApiPaths.ADVERTISEMENTS),creds, {headers: this.configService.getHeadersWithToken()});
    }

    getAdvertisements(){
        return this.http.get(this.configService.getFullUrl(ApiPaths.ADVERTISEMENTS), {headers: this.configService.getHeadersWithToken()});
    }

}
