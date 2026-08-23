import express from 'express'
import { checkIfBodyExist, checkValidGameId } from '../middleware/midlleware.js'
import { createNewGame, getOneById } from '../repo/game-repo.js'

export const router =  express.Router()

router.post('/games', checkIfBodyExist, async (req, res) => {
    const playerName = (req.body.playerName).trim()
    const result = await createNewGame(playerName)
    if (result.error) {
        return res.status(500).json({error: result.error})
    }
    return res.status(201).json(await getOneById(result.insertedId))
})

router.get('/games/:id', await checkValidGameId , async (req, res) => {
    const gameId = req.params.id
    const result = await getOneById(gameId)
    if (result.error) {
        return res.status(500).json({error: result.error})
    }
    res.status(200).json(result)
})

router.post('/games/:id/reinforce', (req, res) => {
    res.send('banana')
})

router.post('/games/:id/attack', (req, res) => {
    res.send('banana')
})

router.post('/games/:id/move', (req, res) => {
    res.send('banana')
})

router.post('/games/:id/end-turn', (req, res) => {
    res.send('banana')
})
