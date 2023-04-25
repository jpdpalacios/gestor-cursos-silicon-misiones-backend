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
    },
    create: async (req, res) => {
        try {
            let curso = await DB.Curso.create({
                nombre: req.body.nombre,
                descripcion: req.body.descripcion,
                imagen: req.body.imagen ? req.body.imagen : 'imagen-default.jpg',
                anio: req.body.anio,
                activo: req.body.activo ? req.body.activo : false
            });

            return res.status(200).json({
                data: curso,
                status: 200,
                created: "ok"
            })
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error al crear el curso",
                error: error,
            });
        }
    },
    delete: async (req, res) => {
        try {
            const curso = await DB.Curso.findOne({ where: { id: req.params.id } });
            if (!curso) {
                return res.status(404).json({
                    message: "No se encontró el curso con el ID especificado",
                });
            }
            await curso.destroy();
            return res.status(200).json({
                message: "El curso ha sido eliminado exitosamente",
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Ocurrió un error al eliminar el curso",
                error: error,
            });
        }
    }
}

module.exports = CourseController