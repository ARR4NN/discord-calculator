const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { token, clientID, guildID } = require('./config.json');
const { readdirSync } = require("fs");
const fs = require('fs');
const chalk = require('chalk');

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// Place your client and guild ids here
if (!clientID || !guildID) {
    console.log(chalk.red("==================================================================================================================\n\nPlease input your " + chalk.yellow("clientID") + " and " + chalk.yellow("guildID") + " into " + chalk.yellow("config.json") + " before trying to register slash commands\n\n=================================================================================================================="))
    return
}
/**
 * Import all commands
 */
const commandFolders = readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        const cmd = {
            name: command.name,
            description: command.description,
            type: command.type,
            options: command.options,
        };
        if (["MESSAGE", "USER"].includes(command.type)) delete command.description;
        console.log(chalk.blue("Loaded command /" + cmd.name));
        // console.log("Loaded command - " + cmd.name)

        commands.push(cmd);
    }
}
const rest = new REST({ version: '9' }).setToken(token);
(async () => {
    try {
        console.log(chalk.green("Started refreshing application (/) commands."));
        // console.log('Started refreshing application (/) commands.');
        await rest.put(
            Routes.applicationGuildCommands(clientID, guildID),
            // Routes.applicationGuildCommands(clientId, guildId),
            // Routes.applicationCommands(clientId),
            { body: commands },
        );
        console.log(chalk.green("Successfully reloaded application (/) commands."));
        // console.log('Successfully reloaded application (/) commands.');
        return process.exit(1);
    } catch (error) {
        console.error(error);
    }
})();