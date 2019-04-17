import {Injectable} from '@angular/core';
import {Http, Headers} from "@angular/http";
import {ConfigService} from "../../config.service";
import {User} from "../../models/User";
import {ApiPaths} from "../../constants/api-paths";

@Injectable()
export class ResetPasswordService {

    constructor(private http: Http, private configService: ConfigService) {
    }

    resetPassword(user: User, sptoken: string) {
        console.log(user);
        var creds = JSON.stringify(user);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('sptoken', sptoken);
        return this.http.post(this.configService.getFullUrl(ApiPaths.RESET_PASSWORD), creds, {
            headers: headers
        });
    }

}
