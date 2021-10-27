// Require the necessary discord.js classes
const Discord = require("discord.js")
const { Client, Intents, Collection } = require('discord.js');
const { token } = require('./config.json');
const { readdirSync } = require("fs");

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();

// // When the client is ready, run this code (only once)
// client.once('ready', () => {
//     console.log('Ready!');
// });

// Login to Discord with your client's token
const expiredRow = new Discord.MessageActionRow().addComponents(new Discord.MessageButton().setLabel("Expired Calculator").setStyle("SECONDARY").setCustomId("expired-btn").setDisabled());
client.login(token);
client.btnHandlers = new Map();
try {
    client.addBtnHandler = (message, handler) => {
        client.btnHandlers.set(message.id, handler);
        setTimeout(() => {
            client.btnHandlers.delete(message.id);
            message.edit({
                components: [expiredRow]
            })
        }, 360000);
        // Default: 360000
    }
} catch (err) {
    return
}
/**
 * Event Handling
 */
const eventFiles = readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args, client));
    } else {
        client.on(event.name, (...args) => event.execute(...args, client));
    }
}

/**
 * Import all commands
 */
const commandFolders = readdirSync('./commands');

for (const folder of commandFolders) {
    const commandFiles = readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}


process.on("unhandledRejection", async (error) => {
    console.log(error)
})
process.on("unhandledException", async (error) => {
    console.log(error)
})