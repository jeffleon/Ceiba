const {Pagos} = require('../db');

exports.paysget = async (req, res) =>{
    try{
        const pagos = await Pagos.findAll()
        res.status(200).json(pagos)
    } catch(e){
        res.status(500).send(e)
    }
    
}

exports.payscreate = async (req, res) =>{
    const pago = await Pagos.findOne({ where: { 
        "documentoIdentificacionArrendatario" : req.body.documentoIdentificacionArrendatario,
        "codigoInmueble": req.body.codigoInmueble,
        } 
    })
    if (pago){
        res.status(400).json(`la id documentoIdentificacionArrendatario ${req.body.documentoIdentificacionArrendatario} ya se encuentra en la base de datos`); 
    } else { 
        const pagos = await Pagos.create(req.body)
        res.status(200).json(pagos);  
    } 
}

exports.payspost = async (req, res) =>{
    var day = req.body.fechaPago.split('/');
    var date = new Date(req.body.fechaPago);
    let result = (parseInt(day[0]) % 2  == 1) ? true : false;
    if ((date instanceof Date && !isNaN(date)));
    {
        if (result === false) {
            res.status(400).send("lo siento pero no se puede recibir el pago por decreto de administración");
        }
    }
    const pago = await Pagos.findOne({ where: { 
        "documentoIdentificacionArrendatario" : req.body.documentoIdentificacionArrendatario,
        "codigoInmueble": req.body.codigoInmueble,
        } 
    })
    if (pago && req.body.valorPagado !== 0) {
      const pagado = await Pagos.update({
            "valorPagado": pago.valorPagado - req.body.valorPagado,
            "fechaPago" : date
          }, {
            where: {
                "documentoIdentificacionArrendatario" : req.body.documentoIdentificacionArrendatario,
                "codigoInmueble": req.body.codigoInmueble,
            }
        });
        if (pago.valorPagado - req.body.valorPagado === 0) {
            res.status(200).json("gracias por pagar todo tu arriendo");
        } else if (pago.valorPagado - req.body.valorPagado !== 0) {
            res.status(200).json(`gracias por tu abono, sin embargo recuerda que te hace falta pagar ${pago.valorPagado - req.body.valorPagado}`);
        }     
    } else if (req.body.valorPagado === 0 && pago) {
        res.status(200).send("ya pagaste tu arriendo");
    } else {
        res.status(404).send("ID no encontrada");
    }
}