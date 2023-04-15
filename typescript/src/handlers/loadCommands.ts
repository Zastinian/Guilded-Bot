import {readdirSync} from "fs";
import BotClient from "@lib/BotClient";
export default async function loadCommands(BotClient: BotClient): Promise<void> {
	const commandFolders = readdirSync("./src/commands");
	for (const folder of commandFolders) {
		const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const loaded = await import(`../commands/${folder}/${file}`);
			const command = loaded.default;
			const name = command.name;
			const aliases = command.aliases;
			if (name) {
				BotClient.commands.set(name, command);
				if (aliases && Array.isArray(command)) aliases.forEach((alias: string) => BotClient.aliases.set(alias, name));
			} else {
				continue;
			}
		}
	}
}
