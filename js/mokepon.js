const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionReiniciar = document.getElementById("reiniciar")
const sectionResultados = document.getElementById("resultados")
const sectionAtaqueJugador = document.getElementById("ataques-del-jugador")
const sectionAtaqueEnemigo = document.getElementById("ataques-del-enemigo")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")


const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVidasJugador = document.getElementById("vidas-jugador")
const spanVidasEnemigo = document.getElementById("vidas-enemigo")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenerdorAtaques = document.getElementById("contenedor-ataques")

let mokepones = []
let continuar = true
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya

let botonFuego
let botonAgua
let botonTierra

let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5)
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5)
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5)


hipodoge.ataques.push(
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🌴", id: "boton-tierra"}
)

capipepo.ataques.push(
    {nombre: "🌴", id: "boton-tierra"},
    {nombre: "🌴", id: "boton-tierra"},
    {nombre: "🌴", id: "boton-tierra"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"}
)

ratigueya.ataques.push(
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "🔥", id: "boton-fuego"},
    {nombre: "💧", id: "boton-agua"},
    {nombre: "🌴", id: "boton-tierra"}
)

mokepones.push(hipodoge,capipepo,ratigueya)

function iniciarJuego(){
    sectionSeleccionarAtaque.style.display = "none"
    sectionReiniciar.style.display = "none"

    mokepones.forEach((mokepon) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id=${mokepon.nombre}>
        <label class="tarjeta-de-mokepon" for=${mokepon.nombre}>
            <p>${mokepon.nombre}</p>
            <img src=${mokepon.foto} alt=${mokepon.nombre}>
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })
    
    botonMascotaJugador.addEventListener("click",seleccionarMascotaJugador)
    botonReiniciar.addEventListener("click",reiniciarJuego)
}

function seleccionarMascotaJugador(){
    if (inputHipodoge.checked) {
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("Selecciona una mascota")
        continuar = false
    }
    if (continuar) {
        seleccionarMascotaEnemigo()
        extraerAtaques(mascotaJugador)
        sectionSeleccionarMascota.style.display = "none"
        sectionSeleccionarAtaque.style.display = "flex"
    }
}

function extraerAtaques(mascotaJugador){
    let ataquesMascotaJugador 
    for(let i=0; i<mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataquesMascotaJugador = mokepones[i].ataques
        }
    }

    console.log(ataquesMascotaJugador)

    mostrarAtaques(ataquesMascotaJugador)
}

function mostrarAtaques(ataquesMascotaJugador){
    ataquesMascotaJugador.forEach((ataque) => {
        opcionDeAtaques = `
        <button class="boton-de-ataque" id=${ataque.id}>${ataque.nombre}</button>
        `
    contenerdorAtaques.innerHTML += opcionDeAtaques

    console.log(contenerdorAtaques)

    })
    
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")

    botonFuego.addEventListener("click",ataqueFuego)
    botonAgua.addEventListener("click",ataqueAgua)
    botonTierra.addEventListener("click",ataqueTierra)
}


function seleccionarMascotaEnemigo(){
    let numeroAleatorio = aleatorio(0, mokepones.length -1)
    spanMascotaEnemigo.innerHTML = mokepones[numeroAleatorio].nombre
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
        vidasEnemigo --
        crearMensaje("GANASTE")
        spanVidasEnemigo.innerHTML = vidasEnemigo
    } else {
        vidasJugador --
        crearMensaje("PERDISTE")
        spanVidasJugador.innerHTML = vidasJugador
    }
    revisarVidas()
}

function revisarVidas(){
    if(vidasEnemigo == 0){
        crearMensajeFinal("Felicitaciones, GANASTE 🤩!!")
    } else if(vidasJugador == 0){
        crearMensajeFinal("Lo siento, PERDISTE!!")
    }
}

function crearMensaje(resultadoCombate){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    
    sectionResultados.innerHTML = resultadoCombate
    nuevoAtaqueJugador.innerHTML = ataqueJugador
    nuevoAtaqueEnemigo.innerHTML = ataqueEnemigo

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionResultados.innerHTML = resultadoFinal

    botonFuego.disabled = true
    botonAgua.disabled = true
    botonTierra.disabled = true
    
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load", iniciarJuego)