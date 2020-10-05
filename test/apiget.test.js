const { ExpectationFailed } = require('http-errors');
const fetch = require('node-fetch')

test('show all pays', async ()=>{
    const obj = [{ 
        "documentoIdentificacionArrendatario": 103694610,
        "codigoInmueble": "8810", 
        "valorPagado": 100000, 
        "fechaPago": "2018-07-03" 
       },{
       "documentoIdentificacionArrendatario": 103694609,
       "codigoInmueble": "8809", 
       "valorPagado": 100000, 
       "fechaPago": "2018-07-07" 
      }]
    await fetch("http://localhost:8084/api/create/pagos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj[0]),
    });
    await fetch("http://localhost:8084/api/create/pagos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj[1]),
    });
    const response = await fetch("http://localhost:8084/api/pagos");
    const json = await response.json();
    expect(response.status).toBe(200);
})


test('show if do the request good', async ()=>{
    const obj = [{ 
        "documentoIdentificacionArrendatario": 103694610,
        "codigoInmueble": "8810", 
        "valorPagado": 100000, 
        "fechaPago": "2018/07/03" 
       },{
       "documentoIdentificacionArrendatario": 103694609,
       "codigoInmueble": "8809", 
       "valorPagado": 100000, 
       "fechaPago": "2018/07/07" 
    }]
    await fetch("http://localhost:8084/api/create/pagos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj[0]),
    });
    await fetch("http://localhost:8084/api/create/pagos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj[1]),
    });
    const objresp = [{ 
        "documentoIdentificacionArrendatario": 103694610,
        "codigoInmueble": "8810", 
        "valorPagado": 10000, 
        "fechaPago": "2018/07/03" 
       },{
       "documentoIdentificacionArrendatario": 103694609,
       "codigoInmueble": "8809", 
       "valorPagado": 100000, 
       "fechaPago": "2018/07/07" 
    }]
    const response3 = await fetch("http://localhost:8084/api/pagos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objresp[0]),
    });
    const response4 = await fetch("http://localhost:8084/api/pagos",{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(objresp[1]),
    });
    console.log(response3.text);
    console.log(response4.text);
    expect(response3.text).toBe(`gracias por tu abono, sin embargo recuerda que te hace falta pagar 900000`);
    expect(response4.text).toBe("gracias por pagar todo tu arriendo");
})