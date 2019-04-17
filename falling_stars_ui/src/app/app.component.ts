import {Component, OnInit, ViewContainerRef} from "@angular/core";
import {Router} from "@angular/router";
import {ConfigService} from "./config.service";
import {CookieService} from "angular2-cookie/services/cookies.service";
import {GlobalConstants} from './constants/global-constants';
import {UrlPaths} from './constants/url-paths';
import {ToastsManager} from "ng2-toastr";
import {LoginService} from "./auth/login/login.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Falling Stars';

    constructor(private router: Router, public configService: ConfigService, private cookieService: CookieService, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngOnInit() {
    }

    redirectAddAdvertisement() {
        this.router.navigate([UrlPaths.ADD_ADVERTISEMENT]);
    }

    redirectRegisterWebsite() {
        this.router.navigate([UrlPaths.REGISTER_WEBSITE]);
    }

    redirectWebsitesList() {
        this.router.navigate([UrlPaths.WEBSITE_LIST]);
    }

    redirectLogout() {
        this.router.navigate([UrlPaths.LOGOUT]);
    }

    redirectWallet() {
        this.router.navigate([UrlPaths.WALLET]);
    }

    redirectAdvertisementList() {
        this.router.navigate([UrlPaths.ADVERTISEMENT_LIST]);
    }

    redirectPresentationPage() {
        this.router.navigate([UrlPaths.PRESENTATION_PAGE]);
    }

    redirectLogin() {
        this.router.navigate([UrlPaths.LOGIN]);
    }

}
