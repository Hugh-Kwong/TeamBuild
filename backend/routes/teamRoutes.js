const express = require('express')
const router = express.Router()

const { 
    getTeams,
    setTeam, 
    updateTeam, 
    deleteTeam,
} = require('../controllers/teamsController')

router.route('/team').get(getTeams).post(setTeam)
router.route('/team/:id').delete(deleteTeam).put(updateTeam)

module.exports = router


