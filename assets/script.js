// Array com todos os temas e palavras
const temas = [
  {
    display: "Países",
    palavras: [
      {
        nome: "ALEMANHA",
        letras: 8,
      },
      {
        nome: "ANGOLA",
        letras: 6,
      },
      {
        nome: "ARGENTINA",
        letras: 9,
      },
      {
        nome: "BAHAMAS",
        letras: 7,
      },
      {
        nome: "BENIM",
        letras: 5,
      },
      {
        nome: "BRASIL",
        letras: 6,
      },
      {
        nome: "CAMBOJA",
        letras: 7,
      },
      {
        nome: "CATAR",
        letras: 5,
      },
      {
        nome: "CHILE",
        letras: 5,
      },
      {
        nome: "CHINA",
        letras: 5,
      },
      {
        nome: "CHIPRE",
        letras: 6,
      },
      {
        nome: "CONGO",
        letras: 5,
      },
      {
        nome: "CUBA",
        letras: 4,
      },
      {
        nome: "DINAMARCA",
        letras: 9,
      },
      {
        nome: "EGITO",
        letras: 5,
      },
      {
        nome: "EQUADOR",
        letras: 7,
      },
      {
        nome: "ESPANHA",
        letras: 7,
      },
      {
        nome: "FILIPINAS",
        letras: 9,
      },
      {
        nome: "GANA",
        letras: 4,
      },
      {
        nome: "GUIANA",
        letras: 6,
      },
      {
        nome: "HAITI",
        letras: 5,
      },
      {
        nome: "HONDURAS",
        letras: 8,
      },
      {
        nome: "IRAQUE",
        letras: 6,
      },
      {
        nome: "IRLANDA",
        letras: 7,
      },
      {
        nome: "ISRAEL",
        letras: 6,
      },
      {
        nome: "JAMAICA",
        letras: 7,
      },
      {
        nome: "MALDIVAS",
        letras: 8,
      },
      {
        nome: "MARROCOS",
        letras: 8,
      },
      {
        nome: "NEPAL",
        letras: 5,
      },
      {
        nome: "NORUEGA",
        letras: 7,
      },
      {
        nome: "PARAGUAI",
        letras: 8,
      },
      {
        nome: "PERU",
        letras: 4,
      },
      {
        nome: "PORTUGAL",
        letras: 8,
      },
      {
        nome: "RUANDA",
        letras: 6,
      },
      {
        nome: "SENEGAL",
        letras: 7,
      },
      {
        nome: "SINGAPURA",
        letras: 9,
      },
      {
        nome: "SURINAME",
        letras: 8,
      },
      {
        nome: "TAIWAN",
        letras: 6,
      },
      {
        nome: "TURQUIA",
        letras: 7,
      },
      {
        nome: "UGANDA",
        letras: 6,
      },
      {
        nome: "URUGUAI",
        letras: 7,
      },
      {
        nome: "VATICANO",
        letras: 8,
      },
      {
        nome: "VENEZUELA",
        letras: 9,
      },
    ],
  },
  { display: "Frutas" },
  { display: "Animais" },
];

const divMenu = document.querySelector("#menu");
const divGame = document.querySelector("#game");

// Lista os temas disponíveis dentro do modal 'modalTemas'.
const temasList = document.querySelector("#temasList");
temas.forEach((tema) => {
  const temaLi = document.createElement("li");
  temaLi.innerText = tema;

  temasList.appendChild(temaLi);
});

// Lista os temas disponíveis dentro do modal 'modalChooseTema'.
const chooseTemasList = document.querySelector("#chooseTemasList");
temas.forEach((tema) => {
  const temaLi = document.createElement("button");
  temaLi.classList.add("temaOption");
  temaLi.innerText = tema.display;

  // Esconde o menu e mostra a div do jogo
  temaLi.addEventListener("click", () => {
    divMenu.setAttribute("hidden", "true");
    divGame.removeAttribute("hidden");
    startGame(tema);
  });
  chooseTemasList.appendChild(temaLi);
});

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

// Evento pra abrir modal 'modalTemas' ao clicar no botão 'btnTemas'.
const btnTemas = document.querySelector("#btnTemas");
btnTemas.addEventListener("click", () => {
  showModal("modalTemas");
});

// Evento pra abrir modal 'modalChooseTema' ao clicar no botão 'btnStartGame'.
const btnStartGame = document.querySelector("#btnStartGame");
btnStartGame.addEventListener("click", () => {
  showModal("modalChooseTema");
});

// Função pra iniciar o jogo
const startGame = (tema) => {
  //Gera um índice aleatório
  const itemIndex = Math.floor(Math.random() * tema.palavras.length);
  //Pega uma palavra aleatória
  const palavra = tema.palavras[itemIndex];

  //Coloca o tema no display para o usuário.
  const temaDisplay = document.querySelector("#palavraTema");
  temaDisplay.innerText = "Tema: " + tema.display;

  // Cria a quantidade de inputs necessário de acordo com a palavra
  const letrasDisplay = document.querySelector("#palavraSoletrada");
  for (let i = 0; i < palavra.letras; i++) {
    const inputLetra = document.createElement("input");
    // O input precisa estar desabilitado
    inputLetra.setAttribute("disabled", "true");
    inputLetra.classList.add("letra");
    letrasDisplay.appendChild(inputLetra);
  }
};

// Cria os buttons pro usuário escolher a letra.
const letrasOptions = document.querySelector(".letrasOption");
letras.forEach((letra) => {
  const letraBtn = document.createElement("button");
  letraBtn.innerText = letra;
  letrasOptions.appendChild(letraBtn);
});
const letras = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
