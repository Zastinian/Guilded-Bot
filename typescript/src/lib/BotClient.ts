import {Client} from "guilded.js";
import config from "../config";
import RaidenCol from "./RaidenCol.js";
import loadCommands from "../handlers/loadCommands.js";
import loadEvents from "../handlers/loadEvents.js";

export default class BotClient extends Client {
	commands: RaidenCol<string, string>;
	aliases: RaidenCol<string, string> | any;
	constructor() {
		super({
			token: config.TOKEN,
		});
		this.commands = new RaidenCol();
		loadCommands(this);
		loadEvents(this);
	}
}
