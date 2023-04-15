import {Message} from "guilded.js";
import BotClient from "./BotClient";

export interface Command {
	name: string;
	description: string;
	aliases: string[];
	run(BotClient: BotClient, message: Message, args: string[], config: object, p: number): void;
}
