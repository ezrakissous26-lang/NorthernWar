import express from 'express'

export const router =  express.Router()

// router.get('/', (req, res) => {
//     res.status(200).json({message: 'hello world'})
// })

router.post('/games', (req, res) => {
    res.send('banana')
})

router.get('/games/:id', (req, res) => {
    res.send('banana')
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
