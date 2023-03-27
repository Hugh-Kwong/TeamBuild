const asyncHandler = require('express-async-handler');
const Player = require('../models/playerModel');
const Teams = require('../models/teamModel');
//@desc     Set Player
//@route    POST /player
const setPlayer = asyncHandler(async(req, res) =>{
    if(!req.body.pName){
        res.status(400)
        throw new Error('Please add a Player')
    }
    const player = await Player.create({
        pName: req.body.pName,
        age: req.body.age,
        email: req.body.email
        
    })
    res.status(200).json(player)
})

//@desc     get Players
//@route    POST /player
const findPlayer = asyncHandler(async(req, res) =>{
    const player = await Player.find()

    res.status(200).json(player)
})
//@desc     get Playerby id
//@route    POST /team/:id
const showTeamPlayers = asyncHandler(async(req, res) =>{
    const team = await Teams.findById(req.params.id)
        .populate('players', {strictPopulate: false} )
        .then(team => {
            console.log(team.players)
        })

    res.status(200).json(player)
})
//@desc     get Playerby id
//@route    POST /team/:id/player
const addPlayerTeam = asyncHandler(async(req, res) =>{    
    const team = await Teams.findById(req.params.id)
    const player = await Player.create({
        pName: req.body.pName,
        age: req.body.age, 
        email: req.body.email, 
        team: req.params.id
        
    })
        team.save().then(team => {});
        player.save().then(player => {
            return Teams.findByIdAndUpdate(player.team, {$push: {players: player._id}}, 
                {new :true})
        })
        .then(team => {
            console.log(team);
        })
    
})

module.exports ={
    setPlayer,
    addPlayerTeam,
    showTeamPlayers,
    findPlayer,
}