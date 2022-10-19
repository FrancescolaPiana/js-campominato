


// Consegna
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
// Bonus
// Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
// - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
// - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
// - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;

// pressione bottone play
const buttonplay = document.getElementById('playbtn');
let NumQuadrato;


// Main Function

function play() {

    console.log('inizio del gioco')
    
    const NUM_BOMB = 16;
    let BombP = [];

    // prendiamo il parent a cui appendere il resto
    campodagioco = document.getElementById('campo_gioco');

    // svuotiamo il campodagioco
    campodagioco.innerHTML = '';

    NumeroCelle = 0;
    const livelloHTML = document.getElementById('livello')
    const livello = livelloHTML.value;

    switch (livello) {
        case '1':
        default:
        NumeroCelle = 100;
            break;

        case '2':
            
        NumeroCelle = 81;
            break;

        case '3':
            
        NumeroCelle = 25;
            break;
    }
        while (BombP.length < NUM_BOMB) {
            const bomba = randomNumber(1,NumeroCelle)
            if (!BombP.includes(bomba)) {
                BombP.push(bomba);
            }
        }
        
    console.log(BombP);
    const tentativi = NumeroCelle - NUM_BOMB;
    let score = 0 ;



    // FUNZIONI 

    // GENERATORE DI GRIGLIE
    function GrigliaGen() {
        griglia = document.createElement('div');
        griglia.className = 'griglia';

            // contatore creazione celle
        for ( i = 1; i <= NumeroCelle; i++) {
            const Quadrato = QuadratoGen(i)
            griglia.appendChild(Quadrato)
        }
        campodagioco.appendChild(griglia)
    }    


    // GENERATORE DI QUADRATI
    function QuadratoGen(NumQuadrato) {
        const CelleperRiga = Math.sqrt(NumeroCelle)
        Quadrato = document.createElement('div')
        Quadrato.className = 'quadrato'
        if (BombP.includes(NumQuadrato)){
            Quadrato.classList.add('bomb');
        }
        Quadrato.style.width = `calc(100% / ${CelleperRiga})`
        Quadrato.style.height = `calc(100% / ${CelleperRiga})`
        Quadrato.innerHTML = `
            <span id="${NumQuadrato}"> ${NumQuadrato} </span>
        `
        griglia.appendChild(Quadrato);
        // aggiunge la classe al click
        Quadrato.addEventListener('click' , saro);
        saro();
        return Quadrato;
    }  

    // GENERATORE DI TAG BOMB E RED
    function saro() {
        this.removeEventListener('click', saro)
        score++;
        console.log(score);
        if (BombP.includes(NumQuadrato)){
            // bomba
            const arraybomb = document.getElementsByClassName('bomb')
            for (let i = 0; i < arraybomb.length; i++) {
                arraybomb[i].classList.add('redd')
            }
            score--;
            gameover()
        }
        // no bomba
        else{
            this.classList.add('torquoise');
    
            if (score === tentativi) {
                gameover()
            }
        }
    }

    // FUNZIONE GAME OVER
    function gameover() {
        console.log('gameover');
    
        const sqr = document.getElementsByClassName('quadrato')
        for (let n = 0; n < sqr.length; n++) {
            console.log(sqr[n].removeEventListener);
    
           sqr[n].removeEventListener('click' , saro);
        }
       if (score === tentativi) {
           console.log('Hai Vinto!');
       }
       else{
           console.log('Hai Perso.');
       }
    }

    GrigliaGen();
}

// evento click al play
buttonplay.addEventListener('click' , play );

