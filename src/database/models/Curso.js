module.exports = function (sequelize, dataTypes) {
    let alias = "Curso";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        descripcion: {
            type: dataTypes.STRING
        },
        imagen: {
            type: dataTypes.STRING
        },
        anio: {
            type: dataTypes.INTEGER
        },
        activo: {
            type: dataTypes.BOOLEAN
        }
    };

    let config = {
        tableName: "curso",
        timestamps: false
    }

    let Curso = sequelize.define(alias, cols, config);


    return Curso;
}