module.exports = (client) => {
    client.on('ready', async () => {
        var schedule = require('node-schedule');

        var j = schedule.scheduleJob('0 * * * *', async function () {
            const Deadlineschema = require("@schemas/3-deadlineschema")
            var moment = require('moment');
            const Discord = require('discord.js');
            const testchannel = client.channels.cache.get('754042973850828821')

            let current = moment().format("DD/MM/YYYY")
            let yesterday = moment().subtract(1, 'days').format("DD/MM/YYYY")

            const guild = client.guilds.cache.get('703937875720273972');
            if (!guild) return console.log("Couldn't get the guild.");

            console.log(current)
            console.log(yesterday)

            let dlresults = await Deadlineschema.find({
                date: current
            })
            console.log(dlresults)


            if (dlresults) {
                let reply = ':'
                try {
                    for (items of dlresults) {
                        let User = await client.users.fetch(items.UserID)
                        let deadline = items.dltext
                        console.log(deadline)

                        reply += `${User} deadline: *${deadline}*\n\n`
                    }
                } finally {
                    const todayEmbed = new Discord.MessageEmbed()
                        .setColor('#337f4e')
                        .setTitle(`Todays deadlines:`)
                        .addFields(
                            { name: 'Deadlines:', value: `${reply}` },
                        )

                    let reacttoday = await testchannel.send(todayEmbed);
                    reacttoday.react('🍀')

                    guild.members.cache.get(items.UserID).roles.add("755924266779672596")
                }
            }

            let yesterdayresults = await Deadlineschema.find({
                date: yesterday
            })
            console.log(yesterdayresults)



            console.log('The answer to life, the universe, and everything!');

        });
    })
}