import express from 'express'
import { ObjectId } from 'mongodb'
import { getOneById } from '../repo/game-repo.js'

export function checkIfBodyExist(req, res, next) {
    let body = req.body
    if (!body || Object.keys(body).length === 0 || !body.playerName || (body.playerName.trim()).length === 0) {
        return res.status(400).json({error: 'Invalid body'})
    } next()
}

export async function checkValidGameId(req, res, next) {
    const gameId = req.params.id
    if (!ObjectId.isValid(gameId)) {
        return res.status(400).json({error: 'Invalid Id'})
    } else if (await getOneById(gameId) === null) {
        return res.status(404).json({error: 'Id not found'})
    } next()
}

export function checkIfTerritoryBodyExist(req, res, next) {
    let body = req.body
    if (!body || Object.keys(body).length === 0 || !body.territoryId) {
        return res.status(400).json({error: 'Body required, invalid body'})
    } else if (!(1 <= Number(body.territoryId) &&  Number(body.territoryId) <= 21)) {
        return res.status(400).json({error: 'Id out the range of territories'})
    } next()
}

export function checkIfAttackBodyExist(req, res, next) {
    let body = req.body
    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({error: 'Body required, invalid body'})
    }
    if (body.skip === true) {
        return next()
    }
    if (!body.fromId || !body.toId || !body.soldiers) {
        return res.status(400).json({error: 'Invalid body all field requied'})
    } next()
}