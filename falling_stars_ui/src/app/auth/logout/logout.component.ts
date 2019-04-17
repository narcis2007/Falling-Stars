import {Component, OnInit} from '@angular/core';
import {ConfigService} from "../../config.service";
import {Router} from "@angular/router";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {GlobalConstants} from "../../constants/global-constants";
import {UrlPaths} from "../../constants/url-paths";

@Component({
    selector: 'app-logout',
    templateUrl: 'logout.component.html',
    styleUrls: ['logout.component.css']
})
export class LogoutComponent implements OnInit {

    constructor(private router: Router, public configService: ConfigService, private cookieService: CookieService) {
        console.log("logout");
        localStorage.removeItem(GlobalConstants.AUTH_TOKEN_NAME);
        this.cookieService.remove(GlobalConstants.AUTH_TOKEN_NAME);
        this.configService.setToken(null);
        this.router.navigate([UrlPaths.LOGIN,{message:'Logout successful'}]);
    }

    ngOnInit() {
    }

}
