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

	loadedText: string = "";
	text: string = "Please let this work";
	randomTexts: Array<string> = [
		"Please let this work",
		"I don't want to get some help",
		"Whatever it is it's not right on the teleprompter"
	];

	loading: Boolean = false;
	playing: Boolean = false;
	autoPlay: Boolean = false;

	constructor(private audioService: AudioService, private zone: NgZone) {

	}

	ngOnInit() {

		this.wavesurfer = WaveSurfer.create({
			container: '#waveform-home',
			waveColor: 'white',
			progressColor: '#f6a821',
			plugins: [
				WaveSurfer.regions.create()
			]
		});

		this.wavesurfer.on('ready', () => {
			this.zone.run(() => {
				this.loading = false;

				if (this.autoPlay) {
					this.play();
				}
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
			console.log('loading', data.file)
			this.wavesurfer.load(environment.apiUrl + data.file);
			this.loadedText = text;
		});
	}

	play() {
		if (this.loadedText != this.text) {
			this.autoPlay = true;
			this.load(this.text);
		}
		else {
			this.wavesurfer.play();
		}
	}

	pause() {
		this.wavesurfer.pause();
	}

	try() {
		this.text = this.randomTexts[Math.floor(Math.random() * this.randomTexts.length)];
		this.autoPlay = true;
		this.load(this.text);
	}
}
