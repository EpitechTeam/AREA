import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {Router} from '@angular/router';

@Component({
    selector: 'app-add-wave',
    templateUrl: './add-wave.component.html',
    styleUrls: ['./add-wave.component.css']
})
export class AddWaveComponent implements OnInit {

    Title = 'Choose a Wave';

    constructor(private location: Location, private router: Router) {
    }

    ngOnInit() {
    }

    onGoBack() {
        this.location.back();
    }
}
