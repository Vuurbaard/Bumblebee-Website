import { Component, OnInit, NgZone } from '@angular/core';
import { AudioService } from '../../services/api/audio.service';
import { environment } from '../../../environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';

declare var WaveSurfer: any;

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

	wavesurfer: any;

	fragments: any;
	loadedText: string = "";
	text: string = "";
	randomTexts: Array<string> = [
		//"Please let this work",
		//"I don't want to get some help",
		//"Whatever it is it's not right on the teleprompter",
		"ok what hi please let this work ok"
	];

	loading: Boolean = false;
	playing: Boolean = false;
	autoPlay: Boolean = false;

	constructor(private audioService: AudioService, private zone: NgZone, private flashMessagesService: FlashMessagesService) {
		this.text = this.randomTexts[Math.floor(Math.random() * this.randomTexts.length)];
	}

	ngOnInit() {

		this.wavesurfer = WaveSurfer.create({
			container: '#waveform-home',
			waveColor: 'white',
			progressColor: '#f6a821',
			plugins: [
				WaveSurfer.regions.create(),
				//WaveSurfer.cursor.create()
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

	async load(text: string) {
		this.loading = true;

		try {
			let data = await this.audioService.tts(text);

			this.fragments = data.fragments;

			if (data.file) {
				console.log('loading', data.file)
				this.wavesurfer.load(environment.apiUrl + data.file);
				this.loadedText = text;
			}
		}
		catch(err) {
			this.flashMessagesService.show('Something went wrong converting text to speech', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		}

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
