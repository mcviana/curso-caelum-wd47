function variavelLocal(){
    var primeira = "rafa";
    console.log(primeira);
}

var segundaGlobal = "rafaGlobal";

function variavelGlobal(){
    var segundaLocal = "rafaLocal";
    console.log(segundaLocal + " - " + segundaGlobal);
}

function variavelLocalSoQueNao(){
    terceiraLocal = "local"; //Quando nao colocamos o 'var' a variavel declarada eh criada da maneira global.
    console.log(terceiraLocal);
}

function variavelNaoDeclarada(){
    console.log(quarta);
}

function variavelSemHosting(){
    var quinta;
    console.log(quinta); //undefined
}

function variavelComHosting(){ //o js declara a sua variavel em primeiro lugar dentro da funcao
    console.log(sexta); //undefined
    var sexta;
}

function variavelComHostingAtribuindoValor(){ //carrega a variavel primeiro mas o atributo mantem no local escrito
    console.log(setima);
    var setima = "rafaHosting";
}

function variavelOndeElaDeveriaEstar(){
    console.log(oitava);
    let oitava = "rafa"; //o comando let limita a declaracao da variavel no contexto onde ela deveria estar
}

var modificador = (function (){
    var meuTeste;
    function altera (novo){
        meuTeste = novo;
        console.log ("Novo Valor " + meuTeste);
    }
    return altera;
})();