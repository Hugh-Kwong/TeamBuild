const mongoose = require('mongoose');

const playerSchema = mongoose.Schema({
    pName: {
        type:  String,
        required: [true, 'Please add a player name']
    },
    
    age: {
       type:  String,
        required: [true, 'Please add a player age']
    },
    email: {
        type:  String,
        required: [true, 'Please add a player email'],
        unique: true
    }, 
    team:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teams',
    },
  
    }, {
        timestamps:  true,
    
    })
    
    const Player = mongoose.model('Player', playerSchema)
module.exports = Player