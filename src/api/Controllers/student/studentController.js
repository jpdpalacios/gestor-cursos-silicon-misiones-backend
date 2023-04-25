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
    }
}

module.exports = studentController