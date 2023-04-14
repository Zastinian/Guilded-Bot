import {readdirSync} from "fs";
export default async function loadCommands(Hedystia) {
	const commandFolders = readdirSync("./src/commands");
	for (const folder of commandFolders) {
		const commandFiles = readdirSync(`./src/commands/${folder}`).filter((file) => file.endsWith(".js"));
		for (const file of commandFiles) {
			const loaded = await import(`../commands/${folder}/${file}`);
			const command = loaded.default;
			if (command.name) {
				Hedystia.commands.set(command.name, command);
			} else {
				continue;
			}
			if (command.aliases && Array.isArray(command)) command.aliases.forEach((alias) => Hedystia.aliases.set(alias, command.name));
		}
	}
}
