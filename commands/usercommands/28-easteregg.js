module.exports = {
    commands: ['robin'],
    minArgs: 0,
    maxArgs: 0,

    callback: async (message, arguments, text) => {
        message.reply('Here we go: https://www.youtube.com/watch?v=nqej90AuZro')
    }
}