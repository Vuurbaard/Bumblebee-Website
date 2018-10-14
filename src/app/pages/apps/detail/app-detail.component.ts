import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-app-detail',
	templateUrl: './app-detail.component.html',
	styleUrls: ['./app-detail.component.scss']
})
export class AppDetailComponent implements OnInit {

	constructor( private activeRoute: ActivatedRoute) { }

	loading: Boolean = false;

	ngOnInit() {

	}
}
