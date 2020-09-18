const lockSchema = require('@schemas/14-lockdata')

module.exports = {
    commands: ['betaremaining'],
    minArgs: 1,
    expectedArgs: '<!todo>',

    callback: async (message, arguments, text) => {
        const ms = require('ms')
        var moment = require('moment');
        var schedule = require('node-schedule');
        const mention = message.author
        const UserId = mention.id

        let unlockresults = await lockSchema.find({
            UserID: UserId
        })

        if(unlockresults){
            for(items of results){
                let unlocktime = items.endtime
                let timeremaining = moment(`${unlocktime}`, "DD/MM/YYYY-hh:mm").fromNow()

                console.log(unlocktime)
                console.log(timeremaining)

                message.reply(`You are still locked until **${unlocktime}** which is **${timeremaining}** from now`)
            }
        }
    }
}