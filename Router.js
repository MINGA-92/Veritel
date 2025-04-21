
const Conexion= require('./Controller/Conexion');
const express= require('express');
const router= express.Router();


//Redireccion a Ruta Principal
router.get('/', (Peticion, Respuesta)=>{

    //Consulta si existen usuarios registrados
    Conexion.query('SELECT * FROM tbl_abonados', (error, Resultados, fields)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta");
            throw error;
        }else{
            //console.log("Resultados => ", Resultados);
            Respuesta.render('Principal', {Resultados:Resultados});
        };
    });
    
});

//Registrar Nuevo
router.get('/Registrar', (Peticion, Respuesta)=>{
    Respuesta.render('Registrar');
});


//* Listas Desplegables */
//Lista Tipo Documento
router.get('/ConsultarTipoDocumento', (Peticion, Respuesta)=>{
    Consulta= "SELECT EST_DETALLE, EST_DETALLE_2 FROM db_verytel.tbl_estandar WHERE EST_CONSULTA='TipoDocumento' AND EST_ESTADO= 'Activo' ORDER BY ID_ESTANDAR;"
    Conexion.query(Consulta, (error, ResultadosTipoDocumento, fields)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta De Tipo Documento");
            throw error;
        }else{
            //console.log(ResultadosTipoDocumento);
            Respuesta.json(ResultadosTipoDocumento);
        };
    });
});
//Lista Genero
router.get('/ConsultarGenero', (Peticion, Respuesta)=>{
    Consulta= "SELECT EST_DETALLE FROM db_verytel.tbl_estandar WHERE EST_CONSULTA='Genero' AND EST_ESTADO= 'Activo' ORDER BY ID_ESTANDAR;"
    Conexion.query(Consulta, (error, ResultadosGenero, fields)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta De Genero");
            throw error;
        }else{
            //console.log(ResultadosGenero);
            Respuesta.json(ResultadosGenero);
        };
    });
});
//Lista Frente De Seguridad
router.get('/ConsultarFrenteSeguridad', (Peticion, Respuesta)=>{
    Consulta= "SELECT FRE_NOMBRE, FRE_UBICACION FROM db_verytel.tbl_frente_seguridad WHERE FRE_ESTADO= 'Activo' ORDER BY ID_FRENTE;"
    Conexion.query(Consulta, (error, ResultadosFrenteSeguridad, fields)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta De Frente De Seguridad");
            throw error;
        }else{
            //console.log(ResultadosFrenteSeguridad);
            Respuesta.json(ResultadosFrenteSeguridad);
        };
    });
});
//Lista Antecedentes
router.get('/ConsultarAntecedentes', (Peticion, Respuesta)=>{
    Consulta= "SELECT EST_DETALLE FROM db_verytel.tbl_estandar WHERE EST_CONSULTA='Antecedentes' AND EST_ESTADO= 'Activo' ORDER BY ID_ESTANDAR;"
    Conexion.query(Consulta, (error, ResultadosAntecedentes, fields)=>{
        if(error){
            console.log("☠ eRrOr / En La Consulta De Antecedentes");
            throw error;
        }else{
            //console.log(ResultadosAntecedentes);
            Respuesta.json(ResultadosAntecedentes);
        };
    });
});


//Enviando Datos del formulario Para Guardar
const Guardando= require('./Controller/GuardarAbonados');
router.post('/GuardarAbonados', Guardando.GuardarAbonados);


//Reporte De Registro Duplicado
router.get('/Reportar:Documento', (Peticion, Respuesta)=>{
    const Documento= Peticion.params.Documento;
    console.log("Documento Repetido: ", Documento);
    Respuesta.render('ReportarDocumento', {Documento});
});
router.get('/Reporte:Correo', (Peticion, Respuesta)=>{
    const Correo= Peticion.params.Correo;
    console.log("Correo Repetido: ", Correo);
    Respuesta.render('ReportarCorreo', {Correo});
});

//Verificar Abonado
router.get('/Verificar/:IdAbonado', async(Peticion, Respuesta)=>{
    const IdAbonado= Peticion.params.IdAbonado;
    //console.log(IdAbonado);
    Conexion.query("SELECT * FROM db_verytel.tbl_abonados WHERE ID_ABONADO= '"+IdAbonado+"' AND ABO_ESTADO= 'Activo';", (error, Resultados, fields)=>{
        if(error){
            console.log("☠ eRrOr: En La Consulta De Verificacion");
            throw error;
        }else{
            var ResultadoGeneral= Resultados;
            //console.log("ResultadoGeneral: ", ResultadoGeneral);
            Respuesta.json(ResultadoGeneral);
        };
    });
});

//Validar Codigo
router.get('/ValidarCodigo/:IdAbonado', async(Peticion, Respuesta)=>{
    const IdAbonado= Peticion.params.IdAbonado;
    Conexion.query("SELECT ABO_CODIGO FROM db_verytel.tbl_abonados WHERE ID_ABONADO= '"+IdAbonado+"' AND ABO_ESTADO= 'Activo';", (error, Resultados, fields)=>{
        if(error){
            console.log("☠ eRrOr: En La Consulta De Codigo");
            throw error;
        }else{
            var ResultadoGeneral= Resultados;
            var Codigo= ResultadoGeneral[0].ABO_CODIGO;
            //console.log("Codigo: ", Codigo);
            Respuesta.json(Codigo);
        };
    });
    
});

//Actualizar Verificacion
router.get('/ActualizarVerificacion/:IdAbonado', async(Peticion, Respuesta)=>{
    
    const IdAbonado= Peticion.params.IdAbonado;
    Conexion.query("UPDATE db_verytel.tbl_abonados SET ABO_VERIFICADO= '1' WHERE ID_ABONADO= '"+IdAbonado+"';", (error, Resultados, fields)=>{
        if(error){
            console.log("☠ eRrOr: En La Consulta De Actualización");
            throw error;
        }else{
            var ResultadoGeneral= Resultados;
            console.log("ResultadoGeneral: ", ResultadoGeneral);
            //Respuesta.json(Codigo);
        };
    });

})

//Notificar Guarde
router.get('/Notificar', (Peticion, Respuesta)=>{
    Respuesta.render('Notificar');
});
    
//Footer
router.get('/Footer', (Peticion, Respuesta)=>{
    Respuesta.render('footer');
});


module.exports= router;
