import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {WebsiteService} from "../website.service";
import {Response} from "@angular/http";
import {Website} from "../../models/Website";

@Component({
    selector: 'app-website-stats',
    templateUrl: 'website-stats.component.html',
    styleUrls: ['website-stats.component.css']
})
export class WebsiteStatsComponent implements OnInit {

    website: Website;

    constructor(private route: ActivatedRoute, private websiteService: WebsiteService) {
    }

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            this.website = JSON.parse(params['website']);
        });


    }
}
