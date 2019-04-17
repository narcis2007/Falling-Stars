import {Injectable} from '@angular/core';
import {Headers} from '@angular/http';
import {GlobalConstants} from './constants/global-constants';

@Injectable()
export class ConfigService {

    private authToken: string;

    constructor() {
    }

    setToken(token: string) {
        console.log("set token: " + token);
        this.authToken = token;
    }

    public isLogged() {//must check the cookie or the local storage or the reload won't work
        return this.authToken != null;
    }

    addTokenToHeaders(headers: Headers) {
        if (this.authToken != null) {
            console.log("addTokenToHeaders: " + this.authToken);
            headers.append(GlobalConstants.AUTH_TOKEN_NAME, this.authToken);
        }
    }

    getHeadersWithToken() { // no more repeated code
        console.log("getHeadersWithToken");
        var headers = this.getHeaders();
        if (this.isLogged()) {
            this.addTokenToHeaders(headers);
        }
        return headers;
    }

    getHeaders() {
        console.log("getHeaders");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getFullUrl(relativePath: string) {
        return GlobalConstants.BASE_API_URL + relativePath;
    }

}
