let minuto = 0;
let segundo = 0;

const minutoSpan = document.getElementById("minuto");
const segundoSpan = document.getElementById("segundo");

let cron;

export const startCronometro = () => {
    pauseCronometro();
    cron = setInterval(() => {
        timer();
    }, 1000);
};

export const pauseCronometro = () => {
    clearInterval(cron);
};

export const resetCronometro = () => {
    minuto = 0;
    segundo = 0;
    minutoSpan.innerText = "00";
    segundoSpan.innerText = "00";
};

export const returnTempoCronometro = () => {
    return formatData(minuto) + ":" + formatData(segundo);
};

const timer = () => {
    if ((segundo += 1) == 60) {
        segundo = 0;
        minuto++;
    }
    if (minuto == 60) {
        minuto = 0;
    }
    minutoSpan.innerText = formatData(minuto);
    segundoSpan.innerText = formatData(segundo);
};

const formatData = (input) => {
    return input > 9 ? input : `0${input}`;
};
