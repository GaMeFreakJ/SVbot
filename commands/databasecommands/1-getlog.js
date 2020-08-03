module.exports = {
    commands: ['week'],
    minArgs: 0,
    maxArgs: 1,
    callback: async(message, arguments, text) => {
        const target = message.mentions.users.first() || message.author
        const targetId = target.id
        const logcounter = require('../../4-logcounter')

        const UserID = target.id
            
        const logtotal = await logcounter.getLog(UserID)
        message.reply(`You have studied for ${logtotal} hours this week!`)}
    };