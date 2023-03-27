const mongoose = require('mongoose')

const teamSchema = mongoose.Schema({
    team:{
        type: String,
        required: [true, 'Please add a team name']
    },


},  {
    timestamps: true,
})
    const Teams = mongoose.model('Teams', teamSchema)

module.exports = Teams