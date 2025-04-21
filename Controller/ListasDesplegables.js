
//Función para consultar Lista TipoDocumento
function ObtenerListaTipoDocumento(){
    getData('/ConsultarTipoDocumento').then((Respuesta) =>{
        ArrayResultado = Respuesta.map((El) => El.EST_DETALLE);
        ArrayResultado_2 = Respuesta.map((El) => El.EST_DETALLE_2);
        //console.log(ArrayResultado);
        Options = "";
        Contador= 0;
        ArrayResultado.forEach(element =>{
            Options += `<option value="${element}">${ArrayResultado_2[Contador]}</option>`
            Contador= Contador + 1;
        });
        document.getElementById("SelectTipoDocumento").innerHTML = Options;
    })
}
ObtenerListaTipoDocumento();


//Función para consultar Lista Genero
function ObtenerListaGenero(){
    getData('/ConsultarGenero').then((Respuesta) =>{
        ArrayResultado = Respuesta.map((El) => El.EST_DETALLE);
        //console.log(ArrayResultado);
        Options = "";
        ArrayResultado.forEach(element =>{
            Options += `<option value="${element}">${element}</option>`
        });
        document.getElementById("SelectGenero").innerHTML = Options;
    })
}
ObtenerListaGenero();


//Función para consultar Lista Frente De Seguridad
function ObtenerListaFrente(){
    getData('/ConsultarFrenteSeguridad').then((Respuesta) =>{
        ArrayResultado = Respuesta.map((El) => El.FRE_UBICACION);
        //console.log(ArrayResultado);
        Options = "";
        ArrayResultado.forEach(element =>{
            Options += `<option value="${element}">${element}</option>`
        });
        document.getElementById("SelectFrenteSeguridad").innerHTML = Options;
    })
}
ObtenerListaFrente();


//Función para consultar Lista Antecedentes
function ObtenerListaAntecedentes(){
    getData('/ConsultarAntecedentes').then((Respuesta) =>{
        ArrayResultado = Respuesta.map((El) => El.EST_DETALLE);
        //console.log(ArrayResultado);
        Options = "";
        ArrayResultado.forEach(element =>{
            Options += `<option value="${element}">${element}</option>`
        });
        document.getElementById("SelectAntecedentes").innerHTML = Options;
    })
}
ObtenerListaAntecedentes();
