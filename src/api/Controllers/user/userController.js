const jwt = require('jsonwebtoken')
const DB = require('../../../database/models');

const userController = {
    create: async (req, res) => {
        try {
            let { email, nickname, password, rol } = req.body;

            let registerUser = await DB.Usuario.create({ email, nickname, password , rol });

            res.send({ data: registerUser })
        } catch (error) {
            return res.status(500).json({
                message: "Ocurrió un error al crear el alumno",
                error: error,
            });
        }
    },

    login: async (req, res) => {
        try {
            let { nickname, password } = req.body;
            let user = await DB.Usuario.findOne({ where: { nickname } });
            let checkPassword = password === user.password ? true : false;
            let checkUser = password === null ? false : checkPassword;

            if (!checkUser) {
                res.status(401).send({
                    error: 'Usuario o contraseña invalidos'
                })
            }

            const userForToken = {
                id: user.id,
                nickname: user.nickname
            }

            const token = jwt.sign(userForToken, "secreto123")

            res.status(200).send({
                nickname: user.nickname,
                password: user.password,
                token: token
            })

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error al iniciar sesión",
                error: error,
            });
        }
    },
};

module.exports = userController;
