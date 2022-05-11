//variavel global usada pra dois metodos diferentes
//limpar tela e construção de tabela
var j = 0;
var res = document.body.querySelector("#resultado");



//função que faz a requisição do Json
function fazGetFaltas(url) {
    /* recebendo todos os parametros no momento de digitação antes de fazer a requisição para receber o arquivo JSON */
    var cidade = document.querySelector("#cidade").value
    var dataInicio = document.querySelector("#dataInicio").value
    var dataFim = document.querySelector("#dataFim").value
    var operador = document.querySelector("#operador").value

    /* concatenando todas as informações passadas no link */
    url += "cidade=" + cidade + "&" + "dtIni=" + dataInicio + "&" + "dtFim=" + dataFim + "&" + "operador=" + operador;
    if (operador == 1) {
        let request = new XMLHttpRequest()
        request.open("GET", url, false)
        request.send()

        return request.responseText
    } else {
        alert("operador invalido")
        res.innerHTML = "<h1>valor de operador invalido experimente utilizar numero 1</h1>"

    }

}

//codigo sera reaproveitado em outras situações 
function formatJson() {
    //variaval data recebend função fazGet para atender as requisiçoes de acesso ao Json

    //let data = fazGet("http://10.45.0.22/WebService1.asmx/Faltas?cidade=BRUMADINHO&dtIni=2022-01-01&dtFim=2022-01-28&operador=1");
    let data = fazGetFaltas("http://10.45.0.22/WebService1.asmx/Faltas?")

    //Apos a requisição atribuição feita em usuarios
    let usuarios = data




    //essa parte feita para formatação do json, para cortar os espaços que invalidavam o mesmo
    var resultadoEspaco = usuarios.split("[");
    let teste = resultadoEspaco[1]
    var resultadoEspaco2 = teste.split("]");
    let teste2 = resultadoEspaco2[0]
    let a = teste2
    let b = "["
    let c = "]"
    b += a
    b += c
        //no final variavel JsonFormatado recebe o json formatado da variavel B
    JsonFormatado = JSON.parse(b)

}




//função utilizada para pesquisa dentro do array a informação pedida
function buscar() {

    //chamando formatJson para passar os parametros

    if ((document.querySelector("#cidade").value == "") && (document.querySelector("#dataInicio").value === "") &&
        (document.querySelector("#dataFim").value == "") && (document.querySelector("#operador").value == "")) {
        document.querySelector("#info").innerHTML = "Voce precisa digitar todos os parametros"
    } else {
        document.querySelector("#info").innerHTML = ""
        formatJson()
            //variavel utilizada com jquery para pegar id da div do texto
        var texto = document.body.querySelector("#texto").value;

        //condição para campo de digitação
        if (texto == "") {



        } else {
            // converte em array e elimina espaços indesejados nas bordas
            // e converte para minúsculo, pare evitar o case sensitive
            var texto_array = texto.split(",").map(function(i) {

                return i.trim().toUpperCase();
            });

            //converte o json, retirando todas os espaços em brancos para realizar a busca
            var resultado = JsonFormatado.filter(function(e) {

                return ~texto_array.indexOf(e.NomePaciente.trim().toUpperCase());

            });






            // imprimime todas as informaçoes dentro da tabela com o resultado da pesquisa
            // res = document.body.querySelector("#resultado");
            res.innerHTML = "<thead>" + "<tr>" + "<td>" + "<h5>Codigo da Operadora</h5>" + "</td>" +
                "<td>" + "<h5>Nome do paciente</h5>" + "</td>" + "<td>" + "<h5>Descrição do procedimento</h5>" + "</td>" +
                "<td>" + "<h5>Comparecimento</h5>";
            for (var item of resultado) {
                j++

                res.innerHTML += "</td>" +
                    "</tr>" + "</thead>" + "<tr>" + "<td>" + item.CodigoOperadora + "</td>" +
                    "<td>" + item.NomePaciente + "</td>" + "<td>" + item.DescricaoProcedimento + "</td>" + "<td>" + item.Comparecimento + "</td>" +

                    "</tr>";
                document.querySelector("#numeroFaltasCliente").innerHTML = "O numero de faltas do " + item.NomePaciente + "é: " + j +
                    "pacientes que faltaram" + item.NomePaciente

            }
            j = 0;
        }


    }


}


//Função que retorna a quantidade de faltas
function NumeroFaltas() {
    formatJson()


    //variavl criada para comparação e realizar contagem
    var falta = "Mostrar"

    /* condição que recebe a variavel */
    if (falta == falta) {

        /* contador para devolver numero total de faltas */
        for (var i = 0; i < JsonFormatado.length; i++) {

            if (JsonFormatado[i].Comparecimento === "N") {

                document.querySelector("#numeroFaltas").innerHTML = "Numero de faltas total nesse periodo é de: " + i


            }

        }


    }


}

/* function limpar() {
    res.innerHTML = "";


} */

//função e variavel criada para mostrar horas na pagina
var myVar = setInterval(Tempo, 1000);

function Tempo() {

    var d = new Date(),
        displayDate;
    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
        displayDate = d.toLocaleTimeString('pt-BR');
    } else {
        displayDate = d.toLocaleTimeString('pt-BR', { timeZone: 'America/Belem' });
    }
    document.getElementById("demo").innerHTML = displayDate;
}


/* Função para chamar um modal de regras na pagina principal da aba Faltas */

$(window).on('load', function() {
    $('#modalCarregamento').modal('show');
});
/* ================================================================================================================== */
/* ====================================FIM FUNÇOES PARA UTILZIZAÇÃO DO LINK FALTAS=================================== */
/* ================================================================================================================== */


/* Começando funçoes para outros links começando com agendamento  */

function fazGetAgendamento72(url) {
    /* recebendo todos os parametros no momento de digitação antes de fazer a requisição para receber o arquivo JSON */
    var cidade = document.querySelector("#cidade").value
    var dataInicio = document.querySelector("#dataInicio").value
    var dataFim = document.querySelector("#dataFim").value


    /* concatenando todas as informações passadas no link */
    url += "cidade=" + cidade + "&" + "dtIni=" + dataInicio + "&" + "dtFim=" + dataFim + "&" + "operador=";

    let request = new XMLHttpRequest()
    request.open("GET", url, false)
    request.send()

    return request.responseText


}

/* formatação para json vindo do agendamento72 */
function formatJsonAgendamento() {
    //variaval data recebend função fazGet para atender as requisiçoes de acesso ao Json

    //let data = fazGet("http://10.45.0.22/WebService1.asmx/Faltas?cidade=BRUMADINHO&dtIni=2022-01-01&dtFim=2022-01-28&operador=1");
    let data = fazGetAgendamento72("http://10.45.0.22/WebService1.asmx/Faltas?")

    //Apos a requisição atribuição feita em usuarios
    let usuarios = data




    //essa parte feita para formatação do json, para cortar os espaços que invalidavam o mesmo
    var resultadoEspaco = usuarios.split("[");
    let teste = resultadoEspaco[1]
    var resultadoEspaco2 = teste.split("]");
    let teste2 = resultadoEspaco2[0]
    let a = teste2
    let b = "["
    let c = "]"
    b += a
    b += c
        //no final variavel JsonFormatado recebe o json formatado da variavel B
    JsonFormatado = JSON.parse(b)

}


/* função de busca para mostrar resultados no agendamento72 */

function buscar() {

    //chamando formatJson para passar os parametros

    if ((document.querySelector("#cidade").value == "") && (document.querySelector("#dataInicio").value === "") &&
        (document.querySelector("#dataFim").value == "")) {
        document.querySelector("#info").innerHTML = "Voce precisa digitar todos os parametros"
    } else {
        document.querySelector("#info").innerHTML = ""
        formatJsonAgendamento()
            //variavel utilizada com jquery para pegar id da div do texto
        var texto = document.body.querySelector("#texto").value;

        //condição para campo de digitação
        if (texto == "") {



        } else {
            // converte em array e elimina espaços indesejados nas bordas
            // e converte para minúsculo, pare evitar o case sensitive
            var texto_array = texto.split(",").map(function(i) {

                return i.trim().toUpperCase();
            });

            //converte o json, retirando todas os espaços em brancos para realizar a busca
            var resultado = JsonFormatado.filter(function(e) {

                return ~texto_array.indexOf(e.NomePaciente.trim().toUpperCase());

            });






            // imprimime todas as informaçoes dentro da tabela com o resultado da pesquisa
            // res = document.body.querySelector("#resultado");
            res.innerHTML = "<thead>" + "<tr>" + "<td>" + "<h5>Codigo da Operadora</h5>" + "</td>" +
                "<td>" + "<h5>Nome do paciente</h5>" + "</td>" + "<td>" + "<h5>Descrição do procedimento</h5>" + "</td>" +
                "<td>" + "<h5>Comparecimento</h5>";
            for (var item of resultado) {
                j++

                res.innerHTML += "</td>" +
                    "</tr>" + "</thead>" + "<tr>" + "<td>" + item.CodigoOperadora + "</td>" +
                    "<td>" + item.NomePaciente + "</td>" + "<td>" + item.DescricaoProcedimento + "</td>" + "<td>" + item.Comparecimento + "</td>" +

                    "</tr>";
                document.querySelector("#numeroFaltasCliente").innerHTML = "O numero de faltas do " + item.NomePaciente + "é: " + j +
                    "pacientes que faltaram" + item.NomePaciente

            }
            j = 0;
        }


    }


}