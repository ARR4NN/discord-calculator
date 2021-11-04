const Discord = require('discord.js');
module.exports = {
    name: "newtesting",
    description: "Create a testing channel for user",
    options: [
        {
            name: "user",
            type: 6,
            description: "User to create channel for",
            required: true,
        },
    ],
    async execute(interaction) {
        if (interaction.user.id !== "531227581081452550") {
            interaction.reply({ content: "You can't do that!", ephemeral: true })
            return
        }
        const member = interaction.options.getUser('user');
        const newchan = await interaction.guild.channels.create(`testing-${member.username}`, { // Create Channel
            type: 'text',
            topic: `${member.username} Calculator Testing Channel`,
            parent: "903031870420308018",
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                },
            ],
        }); // Create Channel
        await interaction.reply({ content: "Created channel!", ephemeral: true })
        await newchan.send({ content: "<@" + member.id + ">\nUse `/calculator`" })
    }
};