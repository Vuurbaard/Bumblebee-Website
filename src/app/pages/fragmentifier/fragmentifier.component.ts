import { AudioService } from './../../services/audio.service';
import { environment } from './../../../environments/environment';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, NgZone } from '@angular/core';


declare var WaveSurfer: any;

@Component({
	selector: 'app-fragmentifier',
	templateUrl: './fragmentifier.component.html',
	styleUrls: ['./fragmentifier.component.scss']
})
export class FragmentifierComponent implements OnInit {

	wavesurfer: any;
	slider: any;
	canvas: any;
	loading: Boolean = false;
	downloaded: Boolean = false;
	start: Number;
	end: Number;
	isFragmenting: Boolean = false;
	fragments: Array<any> = [];
	url: string = "https://www.youtube.com/watch?v=9-yUbFi7VUY";
	playing: boolean = false;

	// Gets returned from the API
	sourceId: string;

	constructor(private audioService: AudioService, private flashMessagesService: FlashMessagesService, private router: Router, private zone: NgZone) {

	}

	ngOnInit() {
		var me = this;

		this.wavesurfer = WaveSurfer.create({
			container: '#waveform',
			waveColor: 'white',
			progressColor: '#f6a821',
			plugins: [
				WaveSurfer.regions.create()
			]
		});

		this.wavesurfer.on('pause', () => {
			this.zone.run(() => {
				me.playing = false;
			});
		});

		this.wavesurfer.on('finish', () => {
			this.zone.run(() => {
				me.playing = false;
			});
		});

		this.wavesurfer.on('play', () => {
			this.zone.run(() => {
				me.playing = true;
			});
		});

		this.wavesurfer.on('ready', () => {
			this.zone.run(() => {

				// this.slider.value = 250;
				// this.wavesurfer.zoom(this.slider.value);
				
				me.loading = false;

				for (var fragment of this.fragments) {
					this.wavesurfer.addRegion({ 
						start: fragment.start, 
						end: fragment.end,
						drag: false,
						color: "rgba(246, 168, 33, 0.25)" 
					});					
				}

			});
		});

		this.slider = document.querySelector('#slider');

		this.slider.oninput = function () {
			var zoomLevel = Number(me.slider.value);
			me.wavesurfer.zoom(zoomLevel);
		};
	}

	ngOnDestroy() {
		this.wavesurfer.destroy();
	}

	download() {
		console.log('Downloading from url:', this.url);
		this.loading = true;

		this.audioService.download(this.url).subscribe(data => {
			console.log('Downloaded:', data);
			this.wavesurfer.load(environment.apiUrl + data.url);
			this.sourceId = data.sourceId;
			this.downloaded = true;
			if (data.fragments) {
				var fragments = new Array();

				for (var fragment of data.fragments) {
					fragments.push({ id: fragment._id, word: fragment.word, start: fragment.start, end: fragment.end });
					this.wavesurfer.addRegion({ start: fragment.start, end: fragment.end, color: "rgba(246, 168, 33, 0.5)" });
				}
				this.fragments = fragments;

				// var wat = this.wavesurfer.regions.list;
				// debugger;
			}
		});
	}

	another() {
		this.downloaded = false;
		this.start = null;
		this.end = null;
		this.isFragmenting = false;
		this.fragments = [];
	}

	play() {
		this.wavesurfer.play();
	}

	pause() {
		this.wavesurfer.pause();
	}

	fragmentStart() {
		if (!this.isFragmenting) {
			this.start = this.wavesurfer.backend.getCurrentTime();
			this.isFragmenting = true;
		}
	}

	fragmentEnd() {
		if (this.isFragmenting) {
			this.end = this.wavesurfer.backend.getCurrentTime();
			this.isFragmenting = false;

			let fragment = {
				start: this.start,
				end: this.end,
				word: { text: "" },
			}

			this.fragments.push(fragment);
		}
	}

	removeFragment(fragment) {
		this.fragments.splice(this.fragments.indexOf(fragment), 1);
	}

	playFragment(fragment) {
		var start = Number(fragment.start);
		var end = Number(fragment.end);
		this.wavesurfer.play(start, end);
	}

	save() {
		//let id = this.youtube.replace('https://www.youtube.com/watch?v=', '');

		this.audioService.saveFragments(this.sourceId, this.fragments).subscribe(data => {
			if (data.success) {
				this.flashMessagesService.show('Fragments are submitted for review! Thank you!', {
					cssClass: 'alert-success',
					timeout: 5000
				});
				// this.router.navigate(['dashboard']);
				this.download();
			}
			else {
				this.flashMessagesService.show(data.error, {
					cssClass: 'alert-danger',
					timeout: 5000
				});
			}
		});
	}

	adjust(fragment: any, property: string, direction: string) {

		let adjustBy = 0.01;

		if (property == "start" && direction == "up" && (fragment.start + adjustBy) < fragment.end) {
			fragment.start += adjustBy;
		}
		else if (property == "start" && direction == "down" && (fragment.start - adjustBy) < fragment.end) {
			fragment.start -= 0.01;
		}
		else if (property == "end" && direction == "up" && (fragment.end + adjustBy) > fragment.start) {
			fragment.end += 0.01;
		}
		else if (property == "end" && direction == "down" && (fragment.end - adjustBy) > fragment.start) {
			fragment.end -= 0.01;
		}
	}

}
