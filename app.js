const config = require('./config.json');
const Client = require('./src/Client.js');
const { Intents, Message, DiscordAPIError, MessageActionRow, MessageButton } = require('discord.js');
const { stripIndent } = require('common-tags');
const { MessageEmbed } = require('discord.js');
const Discord = require('discord.js');
const db = require('quick.db');
const Canvacord = require('canvacord');
const mongoose = require("mongoose");

global.__basedir = __dirname;

mongoose.connect(config.mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
	//If it connects log the following
	console.log("Verbunden mit der Mongodb-Datenbank.");
}).catch((err) => {
	//If it doesn't connect log the following
	console.log("Es kann keine Verbindung zur Mongodb-Datenbank hergestellt werden. Error:" + err);
});

// Client setup
const intents = new Intents();
intents.add(
  'GUILD_PRESENCES',
  'GUILD_MEMBERS',
  'GUILDS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS'
);
const client = new Client(config, { ws: { intents: intents } });

// Initialize client
function init() {
  client.loadEvents('./src/events');
  client.loadCommands('./src/commands');
  client.loadTopics('./data/trivia');
  client.login(client.token);
}

init();

const werbungStats = stripIndent`
      Link | Homepage  :: neobot.de
      Link | Discord   :: dsc.gg/neobot.de
      Link | Bot       :: dsc.ink/neobot.dc
    `;

client.on('ready', () => {
  // Kanal: general
  var testChannel1 = client.channels.cache.find(channel => channel.id === config.announcement1);
  // Kanal: code-help
  //var testChannel2 = client.channels.cache.find(channel => channel.id === config.announcement2);

  /*setInterval(() => {
    const embed = new MessageEmbed()
    .setTitle('📣  **Ankündigung**  📣')
    .setThumbnail('https://i.ibb.co/zfwgBYw/Neobot-Logo-300x300.png')
    .addField('Werbung', `\`\`\`asciidoc\n${werbungStats}\`\`\``)
    .setFooter('Neobot', 'https://i.ibb.co/zfwgBYw/Neobot-Logo-300x300.png')
    .setTimestamp()
    .setColor('RANDOM')
    .setImage('https://i.ibb.co/mbYttkJ/Neobot-Titelbild-Ani.gif');
    testChannel.send(embed);
   }, 21600000);*/

   // Kanal: general
   setInterval(() => {
    const embed1 = new MessageEmbed()
    .addField('Werbung', `\`\`\`asciidoc\n${werbungStats}\`\`\``)
    .setColor('GREEN')
    .setFooter('Neobot & Neobot-Giveaway', 'https://i.ibb.co/zfwgBYw/Neobot-Logo-300x300.png')
    .setImage('https://i.ibb.co/Fx9RJDD/Ani-Banner-Neobot.gif');
    testChannel1.send(embed1);
   }, 21600000);

   // Kanal: code-help
   /*setInterval(() => {
    const embed2 = new MessageEmbed()
    .addField('Werbung', `\`\`\`asciidoc\n${werbungStats}\`\`\``)
    .setColor('GREEN')
    .setFooter('Neobot & Neobot-Giveaway', 'https://i.ibb.co/zfwgBYw/Neobot-Logo-300x300.png')
    .setImage('https://i.ibb.co/Fx9RJDD/Ani-Banner-Neobot.gif');
    testChannel2.send(embed2);
   }, 21600000);*/
});

client.on('guildCreate', guild => {
  const channel = guild.channels.cache.find(channel => channel.type === 'text' && channel.permissionsFor(guild.me).has('SEND_MESSAGES'))
  channel.send(`:alien: **Hallo, ich bin Neobot. Danke für die Einladung, hier sind alle meine Befehle!** :alien:`);

    const embed = new MessageEmbed()
    .setTitle(':x: Präfix')
    .setThumbnail('https://i.ibb.co/zfwgBYw/Neobot-Logo-300x300.png')
    .setColor('0x2471a3')
    .setDescription('Das Präfix für alle meine Befehle ist \`c!\`, zB: \`c!help\`. Kann aber geändert werden mit \`setprefix\`, zB: \`c!setprefix !\`')
    .addField(':tools: Admin', '\`setadminrole\` \`setautokick\` \`setautorole\` \`setcommandpoints\` \`setcrownchannel\` \`setcrownmessage\` \`setcrownrole\` \`setcrownschedule\` \`setfarewellchannel\` \`setfarewellmessage\` \`setmemberlog\` \`setmessagedeletelog\` \`setmessageeditlog\` \`setmessagepoints\` \`setmodchannels\` \`setmodlog\` \`setmodrole\` \`setmuterole\` \`setnicknamelog\` \`setprefix\` \`setrolelog\` \`setstarboardchannel\` \`setsystemchannel\` \`settings\` \`setverificationchannel\` \`setverificationmessage\` \`setverificationrole\` \`setvoicepoints\` \`setwelcomechannel\` \`setwelcomeimg\` \`setwelcomemessage\` \`togglecommand\` \`togglepoints\` \`togglerandomcolor\` \`toggletype\`')
    .addField(
      '**Links**', 
      '**[Lade mich ein](https://discord.com/api/oauth2/authorize?client_id=872190883385192448&permissions=8&scope=bot) | ' +
      '[Support-Server](https://discord.gg/J9jmqR7WqT) | ' +
      '[Repository](https://github.com/pascal/neobot/issues)**'
    )
    .setFooter('Neobot erstellt und entwickelt von Pascal#0397.', 'https://i.ibb.co/zfwgBYw/Neobot-Logo-300x300.png')
    .setImage('https://i.ibb.co/mbYttkJ/Neobot-Titelbild-Ani.gif');
    channel.send(embed);
});

const Canvas = require('canvas')

var welcomeCanvas = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500)
welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
welcomeCanvas.context.font = '72px sans-serif';
welcomeCanvas.context.fillStyle = '#ffffff';

Canvas.loadImage("./data/images/bgs.png").then(async (img) => {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500)
    welcomeCanvas.context.fillText("Willkommen", 315, 360);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke()
    welcomeCanvas.context.fill()
})

client.on('guildMemberAdd', async member => {
    let chx = db.get(`welchannel_${member.guild.id}`);
    const welcomechannel = client.channels.cache.get(chx)
    let canvas = welcomeCanvas;
    canvas.context.font = '42px sans-serif',
    canvas.context.textAlign = 'center';
    canvas.context.fillText(member.user.tag.toUpperCase(), 512, 410)
    canvas.context.font = '32px sans-serif'
    canvas.context.fillText(`Du bist der ${member.guild.memberCount}th`, 512, 455)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })
    let atta = new Discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
    try {
        welcomechannel.send(`:wave: Hallo ${member}, willkommen bei ${member.guild.name}!`, atta)
    } catch (error) {
        console.log(error)
    }

    let TotalChannel = db.get(`totalchannel_${member.guild.id}`);
    let UserChannel = db.get(`userschannel_${member.guild.id}`);

    await client.channels.cache.get(TotalChannel).setName(`Total: ${member.guild.memberCount}`)
    await client.channels.cache.get(UserChannel).setName(`Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
})

client.on('guildMemberRemove', async member => {
  let TotalChannel = db.get(`totalchannel_${member.guild.id}`);
  let UserChannel = db.get(`userschannel_${member.guild.id}`);
  
  await client.channels.cache.get(TotalChannel).setName(`Total: ${member.guild.memberCount}`)
  await client.channels.cache.get(UserChannel).setName(`Users: ${member.guild.members.cache.filter(m => !m.user.bot).size}`)
})

const ms = require("ms");

client.on("message", async (message, guild, args, client, guildData, lang) => {
const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
xp(message)
    if(message.content.startsWith(`${prefix}rank`)) {
    if(message.author.bot) return;
    var user = message.mentions.users.first() || message.author;
    var level = db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0;
    var currentxp = db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0;
    var xpNeeded = level * 500 + 500 // 500 + 1000 + 1500
    const rankcard = new Canvacord.Rank()
        .setAvatar(user.displayAvatarURL({format: 'png', dynamic: true}))
        .setCurrentXP(db.fetch(`guild_${message.guild.id}_xp_${user.id}`) || 0)
        .setRequiredXP(xpNeeded)
        .setStatus(user.presence.status)
        .setLevel(db.fetch(`guild_${message.guild.id}_level_${user.id}`) || 0)
        .setRank(1, 'RANK', false)
        .setProgressBar("#FFA500", "COLOR")
        .setOverlay("#000000")
        .setUsername(user.username)
        .setDiscriminator(user.discriminator)
        .setBackground("IMAGE", "https://i.ibb.co/9YqJr0m/rank.png")
        rankcard.build()
        .then(data => {
            const atta = new Discord.MessageAttachment(data, "rank.png")
            message.channel.send(atta)
        })
    }
    function xp(message) {
        if(message.author.bot) return
        const randomNumber = Math.floor(Math.random() * 10) + 15;
        db.add(`guild_${message.guild.id}_xp_${message.author.id}`, randomNumber) 
        db.add(`guild_${message.guild.id}_xptotal_${message.author.id}`, randomNumber)
        var level = db.get(`guild_${message.guild.id}_level_${message.author.id}`) || 1
        var xp = db.get(`guild_${message.guild.id}_xp_${message.author.id}`)
        var xpNeeded = level * 500;
        if(xpNeeded < xp){
            var newLevel = db.add(`guild_${message.guild.id}_level_${message.author.id}`, 1) 
            db.subtract(`guild_${message.guild.id}_xp_${message.author.id}`, xpNeeded)
            const embed = new MessageEmbed()
              .setTitle('**Rank**')
              .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
              .setDescription(`**Herzlichen Glückwunsch** ${message.author}, **du bist aufgestiegen, du bist jetzt Level: \`${newLevel}\`**`)
              .setTimestamp()
              .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
              .setColor(message.member.displayHexColor);
            message.channel.send(embed)
        }
    }
})

process.on('unhandledRejection', err => client.logger.error(err));