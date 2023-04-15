import {readdirSync} from "fs";
import BotClient from "@lib/BotClient";
export default async function loadEvents(BotClient: BotClient): Promise<void> {
	const eventFolders = readdirSync("./src/events");
	for (const folder of eventFolders) {
		const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));
		for (const file of eventFiles) {
			const loaded = await import(`../events/${folder}/${file}`);
			const event = loaded.default;
			if (event.event_name) {
				BotClient.on(event.event_name, (...args: any) => event.run(BotClient, ...args));
			} else {
				continue;
			}
		}
	}
}
