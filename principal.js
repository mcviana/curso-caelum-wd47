function mudaLayout(){
    document.querySelector(".mural").classList.toggle("mural--linhas");
}

document.querySelector("#mudaLayout").addEventListener("click", function(){

    // Pega o elemento com a class="mural"
    var mural = document.querySelector(".mural");

    //Tira ou coloca a classe
    mural.classList.toggle("mural-linhas");

    //Muda o texto do botao
    if (mural.classList.contains("mural-linhas")){
        this.textContent = "Blocos";
    } else {
        this.textContent = "Linhas";
    }
});

function removeCartao(){
    var cartao = document.querySelector("#cartao_"+this.dataset.ref);
    
    //dá uma classe que faz ele sumir devagar
    cartao.classList.add("cartao--some");

    //tira da p[agina depois da animacao
    setTimeout(function (){
        cartao.remove();
    },400);

}

function editaCartao(){
    var cartao = document.querySelector("#cartao_"+this.dataset.ref);
    var cartao_edicao = "#cartao_"+this.dataset.ref;
  
    $("#novoCartao-conteudo").val($(cartao).text().replace(/\n/g,""));
    
    //alert (cartao_edicao);
}

// adicionando os listener clicks para os botões de remoção
var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

for (var i=0; i < botoes.length; i++){

    //adiciona o evento em cada botao
    botoes[i].addEventListener("click", removeCartao);
}

// adicionando os listener clicks para os botões de edicao
var botoes = document.querySelectorAll(".opcoesDoCartao-edita");

for (var i=0; i < botoes.length; i++){

    //adiciona o evento em cada botao
    botoes[i].addEventListener("click", editaCartao);
}

//criando o contador
var contador = $(".cartao").length;

$(".novoCartao").submit(function(event){

    //impede que a pagina recarregue
    event.preventDefault();

    //pega o que o usuario digitou
    var campoConteudo = $(".novoCartao-conteudo");
    var conteudo = campoConteudo.val()
                                .trim()
                                .replace(/\n/g,"<br>")
                                .replace("**","<b>");

    //cria os elementos do cartao e adiciona no DOM

    /* Não consigo recuperar o id do cartão que estava sendo alterado
    alert (cartao_edicao); */

    if (conteudo){

        //soma um no contador
        contador++;

        //cria o botao de remover
        var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                        .attr("data-ref", contador)
                                        .text("")
                                        .click(removeCartao);

        //cria o botao de alteracao
        var botaoEdita = $("<button>").addClass("opcoesDoCartao-edita")
                                       .attr("data-ref", contador)
                                       .text("")
                                       .click(editaCartao);   

        //cria a div de opcoes
        var opcoes = $("<div>").addClass("opcoesDoCartao")
                               .append(botaoRemove)
                               .append(botaoEdita);

        //chamada para nova funcao
        var tipoCartao = decideTipoCartao(conteudo);

        var conteudoTag = $("<p>").addClass("cartao-conteudo")
                                  .append(conteudo); 

        //acrescenta o append para colocar a div opcoes no cartao
        $("<div>").attr("id","cartao_" + contador)
                  .addClass("cartao")
                  .addClass(tipoCartao)
                  .append(opcoes)
                  .append(conteudoTag)
                  .prependTo(".mural");

    }

    //apaga o conteudo do text area
    campoConteudo.val("");

});

function decideTipoCartao(conteudo){
    var quebras = conteudo.split("<br>").length;

    var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

    var ultimoMaior = "";

    conteudo.replace(/<br>/g," ")
            .split(" ")
            .forEach(function(palavra){
                if (palavra.length > ultimoMaior.length){
                    ultimoMaior = palavra;
                }
            });
    
    var tamMaior = ultimoMaior.length;

    //no minimo, todo cartao tem o texto pequeno
    var tipoCartao = "cartao--textoPequeno";

    if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
        tipoCartao="cartao--textoGrande";
    } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
        tipoCartao = "cartao--textoMedio";
    }

    return tipoCartao;

}

