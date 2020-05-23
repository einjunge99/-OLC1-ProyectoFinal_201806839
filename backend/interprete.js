var fs = require('fs'); 
var parser = require('./gramatica');

//--------------------------------------------------------------------------//
//-------------------------------OBJETOS------------------------------------//
//--------------------------------------------------------------------------//


function Variable(nombre,tipo){
   this.nombre=nombre;
   this.tipo=tipo;
   this.copia=false;
}


function Metodo(nombre,retorno){
   this.nombre=nombre;
   this.retorno=retorno;
   this.copia=false;
   this.parametros=[];
   this.variables=[];
}

function Clase(nombre){
   this.nombre=nombre;
   this.metodos=[];
   this.copia=false;
}

//--------------------------------------------------------------------------//
//-----------------------------------GLOBALES-------------------------------//
//--------------------------------------------------------------------------//

let ast;
let astCopia;

let contClase=0;
let contMetodo=0;
let contVariable=0;
let tipado="";

let primero=[];
let segundo=[];

let erroresLexicos=[]
let erroresSintacticos=[]
let funcionCopia=[]
let claseCopia=[]
let variablesCopia=[]

//const salidaFinal=null

//--------------------------------------------------------------------------//
//---------------------------FLUJO DE APLICACION----------------------------//
//--------------------------------------------------------------------------//
const fuera={
   analizar:function(original,analizar){
         funcionCopia.length=0
         claseCopia.length=0
         variablesCopia.length=0
         primero.length=0
         segundo.length=0
         require('./instrucciones').vaciarArreglos.vaciar();
         ast = parser.parse(original.toString());
         astCopia = parser.parse(analizar.toString());

         erroresLexicos=require('./instrucciones').errores
         erroresSintacticos=require('./instrucciones').temp
         console.log(erroresSintacticos.SINTACTICO.length)
         if(erroresSintacticos.SINTACTICO.length!=0){
            console.log("aca?")
            salidaFinal={
               SINTACTICOS:erroresSintacticos,
               LEXICOS: erroresLexicos,
               CLASES: claseCopia,
               FUNCIONES: funcionCopia,
               VARIABLES: variablesCopia,
               AST: ast
            }
            return{
               salidaFinal
            }
         }
         console.log("heey!");
         clases(ast,primero)
         contClase=0;
         clases(astCopia,segundo)
         contClase=0;
         verificar();
         console.log()

         var encabezado={
            inicio: ast
         }
         salidaFinal={
            SINTACTICOS:erroresSintacticos,
            LEXICOS: erroresLexicos,
            CLASES: claseCopia,
            FUNCIONES: funcionCopia,
            VARIABLES: variablesCopia,
            AST: encabezado
         }
      return{
         salidaFinal
      }
   }
}
module.exports=fuera;

//---el error esta cuando quiero hacer el export...

//--------------------------------------------------------------------------//
//---------------------------FUNCIONES/METODOS------------------------------//
//--------------------------------------------------------------------------//



function verificar(){

   var contCopia=0;



   for(var i in primero){
      var claseActual=primero[i].nombre;
      for(var k in segundo){
         if(segundo[k].nombre==claseActual){
            for(var m in primero[i].metodos){
              var retornoActual=primero[i].metodos[m].retorno;

              for(var p in segundo[k].metodos){

                 var primBandera=primero[i].metodos[m].copia;
                 var secBandera=segundo[k].metodos[p].copia;

                  if(segundo[k].metodos[p].retorno==retornoActual&&!primBandera&&!secBandera){
            
                     var primParam=primero[i].metodos[m].parametros;
                     var secParam=segundo[k].metodos[p].parametros;
                     if(primParam.length==secParam.length){

                        var seguir=true;
                        for(var j in  primParam){
                              if(primParam[j].tipo!=secParam[j].tipo){
                                 seguir=false;
                                 break;
                              }
                        }
                        if(seguir){
//------------------------------------                 
                           for(var r in primero[i].metodos[m].variables){

                              var tipoActual=primero[i].metodos[m].variables[r].tipo;
                              var variableActual=primero[i].metodos[m].variables[r].nombre;

                              for(var s in segundo[k].metodos[p].variables){
                                 var tempTipo=segundo[k].metodos[p].variables[s].tipo
                                 var tempVariable=segundo[k].metodos[p].variables[s].nombre
                                 if(tipoActual==tempTipo&&variableActual==tempVariable){
                                    variablesCopia.push({
                                       clase: segundo[k].nombre,
                                       funcion: segundo[k].metodos[p].nombre,
                                       nombre: variableActual,
                                       tipo: tipoActual

                                    })
                                 }
                              }
                           }

//-----------------------------------
                           segundo[k].metodos[p].copia=true;
                           primero[i].metodos[m].copia=true;
                           var temp=[]
                           for(var aux in secParam){
                              temp.push({
                                 tipo: secParam[aux].tipo,
                                 nombre: secParam[aux].nombre
                              })
                           }
                           funcionCopia.push({
                              clase: segundo[k].nombre,
                              retorno: retornoActual,
                              nombre: segundo[k].metodos[p].nombre,
                              parametros: temp
                           })
                           
                           contCopia++;

                        }

                     }
                  }
              }
            
         }
  
            if(primero[i].metodos.length==contCopia){
               console.log("yeees!")
               segundo[k].copia=true;
               claseCopia.push({
                  nombre: segundo[k].nombre,
                  cantidadFunciones: contCopia
               })
            }
            contCopia=0;
            break;
         }
      }

   }


}

function recorerClases(arr){

   for (var i in arr){
      console.log("----------------------");
      console.log(arr[i].nombre)
      for(var k in arr[i].metodos){
         console.log(" "+arr[i].metodos[k].retorno+" "+arr[i].metodos[k].nombre);
         for(var m in arr[i].metodos[k].parametros){
            console.log("   "+arr[i].metodos[k].parametros[m].tipo+" "+arr[i].metodos[k].parametros[m].nombre);
         }
         for(var m in arr[i].metodos[k].variables){
            console.log("    "+arr[i].metodos[k].variables[m].tipo+" "+arr[i].metodos[k].variables[m].nombre);
         }
      }
      console.log("----------------------");
   }


}

function recorerFinal(arr){

   for (var i in arr){
      console.log("----------------------");
      if(arr[i].copia){
         console.log(arr[i].nombre)
         for(var k in arr[i].metodos){
            if(arr[i].metodos[k].copia){
               console.log(" "+arr[i].metodos[k].retorno+" "+arr[i].metodos[k].nombre);
               for(var m in arr[i].metodos[k].parametros){
                  console.log("   "+arr[i].metodos[k].parametros[m].tipo+" "+arr[i].metodos[k].parametros[m].nombre);
               }
               for(var m in arr[i].metodos[k].variables){
                  console.log("    "+arr[i].metodos[k].variables[m].tipo+" "+arr[i].metodos[k].variables[m].nombre);
               }
            }
         }
      } 
      console.log("----------------------");
   }
}


function clases(ast,arr) {
   for (var i in ast) {
      
      if(i=="clases"){
         
         var nombre=ast[i].IDENTIFICADOR;
         var clase=new Clase(nombre);
         arr.push(clase);
         contClase++;
         metodos(ast[i],arr)
         contMetodo=0;

      }

      if (ast[i] !== null && typeof(ast[i])=="object") {
           clases(ast[i],arr);
      }
   }
}

function metodos(ast,arr) {
   for (var i in ast) {
      
      if(i=="metodos"){
         var nombre=ast[i].IDENTIFICADOR;
         var retorno=ast[i].RVOID;
         if(retorno==undefined){
            for(var k in ast[i]['tipos']){
               retorno=ast[i]['tipos'][k];  
            }
         }
         if(nombre==undefined){
            nombre="main"
         }
         var metodo=new Metodo(nombre,retorno)
         arr[contClase-1].metodos.push(metodo);
         contMetodo++;
         parametros(ast[i],arr);
         variables(ast[i],arr)
      }

      if (ast[i] !== null && typeof(ast[i])=="object") {
           metodos(ast[i],arr);
      }
   }
}

function parametros(ast,arr){
   for (var i in ast) {
      
      if(i=="listaparametros"){
         
         var nombre=ast[i].IDENTIFICADOR;
         var tipado;
         for(var k in ast[i]['tipos']){
            tipado=ast[i]['tipos'][k];  
         }
         var variable=new Variable(nombre,tipado)
         arr[contClase-1].metodos[contMetodo-1].parametros.push(variable);
        
      }

      if (ast[i] !== null && typeof(ast[i])=="object") {
           parametros(ast[i],arr);
      }
   }
}


function variables(ast,arr){
   for (var i in ast) {
      
      if(i=="declaracion"){
         
         tipo(ast[i]);
         listado(ast[i],arr);
        
      }

      if (ast[i] !== null && typeof(ast[i])=="object") {
           variables(ast[i],arr);
      }
   }
}

function listado(ast,arr){
   for (var i in ast) {
      
      if(i=="declaracionp"){
         
         var nombre=ast[i].IDENTIFICADOR;
         var variable=new Variable(nombre,tipado)
         arr[contClase-1].metodos[contMetodo-1].variables.push(variable);

      }

      if (ast[i] !== null && typeof(ast[i])=="object") {
           listado(ast[i],arr);
      }
   }
}

function tipo(ast){

   for (var i in ast) {
      if(i=="tipos"){ 
            for(var k in ast[i]){
               tipado=ast[i][k];  
            }
      }
      if (ast[i] !== null && typeof(ast[i])=="object") {
           tipo(ast[i]);
      }
   }
}
