module.exports = function (sequelize, dataTypes) {
    let alias = "Usuario";

    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        email: {
            type: dataTypes.STRING
        },
        nickname: {
            type: dataTypes.STRING
        },
        password: {
            type: dataTypes.STRING
        },
        rol: {
            type: dataTypes.STRING
        },
    };

    let config = {
        tableName: "usuario",
        timestamps: false
    }
    let Usuario = sequelize.define(alias, cols, config);

    Usuario.associate = (models) => {
        Usuario.hasMany(models.Alumno, {
            as:"alumno",
            foreignKey: "id_usuario"
        }) 
    }

    return Usuario;
}