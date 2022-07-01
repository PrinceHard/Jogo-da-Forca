import { letras } from "./data.js";
import { navegarPara } from "./script.js";
import { resetCronometro, pauseCronometro, startCronometro, returnTempoCronometro } from "./utils.js";

export const historico = [];
let qtdJogos = 0;

let palavraArray = [];
const game = {
    palavra: null,
    letrasAcertadas: 0,
    letrasErradas: 0,
    totalLetras: 0,
};
const imgForca = document.querySelector("#imgForca");
let srcForca;

const spanLetrasErradas = document.querySelector("#spanLetrasErradas");
const letrasOptions = document.querySelector(".letrasOption");
const letrasDisplay = document.querySelector("#palavraSoletrada");
const limparJogo = () => {
    while (letrasDisplay.hasChildNodes()) {
        letrasDisplay.removeChild(letrasDisplay.firstChild);
    }
    while (letrasOptions.hasChildNodes()) {
        letrasOptions.removeChild(letrasOptions.firstChild);
    }

    spanLetrasErradas.innerText = "";
};

// Função pra iniciar o jogo
export const startGame = (tema) => {
    startCronometro();
    limparJogo();
    gerarOpcoes();
    //Gera um índice aleatório
    const itemIndex = Math.floor(Math.random() * tema.palavras.length);
    //Pega uma palavra aleatória

    const palavra = tema.palavras[itemIndex].nome;
    for (let i = 0; i < palavra.length; i++) {
        palavraArray[i] = palavra.charAt(i);
    }
    game.palavra = palavra;

    //Coloca o tema no display para o usuário.
    const temaDisplay = document.querySelector("#palavraTema");
    temaDisplay.innerText = "Tema: " + tema.display;

    const qtdLetras = tema.palavras[itemIndex].letras;
    // Cria a quantidade de inputs necessário de acordo com a palavra

    for (let i = 0; i < qtdLetras; i++) {
        const inputLetra = document.createElement("input");
        // O input precisa estar desabilitado
        inputLetra.setAttribute("disabled", "true");
        inputLetra.classList.add("letra");
        inputLetra.classList.add(i);
        letrasDisplay.appendChild(inputLetra);
    }
    game.totalLetras = qtdLetras;
    game.letrasErradas = 0;
    game.letrasAcertadas = 0;
    srcForca = "assets/img/" + qtdLetras + "-erros/";
    imgForca.src = srcForca + "inicial.png";
};

// Cria os buttons pro usuário escolher a letra.
const gerarOpcoes = () => {
    letras.forEach((letra) => {
        const letraBtn = document.createElement("button");
        letraBtn.innerText = letra;
        letraBtn.addEventListener("click", () => {
            verificarPalpite(letra);
            letraBtn.setAttribute("disabled", "true");
        });
        letrasOptions.appendChild(letraBtn);
    });
};

export const verificarPalpite = (letra) => {
    let indexPalavra = palavraArray.indexOf(letra);
    if (indexPalavra == -1) {
        errou(letra);
        return;
    }

    acertou(letra, indexPalavra);
};

const errou = (letra) => {
    game.letrasErradas++;
    imgForca.src = srcForca + game.letrasErradas + ".png";
    spanLetrasErradas.innerText += letra;

    if (game.letrasErradas === game.totalLetras) {
        pauseCronometro();
        historico.push({
            numero: ++qtdJogos,
            palavra: game.palavra,
            resultado: "D",
            sugestoes: game.letrasErradas,
            tempoConclusao: returnTempoCronometro(),
        });
        palavraArray = [];
        navegarPara("menu");
        resetCronometro();
    }
};

const acertou = (letra, index) => {
    while (index > -1) {
        game.letrasAcertadas++;
        const inputLetra = document.getElementsByClassName(index)[0];
        inputLetra.value = letra;
        palavraArray[index] = " ";
        index = palavraArray.indexOf(letra);
    }

    if (game.letrasAcertadas === game.totalLetras) {
        pauseCronometro();
        historico.push({
            numero: ++qtdJogos,
            palavra: game.palavra,
            resultado: "V",
            sugestoes: game.letrasErradas + game.letrasAcertadas,
            tempoConclusao: returnTempoCronometro(),
        });
        palavraArray = [];
        navegarPara("menu");
        resetCronometro();
    }
};
