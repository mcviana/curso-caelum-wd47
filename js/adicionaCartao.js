var adicionaCartao = (function () {

    function removeCartao() {
        var cartao = document.querySelector("#cartao_" + this.dataset.ref);

        //dá uma classe que faz ele sumir devagar
        cartao.classList.add("cartao--some");

        //tira da p[agina depois da animacao
        setTimeout(function () {
            cartao.remove();
        }, 400);

    }

    // adicionando os listener clicks para os botões de remoção
    var botoes = document.querySelectorAll(".opcoesDoCartao-remove");

    for (var i = 0; i < botoes.length; i++) {

        //adiciona o evento em cada botao
        botoes[i].addEventListener("click", removeCartao);
    }

    // adicionando os listener clicks para os botões de edicao
    var botoes = document.querySelectorAll(".opcoesDoCartao-edita");

    for (var i = 0; i < botoes.length; i++) {

        //adiciona o evento em cada botao
        botoes[i].addEventListener("click", editaCartao);
    }

    //criando o contador
    var contador = $(".cartao").length;

    function decideTipoCartao(conteudo) {
        var quebras = conteudo.split("<br>").length;

        var totalDeLetras = conteudo.replace(/<br>/g, " ").length;

        var ultimoMaior = "";

        conteudo.replace(/<br>/g, " ")
            .split(" ")
            .forEach(function (palavra) {
                if (palavra.length > ultimoMaior.length) {
                    ultimoMaior = palavra;
                }
            });

        var tamMaior = ultimoMaior.length;

        //no minimo, todo cartao tem o texto pequeno
        var tipoCartao = "cartao--textoPequeno";

        if (tamMaior < 9 && quebras < 5 && totalDeLetras < 55) {
            tipoCartao = "cartao--textoGrande";
        } else if (tamMaior < 12 && quebras < 6 && totalDeLetras < 75) {
            tipoCartao = "cartao--textoMedio";
        }

        return tipoCartao;

    }

    var contador = 0;

    return function (conteudo, cor) {
        contador++;

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

        $("<div>").attr("id", "cartao_" + contador)
            .addClass("cartao")
            .addClass(tipoCartao)
            .append(opcoes)
            .append(conteudoTag)
            .css("background-color", cor)
            .prependTo(".mural");

    }
})();