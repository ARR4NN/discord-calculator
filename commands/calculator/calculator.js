const Discord = require('discord.js');
const math = require("mathjs")
module.exports = {
    name: "calculator",
    description: "Do Maths with buttons... Simple",
    async execute(interaction) {
        const row1 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('C')
                    .setStyle('DANGER')
                    .setCustomId('buttonclear'),
                new Discord.MessageButton()
                    .setLabel('(')
                    .setStyle('PRIMARY')
                    .setCustomId('buttonleftbrak'),
                new Discord.MessageButton()
                    .setLabel(')')
                    .setStyle('PRIMARY')
                    .setCustomId('buttonrightbrak'),
                new Discord.MessageButton()
                    .setLabel('/')
                    .setStyle('PRIMARY')
                    .setCustomId('buttonslash'),
            );
        const row2 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('7')
                    .setStyle('SECONDARY')
                    .setCustomId('button7'),
                new Discord.MessageButton()
                    .setLabel('8')
                    .setStyle('SECONDARY')
                    .setCustomId('button8'),
                new Discord.MessageButton()
                    .setLabel('9')
                    .setStyle('SECONDARY')
                    .setCustomId('button9'),
                new Discord.MessageButton()
                    .setLabel('x')
                    .setStyle('PRIMARY')
                    .setCustomId('buttonstar'),
            );
        const row3 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('4')
                    .setStyle('SECONDARY')
                    .setCustomId('button4'),
                new Discord.MessageButton()
                    .setLabel('5')
                    .setStyle('SECONDARY')
                    .setCustomId('button5'),
                new Discord.MessageButton()
                    .setLabel('6')
                    .setStyle('SECONDARY')
                    .setCustomId('button6'),
                new Discord.MessageButton()
                    .setLabel('-')
                    .setStyle('PRIMARY')
                    .setCustomId('buttonminus'),
            );
        const row4 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('1')
                    .setStyle('SECONDARY')
                    .setCustomId('button1'),
                new Discord.MessageButton()
                    .setLabel('2')
                    .setStyle('SECONDARY')
                    .setCustomId('button2'),
                new Discord.MessageButton()
                    .setLabel('3')
                    .setStyle('SECONDARY')
                    .setCustomId('button3'),
                new Discord.MessageButton()
                    .setLabel('+')
                    .setStyle('PRIMARY')
                    .setCustomId('buttonadd'),
            );
        const row5 = new Discord.MessageActionRow()
            .addComponents(
                new Discord.MessageButton()
                    .setLabel('.')
                    .setStyle('PRIMARY')
                    .setCustomId('buttondot'),
                new Discord.MessageButton()
                    .setLabel('0')
                    .setStyle('SECONDARY')
                    .setCustomId('buttonzero'),
                new Discord.MessageButton()
                    .setEmoji("903011083806183445")
                    .setStyle('SECONDARY')
                    .setCustomId('buttonbackspace'),
                new Discord.MessageButton()
                    .setLabel('=')
                    .setStyle('SUCCESS')
                    .setCustomId('buttonequals'),
            );

        const mainmsg = await interaction.reply({ content: "\n0", components: [row1, row2, row3, row4, row5], fetchReply: true })

        // Switch
        async function addstring(number) {
            const adstrcont = mainmsg.content
            if (mainmsg.content === "0") {
                mainmsg.edit({ content: number })
            } else if (adstrcont.includes("=")) {
                const newequalback = adstrcont.split("=")
                // const eqmsg = newmsg
                // const equalmsg = eqmsg.slice(0, eqmsg.length - 1);
                mainmsg.edit({ content: newequalback[0] + number })
            } else {
                mainmsg.edit({ content: mainmsg.content + number })
            }
            // if (adstrcont.includes("=")) {
            //     const newequalback = adstrcont.split("=")
            //     // const eqmsg = newmsg
            //     // const equalmsg = eqmsg.slice(0, eqmsg.length - 1);
            //     mainmsg.edit({ content: newequalback[0] })
            // }
        }
        async function menuselection(interaction, mainmsg) {
            switch (interaction.customId) {
                case "buttonclear":
                    mainmsg.edit({ content: "0" })
                    interaction.deferUpdate()
                    break;
                case "buttonleftbrak":
                    addstring("(")
                    interaction.deferUpdate()
                    break;
                case "buttonrightbrak":
                    addstring(")")
                    interaction.deferUpdate()
                    break;
                case "buttonslash":
                    addstring("/")
                    interaction.deferUpdate()
                    break;
                case "button7":
                    addstring("7")
                    interaction.deferUpdate()
                    break;
                case "button8":
                    addstring("8")
                    interaction.deferUpdate()
                    break;
                case "button9":
                    addstring("9")
                    interaction.deferUpdate()
                    break;
                case "buttonstar":
                    addstring("\u200b*")
                    interaction.deferUpdate()
                    break;
                case "button4":
                    addstring("4")
                    interaction.deferUpdate()
                    break;
                case "button5":
                    addstring("5")
                    interaction.deferUpdate()
                    break;
                case "button6":
                    addstring("6")
                    interaction.deferUpdate()
                    break;
                case "buttonminus":
                    addstring("-")
                    interaction.deferUpdate()
                    break;
                case "button1":
                    addstring("1")
                    interaction.deferUpdate()
                    break;
                case "button2":
                    addstring("2")
                    interaction.deferUpdate()
                    break;
                case "button3":
                    addstring("3")
                    interaction.deferUpdate()
                    break;
                case "buttonadd":
                    addstring("+")
                    interaction.deferUpdate()
                    break;
                case "buttondot":
                    addstring(".")
                    interaction.deferUpdate()
                    break;
                case "buttonzero":
                    addstring("0")
                    interaction.deferUpdate()
                    break;

                case "buttonbackspace":
                    const msg = mainmsg.content
                    const newmsg = msg.slice(0, msg.length - 1);
                    if (newmsg.length == 0) {
                        mainmsg.edit({ content: "0" })
                    } else {
                        mainmsg.edit({ content: newmsg })
                    }
                    if (newmsg.includes("=")) {
                        const newequalback = newmsg.split("=")
                        // const eqmsg = newmsg
                        // const equalmsg = eqmsg.slice(0, eqmsg.length - 1);
                        mainmsg.edit({ content: newequalback[0] })
                    }
                    interaction.deferUpdate()
                    break;
                case "buttonequals":
                    try {
                        if (mainmsg.content.includes("=")) {
                            interaction.deferUpdate()
                            return
                        } else {
                            const equasion = await math.evaluate(mainmsg.content)
                            mainmsg.edit({ content: mainmsg.content + "=" + equasion.toString() })
                            interaction.deferUpdate()
                        }
                        break;
                    } catch (error) {
                        interaction.reply({ content: "Syntax Error!", ephemeral: true })
                    }
            }
        }
        interaction.client.addBtnHandler(mainmsg, async (interaction1) => {
            if (interaction1.user.id !== interaction.user.id) {
                interaction1.reply({ ephemeral: true, content: "You can't do that." })
                return
            }
            menuselection(interaction1, mainmsg)
            // interaction1.reply("Got it")
            // console.log(mainmsg.content)
            // const msg = mainmsg.content
            // const newmsg = msg.replace('```', '');
            // console.log(newmsg + interaction1.)

            // interaction.editReply({ content: ops, components: [] });
            // menuselection(interaction1)
            // code
        })
    }
};
