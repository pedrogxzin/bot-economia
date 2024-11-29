const { MessageEmbed } = require("discord.js");
const db = require("quick.db"),
  ms = require("parse-ms"),
  dailystatus = new MessageEmbed();

module.exports = {
  name: "daily",
  aliases: ["dailycoins", "dailyreward"],
  run: async (client, message, args) => {
    let cooldown = 8.64e7,
      amount = Math.floor(Math.random() * 400 + 1);

    let lastdaily = await db.get(`lastDaily_${message.guild.id}-${message.author.id}`);

    if (lastdaily !== null && cooldown - (Date.now() - lastdaily) > 0) {
      let timeobj = ms(cooldown - (Date.now() - lastdaily));

      dailystatus.setColor("#ff0000");
      dailystatus.setDescription(
        `**Você ja coletou o daily ${message.author.username}, por favor espere ${timeobj.hours} horas, ${timeobj.minutes} minutos e ${timeobj.seconds} segundos!**`
      );

      message.channel.send(dailystatus);
    } else {
      dailystatus.setColor("GREEN");
      dailystatus.setDescription(
        `**Daily de ${message.member}, Coletado com sucesso 💸 ${amount}!**`
      );

      db.set(`lastDaily_${message.guild.id}-${message.author.id}`, Date.now());
      db.add(`bal_${message.guild.id}-${message.author.id}`, amount);

      message.channel.send(dailystatus);
    }
  }
};
