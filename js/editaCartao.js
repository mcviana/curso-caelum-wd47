function editaCartao() {
    var cartao = document.querySelector("#cartao_" + this.dataset.ref);
    var cartao_edicao = "#cartao_" + this.dataset.ref;

    $("#novoCartao-conteudo").val($(cartao).text().trim());
    //alert (cartao_edicao);
}
