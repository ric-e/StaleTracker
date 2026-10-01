import { Plugin } from "obsidian";

export default class StaleTrackerPlugin extends Plugin {
	async onload() {
		console.log("stale-tracker loaded");

		this.addCommand({
			id: 'open-stale-note',
			name: 'Open stale note',
			callback: () => {
				console.log('Filler foor now');
			},
		});
	}

	onunload() {
		console.log("stale-tracker unloaded");
	}
}