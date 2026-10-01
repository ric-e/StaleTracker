import { Plugin } from "obsidian";

   export default class StaleTrackerPlugin extends Plugin {
     async onload() {
       console.log("stale-tracker loaded");
     }
     onunload() {}
   }