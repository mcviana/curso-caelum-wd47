(function () {
    
    $(".novoCartao").submit(function (event) {

        //impede que a pagina recarregue
        event.preventDefault();

        //pega o que o usuario digitou
        var campoConteudo = $(".novoCartao-conteudo");
        var conteudo = campoConteudo.val()
            .trim()
            .replace(/\n/g, "<br>")
            .replace("**", "<b>");

        //cria os elementos do cartao e adiciona no DOM

        /* Não consigo recuperar o id do cartão que estava sendo alterado
        alert (cartao_edicao); */

        if (conteudo) {

            adicionaCartao(conteudo, "");

        }

        //apaga o conteudo do text area
        campoConteudo.val("");

    });

})();