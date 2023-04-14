import {readdirSync} from "fs";
export default async function loadCommands(BotClient) {
	const commandFolders = readdirSync("./src/commands");
	for (const folder of commandFolders) {
		const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const loaded = await import(`../commands/${folder}/${file}`);
			const command = loaded.default;
			if (command.name) {
				BotClient.commands.set(command.name, command);
			} else {
				continue;
			}
			if (command.aliases && Array.isArray(command)) command.aliases.forEach((alias) => BotClient.aliases.set(alias, command.name));
		}
	}
}
