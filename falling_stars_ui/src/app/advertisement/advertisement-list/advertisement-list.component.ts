import {Component, OnInit} from '@angular/core';
import {AdvertisementService} from "../advertisement.service";
import {Advertisement} from "../../models/Advertisement";
import {Response} from "@angular/http";

@Component({
    selector: 'app-advertisement-list',
    templateUrl: './advertisement-list.component.html',
    styleUrls: ['./advertisement-list.component.css']
})
export class AdvertisementListComponent implements OnInit {

    advertisements: Advertisement[];
    message: string;

    constructor(private advertisementService: AdvertisementService) {
    }

    ngOnInit() {
        this.advertisementService.getAdvertisements().subscribe(
            data => this.onGetAdvertisementSuccess(data),
            error => this.onGetAdvertisementFailed(error));
    }

    private onGetAdvertisementSuccess(data: Response) {
        this.advertisements = data.json();
    }

    private onGetAdvertisementFailed(error: any) {
        console.log(error);
    }
}
