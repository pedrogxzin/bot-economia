const db = require("quick.db")
const Discord = require("discord.js")

module.exports.run = async (client, message, args) => {
  
  let user = message.mentions.users.first() || message.author;
  
  
 let bal = db.get(`bal_${message.guild.id}-${user.id}`) || 0;
  
  const ba = new Discord.MessageEmbed()
  .setDescription(`**💸 User ${user.username} possui ${bal} Coins**`)
  .setColor("GREEN")
  message.channel.send(ba)
}