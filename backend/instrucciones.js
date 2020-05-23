

/**
 * El objetivo de esta API es proveer las funciones necesarias para la construcción de operaciones e instrucciones.
 */



 const estructuras = {





	//---------------------------------------//
	//--------------ENCABEZADOS--------------//
	//---------------------------------------//

	//-------inicio-------
	encabezadoInicio: function(contenido,tipo,caso){
		if(caso==1){
			return{
				inicio: contenido,
				imports: tipo
			}
		}
		else if(caso==2){
			return{
				inicio: contenido,
				clases: tipo
			}
		}
	},


	//-----cuerpo

	encabezadoCuerpo:function(contenido,tipo,caso){
		if(caso==1){
			return{
				cuerpo: contenido,
				metodos: tipo
			}
		}
		else if(caso==2){
			return{
				cuerpo: contenido,
				declaracion: tipo
			}
		}
	},

	//-----tipado

	encabezadoTipado:function(antes,contenido,mas){
		return{
			tipado: antes,
			instrucciones: contenido,
			returnp: mas
		}
	},

	//----void

	
	encabezadoVoid: function(contenido,instrucciones,retorno){
		return{
			void: contenido,
			instrucciones: instrucciones,
			return: retorno
		}
	},

	//----metodos

	
	encabezadoMetodos(listado){
		return{
			listaparametros: listado,
			PARDER: ""
		}	
	},

	//----lista parametros

	encabezadoListaParametros:function(contenido,tipo,identificador){
		return{
			listaparametros: contenido,
			tipos: tipo,
			IDENTIFICADOR: identificador
		}
	},


	//---declaracionp

	encabezadoDeclaracionP: function(cuerpo,identificador){
		return{
			declaracionp: cuerpo,
			COMA: ",",
			IDENTIFICADOR: identificador
		}
	},

	//------instrucciones

	encabezadoInstrucciones(inst,contenido,caso){
		switch(caso){
			case 1:
				return{
					instrucciones: inst,
					asignacion: contenido
				}
			case 2:
				return{
					instrucciones: inst,
					declaracion: contenido
				}
			case 3:
				return{
					instrucciones: inst,
					if: contenido
				}
			case 4:
				return{
					instrucciones: inst,
					while: contenido
					
				}
			case 5:
				return{
					instrucciones: inst,
					for: contenido
					
				}
			case 6:
				return{
					instrucciones: inst,
					dowhile: contenido
				}
			case 7:
				return{
					instrucciones: inst,
					switch: contenido
				}
			case 8:
				return{
					instrucciones: inst,
					llamarmetodos: contenido
				}
			case 9:
				return{
					instrucciones: inst,
					imprimir: contenido
				}
		}
	},

	//-----bucle
	encabezadoBucle:function(contenido,instrucciones,mas){
		return{
			bucle: contenido,
			instrucciones: instrucciones,
			ciclo: mas
		}
	},


	//-----break
	encabezadoBreak:function(contenido,instrucciones,reservada){
		return{
			break: contenido,
			instrucciones: instrucciones,
			breakp: reservada
		}
	},

	



	//---------------------------------------//
	//---------------DEFINICIONES------------//
	//---------------------------------------//

	nuevoInicio:function(contenido,caso){
		if(caso==1){
			return{
				imports: contenido
			}
		}
		else if(caso==2){
			return{
				clases: contenido
			}
		}
	},

	nuevoCuerpo:function(contenido,caso){
		if(caso==1){
			return{
				metodos: contenido
			}
		}
		else if(caso==2){
			return{
				declaracion: contenido
			}
		}
	},

	


	nuevoClase:function(nombre,cuerpo){
		return {
			RCLASS: "class",
			IDENTIFICADOR: nombre,
			LLAVIZQ: "{",
			cuerpo_clases: cuerpo,
			LLAVDER: "}"
		}
	},

	nuevoImport:function(clase){
		return{
			RIMPORT: "import",
			IDENTIFICADOR: clase
		}
	},

	nuevoMetodoMain: function(contenido){
		return{
			RVOID: "void",
			RMAIN: "main",
			PARIZQ: "(",
			PARDER: ")",
			LLAVIZQ: "{",
			void: contenido,
			LLAVDER: "}"
		}
	},

	nuevoMetodoTipo: function(tipo,identificador,param,contenido,retorno,expresion,mas){
		return{
			tipos: tipo,
			IDENTIFICADOR: identificador,
			PARIZQ: "(",
			metodosp: param,
			PARDER: ")",
			LLAVIZQ: "{",
			instrucciones: contenido,
			RRETURN: "return",
			expresion: expresion,
			PTCOMA: ";",
			tipado: mas,
			LLAVDER: "}"	
		}
	},

	nuevoMetodoVoid: function(identificador,param,contenido){
		return{
			RVOID: "void",
			IDENTIFICADOR: identificador,
			PARIZQ: "(",
			metodosp: param,
			PARDER: ")",
			LLAVIZQ: "{",
			void: contenido,
			LLAVDER: "}"
		}
	},

	nuevoTipado:function(contenido,retorno){
		return{
			instrucciones: contenido,
			returnp: retorno
		}
	},

	nuevoReturnP:function(contenido){
		return{
			RRETURN: "return",
			expresion: mas,
			PTCOMA: ";"
		}
	},

	nuevoTipos:function(tipo){
		if(tipo=="int"){
			return{
				RINT: tipo
			}
		}
		else if(tipo=="booelan"){
			return{
				RBOOLEAN:tipo
			}
		}
		else if(tipo=="String"){
			return{
				RSTRING: tipo
			}
		}
		else if(tipo=="char"){
			return{
				RCHAR: tipo
			}
		}
		return{
			RDOUBLE: tipo
		}
	},


	nuevoDeclaracion: function(declaracionp,declaracionpp){
		return{
			declaracionp: declaracionp,
			declaracionpp: declaracionpp
		}
	},

	nuevoDeclaracionP: function(tipo,identificador){
		return{
			tipos: tipo,
			IDENTIFICADOR: identificador
		}
	},

	nuevoDeclaracionPP:function(contenido){
		return{
			IGUAL: "=",
			expresion: contenido
		}
	},



	nuevoMetodosP:function(){
		return{
		PARDER: ")"
		}
	},



	nuevoListaParametros:function(tipo,identificador){
		return{
			tipos: tipo,
			IDENTIFICADOR: identificador
		}
	},

	nuevoVoid: function(contenido,retorno){
		return{
			instrucciones: contenido,
			return: retorno
		}
	},


	nuevoBucle:function(contenido,reservada){
		return{
			instrucciones: contenido,
			ciclo: reservada
		}
	},

	
	nuevoBreak:function(contenido,mas){
		return{
			instrucciones: contenido,
			breakp: mas
		}
	},

	nuevoBreakP:function(){
		return{
			RBREAK: "break"
		}
	},

	nuevoBreakP:function(contenido,caso){
		if(caso==1){
			return{
				RRETURN: "return",
				expresion: contenido
			}
		}
		else{
			return{
				RRETURN: "return",
			}
		}

	},





	nuevoCiclo:function(caso){
		if(caso==1){
			return{
				RBREAK: tipo
			}
		}
		else if(caso==2){
			return{
				RCONTINUE:tipo
			}
		}
		return{
			RRETURN: tipo
		}
	},

	nuevoCiclo:function(contenido,caso){
		return{
			RRETURN: "return",
			expresion: contenido
		}
	},


	nuevoReturn:function(){
		return{
			RRETURN: "return",
			PTCOMA: ";"
		}
	},

	
	
	nuevoInstrucciones:function(contenido,caso){
		switch(caso){
			case 1:
				return{
					asignacion: contenido
				}
			case 2:
				return{
					declaracion: contenido
				}
			case 3:
				return{
					if: contenido
				}
			case 4:
				return{
					while: contenido
					
				}
			case 5:
				return{
					for: contenido
				}
			case 6:
				return{
					dowhile: contenido
				}
			case 7:
				return{
					switch: contenido
				}
			case 8:
				return{
					llamarmetodos: contenido
				}
			case 9:
				return{
					imprimir: contenido
				}
		}
	},
	


	nuevoAsignacion:function(identificador,contenido){
		return{
			IDENTIFICADOR: identificador,
			expresion: contenido
		}
	},


	nuevoBinario:function(izquierdo,terminal,derecho){
		
		switch(terminal){
			case "+":
				return{
					izquierda: izquierdo,
					MAS: terminal,
					derecha: derecho
				}
			case "-":
				return{
					izquierda: izquierdo,
					MENOS: terminal,
					derecha: derecho
				}
			case "*":
				return{
					izquierda: izquierdo,
					POR: terminal,
					derecha: derecho
				}
			case "/":
				return{
					izquierda: izquierdo,
					DIVIDIDO: terminal,
					derecha: derecho
				}
			case "!=":
				return{
					izquierda: izquierdo,
					NOIG: terminal,
					derecha: derecho
				}
			case ">=":
				return{
					izquierda: izquierdo,
					MAYQUE: terminal,
					derecha: derecho
				}
			case "<=":
				return{
					izquierda: izquierdo,
					MENIGQUE: terminal,
					derecha: derecho
				}
			case "<":
				return{
					izquierda: izquierdo,
					MENQUE: terminal,
					derecha: derecho
				}
			case ">":
				return{
					izquierda: izquierdo,
					MAYQUE: terminal,
					derecha: derecho
				}
			case "&&":
				return{
					izquierda: izquierdo,
					AND: terminal,
					derecha: derecho
				}
			case "||":
				return{
					izquierda: izquierdo,
					OR: terminal,
					derecha: derecho
				}
			case "^":
				return{
					izquierda: izquierdo,
					POTENCIA: terminal,
					derecha: derecho
				}
			case "%":
				return{
					izquierda: izquierdo,
					MODULO: terminal,
					expresion: derecho
				}
			case "==":
				return{
					izquierda: izquierdo,
					DOBLEIG: terminal,
					expresion: derecho
				}
			
		}
	},

	nuevoUnario:function(terminal,contenido){
		switch(terminal){
			case "-":
				return{
					MENOS: "-",
					expresion: contenido,
				}
			case "--":
				return{
					expresion: contenido,
					DECREMENTO: "--"
				}
			case "++":
				return{
					expresion: contenido,
					INCREMENTO: "++"
				}
			case "!":
				return{
					expresion: contenido,
					NOT: "!"
				}	
		}
	},

	nuevoParentesis:function(contenido){
		return{
			PARIZQ: "(",
			expresion: contenido,
			PARDER: ")"
		}
	},

	nuevoDato:function(contenido,caso){
		switch(caso){
			case 1:
				return{
					NUMERO: contenido
				}
			case 2:
				return{
					DECIMAL: contenido
				}
			case 3:
				return{
					CADENA: contenido
				}
			case 4:
				return{
					BOOELANO: contenido	
				}
			case 5:
				return{
					IDENTIFICADOR: contenido	
				}
			case 6:
				return{
					CHAR: contenido
				}				
		}
	},

	nuevoLlamarMetodos:function(identificador,contenido){
		return{
			IDENTIFICADOR: identificador,
			PARIZQ: "(",
			llamarmetodosp: contenido
		}
	},

	nuevoLlamarMetodosP: function(contenido){
		return{
			llamarlistaparametros: contenido,
			PARDER: ")"
		}
	},

	nuevoLlamarMetodosP: function(){
		return{
			PARDER: ")"
		}
	},

	nuevoLlamarListaParametros:function(listado,contenido){
		return{
			llamarlistaparametros: listado,
			COMA: ",",	
			expresion: contenido
		}
	},

	nuevoLlamarListaParametros:function(contenido){
		return{
			expresion: contenido
		}
	},


	nuevoIf:function(condicion,contenido,mas){
		return{
			RIF: "if",
			PARIZQ: "(",
			expresion: condicion,
			PARDER: ")",
			LLAVIZQ: "{",
			break: contenido,
			LLAVDER: "}",
			elseif: mas
		}
	},

	nuevoElseIf:function(mas){
		return{
			RELSE: "else",
			elseifp: mas
		}
	},

	nuevoElseIfP:function(condicion,contenido,mas){
		return{
			RIF: "if",
			PARIZQ: "(",
			expresion: condicion,
			PARDER: ")",
			LLAVIZQ: "{",
			break: contenido,
			LLAVDER: "}",
			elseif: mas
		}
	},

	nuevoElseIfP:function(contenido){
		return{
			LLAVIZQ: "{",
			instrucciones: contenido,
			LLAVDER: "}"
		}
	},

	nuevoWhile:function(condicion,contenido){
		return{
			RWHILE: "while",
			PARIZQ: "(",
			expresion: condicion,
			PARDER: ")",
			LLAVIZQ: "{",
			bucle: contenido,
			LLAVDER: "}"
		}
	},

	nuevoFor:function(dec,condicion,despues,contenido){
		return{
			RFOR: "for",
			PARIZQ: "(",
			fordec: dec,
			PTCOMA: ";",
			condicion: condicion,
			PTCOMA: ";",
			expresion: despues,
			PARDER: ")",
			LLAVIZQ: "{",
			bucle: contenido,
			LLAVDER: "}"
		}
	},

	nuevoDoWhile:function(contenido,condicion){
		return{
			RDO: "do",
			LLAVIZQ: "{",
			bucle: contenido,
			LLAVDER: "}",
			RWHILE: "while",
			PARIZQ: "(",
			expresion: condicion,
			PARDER: ")",
		}
	},

	nuevoImprimirLn:function(contenido){
		return{
			RSYSTEM: "System",
			PUNTO: ".",
			ROUT: "out",
			PUNTO: ".",
			RPRINTLN: "println",
			PARIZQ: "(",
			imprimirp: contenido,
			PARDER: ")",
		}
	},

	nuevoImprimir:function(contenido){
		return{
			RSYSTEM: "System",
			PUNTO: ".",
			ROUT: "out",
			PUNTO: ".",
			RPRINT: "print",
			PARIZQ: "(",
			imprimirp: contenido,
			PARDER: ")",
		}
	},

	nuevoImprimirP:function(contenido){
		return{
			expresion: contenido
		}
	},

	nuevoSwitch:function(condicion,contenido){
		return{
			RSWITCH: "switch",
			PARIZQ: "(",
			expresion: condicion,
			PARDER: ")",
			LLAVIZQ: "{",
			case: contenido,
			LLAVDER: "}"
		}
	},

	nuevoCase:function(condicion,contenido,mas,despues){
		return{
			RCASE: "case",
			expresion: condicion,
			DOSPTS: ":",
			break: contenido,
			casep: mas,
			default: despues
		}
	},

	nuevoCase:function(contenido){
		return{
			default:contenido
		}
	},

	nuevoCaseP:function(antes,condicion,contenido){
		return{
			casep: antes,
			RCASE: "case",
			expresion: condicion,
			DOSPTS: ":",
			break: contenido,
		}
	},

	nuevoCaseP:function(condicion,contenido){
		return{
			RCASE: "case",
			expresion: condicion,
			DOSPTS: ":",
			break: contenido,
		}
	},

	nuevoDefault(contenido){
		return{
			RDEFAULT: "default", 
			DOSPTS: ":",
			instrucciones: contenido,
			RBREAK: "break",
			PTCOMA: ";"
		}
	},

	
}


	//---------------------------------------//
	//---------------ERRORES-----------------//
	//---------------------------------------//



var errorLexico=[];
let errores={
	LEXICO: errorLexico
}

var errorSintactico=[];
let temp={
	SINTACTICO: errorSintactico
}

const registrarError={
	nuevoError:function(linea,columna,contenido){
		//console.log("heey!")	
		errorLexico.push({
				Tipo: "Léxico",
				Linea: linea,
				Columna: columna,
				Descripcion: "El caracter "+contenido+" no pertenece al lenguaje"
		})
		//console.log(errores)
	}
}
const registrarSintactico={
	nuevoError:function(linea,columna,contenido,encontrado){
		//console.log("heey!")	
		errorSintactico.push({
				Tipo: "Sintáctico",
				Linea: linea,
				Columna: columna,
				Descripcion: "Se esperaba "+contenido+" se encontró "+encontrado
		})
		//console.log(errores)
	}
}
const vaciarArreglos={
	vaciar:function(){
		errores.LEXICO.length=0;
		temp.SINTACTICO.length=0;
	//	this.errorSintactico=[]
	}
}
// Exportamos nuestras constantes y nuestra API


module.exports.estructuras = estructuras;
module.exports.errores = errores;
module.exports.temp = temp;
module.exports.vaciarArreglos = vaciarArreglos;
module.exports.registrarError=registrarError;
module.exports.registrarSintactico=registrarSintactico