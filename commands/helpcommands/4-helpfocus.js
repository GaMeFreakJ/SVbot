module.exports = {
    commands: ['infofocus', 'helpfocus'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const Discord = require('discord.js');
        const focusembed = new Discord.MessageEmbed()
        .setColor('#337f4e')
        .addFields(
            { name: 'How to use Focus Mode:', value: `Focus mode is designed to keep you away from distracting channels, gifs and pings so you can work in peace.
            Enter the Focus world by typing **!focus**, come back to the server by using **!end**.
            
            *note: you will still be able to be tagged in the Study Team timers via the #timers-forest channel!*` }
            )
    message.channel.send(focusembed);
    }
}