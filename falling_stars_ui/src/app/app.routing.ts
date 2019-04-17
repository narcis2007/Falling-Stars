import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {AppComponent} from './app.component';
import {AuthenticationGuard} from './page-guards/authentication.guard';
import {UrlPaths} from './constants/url-paths';
import {ForgotPasswordComponent} from "./auth/forgot-password/forgot-password.component";
import {ResetPasswordComponent} from "./auth/reset-password/reset-password.component";
import {RegisterComponent} from "./auth/register/register.component";
import {LogoutComponent} from "./auth/logout/logout.component";
import {AddAdvertisement} from "./advertisement/add-advertisement/add-advertisement.component";
import {WebsiteListComponent} from "./website/website-list/website-list.component";
import {RegisterWebsiteComponent} from "./website/register-website/register-website.component";
import {WebsiteStatsComponent} from "./website/website-stats/website-stats.component";
import {AdvertisementListComponent} from "./advertisement/advertisement-list/advertisement-list.component";
import {WalletComponent} from "./wallet/wallet.component";
import {PresentationComponent} from "./presentation/presentation.component";



export const appRoutes: Routes = [
    {path: UrlPaths.LOGIN, component: LoginComponent},
    {path: UrlPaths.FORGOT_PASSWORD, component: ForgotPasswordComponent},
    {path: UrlPaths.RESET_PASSWORD, component: ResetPasswordComponent},
    {path: UrlPaths.REGISTER, component: RegisterComponent},
    {path: UrlPaths.LOGOUT, component: LogoutComponent},
    {path: UrlPaths.ADD_ADVERTISEMENT, component: AddAdvertisement, canActivate: [AuthenticationGuard]},
    {path: UrlPaths.WEBSITE_LIST, component: WebsiteListComponent, canActivate: [AuthenticationGuard]},
    {path: UrlPaths.REGISTER_WEBSITE, component: RegisterWebsiteComponent, canActivate: [AuthenticationGuard]},
    {path: UrlPaths.WEBSITE_STATS, component: WebsiteStatsComponent, canActivate: [AuthenticationGuard]},
    {path: UrlPaths.ADVERTISEMENT_LIST, component: AdvertisementListComponent, canActivate: [AuthenticationGuard]},
    {path: UrlPaths.WALLET, component: WalletComponent, canActivate: [AuthenticationGuard]},
    {path: UrlPaths.PRESENTATION_PAGE, component: PresentationComponent },
    {path: '', component: PresentationComponent }
];
export const routes = RouterModule.forRoot(appRoutes);