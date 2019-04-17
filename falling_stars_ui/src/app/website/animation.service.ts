import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {ConfigService} from "../config.service";
import {ApiPaths} from "../constants/api-paths";

@Injectable()
export class AnimationService {

  constructor(private http: Http, private configService: ConfigService) {
  }

    getAnimations() {
        return this.http.get(this.configService.getFullUrl(ApiPaths.ANIMATIONS), {headers: this.configService.getHeaders()})
    }
}
