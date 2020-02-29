import { AudioService } from '../../services/api/audio.service';
import { environment } from '../../../environments/environment';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit, NgZone } from '@angular/core';
import { FragmentService } from '../../services/api/fragment.service';
import * as _ from "lodash";


declare let WaveSurfer: any;

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
	// url: string = "https://www.youtube.com/watch?v=Obgnr9pc820";
	public url: string = "";
	playing: boolean = false;

	// Gets returned from the API
	sourceId: string;

	constructor(private audioService: AudioService, private flashMessagesService: FlashMessagesService, private zone: NgZone, private fragmentService: FragmentService) {

	}

	ngOnInit() {
		const me = this;

		//this.wordService.saveMultipleByTexts(['please', 'let', 'do', 'werk']);

		this.wavesurfer = WaveSurfer.create({
			container: '#waveform',
			waveColor: 'white',
			progressColor: '#f6a821',
			partialRender: true,
			maxCanvasWidth: 250,
			minPxPerSec: 20,
			pixelRatio: 1,
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
				this.fragments.forEach((fragment) => {
					this.wavesurfer.addRegion({
						start: fragment.start,
						end: fragment.end,
						drag: false,
						color: "rgba(246, 168, 33, 0.25)"
					});
				})
			});
		});

		this.slider = document.querySelector('#slider');

		this.slider.oninput = _.debounce(() => {
			const zoomLevel = Number(me.slider.value);
			me.wavesurfer.zoom(zoomLevel);
		}, 150)

	}

	ngOnDestroy() {
		this.wavesurfer.destroy();
	}

	download() {
		console.log('Downloading from url:', this.url);
		this.loading = true;

		this.audioService.download(this.url).then((data: any) => {
			console.log('Downloaded:', data);
			this.wavesurfer.load(environment.apiUrl + data.url);
			this.sourceId = data.sourceId;
			this.downloaded = true;
			if (data.fragments) {
				let fragments = new Array();

				for (let fragment of data.fragments) {
					fragments.push({ id: fragment._id, word: fragment.word, start: fragment.start, end: fragment.end });
					this.wavesurfer.addRegion({ start: fragment.start, end: fragment.end, color: "rgba(246, 168, 33, 0.5)" });
				}
				this.fragments = fragments;

			}
		}).catch(err => {
			this.loading = false;
			this.flashMessagesService.show('Something went wrong trying to download the youtube video.', {
				cssClass: 'alert-danger',
				timeout: 5000
			});
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
		if(!fragment.id) {
			this.fragments.splice(this.fragments.indexOf(fragment), 1);
		}
		else {
			this.fragmentService.delete('/v1/fragment/' + fragment.id).then(() => {
				this.fragments.splice(this.fragments.indexOf(fragment), 1);
			});
		}
	}

	playFragment(fragment) {
		const start = Number(fragment.start);
		const end = Number(fragment.end);
		this.wavesurfer.play(start, end);
	}

	save() {

		this.fragmentService.save(this.sourceId, this.fragments).then(data => {
			this.flashMessagesService.show('Fragments are submitted for review! Thank you!', {
				cssClass: 'alert-success',
				timeout: 5000
			});
			this.download();
		}).catch(err => {
			this.flashMessagesService.show(err, {
				cssClass: 'alert-danger',
				timeout: 5000
			});
		});
	}

	adjust(fragment: any, property: string, direction: string) {

		const adjustBy = 0.01;

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
