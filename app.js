let listaDeNumerosSorteados = [];
let limiteDeNumeros = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag,texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto,'Brazilian Portuguese Female',{rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1","Jogo do número secreto");
    exibirTextoNaTela("p",`Escolha um número entre 1 e ${limiteDeNumeros}.`);
}

exibirMensagemInicial();
keyChutarComEnter();

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto){
        exibirTextoNaTela("h1","Acertou");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = (`Você descobriu o número secreto em ${tentativas} ${palavraTentativa}.`)
        exibirTextoNaTela("p",mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('botaoChutar').setAttribute('disabled',true);
    } else if (chute > numeroSecreto) {
        exibirTextoNaTela("p",`O numero secreto é menor que ${chute}.`);
    } else {
        exibirTextoNaTela("p",`O numero secreto é maior que ${chute}.`);
    }
    tentativas ++;
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * limiteDeNumeros + 1);
    let quantidadeDeNumerosEscolhidos = listaDeNumerosSorteados.length;
    
    if(quantidadeDeNumerosEscolhidos == limiteDeNumeros){
        listaDeNumerosSorteados = [];
    }
    // verificar se o número já foi escolhido
    if(listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    limparCampo();
    exibirMensagemInicial()
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    document.getElementById('reiniciar').setAttribute('disabled',true);
    document.getElementById('botaoChutar').removeAttribute('disabled');
}

function keyChutarComEnter(){
    let btnEnter = document.querySelector('input');
    btnEnter.addEventListener('keypress',function(event){
        if(event.key === "Enter"){
            event.preventDefault();
            verificarChute();
        }
    });
}
