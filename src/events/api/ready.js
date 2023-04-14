export default {
	event_name: "ready",
	run: (Hedystia) => {
		console.clear();
		console.log(`[API] ${Hedystia.user.name} Se encuentra en linea!`);
	},
};
