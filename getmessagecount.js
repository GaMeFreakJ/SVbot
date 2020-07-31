const mongo = require('./mongo')
const messageCountSchema = require('./schemas/1-messagecountschema')

module.exports.getmessageCount = async (UserId) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Searching the database for message-count')
  
        const result = await messageCountSchema.findOne({
          UserId,
        })
  
        let messageCount = 0

        if (result) {
          messageCount = result.messageCount
        } else {
          console.log('No messages for this user')}
        
        return messageCount
      } finally {
        mongoose.connection.close()
      }
    })
  }