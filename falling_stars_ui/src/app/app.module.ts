import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './auth/login/login.component';
import {ConfigService} from './config.service';
import {LoginService}  from './auth/login/login.service';
import {ForgotPasswordService}  from './auth/forgot-password/forgot-password.service';
import {ForgotPasswordComponent}  from './auth/forgot-password/forgot-password.component';
import {AuthenticationGuard} from './page-guards/authentication.guard';
import {CookieService} from 'angular2-cookie/services/cookies.service';
import {ResetPasswordComponent} from './auth/reset-password/reset-password.component';
import {ResetPasswordService}  from './auth/reset-password/reset-password.service';
import {RegisterComponent} from './auth/register/register.component';
import {RegisterService} from "./auth/register/register.service";
import {LogoutComponent} from './auth/logout/logout.component';
import {AdvertisementService} from "./advertisement/advertisement.service";
import {AddAdvertisement} from "./advertisement/add-advertisement/add-advertisement.component";
import {ToastModule} from "ng2-toastr";
import {WebsiteListComponent} from "./website/website-list/website-list.component";
import {RegisterWebsiteComponent} from "./website/register-website/register-website.component";
import {WebsiteService} from "./website/website.service";
import {WebsiteStatsComponent} from "./website/website-stats/website-stats.component";
import {AdvertisementListComponent} from "./advertisement/advertisement-list/advertisement-list.component";
import {AnimationService} from "./website/animation.service";
import {WalletService} from "./wallet/wallet.service";
import {WalletComponent} from "./wallet/wallet.component";
import { NgSpinKitModule } from 'ng-spin-kit'
import {routes} from "./app.routing";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { PresentationComponent } from './presentation/presentation.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        ResetPasswordComponent,
        RegisterComponent,
        LogoutComponent,
        AddAdvertisement,
        WebsiteListComponent,
        RegisterWebsiteComponent,
        WebsiteStatsComponent,
        AdvertisementListComponent,
        WalletComponent,
        // CubeGridComponent,
        PresentationComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpModule,
        routes,
        ReactiveFormsModule,
        ToastModule.forRoot(),
        NgSpinKitModule
    ],
    providers: [
        RegisterService,
        ResetPasswordService,
        ForgotPasswordService,
        WalletService,
        CookieService,
        WebsiteService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        ConfigService,
        LoginService,
        AdvertisementService,
        AnimationService,
        AuthenticationGuard
    ],
    bootstrap: [AppComponent]
})
export class FallingStarsModule {
}
