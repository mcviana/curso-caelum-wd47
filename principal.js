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
  
    $("#novoCartao-conteudo").val($(cartao).text().trim());
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

        adicionaCartao(conteudo, "");

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

$("#busca").on("input", function(){
    //guarda o valor digitado, removendo espacos extras
    var busca = $(this).val().trim();

    if(busca.length){
        $(".cartao").hide().filter(function(){
            return $(this).find(".cartao-conteudo")
                          .text()
                          .match(new RegExp(busca, "i"));
        }).show();
    }else{
        $(".cartao").show();
    }
});

$("#ajuda").click(function(){
    $.getJSON("https://ceep.herokuapp.com/cartoes/instrucoes",
        function(res){
            console.log(res);

            res.instrucoes.forEach(function(instrucao){
                adicionaCartao(instrucao.conteudo, instrucao.cor);
            });
    });
});

function adicionaCartao(conteudo, cor){
    contador ++;

    var botaoRemove = $("<button>").addClass("opcoesDoCartao-remove")
                                   .attr("data-ref", contador)
                                   .text("")
                                   .click(removeCartao);

    var botaoEdita = $("<button>").addClass("opcoesDoCartao-edita")
                                   .attr("data-ref", contador)
                                   .text("")
                                   .click(editaCartao);                                
    
    var opcoes = $("<div>").addClass("opcoesDoCartao")
                         .append(botaoRemove)
                         .append(botaoEdita);

    var tipoCartao = decideTipoCartao(conteudo);

    var conteudoTag = $("<p>").addClass("cartao-conteudo")
                              .append(conteudo);

    $("<div>").attr("id","cartao_"+ contador)
            .addClass ("cartao")
            .addClass (tipoCartao)
            .append (opcoes)
            .append (conteudoTag)
            .css("background-color",cor)
            .prependTo(".mural");
                            


}

$("#sync").click(function(){

    $("#sync").click(function(){
        $("#sync").removeClass("botaoSync--sincronizado");
        $("#sync").removeClass("botaoSync--esperando");
    })

    var cartoes = [];

    $(".cartao").each(function(){
        var cartao = {};
        cartao.conteudo=$(this).find(".cartao-conteudo").html();
        cartoes.push(cartao);
    });

    //escolha seu nome de usuario aqui
    var mural = {
        usuario: "teste123@caelum.com.br"
        ,cartoes: cartoes
    }

    $.ajax({
        url: "https://ceep.herokuapp.com/cartoes/salvar"
        ,method: "POST"
        ,data: mural
        ,success: function(res){
            $("#sync").addClass("botaoSync--sincronizado");
            console.log(res.quantidade + " cartoes salvos em " + res.usuario);
        }
        ,error: function(){
            $("#sync").addClass("botaoSync--deuRuim");
            console.log("Nao foi possivel salvar o murual");
        }
        ,complete: function(){
            $("#sync").removeClass("botaoSync--esperando");
        }
    });
});

