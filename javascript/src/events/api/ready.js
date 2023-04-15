export default {
	event_name: "ready",
	run: (BotClient) => {
		console.clear();
		console.log(`[API] ${BotClient.user.name} Se encuentra en linea!`);
	},
};
