const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Apenas Administradores podem usar este comando**")

let user = message.mentions.users.first()
if(!user) return message.channel.send('Me dê um usuario a adicionar o money')

if(isNaN(args[1])) return message.channel.send('Me dê um valor numerico valido')

if(message.content.includes(" -")) return message.channel.send("Você não pode dar uma quantis negativa ao user")

const embed = new Discord.MessageEmbed()
.setDescription(`**${message.author} foi adicionado ao ${user} ${args[1]} Coins**`)
.setColor("GREEN")
message.channel.send(embed)

 await db.add(`bal_${message.guild.id}-${user.id}`, args[1])
}