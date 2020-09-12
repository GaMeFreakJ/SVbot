const Todocountschema = require('../../schemas/7-todocountschema')

module.exports = {
    commands: ['setmorning', 'testsettup'],
    minArgs: 0,
    expectedArgs: '<!weather location>',

    callback: async (message, arguments, text) => {
        const mongo = require('../../mongo')
        const userdataSchema = require('../../schemas/9-userinfoschema')
        const mention = message.author
        const UserId = mention.id
        let providedplace = arguments[0]
        let providedquote = arguments[1]
        let providedforecast = arguments[2]

        console.log(providedforecast)
        console.log(providedquote)

        if (providedquote == 'yes' || providedquote == 'no') {
            if ((providedforecast == 'yes') || (providedforecast == 'no')) {
                await mongo().then(async (mongoose) => {
                    try {
                        console.log('Running findOneAndUpdate()')

                        const result = await userdataSchema.findOneAndUpdate(
                            {
                                UserId,
                            },
                            {
                                place: providedplace,
                                setQuote: providedquote,
                                setForecast: providedforecast
                            },

                            {
                                upsert: true,
                                new: true,
                            }
                        )
                        const updatetodo = await Todocountschema.findOneAndUpdate(
                            {
                                UserId,
                            },
                            {
                                messageCount: 0
                            },

                            {
                                upsert: true,
                                new: true,
                            }
                        )

                        
                    } finally {
                        mongoose.connection.close()
                        message.reply(' your morning setup has been arranged.')
                    }
                })

            }else message.reply('Please give a yes or no answer to setquotes input')
        }else message.reply('Please give a yes or no answer to setforecast input')
    }
}

