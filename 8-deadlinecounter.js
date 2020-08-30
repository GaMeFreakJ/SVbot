const mongo = require('./mongo')
const deadlineschema = require('./schemas/3-deadlineschema')
const logCache = {}

module.exports = (client) => {}

module.exports.addLog = async (UserID, date, dltext) => {
    return await mongo().then(async (mongoose) => {
      try {
        console.log('Running findOneAndUpdate()')
  
        const result = await deadlineschema.insert(
          {
            UserID,
            date,
            dltext,
          }
        )
  
        logCache[`${UserID}`] = result.timeLog
  
        return result.timeLog
      } finally {
        mongoose.connection.close()
      }
    })
  
}

module.exports.getLog = async (UserID) => {
    const cachedValue = logCache[`${UserID}`]
        if (cachedValue) {
        return cachedValue}
    
    return await mongo().then(async (mongoose) =>{
        try {
            console.log('running logsearch')

            const result = await deadlineschema.findOne({
                UserID
            })
            console.log('Result:', result)

            let date = {}
            let dltext ={}
            if (result) {
                date = result.date
                dltext = result.dltext
                
        return (result.date, results.dltext)}
        
    }finally{
        mongoose.connection.close()
    }
})
}