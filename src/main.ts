import { Notice, Plugin } from "obsidian";

const STALE_DAYS = 180;
const MS_PER_DAY = 24 * 60 * 60 * 1000;

export default class StaleTrackerPlugin extends Plugin {
	async onload() {
		console.log("stale-tracker loaded");

		this.addCommand({
			id: 'open-stale-note',
			name: 'Open stale note',
			callback: () => {
				this.openStaleNote();
			},
		});
	}

	onunload() {
		console.log("stale-tracker unloaded");
	}

	async openStaleNote() {
		const files = this.app.vault.getMarkdownFiles();
		const cutoff = Date.now() - STALE_DAYS * MS_PER_DAY;
		const stale = files.filter((file) => file.stat.mtime < cutoff);

		console.log(stale.map((file) => file.path));

		if (stale.length === 0) {
			new Notice(`You have no notes older than ${STALE_DAYS} days.`);
			return;
		}

		const Index = Math.floor(Math.random() * stale.length);
		const file = stale[Index];
		if (!file) return;

		await this.app.workspace.getLeaf('tab').openFile(file);

		const daysAgo = Math.floor((Date.now() - file.stat.mtime) / MS_PER_DAY); new Notice(`${file.basename}: last edited ${daysAgo} days ago`);

	}
}