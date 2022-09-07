const Canvas = require('@napi-rs/canvas');
const { AttachmentBuilder, PermissionsBitField, GuildMemberManager, PermissionFlagsBits } = require('discord.js');
const moment = require('moment');

const normalCommands = {
    normalCom: (client) => {
        client.on('messageCreate', async (msg) => {
            const commandName = msg.content;
            if (commandName.toLowerCase() === '$hello') {
                await msg.reply(`Good morning ${msg.author.username}!`);
            }
            else if (commandName.toLowerCase() === '$ping') {
                await msg.reply(`Ping của kênh "${msg.channel.name}" thuộc máy chủ "${msg.guild.name}": ${client.ws.ping}
		ms`);
            }
            else if (commandName === '$server') {
                await msg.reply(`Server name: ${msg.guild.name}\nTotal members: ${msg.guild.memberCount}`);
            }
            else if (commandName === '$user') {
                const checkAdmin = msg.member.permissions.has(PermissionFlagsBits.Administrator);
                /*======== Use canvas to draw something ================
                const canvas = Canvas.createCanvas(100, 100);
                const context = canvas.getContext('2d');
                const background = await Canvas.loadImage(imageURL);
                context.drawImage(background, 0, 0, canvas.width, canvas.height);
                const attachment = new AttachmentBuilder(await canvas.encode('webp', 'gif'), { name: 'avatar.gif' });
                await msg.channel.send({ content: 'Hello', files: [attachment] });
                const imageURL = 'https://cdn.discordapp.com/avatars/${msg.author.id}/${msg.author.avatar}.webp';
                ======== ============================= ================*/
                const imageURL = msg.author.avatarURL();
                await msg.reply({
                    content: `Your name: ${msg.author.tag}\n Admin: ${checkAdmin ? "True" : "False"} \nMention:${msg.author}\nYour id: ${msg.author.id}\n Created at: ${moment(msg.author.createdAt).format("ll")}\nYour avatar:`, files: [imageURL]
                });
            }
            else if (commandName === '$dis') {
                await msg.member.voice.disconnect();
            }
        });
    }
}

module.exports = normalCommands;