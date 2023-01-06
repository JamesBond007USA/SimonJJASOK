// CONSTANTES Y ASIGNAICON DE ELEMENTOS ******************************************//
const round = document.getElementById('round');                     // Guardo Ronda
const simonButtons = document.getElementsByClassName('square');     // Guardo Botones Colores
const startButton = document.getElementById('startButton');         // Guardo Boton Inicio  
// CONSTRUCTOR *******************************************************************//
class Simon {
    constructor(simonButtons, startButton, round) {                  // Uso los parmetros Creados
        this.round = 0;
        this.userPosition = 0;
        this.totalRounds = 5;                                        // 10 Son Demasiadas
        this.sequence = [];                                          // Array sequencia
        this.speed = 1000;
        this.blockedButtons = true;
        this.buttons = Array.from(simonButtons);
        this.display = {
            startButton,
            round
        }
        this.errorSound = new Audio('sounds/error.wav');             // ERROR
        this.pacmanDies = new Audio('sounds/pacmanDies.mp3');        // ERRRR Sonidos Nuevos
        this.pacmanMusic = new Audio('sounds/pacmanMusic.mp3');      // WIN
        this.win = new Audio('sounds/win.mp3');                      // WIN
        this.coin = new Audio('sounds/coin.mp3')                     // MONEDA EMPEZAR JUEGO

        this.buttonSounds = [
            new Audio('sounds/1.mp3'),                               // Sonido Color
            new Audio('sounds/2.mp3'),
            new Audio('sounds/3.mp3'),
            new Audio('sounds/4.mp3'),
        ]
    }
    // Inicia el Simon ************************************************************//
    init() {
        this.display.startButton.onclick = () => this.startGame();     // INICIO      
        document.getElementById("round").style.display = 'none';       // BOTON RONDA OFF
        document.getElementById("letrero").innerHTML = "Simon Says"    // LETRERO h1 ORIGEN = Simon Says
    }
    // Comienza el juego **********************************************************//
    startGame() {
        this.coin.play();                                              // Sonido Moneda
        this.speed;                                                    // Un poo de Tiempo

        // this.display.startButton.disabled = true;                   // Alternativa Desabilitar Boton
        document.getElementById("startButton").style.display = 'none'; // BOTON INICIO OFF 
        document.getElementById("round").style.display = 'block';      // BOTON RONDA ON
        document.getElementById("letrero").innerHTML = "Simon Says"    // LETRERO ORIGEN

        this.updateRound(0);                                           // ACTUALIZAO CONTADOR ROUND
        this.userPosition = 0;
        this.sequence = this.createSequence();                         // CREA SECUENCIA JUEGO      
        this.buttons.forEach((element, i) => {                         // LIMPIAMOS WINNER
            element.classList.remove('winner');
            element.onclick = () => this.buttonClick(i);
        });
        this.showSequence();
    }
    // Actualiza la ronda y el tablero *********************************************//
    updateRound(value) {
        this.round = value;
        this.display.round.textContent = `Round ${this.round}`;        // Jquery
    }
    // Crea el array aleatorio de BOTONES y COLORES ********************************//
    createSequence() {
        return Array.from({ length: this.totalRounds }, () => this.getRandomColor());
    }

    // Devuelve un número al azar entre 0 y 3 la function Anterior la llama ********//
    getRandomColor() {
        return Math.floor(Math.random() * 4);
    }

    // Ejecuta una función cuando se hace click en un botón
    buttonClick(value) {
        !this.blockedButtons && this.validateChosenColor(value);       // BLOQUEA Y VALIDA
    }

    // Valida si el boton que toca el usuario corresponde a al valor de la secuencia
    validateChosenColor(value) {
        if (this.sequence[this.userPosition] === value) {
            this.buttonSounds[value].play();
            if (this.round === this.userPosition) {
                this.updateRound(this.round + 1);
                this.speed /= 1.02;
                this.isGameOver();
            } else {
                this.userPosition++;
            }
        } else {
            this.gameLost();
        }
    }
    // Verifica que no haya acabado el juego  **************************************//
    isGameOver() {
        if (this.round === this.totalRounds) {   // Si las Rondas que Tengo = Final es WIN
            this.gameWon();
        } else {
            this.userPosition = 0;
            this.showSequence();
            // document.getElementById("round").style.display='none';
        };
    }
    // Muestra la secuencia de botones que va a tener que tocar el usuario *********//
    showSequence() {
        this.blockedButtons = true;
        let sequenceIndex = 0;
        let timer = setInterval(() => {
            const button = this.buttons[this.sequence[sequenceIndex]];
            this.buttonSounds[this.sequence[sequenceIndex]].play();
            this.toggleButtonStyle(button)
            setTimeout(() => this.toggleButtonStyle(button), this.speed / 2)
            sequenceIndex++;
            if (sequenceIndex > this.round) {
                this.blockedButtons = false;
                clearInterval(timer);
            }
        }, this.speed);
    }
    // Pinta los botones para cuando se está mostrando la secuencia ******************//
    toggleButtonStyle(button) {
        button.classList.toggle('active');
    }
    // JUGADOR PIERDE se Actualiza el juego ******************************************//
    gameLost() {
        // this.errorSound.play();
        this.pacmanDies.play();

        document.getElementById("letrero").innerHTML = "Wrong Sequence" + " Level: " + round.textContent;
        document.getElementById("startButton").style.display = 'block';       // BOTON INICIO ON  
        document.getElementById("round").style.display = 'none';              // BOTON RONDA  OFF

        // this.display.startButton.disabled = false;                         // ALTENATIVA DESCONECTRAR INICIO        
        this.blockedButtons = true;
    }

    // JUGADOR GANA (5 partidas) ANIMACION + SONIDO  Y se Actualiza el juego ******************************************//
    gameWon() {
        this.win.play();
        // this.pacmanMusic.play();

        document.getElementById("letrero").innerHTML = "YOU HAVE WON 5 TIMES 🏆🏆🏆🏆🏆 !!!"

        //this.display.startButton.disabled = false;
        document.getElementById("startButton").style.display = ("block");      // BOTON INICIO ON
        document.getElementById("round").style.display = 'none'                // BOTON RONDA  OFF

        this.blockedButtons = true;
        this.buttons.forEach(element => {
            element.classList.add('winner');
        });
        this.updateRound('🏆');
    }

}

const simon = new Simon(simonButtons, startButton, round);
simon.init();

//  Inicia juego
//	boton.classList.add("hide");
//	ocultarPie();

//  Termina juego
//	boton.classList.remove("hide");
//	mostrarPie();

// VISIBLE   document.getElementById("startButton").style.display='block';
// INVISIBLE document.getElementById("round").style.display='none';


/*  SIN USO
    function ocultarPie() {
        document.getElementById("pie").style.display = "none";
    }
    function mostrarPie() {
        document.getElementById("pie").style.display = "block";
    } 
*/
/*
La función generarNumero(numero)
genera un número aleatorio entre el 0 y el número pasado por el paréntesis.
En nuestro caso nos interesa un número aleatorio del 0 al 255.

Para generar un número RGB
simplemente necesitamos escribirlo en formato rgb(,,) 
preguntando en cada hueco por generarNumero(255).

La función colorRGB() devuelve pues un número en formato rgb.
/*

/*
function generarNumero(numero){
    return (Math.random()*numero).toFixed(0);
}

function colorRGB(){
    var coolor = "("+generarNumero(255)+"," + generarNumero(255) + "," + generarNumero(255) +")";
    return "rgb" + coolor;
}
*/
/*
function generarLetra() {
    var letras = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    var numero = (Math.random() * 15).toFixed(0);
    return letras[numero];
}

function colorHEX() {
    var coolor = "";
    for (var i = 0; i < 6; i++) {
        coolor = coolor + generarLetra();
    }
    return "#" + coolor;
}
*/