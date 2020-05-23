
%lex

%options case-sensitive

%%

\s+											// ignora los espacios en blanco
"//".*										// comentario de linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]			// comentario de multiples lineas	

//while ya esta, solo hay que remplazar ese mientras

"do"                return "RDO"
"while"				return "RWHILE"
"for"               return "RFOR"
"int"               return "RINT"
"double"            return "RDOUBLE"
"boolean"           return "RBOOLEAN"
"char"              return "RCHAR"
"String"            return "RSTRING"
"import"            return "RIMPORT"
"class"             return "RCLASS"
"continue"          return "RCONTINUE"
"void"              return "RVOID"
"System"            return "RSYSTEM"
"out"               return "ROUT"
"println"           return "RPRINTLN"
"main"              return "RMAIN"
"print"             return "RPRINT"
"."                 return "PUNTO"
","                 return "COMA"
"^"                 return "POTENCIA"
"%"                 return "MODULO"
"++"                return "INCREMENTO"
"--"                return "DECREMENTO"
"true"				return "BOOLEANO"
"false"				return "BOOLEANO"
"return"			return "RRETURN"

//------------FIN------------------


"if"				return 'RIF';
"else"				return 'RELSE';
"switch"			return 'RSWITCH';
"case"				return 'RCASE';
"default"			return 'RDEFAULT';
"break"				return 'RBREAK';

":"					return 'DOSPTS';
";"					return 'PTCOMA';
"{"					return 'LLAVIZQ';
"}"					return 'LLAVDER';
"("					return 'PARIZQ';
")"					return 'PARDER';


"&&"				return 'AND'
"||"				return 'OR'
"!"					return 'NOT'

"+"					return 'MAS';
"-"					return 'MENOS';
"*"					return 'POR';
"/"					return 'DIVIDIDO';

"<="				return 'MENIGQUE';
">="				return 'MAYIGQUE';
"=="				return 'DOBLEIG';
"!="				return 'NOIG';

"<"					return 'MENQUE';
">"					return 'MAYQUE';
"="					return 'IGUAL';



\"([^\\\"]|\\.)*\"				{ yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
\'([^\\\"]|\\.)\'				{ yytext = yytext.substr(1,yyleng-2); return 'CHAR'; }
[0-9]+("."[0-9]+)?\b  			return 'DECIMAL';
[0-9]+\b						return 'ENTERO';
([a-zA-Z_])[a-zA-Z0-9_]*		return 'IDENTIFICADOR';


<<EOF>>				return 'EOF';
.					{ registrarError.nuevoError(yylloc.first_line,yylloc.first_column,yytext); }

/lex


%{
	const estructuras	= require('./instrucciones').estructuras;
	const registrarError	= require('./instrucciones').registrarError;
	const registrarSintactico	= require('./instrucciones').registrarSintactico;

%}



%start ini

%% /* Definición de la gramática */
ini
	: inicio EOF 	{return $1}
	| inicio 		{return $1}
;

inicio
	: inicio imports PTCOMA {$$=estructuras.encabezadoInicio($1,$2,1)}
	| inicio clases	 		{$$=estructuras.encabezadoInicio($1,$2,2)}
	| imports PTCOMA		{$$=estructuras.nuevoInicio($1,1)}	
	| clases		 		{$$=estructuras.nuevoInicio($1,2)}		
	| error 				{
								console.log("Se encontro: "+$1);
								registrarSintactico.nuevoError(@1.first_line,@1.first_column,yy.parser.hash.expected,$1); 
							}
	| %empty
;



clases
	: RCLASS IDENTIFICADOR LLAVIZQ cuerpo LLAVDER {$$=estructuras.nuevoClase($2,$4)}
;


cuerpo
     : cuerpo metodos				{$$=estructuras.encabezadoCuerpo($1,$2,1)}
     | cuerpo declaracion PTCOMA 	{$$=estructuras.encabezadoCuerpo($1,$2,2)}
     | metodos						{$$=estructuras.nuevoCuerpo($1,1)}
     | declaracion	PTCOMA			{$$=estructuras.nuevoCuerpo($1,2)}	
	 | %empty
;


imports
	: RIMPORT IDENTIFICADOR	{$$=estructuras.nuevoImport($2)}
;


metodos
	: tipos IDENTIFICADOR PARIZQ metodosp LLAVIZQ instrucciones RRETURN expresion PTCOMA tipado LLAVDER 			{$$=estructuras.nuevoMetodoTipo($1,$2,$4,$6,$7,$8,$10)} 
	| RVOID RMAIN PARIZQ PARDER LLAVIZQ void LLAVDER															{$$=estructuras.nuevoMetodoMain($6)}
	| RVOID IDENTIFICADOR PARIZQ metodosp LLAVIZQ void LLAVDER													{$$=estructuras.nuevoMetodoVoid($2,$4,$6)}
;

tipado
	: tipado instrucciones returnp	{$$=estructuras.encabezadoTipado($1,$2,$3)}
	| instrucciones returnp			{$$=estructuras.nuevoTipado($1,$2)}
;

returnp
	: RRETURN expresion PTCOMA	{$$=estructuras.nuevoReturnP($2)}
	| %empty
;

void
	: void instrucciones return		{$$=estructuras.encabezadoVoid($1,$2,$3)}
	| instrucciones return			{$$=estructuras.nuevoVoid($1,$2)}
;

return
	: RRETURN PTCOMA	{$$=estructuras.nuevoReturn()}
	| %empty
;

metodosp
	: listaparametos PARDER		{$$=estructuras.encabezadoMetodos($1)}
	| PARDER					{$$=estructuras.nuevoMetodosP()}
;

listaparametos
	: listaparametos COMA tipos IDENTIFICADOR	{$$=estructuras.encabezadoListaParametros($1,$3,$4)}
	| tipos IDENTIFICADOR						{$$=estructuras.nuevoListaParametros($1,$2)}
;


instrucciones
	: instrucciones asignacion PTCOMA		{$$=estructuras.encabezadoInstrucciones($1,$2,1)}
	| instrucciones declaracion PTCOMA		{$$=estructuras.encabezadoInstrucciones($1,$2,2)}
	| instrucciones if				{$$=estructuras.encabezadoInstrucciones($1,$2,3)}
	| instrucciones while			{$$=estructuras.encabezadoInstrucciones($1,$2,4)}
	| instrucciones for				{$$=estructuras.encabezadoInstrucciones($1,$2,5)}
	| instrucciones dowhile	PTCOMA		{$$=estructuras.encabezadoInstrucciones($1,$2,6)}
	| instrucciones switch			{$$=estructuras.encabezadoInstrucciones($1,$2,7)}
	| instrucciones llamarmetodos PTCOMA	{$$=estructuras.encabezadoInstrucciones($1,$2,8)}
	| instrucciones imprimir PTCOMA		{$$=estructuras.encabezadoInstrucciones($1,$2,9)}
	| asignacion PTCOMA					{$$=estructuras.nuevoInstrucciones($1,1)}
	| declaracion PTCOMA			{$$=estructuras.nuevoInstrucciones($1,2)}
	| if							{$$=estructuras.nuevoInstrucciones($1,3)}
	| while							{$$=estructuras.nuevoInstrucciones($1,4)}
	| for							{$$=estructuras.nuevoInstrucciones($1,5)}
	| dowhile PTCOMA					{$$=estructuras.nuevoInstrucciones($1,6)}
	| switch						{$$=estructuras.nuevoInstrucciones($1,7)}
	| llamarmetodos	PTCOMA				{$$=estructuras.nuevoInstrucciones($1,8)}
	| imprimir	PTCOMA					{$$=estructuras.nuevoInstrucciones($1,9)}
	| %empty

;


asignacion
	: IDENTIFICADOR IGUAL expresion	{$$=estructuras.nuevoAsignacion($1,$3)}	
;


declaracion
    : declaracionp declaracionpp	{$$=estructuras.nuevoDeclaracion($1,$2)}	
;

declaracionp
    : declaracionp COMA IDENTIFICADOR	{$$=estructuras.encabezadoDeclaracionP($1,$3)}
    | tipos IDENTIFICADOR 				{$$=estructuras.nuevoDeclaracionP($1,$2)}		
;

declaracionpp
    : IGUAL expresion	{$$=estructuras.nuevoDeclaracionPP($2)}
	| %empty
;

expresion
	: expresion MAS expresion		{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion MENOS expresion		{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion POR expresion		{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion DIVIDIDO expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion NOIG expresion		{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion MAYQUE expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion	MAYIGQUE expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion MENIGQUE expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion MENQUE expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion AND expresion		{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion OR expresion		{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion POTENCIA expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion MODULO expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| expresion DOBLEIG expresion	{$$=estructuras.nuevoBinario($1,$2,$3)}
	| MENOS expresion				{$$=estructuras.nuevoUnario($1,$2)}
	| NOT expresion					{$$=estructuras.nuevoUnario($1,$2)}
	| expresion INCREMENTO			{$$=estructuras.nuevoUnario($2,$1)}
	| expresion DECREMENTO			{$$=estructuras.nuevoUnario($2,$1)}
	| PARIZQ expresion PARDER		{$$=estructuras.nuevoParentesis($2)}
	| llamarmetodos					{$$=estructuras.nuevoLlamarMetodos($1)}
	| NUMERO						{$$=estructuras.nuevoDato($1,1)}
	| DECIMAL						{$$=estructuras.nuevoDato($1,2)}
	| CADENA						{$$=estructuras.nuevoDato($1,3)}
	| BOOLEANO						{$$=estructuras.nuevoDato($1,4)}
	| IDENTIFICADOR					{$$=estructuras.nuevoDato($1,5)}
	| CHAR							{$$=estructuras.nuevoDato($1,6)}

;




if
	: RIF PARIZQ expresion PARDER LLAVIZQ break LLAVDER elseif	{$$=estructuras.nuevoIf($3,$6,$8)}
;

elseif
	: RELSE elseifp	{$$=estructuras.nuevoElseIf($2)}
	| %empty
;

elseifp
	: RIF PARIZQ expresion PARDER LLAVIZQ break LLAVDER elseif	{$$=estructuras.nuevoElseIf($3,$6,$8)}
	| LLAVIZQ break LLAVDER										{$$=estructuras.nuevoElseIf($2)}
;


while
    : RWHILE PARIZQ expresion PARDER LLAVIZQ bucle LLAVDER	{$$=estructuras.nuevoWhile($3,$6)}
;

for
	: RFOR PARIZQ fordec PTCOMA expresion PTCOMA expresion PARDER LLAVIZQ bucle LLAVDER {$$=estructuras.nuevoFor($3,$5,$7,$10)}
;

fordec
	: declaracion 	{$$=estructuras.nuevoDeclaracion($1)}
	| asignacion	{$$=estructuras.nuevoAsignacion($1)}
;

dowhile
	: RDO LLAVIZQ bucle LLAVDER RWHILE PARIZQ expresion PARDER	{$$=estructuras.nuevoDoWhile($3,$7)}
;

imprimir
	: RSYSTEM PUNTO ROUT PUNTO RPRINT PARIZQ imprimirp PARDER	{$$=estructuras.nuevoImprimir($7)}
	| RSYSTEM PUNTO ROUT PUNTO RPRINTLN PARIZQ imprimirp PARDER {$$=estructuras.nuevoImprimirLn($7)}
;


imprimirp
	: expresion		{$$=estructuras.nuevoImprimirP($1)}
	| %empty
;



switch
	: RSWITCH PARIZQ expresion PARDER LLAVIZQ case  LLAVDER	{$$=estructuras.nuevoSwitch($3,$6)}
;

case
	: RCASE expresion DOSPTS break casep default	 {$$=estructuras.nuevoCase($2,$4,$5,$6)} 
	| default							 			 {$$=estructuras.nuevoCase($1)}
;

casep
	: casep RCASE expresion DOSPTS break	{$$=estructuras.nuevoCaseP($1,$2,$5)}
	| RCASE expresion DOSPTS break			{$$=estructuras.nuevoCaseP($2,$4)}								
	| %empty
;
default
	: RDEFAULT DOSPTS instrucciones RBREAK PTCOMA 	{$$=estructuras.nuevoDefault($3)}
	| %empty
;


tipos
    : RINT		{$$=estructuras.nuevoTipos($1)}
    | RBOOLEAN	{$$=estructuras.nuevoTipos($1)}
    | RSTRING	{$$=estructuras.nuevoTipos($1)}
    | RCHAR		{$$=estructuras.nuevoTipos($1)}
    | RDOUBLE	{$$=estructuras.nuevoTipos($1)}
;




llamarmetodos
	:IDENTIFICADOR PARIZQ llamarmetodosp {$=estructuras.nuevoLlamarMetodos($1,$3)}	
;

llamarmetodosp
    : llamarlistaparametros PARDER 	{$=estructuras.nuevoLlamarMetodosP($1)}
	| PARDER						{$=estructuras.nuevoLlamarMetodosP()}
;

llamarlistaparametros
	: llamarlistaparametros COMA expresion	{$=estructuras.nuevoLlamarListaParametros($1,$3)}
	| expresion								{$=estructuras.nuevoLlamarListaParametros($1)}	
;


bucle
	: bucle instrucciones ciclo		{$$=estructuras.encabezadoBucle($1,$2,$3)}
	| instrucciones ciclo			{$$=estructuras.nuevoBucle($1,$2)}
;

break
	: break instrucciones breakp	{$$=estructuras.encabezadoBreak($1,$2,$3)}
	| instrucciones breakp 			{$$=estructuras.nuevoBreak($1,$2)}
;

breakp	
	: RBREAK PTCOMA				{$$=estructuras.nuevoBreakP()}
	| RRETURN PTCOMA				{$$=estructuras.nuevoBreakP($1,0)}
	| RRETURN expresion PTCOMA		{$$=estructuras.nuevoBreakP($2,1)}
	| %empty
;

ciclo
	: RBREAK PTCOMA			{$$=estructuras.nuevoCiclo(1)}
	| RCONTINUE PTCOMA				{$$=estructuras.nuevoCiclo(2)}
	| RRETURN PTCOMA				{$$=estructuras.nuevoCiclo(3)}
	| RRETURN expresion PTCOMA		{$$=estructuras.nuevoCiclo($2,0)}
	| %empty
;


