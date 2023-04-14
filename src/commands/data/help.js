import {Embed} from "guilded.js";

export default {
	name: "help",
	description: "Help",
	run: async (Hedystia, message, args, config) => {
		const embed = new Embed()
			.setColor(0x0099ff)
			.setTitle("Help Menu")
			.setAuthor(
				"Name",
				"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTMyYzU4YTVjNjNlZWUwZTgwN2ZiMDgxYzVlOGE0NGRhYTM3MmE1NCZjdD1z/K9svE9i7P3Ox2/giphy.gif",
				"https://docs.mresmile.com/docs/client/start"
			)
			.setURL("https://docs.mresmile.com/docs/client/start")
			.setDescription("Help Description")
			.setThumbnail(
				"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTMyYzU4YTVjNjNlZWUwZTgwN2ZiMDgxYzVlOGE0NGRhYTM3MmE1NCZjdD1z/K9svE9i7P3Ox2/giphy.gif"
			)
			.addField("Command", config.PREFIX + "help", true)
			.setImage("https://c.tenor.com/yi5btxWVAwwAAAAC/tenor.gif")
			.setTimestamp()
			.setFooter(
				"Footer",
				"https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZTMyYzU4YTVjNjNlZWUwZTgwN2ZiMDgxYzVlOGE0NGRhYTM3MmE1NCZjdD1z/K9svE9i7P3Ox2/giphy.gif"
			);
		return message.reply({
			embeds: [embed],
		});
	},
};
