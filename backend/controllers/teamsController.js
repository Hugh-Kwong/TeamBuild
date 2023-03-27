const asyncHandler = require('express-async-handler');

const Teams = require('../models/teamModel');

//@desc     Get teams
//@route    GET /teams
const getTeams = asyncHandler(async(req, res) =>{
    const teams = await Teams.find()

    res.status(200).json(teams)
})

//@desc     Set teams
//@route    POST /teams
const setTeam = asyncHandler(async(req, res) =>{
    if(!req.body.team){
        res.status(400)
        throw new Error('Please add a team')
    }
    const team = await Teams.create({
        team: req.body.team
    })
    res.status(200).json(team)
})

//@desc     Update teams
//@route    PUT /teams/:id
const updateTeam = asyncHandler(async(req, res) =>{
    const team = await Teams.findById(req.params.id)

    if(!team){
        res.status(400)
        throw new Error('Team not found')
    }
    const updatedTeam = await Teams.findByIdAndUpdate(req.params.id, req.body.team, {
            new: true,
    })

    res.status(200).json(updatedTeam)
})

//@desc     Delete teams
//@route    Delete /teams/:id
const deleteTeam = asyncHandler(async(req, res) =>{
    const team = await Teams.findById(req.params.id)

    if(!team){
        res.status(400)
        throw new Error('Team not found')
    }
    const deletedTeam = await Teams.findByIdAndDelete(req.params.id, req.body, {
        new: true,
    })
    res.status(200).json(team)
})


module.exports = {
    getTeams,
    setTeam,
    updateTeam,
    deleteTeam,
    
}
