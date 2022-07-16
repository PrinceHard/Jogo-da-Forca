import { temas } from "./data.js";
import { startGame, historico } from "./gameScript.js";

// Pega a div que corresponde ao menu.
const divMenu = document.querySelector("#menu");

// Pega a div que corresponde ao jogo.
const divGame = document.querySelector("#game");

// Função pra abrir os modais.
export const showModal = (modalID) => {
    // Pega o modal de acordo com o id que foi passado como parâmetro.
    const modal = document.getElementById(modalID);

    // Se o modal não foi encontrado, finaliza a função.
    if (!modal) return;

    // Adiciona a classe 'show' ao modal. É essa classe que faz ele ser exibido.
    modal.classList.add("show");

    // Adiciona um EventListener ao modal que espera por um clique no modal.
    modal.addEventListener("click", (e) => {
        // Se o clique for no botão de fechar (X), então retira a classe 'show' do modal.
        if (e.target.className == "close" || e.target.className == "temaOption") {
            modal.classList.remove("show");
        }
    });
};

/* --------------- INICIAR JOGO --------------- */

// Evento pra abrir modal 'modalChooseTema' ao clicar no botão 'btnStartGame'.
const btnStartGame = document.querySelector("#btnStartGame");
btnStartGame.addEventListener("click", () => {
    showModal("modalChooseTema");
});

// Pega a 'ul' que contém os temas a serem escolhidos.
const chooseTemasList = document.querySelector("#chooseTemasList");
temas.forEach((tema) => {
    // Cria um elemnto 'li'
    const temaLi = document.createElement("button");

    // Adicionar a classe 'temaOption'.
    temaLi.classList.add("temaOption");

    // Define o texto do 'li' para ser o tema.
    temaLi.innerText = tema.display;

    // Adiciona um EventListener que aguarda o click do jogador.
    temaLi.addEventListener("click", () => {
        // Navega para o jogo.
        navegarPara("game");

        // Inicia o jogo.
        startGame(tema);
    });

    // Coloca o 'li' dento da ul que armazena todos os temas.
    chooseTemasList.appendChild(temaLi);
});

/* --------------- HISTORICO --------------- */

// Pega o 'button' que deve abrir o modal de histórico de jogos.
const btnHistorico = document.querySelector("#btnHistorico");

// Adiciona um EventListener que aguarda o clique do usuário.
btnHistorico.addEventListener("click", () => {
    // Se não tiver nada no histórico, avisa o jogador e finaliza a execução da função.
    if (!historico.length) {
        alert("Você não jogou nenhuma vez.");
        return;
    }

    // Lista o histórico para o usuário visualizar.
    listarHistorico();

    // Abre o modal que exibe o histórico.
    showModal("modalHistorico");
});

// Lista o histórico de jogos dentro do modal 'modalHistorico'.
const listarHistorico = () => {
    // Pega o corpo da tabela que armazena o histórico de jogos.
    const historicoBodyTable = document.querySelector("#historicoBodyTable");

    // Limpa o corpo da tabela.
    while (historicoBodyTable.hasChildNodes()) {
        historicoBodyTable.removeChild(historicoBodyTable.firstChild);
    }

    // Cria uma linha para cada jogo.
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

/* --------------- PERCENTUAL --------------- */

// Pega o 'button' que deve abrir o modal de histórico de jogos.
const btnPercentuais = document.querySelector("#btnPercentuais");

// Adiciona um EventListener que aguarda o clique do usuário.
btnPercentuais.addEventListener("click", () => {
    // Se não tiver nada no histórico, avisa o jogador e finaliza a execução da função.
    if (!historico.length) {
        alert("Você não jogou nenhuma vez.");
        return;
    }

    // Calcula o percentual geral.
    percentualGeral();

    // Abre o modal para exibir o percentual.
    showModal("modalPercentual");
});

// Função para calcular o percentual geral de vitórias e derrotas do jogador.
const percentualGeral = () => {
    // Pega o 'p' que armazenará o percentual.
    const pPercentualGeral = document.querySelector("#percentualAcertoGeral");

    // Pega a quantidade de jogos que o jogador ganhou.
    const totalVitorias = historico.filter((jogo) => jogo.resultado === "V").length;

    // Divide o total de vitórias pelo total de jogos.
    const percentualVitoria = Math.floor((totalVitorias / historico.length) * 100);

    // Calcula o percentual de derrotas.
    const percentualDerrota = 100 - percentualVitoria;

    // Formata o texto e insere no parágrafo.
    pPercentualGeral.innerText =
        "Você ganhou " + percentualVitoria + "% e perdeu " + percentualDerrota + "% dos jogos.";
};

// Pega o 'button' que deve abrir o modal de percentual de vitórias e derrotas do jogador.
const btnPercentualEspecifico = document.querySelector("#btnPercentualEspecifico");

// Adiciona um EventListener que aguarda o clique do usuário.
btnPercentualEspecifico.addEventListener("click", () => {
    // Solicita a quantidade de letras.
    const qtdLetras = prompt(
        "Para verificar o percentual de acertos de palavras com determinada quantidade de letras, digite a quantidade:"
    );

    if (isNaN(Number(qtdLetras))) return;
    if (!qtdLetras.toString().length) return;

    // Exibe o resultado ao usuário.
    alert(percentualEspecifico(qtdLetras));
});

// Função para abrir prompt e pergunta ao usuário qual o número de letras que ele quer gerar o percentual de vitórias e derrotas.
const percentualEspecifico = (qtdLetras) => {
    // Cria uma array com todos os jogos que possuem a palavra com a quantidade de letras informada.
    const jogosEspecificos = historico.filter((jogo) => jogo.palavra.length == qtdLetras);

    // Se nenhum jogo possui essa quantidade, informa ao jogador.
    if (!jogosEspecificos.length) return "Você não jogou nenhuma vez com uma palavra de " + qtdLetras + " letras.";

    // Pega a quantidade de jogos que o jogador ganhou.
    const totalVitorias = jogosEspecificos.filter((jogo) => jogo.resultado == "V").length;

    // Divide o total de vitórias pelo total de jogos.
    const percentualVitoria = Math.floor((totalVitorias / jogosEspecificos.length) * 100);

    // Calcula o percentual de derrotas.
    const percentualDerrota = 100 - percentualVitoria;

    // Formata e retorna o texto.
    return "Você ganhou " + percentualVitoria + "% e perdeu " + percentualDerrota + "% dos jogos.";
};

/* --------------- NAVEGAÇÃO ---------------- */

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
