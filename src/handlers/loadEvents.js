import {readdirSync} from "fs";
export default async function loadEvents(BotClient) {
	const eventFolders = readdirSync("./src/events");
	for (const folder of eventFolders) {
		const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));
		for (const file of eventFiles) {
			const loaded = await import(`../events/${folder}/${file}`);
			const event = loaded.default;
			if (event.event_name) {
				BotClient.on(event.event_name, (...args) => event.run(BotClient, ...args));
			} else {
				continue;
			}
		}
	}
}
