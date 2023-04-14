import {readdirSync} from "fs";
export default async function loadEvents(Hedystia) {
	const eventFolders = readdirSync("./src/events");
	for (const folder of eventFolders) {
		const eventFiles = readdirSync(`./src/events/${folder}`).filter((file) => file.endsWith(".js"));
		for (const file of eventFiles) {
			const loaded = await import(`../events/${folder}/${file}`);
			const event = loaded.default;
			if (event.event_name) {
				Hedystia.on(event.event_name, (...args) => event.run(Hedystia, ...args));
			} else {
				continue;
			}
		}
	}
}
