module.exports = {
    commands: ['stat', 'warnstats'],
    minArgs: 1,
    maxArgs: 1,
    permissions: 'BAN_MEMBERS',

    callback: async (message, arguments, text) => {
        var person = message.guild.member(message.mentions.users.first());
        if (!person) return message.reply("I CANT FIND THE USER " + person);

        const warningcountSchema = require('@schemas/1-warningcount')
        const messageCountSchema = require('@schemas/12-messagecount')


        warnings = await warningcountSchema.findOne({
            UserID: person
        })
        messages = await messageCountSchema.findOne({
            Userid: person
        })

        for (items of warnings) {
            let count = items.warnings
            for (counts of messages) {
                let messagecount = items.messageCount

                let average = (messagecount/count)
        
                message.reply(`Warning stats for this user: ${average}`)
            }
        }
    }
}



