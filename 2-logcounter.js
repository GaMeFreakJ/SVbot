const mongo = require('./mongo')
const logcountSchema = require('./schemas/2-logcountschema')

module.exports.getLog = async (UserID) => {
    return await mongo().then(async (mongoose) =>{
        try {
            console.log('running logsearch')

            const result = await logcountSchema.findOne({
                UserID
            })
            console.log('Result:', result)

            let timeLog = 0
            if (result) {
                timeLog = result.timeLog
            } else {
                console.log('Insert document')
                await new logcountSchema({
                   UserID,
                   timeLog 
                }) .save()
            }
            logCache [`${UserID}`] = timeLog
        return timeLog
        }finally{
        mongoose.connection.close()
    }
})
}
