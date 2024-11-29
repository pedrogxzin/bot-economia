
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() - 3);
  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT); 

const Discord = require("discord.js");
const client = new Discord.Client(); 
const config = require("./config.json"); 
const db = require("quick.db");

client.on('message', message => {
     if (message.author.bot) return;
     if (message.channel.type == 'dm') return;
     if (!message.content.toLowerCase().startsWith(config.prefix.toLowerCase())) return;
     if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) return;

    const args = message.content
        .trim().slice(config.prefix.length)
        .split(/ +/g);
    const command = args.shift().toLowerCase();

    try {
        const commandFile = require(`./commands/${command}.js`)
        commandFile.run(client, message, args);
    } catch (err) {
    console.error('Erro:' + err);
  }
});

client.on("message", message => {
  if(message.author.bot) return
if(message.content == `<@!${client.user.id}>` || message.content == `<@${client.user.id}>`) return message.channel.send({embed: {
  description: `Olá \`${message.author.username}\` meu prefixo é \`${config.prefix}\`, utilize \`${config.prefix}help\` para ver meus comandos`,
  color: "#ff0000"
}})
})


client.login(config.token); 