module.exports = {
    commands: ['git', 'github'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        //returning link to the github-repo of this project
        message.channel.send('I can be found here: https://github.com/RobinJans-SV/SVbot'
        )
    }
}