let ataqueJugador
let ataqueEnemigo

function iniciarJuego(){
    let botonMascotaJugador = document.getElementById("boton-mascota")
    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
    

    let botonFuego = document.getElementById('boton-fuego')
    botonFuego.addEventListener("click",ataqueFuego)
    
    let botonAgua = document.getElementById('boton-agua')
    botonAgua.addEventListener("click",ataqueAgua)

    let botonTierra = document.getElementById('boton-tierra')
    botonTierra.addEventListener("click",ataqueTierra)
}

function seleccionarMascotaJugador(){

    let inputHipodoge = document.getElementById('hipodoge')
    let inputCapipepo = document.getElementById('capipepo')
    let inputRatigueya = document.getElementById('ratigueya')

    let spanMascotaJugador = document.getElementById('mascota-jugador')
    let continuar = true

    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = "Hipodoge"
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = "Capipepo"
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = "Ratigueya"
    } else {
        alert("Selecciona una mascota")
        continuar = false
    }

    if (continuar) {seleccionarMascotaEnemigo()}
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function seleccionarMascotaEnemigo(){
    let numeroAleatorio = aleatorio(1,3)
    let spanMascotaEnemigo = document.getElementById('mascota-enemigo')

    if (numeroAleatorio == 1){
        spanMascotaEnemigo.innerHTML = "Hipodoge"
    } else if (numeroAleatorio == 2){
        spanMascotaEnemigo.innerHTML = "Capipepo"
    } else {
        spanMascotaEnemigo.innerHTML = "Ratigueya"
    }

}

function ataqueFuego(){
    ataqueJugador = "FUEGO"
    ataqueAleatorioEnemigo()
}

function ataqueAgua(){
    ataqueJugador = "AGUA"
    ataqueAleatorioEnemigo()
}

function ataqueTierra(){
    ataqueJugador = "TIERRA"
    ataqueAleatorioEnemigo()
}

function ataqueAleatorioEnemigo(){
    let numeroAleatorio = aleatorio(1,3)

    if (numeroAleatorio == 1){
        ataqueEnemigo = "FUEGO"
    } else if (numeroAleatorio == 2){
        ataqueEnemigo = "AGUA"
    } else {
        ataqueEnemigo = "TIERRA"
    }
    combate()
}

function combate(){
    if(ataqueJugador == ataqueEnemigo){
        crearMensaje("EMPATE")
    } else if((ataqueJugador == "FUEGO" && ataqueEnemigo == "TIERRA") || (ataqueJugador == "AGUA" && ataqueEnemigo == "FUEGO") || (ataqueJugador == "TIERRA" && ataqueEnemigo == "AGUA")){
        crearMensaje("GANASTE")
    } else resultadoCombate = crearMensaje("PERDISTE")

    
}

function crearMensaje(resultadoCombate){
    let sectionMensajes = document.getElementById('mensajes')

    let parrafo = document.createElement('p')
    parrafo.innerHTML = "Tu mascota atacó con " + ataqueJugador + ", la mascota del enemigo atacó con " + ataqueEnemigo + ". " + resultadoCombate

    sectionMensajes.appendChild(parrafo)
}

window.addEventListener("load", iniciarJuego)