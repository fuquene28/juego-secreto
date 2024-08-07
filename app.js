let numeroGenerado;
let numeroSecreto = numeroGenerado;
let contadorIntentos = 1;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto){
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function validarIntento(){
    let numeroDeUsuario = parseInt(document.getElementById("user_value").value);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`¡Felicidades! Acertaste el número en ${contadorIntentos} ${(contadorIntentos===1) ? 'intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');
    }else{
        // El usuario no acertó
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','El número secreto es menor.');
        }
        else{
            asignarTextoElemento('p','El número secreto es mayor.');
        }
        contadorIntentos++;
        limpiarCampo();
    }
    return;
}

function generarNumeroSecreto(){
    numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    // Si ya sorteamos todos los números
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles')
    }else{
        // Si el número generado está incluido en la lista
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}

function limpiarCampo(){
    let valorCaja = document.querySelector('#user_value') // Se usa # para acceder al id mediante querySelector
    valorCaja.value = " ";
    // document.querySelector('#user_value').value == " "; No es necesaria la variable
    return;
}

function condicionesIniciales(){
    asignarTextoElemento('h1', 'Juego del número secreto');
    asignarTextoElemento('p', `Ingresa un número entre 1 y ${numeroMaximo}`);
    contadorIntentos = 1;
    numeroSecreto = generarNumeroSecreto();
    return;
}
function reiniciarJuego(){
    // Limpiar campo
    limpiarCampo();
    // Textos iniciales
    // Reiniciar intentos
    // Generar nuevo número secreto
    condicionesIniciales();
    // Deshabilitar el botón Nuevo Juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
    return;
}

condicionesIniciales();

