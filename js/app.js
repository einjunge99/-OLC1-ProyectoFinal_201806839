//-----------------------------------------------------//
//------------------------EDITORES---------------------//
//-----------------------------------------------------//

var original = ace.edit ('original');
original.setTheme ('ace/theme/terminal');
original.session.setMode ('ace/mode/java');
original.setFontSize ('14px');

var analizar = ace.edit ('analizar');
analizar.setTheme ('ace/theme/katzenmilch');
analizar.session.setMode ('ace/mode/java');
analizar.setFontSize ('14px');

var consola = ace.edit ('consola');
consola.setTheme ('ace/theme/textmate');
consola.session.setMode ('ace/mode/java');
consola.setFontSize ('14px');

//-----------------------------------------------------//
//----------------CARGA ARCHIVOS-----------------------//
//-----------------------------------------------------//

const getOriginal = document.getElementById ('archivo-original');
getOriginal.addEventListener ('change', leerOriginal, false);
const getAnalizar = document.getElementById ('archivo-analizar');
getAnalizar.addEventListener ('change', leerAnalizar, false);

function leerOriginal (e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader ();
  lector.onload = function (e) {
    var contenido = e.target.result;
    original.getSession().setValue(contenido)
  };
  lector.readAsText (archivo);
}

function leerAnalizar (e) {
    var archivo = e.target.files[0];
    if (!archivo) {
      return;
    }
    var lector = new FileReader ();
    lector.onload = function (e) {
      var contenido = e.target.result;
      analizar.getSession().setValue(contenido)
    };
    lector.readAsText (archivo);
  }


//-----------------------------------------------------//
//---------------------FUNCIONES-----------------------//
//-----------------------------------------------------//

function llenarErrores (lexico, sintactico) {
  var myElement = document.getElementById ('cuerpoErrores');
  myElement.innerHTML = '';

  if (lexico.length != 0 || sintactico.length != 0) {
    let value = '';
    let cont = 0;
    value +=
      '<table class="table table-hover">' +
      '<thead>' +
      '<tr>' +
      '<th scope="col">#</th>' +
      '<th scope="col">Tipo error</th>' +
      '<th scope="col">Línea</th>' +
      '<th scope="col">Columna</th>' +
      '<th scope="col">Descripción</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';
    for (var i in lexico) {
      value += '<tr>';
      value += '<th>' + cont + '</th>';
      value += '<th>' + lexico[i].Tipo + '</th>';
      value += '<th>' + lexico[i].Linea + '</th>';
      value += '<th>' + lexico[i].Columna + '</th>';
      value += '<th>' + lexico[i].Descripcion + '</th>';
      value += '</tr>';
      cont++;
    }
    for (var i in sintactico) {
      value += '<tr>';
      value += '<th>' + cont + '</th>';
      value += '<th>' + sintactico[i].Tipo + '</th>';
      value += '<th>' + sintactico[i].Linea + '</th>';
      value += '<th>' + sintactico[i].Columna + '</th>';
      value += '<th>' + sintactico[i].Descripcion + '</th>';
      value += '</tr>';
      cont++;
    }
    value += '</tbody>' + '</table>';

    myElement.innerHTML = value;
  }
}

function llenarClases (clases) {
  let value = '';
  for (var i in clases) {
    value +=
      '<li class="list-group-item d-flex justify-content-between align-items-center">';
    value += clases[i].nombre;
    value +=
      '<span class="badge  badge-pill">Metodos <span class="badge badge-danger badge-pill">';
    value += clases[i].cantidadFunciones;
    value += '</span></span></li>';
  }
  var myElement = document.getElementById ('clasesCopia');
  myElement.innerHTML = '';
  myElement.innerHTML = value;
}

function llenarFunciones (funciones) {
  let value = '';
  for (var i in funciones) {
    value +=
      '<div class="card mb-3">' +
      '<div class="card-body">' +
      '<div class="row">' +
      '<div class="col">' +
      '<h5 class="card-title">' +
      funciones[i].retorno +
      ' ' +
      funciones[i].nombre +
      '</h5>' +
      '<p class="card-text text-muted"> Clase ' +
      funciones[i].clase +
      '</p>' +
      '</div>' +
      '<div class="col">' +
      '<div class="card" style="width: 18rem;">' +
      '<ul class="list-group list-group-flush">';
    for (var k in funciones[i].parametros) {
      value +=
        '<li class="list-group-item">' +
        funciones[i].parametros[k].tipo +
        ' ' +
        funciones[i].parametros[k].nombre +
        '</li>';
    }
    value += '</ul>' + '</div>' + '</div>' + '</div>' + '</div>' + '</div>';
  }
  var myElement = document.getElementById ('funcionesCopia');
  myElement.innerHTML = '';
  myElement.innerHTML = value;
}

function llenarVariables (variables) {
  let value = '';
  for (var i in variables) {
    value +=
      '<div class="card">' +
      '<div class="card-body">' +
      '<div class="row">' +
      '<div class="col">' +
      '<h5 class="card-title">' +
      variables[i].tipo +
      ' ' +
      variables[i].nombre +
      '</h5>' +
      '</div>' +
      '<div class="col">' +
      '<h6 class="card-subtitle mb-2 text-muted"> Clase ' +
      variables[i].clase +
      '</h6>' +
      '<h6 class="card-subtitle mb-2">  Método ' +
      variables[i].funcion +
      '</h6>' +
      '</div>' +
      '</div>' +
      '</div>' +
      '</div>';
  }
  var myElement = document.getElementById ('variablesCopia');
  myElement.innerHTML = '';
  myElement.innerHTML = value;
}

/*

    

          


*/

function test () {
  var a = {
    original: original.getSession ().getValue (),
    analizar: analizar.getSession ().getValue (),
  };

  var url = 'http://localhost:3000/analisis';

  fetch (url, {
    method: 'POST',
    body: JSON.stringify (a),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then (res => res.json ())
    .catch (error => console.error ('Error:', error))
    .then (response => {
      console.log (response);
      var ast = response.salidaFinal.AST;
      var sintactico = response.salidaFinal.SINTACTICOS['SINTACTICO'];
      var lexico = response.salidaFinal.LEXICOS['LEXICO'];
      var clases = response.salidaFinal.CLASES;
      var funciones = response.salidaFinal.FUNCIONES;
      var variables = response.salidaFinal.VARIABLES;
      llenarErrores (lexico, sintactico);
      llenarClases (clases);
      llenarFunciones (funciones);
      llenarVariables (variables);
      if (sintactico.length != 0) {
        ast=undefined;
        //jsonView.format (undefined, '.root');
      }
    
      var test = JSON.stringify (ast, null, '');
      consola.getSession ().setValue (test);
      jsonView.format (ast, '.root');
    });

  /*
   fetch('http://localhost:3000/analisis')
    .then((res) => {
        return res.text();
    })
    .then((data) => {
        jsonView.format(data, '.root');
    })
    .catch((err) => {
        console.log(err);
    })
    
*/
}
