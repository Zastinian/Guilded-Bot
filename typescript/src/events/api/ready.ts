import BotClient from "@lib/BotClient";

export default {
	event_name: "ready",
	run: (BotClient: BotClient) => {
		console.clear();
		const clientUser = BotClient.user;
		if (clientUser) {
			console.log(`[API] ${clientUser.name} Se encuentra en linea!`);
		}
	},
};
