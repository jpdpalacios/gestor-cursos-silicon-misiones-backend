const DB = require('../../../database/models')
const Op = DB.Sequelize.Op;

const studentController = {
    index: async (req, res) => {
        try {
            let alumnos = await DB.Alumno.findAll();

            return res.status(200).json({
                total: alumnos.length,
                data: alumnos,
                status: 200
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error al listar los alumnos",
                error: error,
            });
        }
    },
    create: async (req, res) => {
        try {
            let { email, rol, nombre, apellido, dni } = req.body;
            let usuario = await DB.Usuario.create({ email, rol });
            let alumno = await DB.Alumno.create({ nombre, apellido, dni, id_usuario: usuario.id });

            return res.status(200).json({
                message: 'Alumno creado correctamente',
                data: {
                    usuario: usuario,
                    alumno: alumno
                }
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error al crear el alumno",
                error: error,
            });
        }
    },
}

module.exports = studentController