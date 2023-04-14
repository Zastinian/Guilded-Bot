import config from "../../config/index.js";

const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default {
	event_name: "messageCreated",
	run: (BotClient, message) => {
		try {
			const author = message.author;
			if (!author) return;
			if (author.type === 0) return;
			const prefixRegex = new RegExp(`^(<@!?${BotClient.user.id}>|${escapeRegex(config.PREFIX)})\\s*`);
			if (!prefixRegex.test(message.content)) return;
			const [, matchedPrefix] = message.content.match(prefixRegex);
			const p = matchedPrefix.length;
			const args = message.content.slice(p).trim().split(/ +/);
			const commandName = args.shift().toLowerCase();
			const command = BotClient.commands.get(commandName) || BotClient.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));
			if (!command) return;
			command.run(BotClient, message, args, config, p);
		} catch (err) {
			return;
		}
	},
};
