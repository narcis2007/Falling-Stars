import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {ConfigService} from "../config.service";
import {ApiPaths} from "../constants/api-paths";
import {Website} from "../models/Website";

@Injectable()
export class WebsiteService {

    constructor(private http: Http, private configService: ConfigService) {
    }

    addWebsite(website: Website) {
        console.log(website);
        var creds = JSON.stringify(website);

        return this.http.post(this.configService.getFullUrl(ApiPaths.DOMAINS), creds, {headers: this.configService.getHeadersWithToken()});
    }

    getRegisteredWebsites() {
        return this.http.get(this.configService.getFullUrl(ApiPaths.DOMAINS), {headers: this.configService.getHeadersWithToken()});
    }

    getWebsiteStats(websiteName:string){
        return this.http.get(this.configService.getFullUrl(ApiPaths.DOMAINS+"/stats/"+websiteName), {headers: this.configService.getHeadersWithToken()});
    }
}
