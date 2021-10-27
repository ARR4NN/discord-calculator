
const { Client, Collection, Message, MessageEmbed, Permissions } = require("discord.js");
module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        // if (interaction.guild.id !== "873144857001066496") {
        //     return interaction.reply("Sorry I am currently still in development!\nJoin the official server https://discord.gg/anMR5jQSvK")
        // }
        if (interaction.isContextMenu()) {
            const command = interaction.client.commands.get(interaction.commandName);
            if (command) command.execute(interaction);
        }
        if (!interaction.isCommand()) return;
        const commandName = interaction.commandName;

        const command =
            interaction.client.commands.get(commandName) ||
            interaction.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        try {
            if (!interaction.guild.me.permissions.has(Permissions.FLAGS.EMBED_LINKS)) {
                interaction.reply({ content: "Oops, I need `EMBED_LINKS` permissions to work correctly.\n[Find out how here!](https://support.discord.com/hc/en-us/articles/206029707-Setting-Up-Permissions-FAQ)" })
                return
            }
            command.execute(interaction);
        } catch (error) {
            console.error(error);
            interaction.reply({ ephemeral: true, content: "Sorry about that... There was an error, if this continues please join our [support server](https://discord.gg/anMR5jQSvK)" }).catch(console.error);
        }

    },
};