const DB = require('../../../database/models')
const Op = DB.Sequelize.Op;

const CourseController = {
    index: async (req, res) => {
        try {
            const cursos = await DB.Curso.findAll();
            let conteo = cursos.reduce((acumulador, curso) => {
                if (curso.activo === true) {
                    acumulador.activos++;
                } else {
                    acumulador.inactivos++;
                }
                return acumulador;
            }, { activos: 0, inactivos: 0 });

            return res.status(200).json({
                total: cursos.length,
                activos: conteo.activos,
                inactivos: conteo.inactivos,
                data: cursos,
                status: 200
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error al listar los cursos",
                error: error,
            });
        }
    }
}

module.exports = CourseController