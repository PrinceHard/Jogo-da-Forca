import { letras } from "./data.js";
import { navegarPara, showModal } from "./script.js";

// Variável para armazenar o histórico de jogos numa sessão.
export const historico = [];
// Variável para armazenar a quatidade de jogos numa sessão.
let qtdJogos = 0;

// Variável para armazenar a palavra em formato de array, facilitando a manipulação.
let palavraArray = [];

// Variável para armazenar dados de cada jogo.
const game = {
    palavra: null,
    letrasAcertadas: 0,
    letrasErradas: 0,
    totalLetras: 0,
};

// Variável para armazenar o '<img>' da forca.
const imgForca = document.querySelector("#imgForca");
// Variável para definir o path da '<img>' acima.
let srcForca;

// Variável para armazenar o span que guarda todas as sugestões erradas de cada jogo.
const spanLetrasErradas = document.querySelector("#spanLetrasErradas");

// Variável para armazenar a div que guarda todas as letras que o usuário pode sugerir.
const letrasOptions = document.querySelector(".letrasOption");

// Variável para armazenar a div que mostra os inputs a serem preenchidos da palavra sorteada.
const letrasDisplay = document.querySelector("#palavraSoletrada");

// Função para limpar as três variáveis acima.
const limparJogo = () => {
    // Limpa a palavra sorteada (do jogo anterior).
    while (letrasDisplay.hasChildNodes()) {
        letrasDisplay.removeChild(letrasDisplay.firstChild);
    }
    // Limpa as opções do usuário (Para não gerar letras duplicadas).
    while (letrasOptions.hasChildNodes()) {
        letrasOptions.removeChild(letrasOptions.firstChild);
    }

    // Limpa o span que armazena as sugestões erradas do jogador.
    spanLetrasErradas.innerText = "";

    // Limpa a array que armazena a palavra sorteada.
    palavraArray = [];
};

// Função pra iniciar o jogo
export const startGame = (tema) => {
    // Inicia o cronômetro.
    startCronometro();
    // Limpa o jogo antigo.
    limparJogo();
    // Gera as letras que o jogador pode sugerir.
    gerarOpcoes();

    // Gera um índice aleatório
    const itemIndex = Math.floor(Math.random() * tema.palavras.length);

    // Pega uma palavra aleatória
    const palavra = tema.palavras[itemIndex].nome;

    // Coloca a palavra dentro da array que facilitará a manipulação.
    for (let i = 0; i < palavra.length; i++) {
        palavraArray[i] = palavra.charAt(i);
    }

    // Coloca a palavra dentro do objeto 'game' que está armazenando os dados do jogo.
    game.palavra = palavra;

    //Coloca o tema no display para o usuário.
    const temaDisplay = document.querySelector("#palavraTema");
    temaDisplay.innerText = "Tema: " + tema.display;

    const qtdLetras = tema.palavras[itemIndex].letras;
    // Cria a quantidade de inputs necessário de acordo com a palavra
    soletrarPalavras(qtdLetras);

    game.totalLetras = qtdLetras;
    game.letrasErradas = 0;
    game.letrasAcertadas = 0;
    srcForca = "assets/img/" + qtdLetras + "-erros/";
    imgForca.src = srcForca + "inicial.png";
};

const soletrarPalavras = (qtdLetras) => {
    for (let i = 0; i < qtdLetras; i++) {
        // Cria o input que vai armazenar a letra.
        const inputLetra = document.createElement("input");

        // Desabilita o input.
        inputLetra.setAttribute("disabled", "true");

        // Adiciona a classe 'letra' (Para uma futura estilização).
        inputLetra.classList.add("letra");

        // Adiciona a classe equivalente ao index da array, facilitando a busca
        // do input correto quando o jogador acertar a sugestão.
        inputLetra.classList.add(i);

        // Coloca a letra dentro da div que armazena todos os inputs a serem preenchidos.
        letrasDisplay.appendChild(inputLetra);
    }
};

// Cria os buttons com as letras que o usuário pode sugerir.
const gerarOpcoes = () => {
    letras.forEach((letra) => {
        // Cria o 'button' da letra.
        const letraBtn = document.createElement("button");

        // Coloca a letra como texto do 'button';
        letraBtn.innerText = letra;

        // Adiciona um EventListener para aguardar o usuário clicar e verificar se a
        // sugestão é errada ou certa.
        letraBtn.addEventListener("click", () => {
            // Verifica o palpite.
            verificarSugestao(letra);

            // Desabilita o 'button' clicado.
            letraBtn.setAttribute("disabled", "true");
        });

        // Coloca o 'button' dento da div que armazena todas as letras.
        letrasOptions.appendChild(letraBtn);
    });
};

// Função para verificar a sugestão do jogador.
export const verificarSugestao = (letra) => {
    // Se a letra estiver na palavra, o index será retornado.
    // Caso contrário, será retornado -1.
    let indexPalavra = palavraArray.indexOf(letra);
    if (indexPalavra == -1) {
        errou(letra);
        return;
    }

    acertou(letra, indexPalavra);
};

// Função que é executada a cada sugestão errada do jogador.
const errou = (letra) => {
    // Atualiza, no objeto que armazena os dados do jogo, o número de letras que o jogador errou.
    game.letrasErradas++;

    // Troca a imagem da forca para a próxima imagem.
    imgForca.src = srcForca + game.letrasErradas + ".png";

    // Adiciona a sugestão errada no span que armazena todas elas.
    spanLetrasErradas.innerText += letra;

    // Se a quantidade de letrasErradas for igual ao total de letras, o jogo acabou.
    if (game.letrasErradas === game.totalLetras) {
        fimDeJogo("D");
    }
};

// Função que é executada a cada sugestão certa do jogador.
const acertou = (letra, index) => {
    // Podem existir duas letras iguais na palavra, por isso o 'while'.
    while (index > -1) {
        // Atualiza, no objeto que armazena os dados do jogo, o número de letras que o jogador acertou.
        game.letrasAcertadas++;

        // Pega o input que corresponde a letra sugerida.
        const inputLetra = document.getElementsByClassName(index)[0];

        // Define o valor do input para ser igual a letra sugerida.
        inputLetra.value = letra;

        // Retira a palavra da array para não ficar em loop infinito.
        palavraArray[index] = " ";

        // Verifica se existem mais letras iguais a sugestão do jogador.
        index = palavraArray.indexOf(letra);
    }

    // Se a quantidade de letrasAcertadas for igual ao total de letras, o jogo acabou.
    if (game.letrasAcertadas === game.totalLetras) {
        fimDeJogo("V");
    }
};

// Função que finaliza o jogo e exibe os resultados.
const fimDeJogo = (resultado) => {
    // Pausa o cronômetro.
    pauseCronometro();
    // Cria o objeto que armazena o jogo para ser salvo no histórico.
    const jogo = {
        numero: ++qtdJogos,
        palavra: game.palavra,
        resultado: resultado,
        sugestoes: resultado === "V" ? game.letrasErradas + game.letrasAcertadas : game.letrasErradas,
        tempoConclusao: returnTempoCronometro(),
    };
    // Coloca o objeto na array 'historico'
    historico.push(jogo);

    // Pega o 'h2' que corresponde ao título do modal que exibe o resultado.
    const modalTitle = document.querySelector("#resultadoTitulo");

    // Pega o 'p' que corresponde à descrição do modal que exibe o resultado.
    const modalDescricao = document.querySelector("#resultadoDescricao");

    // Formata o texto de acordo com o resultado.
    if (resultado === "V") {
        modalTitle.innerText = "Vitória";
        modalDescricao.innerHTML = "Parabéns! Você acertou a palavra " + jogo.palavra + ".<br>";
    } else {
        modalTitle.innerText = "Derrota";
        modalDescricao.innerHTML = "Ops! Você errou a palavra " + jogo.palavra + ".<br>";
    }

    // Adiciona o número de sugestões ao texto de exibição do resultado.
    modalDescricao.innerHTML += "Você fez " + jogo.sugestoes + " sugestões" + "<br>";

    // Adiciona o tempo de conclusão ao texto de exibição do resultado.
    modalDescricao.innerHTML += "\nVocê levou " + jogo.tempoConclusao + " para finalizar o jogo.";

    // Abre o modal para exibir o resultado.
    showModal("modalResultado");

    // Fecha o jogo e volta para o menu,
    navegarPara("menu");

    // Reinicia o cronômetro
    resetCronometro();
};

// Evento pra abrir modal perguntar ao usuário se ele realmente que desistir ao clicar no botão 'btnDesistir'.
// Se sim, finaliza o jogo.
const btnDesistir = document.querySelector("#btnDesistir");
btnDesistir.addEventListener("click", () => {
    pauseCronometro();
    const desistiu = confirm("Tem certeza que desejar desistir?");
    if (desistiu) {
        resetCronometro();
        navegarPara("menu");
    } else {
        startCronometro();
    }
});

/*Cronômetro*/
let minuto = 0;
let segundo = 0;

// Pega a 'span' que armazenará os minutos.
const minutoSpan = document.getElementById("minuto");

// Pega a 'span' que armazenará os segundos.
const segundoSpan = document.getElementById("segundo");

let cron;

// Limpa o intervalo e cria um novo que executará a função 'timer' a cada 1 segundo.
export const startCronometro = () => {
    pauseCronometro();
    cron = setInterval(() => {
        timer();
    }, 1000);
};

// Limpa o intervalo, evitando que a função 'timer' seja acionada.
export const pauseCronometro = () => {
    clearInterval(cron);
};

// Reseta os valores para 0.
export const resetCronometro = () => {
    minuto = 0;
    segundo = 0;
    minutoSpan.innerText = "00";
    segundoSpan.innerText = "00";
};

// Gera uma string com o tempo do cronômetro formatado.
export const returnTempoCronometro = () => {
    return formatData(minuto) + ":" + formatData(segundo);
};

const timer = () => {
    // A cada verificação, é acrescentado 1 à variável segundo.
    // Quando a variável chegar em 60, é acrescentado 1 à variável minuto.
    if ((segundo += 1) == 60) {
        segundo = 0;
        minuto++;
    }
    // Ao chegar em 60 minutos, o cronômetro para.
    if (minuto == 60) {
        minuto = 59;
        segundo = 59;
        pauseCronometro();
    }
    minutoSpan.innerText = formatData(minuto);
    segundoSpan.innerText = formatData(segundo);
};

// Formata o valor que será exibido ao jogador durante o jogo.
const formatData = (input) => {
    return input > 9 ? input : `0${input}`;
};
