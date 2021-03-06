module.exports = {
    commands: ['close'],
    minArgs: 1,
    maxArgs: 1,
    permissions: 'BAN_MEMBERS',

    callback: (message, arguments, text) => {
        const categoryId = "703937876634894387";
        const general = message.client.channels.cache.get('703937876634894388');
        const logchannel = message.guild.channels.cache.get('730029372697870347');
        
        var person = message.guild.member(message.mentions.users.first());        
        if (message.channel.parentID == categoryId) {
            message.channel.delete();
           
            logchannel.send(`The support channel of ${"<@" + person.user.id + ">"} has been closed by ${"<@" + message.author.id + ">"}`)
            general.send(`${"<@" + person.user.id + ">"}, your support channel has been closed by one of our mods, to open a new issue use !ticket again.`)
    } else {
        message.channel.send("This command only works in a support channel");
    }
}
}
