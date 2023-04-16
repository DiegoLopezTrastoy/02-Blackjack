/**
 * 2C = Two of Clovers (Trevoles)
 * 2D = Two of Diamonds (Diamantes)
 * 2H = Two of Hearts (Corazones)
 * 2S = Two of Swords (Espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0;

let puntosOrdenador = 0;

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const puntosHtml = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasOrdenador = document.querySelector('#ordenador-cartas');

const crearDeck = () => {
    for (let i = 2; i < 10; i++) {
        for (const tipo of tipos) {
            deck.push(i + tipo);
        }
    }
    for (const tipo of tipos) {
        for (const especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    deck = _.shuffle(deck);
    return deck;
}

crearDeck();

const pedirCarta = () => {
    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();
    return carta;
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : (valor * 1);
}

const turnoOrdenador = (puntosMinimos) => {
    do {
        const carta = pedirCarta();
        puntosOrdenador = puntosOrdenador + valorCarta(carta);
        puntosHtml[1].innerText = puntosOrdenador;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasOrdenador.append(imgCarta);

        if (puntosOrdenador > 21) {
            btnPedir.disabled = true;
        } else if (puntosOrdenador === 21) {
            btnPedir.disabled = true;
        }
        if (puntosMinimos > 21) {
            break;
        }
    } while ( (puntosOrdenador < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {
        if (puntosOrdenador === puntosMinimos) {
            alert('Nadie gana');
        } else if (puntosMinimos > 21) {
            alert('El ordenador ganó');
        } else if (puntosOrdenador > 21) {
            alert('El jugador gana.');
        } else {
            alert('El ordenador ganó');
        }
    }, 50);
}

btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHtml[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        turnoOrdenador(puntosJugador);
    } else if (puntosJugador === 21) {
        btnPedir.disabled = true;
        turnoOrdenador(puntosJugador);
    }
});

btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoOrdenador(puntosJugador);
});

btnNuevo.addEventListener('click', () => {
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    puntosJugador = 0;
    puntosOrdenador = 0;
    divCartasJugador.innerHTML = '';
    divCartasOrdenador.innerHTML = '';
    puntosHtml[0].innerHTML = 0;
    puntosHtml[1].innerHTML = 0;
    deck = [];
    crearDeck();
});