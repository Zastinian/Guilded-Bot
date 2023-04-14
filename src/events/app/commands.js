const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export default {
	event_name: "messageCreated",
	run: (Hedystia, message) => {
		try {
		} catch (err) {
			return;
		}
	},
};
