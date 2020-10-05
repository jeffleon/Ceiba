const moment = require('moment');

module.exports = (sequelize, type) =>{
    return sequelize.define('pagos',{
        documentoIdentificacionArrendatario: {
            type: type.INTEGER,
            unique: true,
            allowNull: false,                               
        },
        codigoInmueble: {
            type: type.STRING,
            unique: true,
            allowNull: false
        },
        fechaPago: {
            type: type.DATE,              
          get() {
                return moment(this.getDataValue('fechaPago')).format('DD/MM/YYYY');
            }
        },
        valorPagado: type.INTEGER
    })
}