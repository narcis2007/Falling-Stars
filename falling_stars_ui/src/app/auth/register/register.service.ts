import { Injectable } from '@angular/core';
import {User} from "../../models/User";
import {ConfigService} from "../../config.service";
import {Http, Headers} from "@angular/http";
import {ApiPaths} from "../../constants/api-paths";

@Injectable()
  export class RegisterService {

  constructor(private http: Http, private configService: ConfigService) { }

    register(user: User) {
      console.log( user);
      var creds = JSON.stringify(user);

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');

      return this.http.post(this.configService.getFullUrl(ApiPaths.REGISTER), creds, {
        headers: headers
      });
    }
}
