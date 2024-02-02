let listaDeNumeroSorteados = [];
let numeroLimite = 10;
let numeracaoSecret = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',
    {rate:1.2});
    
}

function exibirMensagemNovamente() {
    exibirTextoNaTela('h1', 'Jogo do numero secreto');
    exibirTextoNaTela('p', 'Escolha um numero entre 1 e 10');
}

exibirMensagemNovamente();

function verificarChute() {
    let chute = document.querySelector('input').value; 
    if (chute == numeracaoSecret) {
        exibirTextoNaTela('h1' , 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas );
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeracaoSecret) {
            exibirTextoNaTela('p', 'O numero secreto é menor');
        } else {
            exibirTextoNaTela('p', 'O numero secreto é maior');
        }
        tentativas ++ 
        limparCampo()
    }
}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumeroSorteados.length;

    if (quantidadeDeElementosNaLista  == 3) {
        listaDeNumeroSorteados = []; 
    }

    if (listaDeNumeroSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio()
    } else {
        listaDeNumeroSorteados.push(numeroEscolhido);
        console.log(listaDeNumeroSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; 
}


function reiniciarJogo() {
    numeracaoSecret = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemNovamente();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}