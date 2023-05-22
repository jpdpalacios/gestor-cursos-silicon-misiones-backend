const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    let authorization = req.get('authorization')
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    let decodedToken = jwt.verify(token, "secreto123", { expiresIn: 60 * 60 * 24 })

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token faltante o invalido' })
    }

    next();
}