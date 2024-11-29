const Discord = require("discord.js")
const db = require("quick.db")

module.exports.run = async (client, message, args) => {
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("**Apenas Administradores podem usar este comando**")
let user = message.mentions.users.first()
if(!user) return message.channel.send("**Mencione um user para adicionar money**")

let amount = args[1]
if(!amount) return message.channel.send("**Dê um valor para ser adicionado**")

if(message.content.includes(" -")) return message.channel.send("Não podes remover uma quantia negativa")

if(isNaN(amount)) return message.channel.send("**Você deve me dar um valor numerico**")

let coin = await db.get(`bal_${message.guild.id}-${user.id}`)
if(coin < user.id) return message.channel.send("**Você não pode retirar uma quantia que ele não possui**")


const embed = new Discord.MessageEmbed()
.setDescription(`**${message.author} foi retirado de ${user} ${amount} Coins**`)
.setColor("GREEN")
message.channel.send(embed)

await db.subtract(`bal_${message.guild.id}-${user.id}`, amount)
}