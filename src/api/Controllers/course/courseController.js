const DB = require('../../../database/models')
const Op = DB.Sequelize.Op;
const multer = require("multer");
const path = require("path");
const fs = require("fs");


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
        let pathCourse = path.join(__dirname, "./../../../../public/images/courses/");
        let storage = multer.diskStorage({
            destination: pathCourse,
            filename: function (req, file, cb) {
                cb(
                    null,
                    file.fieldname + "-" + Date.now() + "-" + file.originalname 
                );
            },
        });
        let upload = multer({ storage: storage }).single("imagen");
        upload(req, res, async function (err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: "Ocurrió un error al subir la imagen",
                    error: err,
                });
            }
    
            try {
                let courseData = req.body;
                if (!courseData.anio) {
                    const now = new Date();
                    courseData.anio = now.getFullYear();
                }
                if (req.file) {
                    courseData.imagen = req.file.filename;
                }
                let course = await DB.Curso.create(courseData);
    
                return res.status(200).json({
                    data: course,
                    status: 200,
                    message: "El curso ha sido creado exitosamente",
                })
            } catch (error) {
                console.error(error);
                return res.status(500).json({
                    message: "Ocurrió un error al crear el curso",
                    error: error,
                });
            }
        })
    },
    

    update: async (req, res) => {
        let id_curso = req.params.id;
        let datos_curso = req.body;
      
        try {
          let curso = await DB.Curso.findOne({ where: { id: id_curso } });
          if (!curso) {
            return res.status(404).json({
              message: "No se encontró el curso con el ID especificado",
            });
          }
      
          let pathCourse = path.join(__dirname, "./../../../../public/images/courses/");
          let storage = multer.diskStorage({
            destination: pathCourse,
            filename: function (req, file, cb) {
              cb(
                null,
                file.fieldname + "-" + Date.now() + "-" + file.originalname
              );
            },
          });
      
          let upload = multer({ storage: storage }).single("imagen");
      
          upload(req, res, async function (err) {
            if (err) {
              console.log(err);
              return res.status(500).json({
                message: "Ocurrió un error al subir la imagen",
                error: err,
              });
            }
      
            try {
              if (req.file) {
                if (curso.imagen) {
                  let pathImagen = path.join(pathCourse, curso.imagen);
                  if (fs.existsSync(pathImagen)) {
                    fs.unlinkSync(pathImagen);
                  }
                }
      
                datos_curso.imagen = req.file.filename;
              }
      
              await DB.sequelize.transaction(async (t) => {
                await curso.update(datos_curso, { transaction: t });
              });
      
              return res.status(200).json({
                message: "El curso ha sido actualizado exitosamente",
              });
            } catch (error) {
              console.error(error);
              return res.status(500).json({
                message: "Ocurrió un error al actualizar el curso",
                error: error,
              });
            }
          });
        } catch (error) {
          console.error(error);
          return res.status(500).json({
            message: "Ocurrió un error al actualizar el curso",
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