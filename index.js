import {Embed} from "guilded.js";
import Hedystia from "./src/lib/Hedystia.js";

const client = new Hedystia();

client.on("messageCreated", (message) => {
	const author = message.author;
	if (!author) return;
	console.log(author.type);
	if (message.content === "test") {
		const embed = new Embed({
			title: "Test",
			description: "Testing!",
		});
		return message.reply({
			embeds: [embed],
		});
	}
});

client.login();
