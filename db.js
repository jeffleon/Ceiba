const Sequelize = require('sequelize');

const PagosModel = require('./models/pagos');

const sequelize = new Sequelize('pruebaingresoceiba', 'CEIBA', 'CEIBA', {
    host: 'localhost',
    dialect: 'mysql'
});

const Pagos = PagosModel(sequelize, Sequelize);
sequelize.sync({force: false}).then(()=>{
    console.log('Tablas Syncronizadas');
})


module.exports = { Pagos }