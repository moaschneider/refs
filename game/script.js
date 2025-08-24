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

const ESPECIES = ["rato","gato","cachorro","lobo","onça","tigre","leão","elefante"];
const CORES = ["vermelho","azul"];
const CELULAS = document.querySelectorAll('td');

function limparTabuleiro() {
  CELULAS.forEach(td => {
    td.textContent = "";
    td.classList.remove(...ESPECIES, ...CORES, "possibilidade");
  });
}

function renderizarTabuleiro() {
  limparTabuleiro();
  animais.forEach(animal => {
    // if (!animal.posicao) return;
    const td = document.getElementById(animal.posicao);
    td.textContent = animal.codigo;
    td.classList.add(animal.especie, animal.cor);
  });
}

renderizarTabuleiro();

const checkQuadrante = document.querySelectorAll('td');

for (let i = 0; i < checkQuadrante.length; i++){
    checkQuadrante[i].addEventListener('click', () => {
        const quadranteSelecionado = checkQuadrante[i].id;
        jogada(quadranteSelecionado);
    })
}

const removeQuadrantesPossiveis = () => {
    checkQuadrante.forEach((n) => {
        n.classList.remove('possibilidade');
    });
};

let clickCheck = 0;
let casaOrigem = "";
let casaDestino = "";
let origem = {};
let destino = {};
let indiceOrigem = "";
let indiceDestino = "";
let casasPossiveis = [];
let turno = "vermelho";
// console.log('turno:', turno, typeof turno);

function trocaTurno(){ 
    turno = (turno === "azul") ? "vermelho" : "azul";
    // console.log('turno:', turno, typeof turno);
};

const jogada = (casa) => {

    if (clickCheck === 0){
        
        const estaOcupada = animais.find(animal => animal.posicao === casa) === undefined ? false : true;
        // console.log('estaOcupada:', estaOcupada, typeof estaOcupada);
        
        if (!estaOcupada) return;
        
        const timeDaVez = (animais.find(animal => animal.posicao === casa)).cor === turno ? true : false;
        // console.log('timeDaVez:', timeDaVez, typeof timeDaVez);
        
        if (timeDaVez){
            indiceOrigem = animais.indexOf(animais.find(animal => animal.posicao === casa));
            // console.log('indiceOrigem:', indiceOrigem, typeof indiceOrigem);
            origem = animais.find(animal => animal.posicao === casa);
            // console.log('origem:', origem, typeof origem);
            casaOrigem = document.getElementById(casa);
            // console.log('casaOrigem:', casaOrigem, typeof casaOrigem);
            casasPossiveis = quadrantesPossiveis(casa);
            // quadrantesPossiveis(casa);
            clickCheck = 1;
            return;
        }
    }
    
    if (clickCheck === 1){
        
        const jogadaPossivel = casasPossiveis.includes(casa) ? true : false;
        // console.log('jogadaPossivel:', jogadaPossivel, typeof jogadaPossivel);
        
        if (!jogadaPossivel) {
            removeQuadrantesPossiveis();
            origem = animais.find(animal => animal.posicao === casa);
            // console.log('origem:', origem, typeof origem);
            casaOrigem = document.getElementById(casa);
            indiceOrigem = animais.indexOf(animais.find(animal => animal.posicao === casa));
            // console.log('indiceOrigem:', indiceOrigem, typeof indiceOrigem);
            casasPossiveis = quadrantesPossiveis(casa);
            clickCheck = 1;
            return;
        }
        
        
        
        casaOrigem.classList.remove(origem.especie, origem.cor);
        casaOrigem.textContent = "";
        
        destino = animais.find(animal => animal.posicao === casa);
        
        if (destino && destino.cor !== origem.cor) {
            indiceDestino = animais.indexOf(destino);
            animais.splice(indiceDestino, 1);
        }
        
        origem.posicao = casa;
        removeQuadrantesPossiveis();
        clickCheck = 0;
        casasPossiveis = [];
        origem = {};
        destino = {};
        renderizarTabuleiro();
        trocaTurno();
        
        // animais[indiceOrigem] = origem;
        
        // casaDestino.classList.add(origem.especie, origem.cor);
        // casaDestino.textContent = origem.simbolo;

        // console.log('origem:', origem, typeof origem);
        // console.log('destino:', destino, typeof destino);
        // console.log('casaDestino:', casaDestino, typeof casaDestino);
        
        
        // indiceOrigem = "";
        // indiceDestino = "";
        // casaOrigem = "";
        // casaDestino = "";

    }
};

const quadrantesPossiveis = (casa) => {
    const coluna = casa[0];
    // console.log('coluna:', coluna, typeof coluna);
    const linha = parseInt(casa[1]);
    // console.log('linha:', linha, typeof linha);
    const indiceLetra = coluna.charCodeAt(0) - 65;
    // console.log('indiceLetra:', indiceLetra, typeof indiceLetra);
    const letras = ["A", "B", "C", "D", "E", "F", "G"];

    let possibilidades = [];
    let possibilidadesFiltro = [];


    if (indiceLetra > 0) possibilidades.push(letras[indiceLetra - 1] + linha);
    if (indiceLetra < letras.length - 1) possibilidades.push(letras[indiceLetra + 1] + linha);
    if (linha < 9) possibilidades.push(coluna + (linha + 1));
    if (linha > 1) possibilidades.push(coluna + (linha - 1));
    
    const toca = turno === "azul" ? "D9" : "D1";
    // console.log('toca:', toca, type0of toca);
    possibilidadesFiltro = possibilidades.filter(item => item !== toca);
    possibilidades = possibilidadesFiltro;
    possibilidadesFiltro = [];
    // console.log('possibilidades:', possibilidades, typeof possibilidades);
    
    let aliados = [];
    let inimigos = [];
    
    possibilidades.forEach((n) => {
        // console.log('n:', n, typeof n);
        const jogadorProximo = animais.find(item => item.posicao === n);
        // console.log('jogadorProximo:', jogadorProximo, typeof jogadorProximo);
        
        if (jogadorProximo !== undefined && jogadorProximo.cor === turno){
            aliados.push(jogadorProximo.posicao);
        } else if (jogadorProximo !== undefined && jogadorProximo.cor !== turno) {
            inimigos.push(jogadorProximo.posicao);
        }
    });
    // console.log('aliados:', aliados, typeof aliados);
    // console.log('inimigos:', inimigos, typeof inimigos);
    
    possibilidadesFiltro = possibilidades.filter(item => !aliados.includes(item));
    possibilidades = possibilidadesFiltro;
    possibilidadesFiltro = [];
    // console.log('possibilidades:', possibilidades, typeof possibilidades);
    
    const animalSelecionado = animais.find(animal => animal.posicao === casa);
    // console.log('nivelAnimalSelecionado:', nivelAnimalSelecionado, typeof nivelAnimalSelecionado);

    let inimigosNaoDerrotaveis = [];

    possibilidades.forEach((n) => {
        const inimigoProximo = animais.find(animal => animal.posicao === n);
        // console.log('inimigoProximo:', inimigoProximo, typeof inimigoProximo);

        if (inimigoProximo !== undefined &&
            inimigoProximo.nivel > animalSelecionado.nivel && 
            animalSelecionado.especie !== "elefante" &&
            animalSelecionado.especie !== "rato"){
            // console.log(inimigoProximo.especie);
            inimigosNaoDerrotaveis.push(inimigoProximo.posicao);
            
        } else if (inimigoProximo !== undefined &&
            animalSelecionado.especie === "elefante" &&
            inimigoProximo.especie === "rato"){
            console.log(inimigoProximo.especie);
            inimigosNaoDerrotaveis.push(inimigoProximo.posicao);
                
        } else if (inimigoProximo !== undefined &&
            inimigoProximo.nivel > animalSelecionado.nivel &&
            animalSelecionado.especie === "rato" &&
            inimigoProximo.especie !== "elefante"){
            // console.log(inimigoProximo.especie);
            inimigosNaoDerrotaveis.push(inimigoProximo.posicao);
        }

    });

    possibilidadesFiltro = possibilidades.filter(item => !inimigosNaoDerrotaveis.includes(item));
    possibilidades = possibilidadesFiltro;
    possibilidadesFiltro = [];
    // console.log('possibilidadesFiltro:', possibilidadesFiltro, typeof possibilidadesFiltro);
    // console.log('inimigosNaoDerrotaveis:', inimigosNaoDerrotaveis, typeof inimigosNaoDerrotaveis);
    // console.log('possibilidades:', possibilidades, typeof possibilidades);
    
    possibilidades.forEach((casa) => {
        const quadrante = document.getElementById(casa);
        if (quadrante) {
            quadrante.classList.add("possibilidade");
        }
    });
    // trocaTurno();
    // console.log('turno:', turno, typeof turno);
    return possibilidades;
};

