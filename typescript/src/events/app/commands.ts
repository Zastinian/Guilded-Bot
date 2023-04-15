import {Message} from "guilded.js";
import config from "../../config/index.js";
import BotClient from "@lib/BotClient.js";
import {Command} from "@lib/Interface.js";
import RaidenCol from "@lib/RaidenCol.js";

const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default {
	event_name: "messageCreated",
	run: (BotClient: BotClient, message: Message) => {
		try {
			const author = message.author;
			if (!author) return;
			if (author.type === 0) return;
			const prefixRegex = new RegExp(`^(<@!?${BotClient.user?.id}>|${escapeRegex(config.PREFIX)})\\s*`);
			if (!prefixRegex.test(message.content)) return;
			const [, matchedPrefix] = message.content.match(prefixRegex) ?? ["", ""];
			const p = matchedPrefix.length;
			const args = message.content.slice(p).trim().split(/ +/);
			const commandName = args.shift()?.toLowerCase() ?? "";
			const command: Command =
				BotClient.commands.get(commandName) ??
				(BotClient.commands.find((cmd: RaidenCol<string, string> | any) => cmd.aliases && cmd.aliases.includes(commandName)) as
					| RaidenCol<string, string>
					| any);
			if (!command) return;
			command.run(BotClient, message, args, config, p);
		} catch (err) {
			return;
		}
	},
};
