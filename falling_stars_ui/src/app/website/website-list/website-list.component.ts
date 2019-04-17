import {Component, OnInit} from '@angular/core';
import {WebsiteService} from "../website.service";
import {Website} from "../../models/Website";
import {Response} from "@angular/http";
import {Router} from "@angular/router";
import {UrlPaths} from "../../constants/url-paths";
import {GlobalConstants} from "../../constants/global-constants";

@Component({
    selector: 'app-website-list',
    templateUrl: 'website-list.component.html',
    styleUrls: ['website-list.component.css']
})
export class WebsiteListComponent implements OnInit {

    websites: Array<Website>;
    message: string;
    user: string = "narcis";

    constructor(private router: Router, private websiteService: WebsiteService) {
    }

    ngOnInit() {
        this.websiteService.getRegisteredWebsites().subscribe(
            data => this.onGetRegisteredWebsitesSuccess(data),
            error => this.onGetRegisteredWebsitesFailed(error)
        );
    }

    getScriptHtml(website) {
        var scriptHTML: string = `<script id="fallingScript" src="${GlobalConstants.BASE_API_URL}/bundle.js" data-website="${website.name}"></script>`;
        return scriptHTML;
    }

    private onGetRegisteredWebsitesSuccess(data: Response) {
        this.websites = data.json();
    }

    private onGetRegisteredWebsitesFailed(error: any) {
        this.message = error.json()["message"];
    }

    viewWebsite(website: Website) {
        this.router.navigate([UrlPaths.WEBSITE_STATS, {website: JSON.stringify(website)}]);
    }
}
