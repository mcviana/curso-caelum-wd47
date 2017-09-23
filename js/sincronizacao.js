(function () {
    var usuario = "teste123@caelum.com.br";

    $.getJSON("https://ceep.herokuapp.com/cartoes/carregar?callback=?", {
            usuario: usuario
        },
        function (res) {
            var cartoes = res.cartoes;
            console.log(cartoes.length + " carregados em " + res.usuario);
            cartoes.forEach(function (cartao) {
             adicionaCartao(cartao.conteudo);
            })
        }
    );

    $("#sync").click(function () {

        $("#sync").click(function () {
            $("#sync").removeClass("botaoSync--sincronizado");
            $("#sync").removeClass("botaoSync--esperando");
        })

        var cartoes = [];

        $(".cartao").each(function () {
            var cartao = {};
            cartao.conteudo = $(this).find(".cartao-conteudo").html();
            cartoes.push(cartao);
        });

        var mural = {
            usuario: usuario,
            cartoes: cartoes
        }

        $.ajax({
            url: "https://ceep.herokuapp.com/cartoes/salvar",
            method: "POST",
            data: mural,
            success: function (res) {
                $("#sync").addClass("botaoSync--sincronizado");
                console.log(res.quantidade + " cartoes salvos em " + res.usuario);
            },
            error: function () {
                $("#sync").addClass("botaoSync--deuRuim");
                console.log("Nao foi possivel salvar o murual");
            },
            complete: function () {
                $("#sync").removeClass("botaoSync--esperando");
            }
        });

    });

})();