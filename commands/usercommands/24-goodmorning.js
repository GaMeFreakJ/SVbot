module.exports = {
    commands: ['betagoodmorning', 'betamorning'],
    minArgs: 0,
    expectedArgs: '<!weather location>',

    callback: async (message, arguments, text) => {
        const weather = require('weather-js');
        const Discord = require('discord.js');
        const mongo = require('../../mongo')
        const tododataSchema = require('../../schemas/8-tododataschema')
        const userSchema = require('../../schemas/3-deadlineschema')
        const todocountSchema = require('../../schemas/7-todocountschema')
        const userdataSchema = require('../../schemas/9-userinfoschema')
        const { randomQuotes } = require('../../randomQuotes.json');
        let getquote = randomQuotes[Math.floor(Math.random() * randomQuotes.length)]
        const mention = message.author
        const UserID = mention.id
        const UserId = mention.id


        await mongo().then(async (mongoose) => {
            try {
                console.log('Searching the database for Suggestions')

                const results = await userdataSchema.find({
                    UserId,
                })
                if (results) {
                    console.log(results)
                    for (const result of results) {
                        const location = (result.place)
                        const quote = (result.setQuote)
                        const forecast = (result.setForecast)
                        console.log(`${location}, ${quote}, ${forecast}`)
                        if (quote === 'yes' && forecast === 'yes') {
                            let quotereply = `**🔮A random quote:** \n ${getquote}`
                            console.log(getquote)
                            weather.find({ search: location, degreeType: 'C' }, function (err, result) {
                                try {
                                    let current = `⛅️ Condition: **${result[0].current.skytext}** \n🌡 Temperature: **${result[0].current.temperature} C** \n 💨 Windspeed: **${result[0].current.winddisplay}** \n\n `
                                    console.log(current)
                                    let forec = result[0].forecast
                                    let forecastreply = '**The forecast for your location:**\n'
                                    for (const forecast of forec) {
                                        forecastreply += `**${forecast.shortday}** it will be between *${forecast.low} - ${forecast.high} C∘* and **${forecast.skytextday}** with ${forecast.precip}% rain. \n`
                                    }
                                    mongo().then(async (mongoose) => {
                                        let todocount = await todocountSchema.find({
                                            UserId,
                                        })
                                        console.log(todocount)
                                        for (const count of todocount) {
                                            const todocounts = (count.messageCount)

                                            if ((todocounts) > 0) {
                                                let todoresults = await tododataSchema.find({
                                                    UserId,
                                                })
                                                let sortmyresults = todoresults
                                                let todoreply = '**✅ Your remaining tasks:**\n'
                                                for (const newresult of sortmyresults) {
                                                    todoreply += `**${newresult.todocount})** ${newresult.todo}\n`
                                                }

                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const exampleEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning** ${message.author.username}!`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${deadlinereply}` },
                                                            { name: '\u200B', value: `${todoreply}` },
                                                            { name: '\u200B', value: `${quotereply}` }

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(exampleEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    const todoembed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${todoreply}` },
                                                            { name: '\u200B', value: `${quotereply}` }

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(todoembed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                            else {
                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const deadlineEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${deadlinereply}` },
                                                            { name: '\u200B', value: `${quotereply}` }
                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(deadlineEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    let noinputEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${quotereply}` }
                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(noinputEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                        }
                                    })
                                } catch (err) {
                                    return message.channel.send("Unable To Get the data for the given location or user")
                                }
                            }
                            )
                        } else if (quote === 'yes' && forecast === 'no') {
                            let quotereply = `**🔮A random quote:** \n ${getquote}`
                            console.log(getquote)
                            weather.find({ search: location, degreeType: 'C' }, function (err, result) {
                                try {
                                    let current = `⛅️ Condition: **${result[0].current.skytext}** \n🌡 Temperature: **${result[0].current.temperature} C** \n 💨 Windspeed: **${result[0].current.winddisplay}** \n\n `
                                    console.log(current)
                                    let forec = result[0].forecast
                                    let forecastreply = '**The forecast for your location:**\n'
                                    for (const forecast of forec) {
                                        forecastreply += `**${forecast.shortday}** it will be between *${forecast.low} - ${forecast.high} C∘* and **${forecast.skytextday}** with ${forecast.precip}% rain. \n`
                                    }
                                    mongo().then(async (mongoose) => {
                                        let todocount = await todocountSchema.find({
                                            UserId,
                                        })
                                        console.log(todocount)
                                        for (const count of todocount) {
                                            const todocounts = (count.messageCount)

                                            if ((todocounts) > 0) {
                                                let todoresults = await tododataSchema.find({
                                                    UserId,
                                                })
                                                let sortmyresults = todoresults
                                                let todoreply = '**✅ Your remaining tasks:**\n'
                                                for (const newresult of sortmyresults) {
                                                    todoreply += `**${newresult.todocount})** ${newresult.todo}\n`
                                                }

                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const exampleEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning** ${message.author.username}!`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${deadlinereply}` },
                                                            { name: '\u200B', value: `${todoreply}` },
                                                            { name: '\u200B', value: `${quotereply}` }

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(exampleEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    const todoembed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${todoreply}` },
                                                            { name: '\u200B', value: `${quotereply}` }

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(todoembed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                            else {
                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const deadlineEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${deadlinereply}` },
                                                            { name: '\u200B', value: `${quotereply}` }
                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(deadlineEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    let noinputEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${quotereply}` }
                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(noinputEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                        }
                                    })
                                } catch (err) {
                                    return message.channel.send("Unable To Get the data for the given location or user")
                                }
                            }
                            )

                        } else if (quote === 'no' && forecast === 'yes') {
                            let quotereply = `**🔮A random quote:** \n ${getquote}`
                            console.log(getquote)
                            weather.find({ search: location, degreeType: 'C' }, function (err, result) {
                                try {
                                    let current = `⛅️ Condition: **${result[0].current.skytext}** \n🌡 Temperature: **${result[0].current.temperature} C** \n 💨 Windspeed: **${result[0].current.winddisplay}** \n\n `
                                    console.log(current)
                                    let forec = result[0].forecast
                                    let forecastreply = '**The forecast for your location:**\n'
                                    for (const forecast of forec) {
                                        forecastreply += `**${forecast.shortday}** it will be between *${forecast.low} - ${forecast.high} C∘* and **${forecast.skytextday}** with ${forecast.precip}% rain. \n`
                                    }
                                    mongo().then(async (mongoose) => {
                                        let todocount = await todocountSchema.find({
                                            UserId,
                                        })
                                        console.log(todocount)
                                        for (const count of todocount) {
                                            const todocounts = (count.messageCount)

                                            if ((todocounts) > 0) {
                                                let todoresults = await tododataSchema.find({
                                                    UserId,
                                                })
                                                let sortmyresults = todoresults
                                                let todoreply = '**✅ Your remaining tasks:**\n'
                                                for (const newresult of sortmyresults) {
                                                    todoreply += `**${newresult.todocount})** ${newresult.todo}\n`
                                                }

                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const exampleEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning** ${message.author.username}!`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${deadlinereply}` },
                                                            { name: '\u200B', value: `${todoreply}` },


                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(exampleEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    const todoembed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${todoreply}` },


                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(todoembed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                            else {
                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const deadlineEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },
                                                            { name: '\u200B', value: `${deadlinereply}` },

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(deadlineEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    let noinputEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },
                                                            { name: '\u200B', value: `${forecastreply}` },

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(noinputEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                        }
                                    })
                                } catch (err) {
                                    return message.channel.send("Unable To Get the data for the given location or user")
                                }
                            }
                            )
                        

                        } else if (quote === 'no' && forecast === 'no') {
                            let quotereply = `**🔮A random quote:** \n ${getquote}`
                            console.log(getquote)
                            weather.find({ search: location, degreeType: 'C' }, function (err, result) {
                                try {
                                    let current = `⛅️ Condition: **${result[0].current.skytext}** \n🌡 Temperature: **${result[0].current.temperature} C** \n 💨 Windspeed: **${result[0].current.winddisplay}** \n\n `
                                    console.log(current)
                                    let forec = result[0].forecast
                                    let forecastreply = '**The forecast for your location:**\n'
                                    for (const forecast of forec) {
                                        forecastreply += `**${forecast.shortday}** it will be between *${forecast.low} - ${forecast.high} C∘* and **${forecast.skytextday}** with ${forecast.precip}% rain. \n`
                                    }
                                    mongo().then(async (mongoose) => {
                                        let todocount = await todocountSchema.find({
                                            UserId,
                                        })
                                        console.log(todocount)
                                        for (const count of todocount) {
                                            const todocounts = (count.messageCount)

                                            if ((todocounts) > 0) {
                                                let todoresults = await tododataSchema.find({
                                                    UserId,
                                                })
                                                let sortmyresults = todoresults
                                                let todoreply = '**✅ Your remaining tasks:**\n'
                                                for (const newresult of sortmyresults) {
                                                    todoreply += `**${newresult.todocount})** ${newresult.todo}\n`
                                                }

                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const exampleEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning** ${message.author.username}!`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },

                                                            { name: '\u200B', value: `${deadlinereply}` },
                                                            { name: '\u200B', value: `${todoreply}` },


                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(exampleEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    const todoembed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },

                                                            { name: '\u200B', value: `${todoreply}` },


                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(todoembed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                            else {
                                                let deadlines = await userSchema.find({
                                                    UserID,
                                                })

                                                if (deadlines) {
                                                    let deadlinereply = '**⏰ Your deadlines:**\n'
                                                    for (const deadline of deadlines) {
                                                        deadlinereply += `**${deadline.date}** deadline: **${deadline.dltext}**\n`
                                                    }
                                                    const deadlineEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },

                                                            { name: '\u200B', value: `${deadlinereply}` },

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(deadlineEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                                else {
                                                    let noinputEmbed = new Discord.MessageEmbed()
                                                        .setColor('#337f4e')
                                                        .setTitle(`**Goodmorning!** ${message.author.username}`)
                                                        .addFields(
                                                            { name: 'Weather for today:', value: `${current}` },

                                                        )
                                                        .setThumbnail(result[0].current.imageUrl)
                                                    message.channel.send(noinputEmbed)
                                                    mongoose.connection.close()
                                                    message.delete()
                                                }
                                            }
                                        }
                                    })
                                } catch (err) {
                                    return message.channel.send("Unable To Get the data for the given location or user")









                                }
                            }
                            )
                        }
                    }
                } else { message.reply('Use the setup please!') }
            } finally { message.reply('have a good day!') }
        })
    }
}



