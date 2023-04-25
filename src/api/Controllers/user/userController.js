const bcrypt = require('bcrypt')
const DB = require('../../../database/models')


const userController = {
    login: async (req, res) => {
        let { nickname, password } = req.body;
        let user = await DB.Usuario.findOne({ where: { nickname } });

        let passwordCorrect = user === null
        ? false
        : await bcrypt.compare(password, user.passwordHash)

        if (!passwordCorrect){
            res.status(401).json({
                error: 'El usuario es invalido'
            })
        }

        res.send({
            name: user.name,
            nickname: user.nickname
        })
    },
}

module.exports = userController