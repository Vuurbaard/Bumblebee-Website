import { Component, OnInit, NgZone } from '@angular/core';
import { AudioService } from '../../services/audio.service';
import { environment } from './../../../environments/environment';

// const WaveSurfer = require('wavesurfer.js');
// import { WaveSurfer } from 'wavesurfer.js';
declare var WaveSurfer: any;
declare var TimelinePlugin: any;
declare var MinimapPlugin: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	wavesurfer: any;
	text: string = "Please let this work";
	loading: Boolean = false;
	playing: Boolean = false;

	constructor(private audioService: AudioService, private zone: NgZone) { 
	
	}

	ngOnInit() {

		//var TimelinePlugin = WaveSurfer.timeline;

		this.wavesurfer = WaveSurfer.create({
			container: '#waveform-home',
			waveColor: 'white',
			progressColor: '#f6a821',
			plugins: [
				// WaveSurfer.timeline.create({
				// 	container: '#waveform-home'
				// }),
				WaveSurfer.regions.create()
			]
		});

		this.wavesurfer.on('ready', () => {

			//this.wavesurfer.enableDragSelection({});

			this.zone.run(() => {
				this.loading = false;
			});
		});

		this.wavesurfer.on('pause', () => {
			this.zone.run(() => {
				this.playing = false;
			});
		});

		this.wavesurfer.on('finish', () => {
			this.zone.run(() => {
				this.playing = false;
			});
		});

		this.wavesurfer.on('play', () => {
			this.zone.run(() => {
				this.playing = true;
			});
		});

		this.load(this.text);
	}

	load(text: string) {
		this.loading = true;
		this.audioService.tts(text).subscribe(data => {
			// debugger;
			console.log('loading', data.file)
			this.wavesurfer.load(environment.apiUrl + data.file);
		});
	}

	play() {
		this.wavesurfer.play();
	}

	pause() {
		this.wavesurfer.pause();
	}

	
}
