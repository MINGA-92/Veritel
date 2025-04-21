
//Función para enviar datos por json
const getData = async (route) =>{
    try{
        let res = await fetch(route);
        let json = await res.json();
        if (!res.ok) throw{ status: res.status, statusText: res.statusText };
        return json;
    }catch (error){
        console.error(error);
        Toast.fire({
            icon: 'error',
            title: `Error en getData(): ${(error.status, error.statusText)}`,
        });
    }
};

//Img Soporte 
$("#LoadImg").change(function(event) { 
    var fileInput = document.getElementById("LoadImg");
    var reader = new FileReader(); 
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function() {
        var Imagen= reader.result;
        $("#LoadImgText").text(Imagen);
        $("#LoadImgText").val(Imagen);
    }
});

//Img Soporte UpDate
$("#LoadImg2").change(function(event) { 
    var fileInput = document.getElementById("LoadImg2");
    var reader = new FileReader(); 
    reader.readAsDataURL(fileInput.files[0]);
    reader.onload = function() {
        var Imagen= reader.result;
        $("#LoadImgText2").text(Imagen);
        $("#LoadImgText2").val(Imagen);
    }
});

//Validacion Fecha Nacimiento
$("#InputFecha").change(function(event) {

    var FechaNacimiento= this.value;
    var FechaCompleta= new Date();
    var Dia= FechaCompleta.getDate();
    var Mes= FechaCompleta.getMonth() + 1;
    var Year= FechaCompleta.getFullYear();
    var YearActual= Year.toString();
    var MesActual= Mes.toString();
    var DiaActual= Dia.toString();

    if(MesActual.length <= 1){
        MesActual= '0'+ MesActual;
    }
    var FechaActual= YearActual+'-'+MesActual+'-'+DiaActual;

    if(FechaNacimiento >= FechaActual) {
        Swal.fire({
            icon: 'error',
            title: '🤨 Oops...',
            text: 'La Fecha De Nacimiento No Puede Ser Mayor a La Actual',
            confirmButtonColor: '#2892DB'
        })
    }else{
        console.log("¡Fecha Valida!  😉");
    }

});


//Validacion Telefono
function ValidarTelefono(Telefono){
    if((Telefono.length < 10) || (Telefono.length > 10)){
        Swal.fire({
            icon: 'error',
            title: '🤨 Oops...',
            text: 'Por favor, Revisa El Numero De Telefono',
            confirmButtonColor: '#2892DB'
        })
    }else{
        console.log("¡Telefono Valida!  😉");
        return true;
    }
}

//Validacion Correo
function ValidarCorreo(Correo){
    if (Correo.indexOf('@', 0) == -1 || Correo.indexOf('.', 0) == -1) {
        Swal.fire({
            icon: 'error',
            title: '🤨 Oops...',
            text: '¡El Correo Electrónico No Es Valido!',
            confirmButtonColor: '#2892DB'
        })
    } else {
        console.log('¡Correo Electrónico Valido!');
        return true;
    }
}

//Soporte Campos Vacios
function NotificarCampoVacio(Campo) {
    Swal.fire({
        icon: 'error',
        title: '🤨 Oops...',
        text: 'Se Tiene Que Diligenciar El Campo "'+ Campo +'"',
        confirmButtonColor: '#2892DB'
    })
}

//Funcion Para Validacion De Campos
$("#BtnGuardarAbonado").click(function(){

    let form_data = new FormData();
    var TipoDocu= $("#SelectTipoDocumento").val();
    var Identificacion= $("#InputDocumento").val();
    var NombreCompleto= $("#InputNombreCompleto").val();
    var FechaNacimiento= $("#InputFecha").val();
    var Genero= $("#SelectGenero").val();
    var Telefono= $("#InputTelefono").val();
    var Correo= $("#InputEmail").val();
    var Direccion= $("#InputDireccion").val();
    var Barrio= $("#InputBarrio").val();
    var FrenteSeguridad= $("#SelectFrenteSeguridad").val();
    var Antecedentes= $("#SelectAntecedentes").val();
    var Foto= $("#LoadImgText").val();


    if((TipoDocu == null) || (TipoDocu == "")){
        NotificarCampoVacio("Tipo De Documento");
    }else if((Identificacion == null) || (Identificacion == "")){
        NotificarCampoVacio("Número De Documento");
    }else if((NombreCompleto == null) || (NombreCompleto == "")){
        NotificarCampoVacio("Nombre Completo");
    }else if((FechaNacimiento == null) || (FechaNacimiento == "")){
        NotificarCampoVacio("Fecha De Nacimiento");
    }else if((Genero == null) || (Genero == "")){
        NotificarCampoVacio("Genero");
    }else if((Telefono == null) || (Telefono == "")){
        NotificarCampoVacio("Teléfono");
    }else if((Correo == null) || (Correo == "")){
        NotificarCampoVacio("Correo");
    }else if((Direccion == null) || (Direccion == "")){
        NotificarCampoVacio("Dirección");
    }else if((Barrio == null) || (Barrio == "")){
        NotificarCampoVacio("Barrio");
    }else if((FrenteSeguridad == null) || (FrenteSeguridad == "")){
        NotificarCampoVacio("Frente De Seguridad");
    }else if((Antecedentes == null) || (Antecedentes == "")){
        NotificarCampoVacio("Antecedentes");
    }else if((Foto == null) || (Foto == "")){
        NotificarCampoVacio("Foto De Perfil o Del Documento");
    }else{
        
        if(ValidarTelefono(Telefono)){
            if(ValidarCorreo(Correo)){
                console.log("¡Todo Ok!");
                document.getElementById("BtnGuardarTodo").click();
            }else{
                exit();
            }
        }else{
            exit();
        }
        
    }
});

//Funcion Para Validar Codigo
function ValidarCodigo(IdAbonado){

    console.log("IdAbonado: ", IdAbonado);

    var Ruta= '/Verificar/' + IdAbonado;
    getData(Ruta).then((Respuesta) =>{

        console.log("Respuesta: ", Respuesta);

        Respuesta.forEach(row =>{
            Verificado= row.ABO_VERIFICADO;
            TipoDocu= row.ABO_TIPO_DOCUMENTO;
            Identificacion= row.ABO_DOCUMENTO;
            NombreCompleto= row.ABO_NOMBRE;
            FechaNacimientoI= row. ABO_FECHA_NACIMIENTO;
            Genero= row.ABO_GENERO;
            Telefono= row.ABO_TELEFONO;
            Correo= row.ABO_EMAIL;
            Direccion= row.ABO_DIRECCION;
            Barrio= row.ABO_BARRIO;
            FrenteSeguridad= row.ABO_FRENTE_SEGURIDAD;
            Antecedentes= row.ABO_ANTECEDENTES;
            Foto= row.ABO_FOTO;
        });

        console.log("Verificado: ", Verificado);
        if(Verificado == "0"){
            document.getElementById("InputIdAbonado").value= IdAbonado;
            document.getElementById("btnModalCodigo").click();
        }else{

            console.log("NombreCompleto: ", NombreCompleto);
            document.getElementById("NombreTxt").innerHTML = NombreCompleto;
            document.getElementById("DocumentoTxt").innerHTML = TipoDocu+" . "+Identificacion;
            var FechaNacimiento= FechaNacimientoI.substring(0, 10);
            document.getElementById("FechaTxt").innerHTML = FechaNacimiento;
            document.getElementById("GeneroTxt").innerHTML = Genero;
            
            
            $("#InputTelefono").val(Telefono);
            $("#InputEmail").val(Correo);
            $("#InputDireccion").val(Direccion);
            $("#InputBarrio").val(Barrio);
            $("#TxtFrente").val(FrenteSeguridad);
            $("#TxtAntecedentes").val(Antecedentes);
            $("#LoadImgText2").val(Foto);

            Foto= document.getElementById("LoadImgText2").value;
            $("#ViewFoto").empty();
            if((Foto == null) || (Foto == "")){
                $("#ViewFoto").prop("src", "../img/Sorry_404.png");
            }else{
                $("#ViewFoto").prop("src", Foto);
            }

            document.getElementById("btnModalVer").click();
        }
        
    })
}

//Enviar Codigo a Validar
$("#BtnEnviar").click(function(){
    var Codigo= $("#InputCodigo").val();
    var IdAbonado= $("#InputIdAbonado").val();
    if((Codigo == null) || (Codigo == "")){
        NotificarCampoVacio("Codigo");
    }else{
        
        //Validar Codigo
        var Ruta= '/ValidarCodigo/' + IdAbonado;
        getData(Ruta).then((Respuesta) =>{

            var CodigoConsultado= Respuesta;
            if(Codigo == CodigoConsultado){

                //Actualizar Verificacion
                window.location= '/ActualizarVerificacion/'+IdAbonado;
                Swal.fire({
                    title: ' ¡Verificado!  😁 ',
                    text: ' ¡El Codigo Es Correcto! ',
                    icon: 'success',
                    showConfirmButton: false,
                    confirmButtonColor: '#2892DB',
                    timer: 2000
                }).then(() => {
                    window.location= './';
                })

            }else{

                Swal.fire({
                    icon: 'error',
                    title: ' ¡Falso!  🤨 ',
                    text: ' El Codigo Digitado No Es El Correcto... ',
                    confirmButtonColor: '#2892DB'
                })
            }

        });


    }
})

//PDF Soporte 
$("#BtnPDF").click(function(){
    print();
});
