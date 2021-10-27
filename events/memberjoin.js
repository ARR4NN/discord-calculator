const Discord = require("discord.js");
module.exports = {
    name: 'guildMemberAdd',
    async execute(member) {
        const newchan = await member.guild.channels.create(`testing-${member.user.username}`, { // Create Channel
            type: 'text',
            topic: `${member.username} Calculator Testing Channel`,
            parent: "903031870420308018",
            permissionOverwrites: [
                {
                    id: member.id,
                    allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                },
                {
                    id: member.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"]
                },
            ],
        }); // Create Channel
        await newchan.send({ content: "<@" + member.id + ">\nUse `/calculator`" })
        return
    },
};