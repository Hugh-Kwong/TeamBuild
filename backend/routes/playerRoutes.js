const express = require('express')
const router = express.Router()

const { 
    setPlayer,
    addPlayerTeam,
    showTeamPlayers,
    findPlayer
} = require('../controllers/playerController')
router.route('/team/:id').get(showTeamPlayers)
router.route('/player').post(setPlayer).get(findPlayer)
router.route('/team/:id/player').post(addPlayerTeam)

module.exports = router


