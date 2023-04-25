module.exports = function (sequelize, dataTypes) {
    let alias = "Alumno";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        nombre: {
            type: dataTypes.STRING
        },
        apellido: {
            type: dataTypes.STRING
        },
        dni: {
            type: dataTypes.STRING
        },
        id_usuario: {
            type: dataTypes.INTEGER
        },
    };

    let config = {
        tableName: "alumno",
        timestamps: false
    }
    let Alumno = sequelize.define(alias, cols, config);

    Alumno.associate = (models) => {
        Alumno.belongsTo(models.Usuario, {
            as: "usuario",
            foreignKey: "id_usuario"
        })
    }

    return Alumno;
}