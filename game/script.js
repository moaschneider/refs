const animais = [
    { especie: "rato", codigo: "RA", nivel: 1, cor: "vermelho", posicao: "A3" },
    { especie: "rato", codigo: "RA", nivel: 1, cor: "azul", posicao: "G7" },
    { especie: "gato", codigo: "GA", nivel: 2, cor: "vermelho", posicao: "F2" },
    { especie: "gato", codigo: "GA", nivel: 2, cor: "azul", posicao: "B8" },
    { especie: "cachorro", codigo: "CA", nivel: 3, cor: "vermelho", posicao: "E3" },
    { especie: "cachorro", codigo: "CA", nivel: 3, cor: "azul", posicao: "C7" },
    { especie: "lobo", codigo: "LO", nivel: 4, cor: "vermelho", posicao: "B2" },
    { especie: "lobo", codigo: "LO", nivel: 4, cor: "azul", posicao: "F8" },
    { especie: "onça", codigo: "ON", nivel: 5, cor: "vermelho", posicao: "C3" },
    { especie: "onça", codigo: "ON", nivel: 5, cor: "azul", posicao: "E7" },
    { especie: "tigre", codigo: "TI", nivel: 6, cor: "vermelho", posicao: "G1" },
    { especie: "tigre", codigo: "TI", nivel: 6, cor: "azul", posicao: "A9" },
    { especie: "leão", codigo: "LE", nivel: 7, cor: "vermelho", posicao: "A1" },
    { especie: "leão", codigo: "LE", nivel: 7, cor: "azul", posicao: "G9" },
    { especie: "elefante", codigo: "EL", nivel: 8, cor: "vermelho", posicao: "G3" },
    { especie: "elefante", codigo: "EL", nivel: 8, cor: "azul", posicao: "A7" },
];

const renderizarTabuleiro = () => {
    animais.forEach(animal => {
        const quadrante = document.getElementById(animal.posicao);
        quadrante.textContent = animal.codigo;
        quadrante.classList.add(animal.especie);
        quadrante.classList.add(animal.cor);
    });
    
};

renderizarTabuleiro();

const checkQuadrante = document.querySelectorAll('td');

for (let i = 0; i < checkQuadrante.length; i++){
    checkQuadrante[i].addEventListener('click', () => {
        const quadranteSelecionado = checkQuadrante[i].id;
        jogada(quadranteSelecionado);
    })
}

const apagarQuadrantesPossiveis = () => {
    checkQuadrante.forEach((n) => {
        n.classList.remove('possibilidade');
    });
};

let clickCheck = 0;
let clickDe = "XX";
let clickPara = "YY";
let temp = "";
let corAnimalDe = "";
let corAnimalPara = "";
let time1 = {};
let time2 = {};
let indiceTime1 = "";
let indiceTime2 = "";
let casasPossiveis = [];

const jogada = (casa) => {
    apagarQuadrantesPossiveis();
    
    const animalNaCasa = animais.find(animal => animal.posicao === casa);
    const estaOcupada = animalNaCasa === undefined ? false : true;
    const indiceNoArray = animais.indexOf(animalNaCasa); 
    
    if (clickCheck === 0){
        
        if (!estaOcupada) return;
        
        clickDe = document.getElementById(casa);
        time1 = estaOcupada ? {...animalNaCasa} : "";
        indiceTime1 = indiceNoArray;

        casasPossiveis = quadrantesPossiveis(casa);
        quadrantesPossiveis(casa);
        clickCheck++;
        return;
    }
    
    if (clickCheck === 1){

        if (!casasPossiveis.includes(casa)){
            clickCheck = 0;
            time1 = {};
            return;
        }

        time2 = estaOcupada ? {...animalNaCasa} : "";
        quadrantesPossiveis(casa);
        
        if (time1.cor === time2.cor){ 
            clickDe = document.getElementById(casa);
            time1 = time2;
            time2 = {};
            indiceTime1 = indiceNoArray;
            casasPossiveis = quadrantesPossiveis(casa);
            clickCheck = 1;
            return;
        }
        
        apagarQuadrantesPossiveis();
        clickCheck--;
        
        clickDe.classList.remove(time1.especie, time1.cor);
        clickDe.textContent = "";

        time1.posicao = casa;
        animais[indiceTime1] = time1;

        casasPossiveis = [];
    }
    renderizarTabuleiro();
};

const quadrantesPossiveis = (casa) => {
    const coluna = casa[0];
    const linha = parseInt(casa[1]);
    const letras = ["A", "B", "C", "D", "E", "F", "G"];
    const indiceLetra = letras.indexOf(coluna);
    const possibilidades = [];

    if (indiceLetra > 0) possibilidades.push(letras[indiceLetra - 1] + linha);
    if (indiceLetra < letras.length - 1) possibilidades.push(letras[indiceLetra + 1] + linha);
    if (linha > 1) possibilidades.push(coluna + (linha - 1));
    if (linha < 9) possibilidades.push(coluna + (linha + 1));

   possibilidades.forEach((casa) => {
        const quadrante = document.getElementById(casa);
        if (quadrante) {
            quadrante.classList.add("possibilidade");
        }
    });
    return possibilidades;
};

