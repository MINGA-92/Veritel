
const { render } = require('ejs');
const Conexion= require('./Conexion');
const nodemailer = require("nodemailer");

exports.GuardarAbonados= (Peticion, Respuesta)=>{

    const Data= JSON.stringify(Peticion.body);
    const TipoDocumento= Peticion.body.SelectTipoDocumento;
    const Documento= Peticion.body.InputDocumento;
    const Nombre= Peticion.body.InputNombreCompleto;
    const FechaNacimiento= Peticion.body.InputFecha;
    const Genero= Peticion.body.SelectGenero;
    const Telefono= Peticion.body.InputTelefono;
    const Correo= Peticion.body.InputEmail;
    const Direccion= Peticion.body.InputDireccion;
    const Barrio= Peticion.body.InputBarrio;
    const FrenteSeguridad= Peticion.body.SelectFrenteSeguridad;
    const Antecedentes= Peticion.body.SelectAntecedentes;
    const Foto= Peticion.body.LoadImgText;

    console.log("Data= ", Data);


    //Validacion De Registros Repetidos
    ConsultaDocumento= "SELECT * FROM db_verytel.tbl_abonados WHERE ABO_DOCUMENTO= '"+Documento+"' AND ABO_ESTADO= 'Activo';";
    Conexion.query(ConsultaDocumento, function(error, result){
        if(error){
            console.log("☠ eRrOr / En La Consulta Documento  🚫");
            throw error;
        }else{
            if(result.length > 0) {
                Respuesta.redirect('/Reportar'+Documento);
            }else{
                
                ConsultaCorreo= "SELECT * FROM db_verytel.tbl_abonados WHERE ABO_EMAIL= '"+Correo+"' AND ABO_ESTADO= 'Activo';";
                Conexion.query(ConsultaCorreo, function(error, result){
                    if(error){
                        console.log("☠ eRrOr / En La Consulta Correo  🚫");
                        throw error;
                    }else{
                        if(result.length > 0) {
                            Respuesta.redirect('/Reporte'+Correo);
                        }else{
                            console.log("Generando Codigo...");

                            //Generar Numero o Codigo Aletario
                            var min = 1002;
                            var max = 99998;
                            var Rango = ((max - min) / 2) - 1;
                            var Codigo = 2 * Math.floor(Math.random() * Rango) +1 +min;
                            console.log("Codigo: ", Codigo);
                            
                        
                            //Insertar Datos
                            InsercionSQL= "INSERT INTO tbl_abonados(ABO_TIPO_DOCUMENTO, ABO_DOCUMENTO, ABO_NOMBRE, ABO_FECHA_NACIMIENTO, ABO_GENERO, ABO_EMAIL, ABO_TELEFONO, ABO_DIRECCION, ABO_BARRIO, ABO_FRENTE_SEGURIDAD, ABO_ANTECEDENTES, ABO_CODIGO, ABO_FOTO) VALUES('"+TipoDocumento+"', '"+Documento+"', '"+Nombre+"', '"+FechaNacimiento+"', '"+Genero+"', '"+Correo+"', '"+Telefono+"', '"+Direccion+"', '"+Barrio+"', '"+FrenteSeguridad+"', '"+Antecedentes+"', '"+Codigo+"', '"+Foto+"');";
                            //console.log(InsercionSQL);
                            Conexion.query(InsercionSQL, function(error, result){
                                if(error){
                                    console.log("☠ eRrOr / En La Insercion  🚫");
                                    throw error;
                                }else{
                                    //console.log(result);
                                    console.log('¡Usuario Registrado Con Exito!');

                                    //Enviar Correo
                                    var DatosCorreo= [Nombre, Correo, Codigo];
                                    EnviarCorreoCodigo(DatosCorreo);

                                    Respuesta.redirect('/Notificar');

                                    //Respuesta.redirect('/');
                                }
                            });
                        }
                    }
                });

            }
        }
    });
    
}


//Enviar Correo Codigo 
function EnviarCorreoCodigo(DatosCorreo){

    console.log("Datos: ", DatosCorreo);
    var Nombre= DatosCorreo[0];
    var CorreoDestino= DatosCorreo[1];
    var Codigo= DatosCorreo[2];

    const AppGmail = "Zarabandatear@gmail.com";
    const PassAppGmail = "irmu sujm wovm gzgb";


    // Set up Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: AppGmail,
        pass: PassAppGmail,
      },
    });
    
    // Define a route for sending emails
    const mailOptions = {
      from: AppGmail,
      to: CorreoDestino,
      subject: "Código De Verificación",
      text: Nombre+", Tu código de verificación para el frente de seguridad es: " + Codigo,
    };
    
    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      }
      console.log("Email Eviado: " + info.response);
      //Respuesta.redirect('/');
    });
    
};
