export function checkIfBodyExist(req, res, next) {
    let body = req.body
    console.log(body)
    if (!body || Object.keys(body).length === 0 || !body.playerName || (body.playerName.trim()).length === 0) {
        return res.status(400).json({error: 'Invalid body'})
    } next()
}

