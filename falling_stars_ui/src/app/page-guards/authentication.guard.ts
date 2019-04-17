import {Injectable} from "@angular/core";
import {
    CanActivate, Router, Params, ActivatedRoute, ActivatedRouteSnapshot,
    RouterStateSnapshot
} from "@angular/router";
import {ConfigService} from "../config.service";
import { UrlPaths } from '../constants/url-paths';
@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private router: Router, private configService: ConfigService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.configService.isLogged()) {
            this.router.navigate([UrlPaths.LOGIN,{message:'Sorry, this page requires authentication.',initialPage:route.url[0]}]);
        }
        return this.configService.isLogged();
    }

}
