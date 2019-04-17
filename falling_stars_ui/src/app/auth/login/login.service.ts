import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ConfigService} from '../../config.service';
import {ApiPaths} from '../../constants/api-paths';
import {User} from '../../models/User';

@Injectable()
export class LoginService {

    constructor(private http: Http, private configService: ConfigService) {
    }

    authenticateUser(user:User) {
        console.log( user);
        var creds = JSON.stringify(user);

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        return this.http.post(this.configService.getFullUrl(ApiPaths.LOGIN), creds, {
            headers: headers
        });
    }
}
