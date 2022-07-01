import { temas } from "./data.js";
import { startGame, historico } from "./gameScript.js";

const divMenu = document.querySelector("#menu");
const divGame = document.querySelector("#game");

// Função pra abrir os modais.
const showModal = (modalID) => {
    const modal = document.getElementById(modalID);
    if (!modal) return;

    modal.classList.add("show");
    modal.addEventListener("click", (e) => {
        if (e.target.className == "close" || e.target.className == "temaOption") {
            modal.classList.remove("show");
        }
    });
};

// Evento pra abrir modal 'modalChooseTema' ao clicar no botão 'btnStartGame'.
const btnStartGame = document.querySelector("#btnStartGame");
btnStartGame.addEventListener("click", () => {
    showModal("modalChooseTema");
});

const btnHistorico = document.querySelector("#btnHistorico");
btnHistorico.addEventListener("click", () => {
    listarHistorico();
    showModal("modalHistorico");
});

const btnPercentuais = document.querySelector("#btnPercentuais");
btnPercentuais.addEventListener("click", () => {
    percentualGeral();
    showModal("modalPercentual");
});

const btnPercentualEspecifico = document.querySelector("#btnPercentualEspecifico");
btnPercentualEspecifico.addEventListener("click", () => {
    const qtdLetras = prompt(
        "Para verificar o percentual de acertos de palavras com determinada quantidade de letras, digite a quantidade:"
    );
    alert(percentualEspecifico(qtdLetras));
});

// Lista os temas disponíveis dentro do modal 'modalChooseTema'.
const chooseTemasList = document.querySelector("#chooseTemasList");
temas.forEach((tema) => {
    const temaLi = document.createElement("button");
    temaLi.classList.add("temaOption");
    temaLi.innerText = tema.display;

    // Esconde o menu e mostra a div do jogo
    temaLi.addEventListener("click", () => {
        navegarPara("game");
        startGame(tema);
    });
    chooseTemasList.appendChild(temaLi);
});

const percentualGeral = () => {
    const pPercentualGeral = document.querySelector("#percentualAcertoGeral");
    const totalVitorias = historico.filter((jogo) => jogo.resultado === "V").length;
    const percentual = (totalVitorias / historico.length) * 100;

    pPercentualGeral.innerText = "Você ganhou " + percentual + "% e perdeu " + (100 - percentual) + "% dos jogos.";
};

const percentualEspecifico = (qtdLetras) => {
    const totalVitorias = historico.filter((jogo) => jogo.resultado === "V" && jogo.palavra.length == qtdLetras).length;
    const percentual = (totalVitorias / historico.length) * 100;

    return "Você ganhou " + percentual + "% e perdeu " + (100 - percentual) + "% dos jogos.";
};

// Lista o histórico de jogos dentro do modal 'modalHistorico'.
const listarHistorico = () => {
    if (!historico.length) return;
    // numero: ++qtdJogos,
    //         palavra: game.palavra,
    //         resultado: "D",
    //         sugestoes: game.letrasErradas,
    //         tempoConclusao: returnTempoCronometro(),
    const historicoBodyTable = document.querySelector("#historicoBodyTable");

    while (historicoBodyTable.hasChildNodes()) {
        historicoBodyTable.removeChild(historicoBodyTable.firstChild);
    }

    historico.forEach((jogo) => {
        const tdNumero = document.createElement("td");
        tdNumero.innerText = jogo.numero;

        const tdPalavra = document.createElement("td");
        tdPalavra.innerText = jogo.palavra;

        const tdResultado = document.createElement("td");
        tdResultado.innerText = jogo.resultado === "V" ? "Vitória" : "Derrota";

        const tdSugestoes = document.createElement("td");
        tdSugestoes.innerText = jogo.sugestoes;

        const tdTempo = document.createElement("td");
        tdTempo.innerText = jogo.tempoConclusao;

        const trJogo = document.createElement("tr");
        trJogo.appendChild(tdNumero);
        trJogo.appendChild(tdPalavra);
        trJogo.appendChild(tdResultado);
        trJogo.appendChild(tdSugestoes);
        trJogo.appendChild(tdTempo);

        historicoBodyTable.appendChild(trJogo);
    });
};

export const navegarPara = (tela) => {
    switch (tela) {
        case "menu":
            divMenu.removeAttribute("hidden");
            divGame.setAttribute("hidden", "true");
            break;
        case "game":
            divMenu.setAttribute("hidden", "true");
            divGame.removeAttribute("hidden");
    }
};
