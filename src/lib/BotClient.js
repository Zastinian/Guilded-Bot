import {Client} from "guilded.js";
import config from "../config/index.js";
import RaidenCol from "./RaidenCol.js";
import loadCommands from "../handlers/loadCommands.js";
import loadEvents from "../handlers/loadEvents.js";

export default class BotClient extends Client {
	constructor() {
		super({
			token: config.TOKEN,
		});
		this.commands = new RaidenCol();
		loadCommands(this);
		loadEvents(this);
	}
}
