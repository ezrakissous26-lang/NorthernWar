export function checkIfBodyExist(req, res, next) {
    const body = req.body
    console.log(body)
    if (!body || Object.keys(body).length === 0) {
        return res.status(400).json({error: 'Body required'})
    } next()
}