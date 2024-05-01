const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque")
const sectionSeleccionarMascota = document.getElementById("seleccionar-mascota")
const sectionReiniciar = document.getElementById("reiniciar")
const sectionResultados = document.getElementById("resultados")
const sectionAtaqueJugador = document.getElementById("ataques-del-jugador")
const sectionAtaqueEnemigo = document.getElementById("ataques-del-enemigo")
const sectionVerMapa = document.getElementById("ver-mapa")
const botonMascotaJugador = document.getElementById("boton-mascota")
const botonReiniciar = document.getElementById("boton-reiniciar")


const spanMascotaJugador = document.getElementById('mascota-jugador')
const spanMascotaEnemigo = document.getElementById('mascota-enemigo')
const spanVictoriasJugador = document.getElementById("victorias-jugador")
const spanVictoriasEnemigo = document.getElementById("victorias-enemigo")

const contenedorTarjetas = document.getElementById("contenedor-tarjetas")
const contenerdorAtaques = document.getElementById("contenedor-ataques")
const mapa = document.getElementById("mapa")

let mokepones = []
let continuar = true
let ataqueJugador = []
let ataqueEnemigo = []
let opcionDeMokepones
let inputHipodoge
let inputCapipepo
let inputRatigueya

let ataquesMascotaJugador
let ataquesMascotaEnemigo
let indexAtaqueJugador
let indexAtaqueEnemigo

let botonFuego
let botonAgua
let botonTierra
let botones = []

let mascotaJugador
let mascotaEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext("2d")

class Mokepon {
    constructor(nombre, foto, vida){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = 20
        this.y = 30
        this.ancho = 80
        this.alto = 80
        this.mapaFoto = new Image()
        this.mapaFoto.src = foto
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
    sectionVerMapa.style.display = "none"

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
        extraerAtaques(mascotaJugador)
        seleccionarMascotaEnemigo()
        sectionSeleccionarMascota.style.display = "none"
        sectionVerMapa.style.display = "flex"
        //sectionSeleccionarAtaque.style.display = "flex"
    }
}

function extraerAtaques(mascotaJugador){
    for(let i=0; i<mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            ataquesMascotaJugador = mokepones[i].ataques
        }
    }
    mostrarAtaques(ataquesMascotaJugador)
}

function mostrarAtaques(ataquesMascotaJugador){
    ataquesMascotaJugador.forEach((ataque) => {
        opcionDeAtaques = `
        <button class="boton-de-ataque BAtaque" id=${ataque.id}>${ataque.nombre}</button>
        `
    contenerdorAtaques.innerHTML += opcionDeAtaques
    })
    
    botonFuego = document.getElementById("boton-fuego")
    botonAgua = document.getElementById("boton-agua")
    botonTierra = document.getElementById("boton-tierra")
    botones = document.querySelectorAll(".BAtaque")


}

function secuenciaAtaque(){
    botones.forEach((boton) => {
        boton.addEventListener("click", (e) =>{
            if (e.target.textContent == "🔥"){
                ataqueJugador.push("FUEGO")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent == "💧"){
                ataqueJugador.push("AGUA")
                boton.style.background = "#112f58"
                boton.disabled = true
            } else if (e.target.textContent == "🌴"){
                ataqueJugador.push("TIERRA")
                boton.style.background = "#112f58"
                boton.disabled = true
            }
            ataqueAleatorioEnemigo()
        })
    })
}

function seleccionarMascotaEnemigo(){
    let numeroAleatorio = aleatorio(0, mokepones.length -1)
    spanMascotaEnemigo.innerHTML = mokepones[numeroAleatorio].nombre
    mascotaEnemigo = mokepones[numeroAleatorio].nombre
    ataquesMascotaEnemigo = mokepones[numeroAleatorio].ataques
    
    secuenciaAtaque()
}


function ataqueAleatorioEnemigo(){
    let numeroAleatorio = aleatorio(0,ataquesMascotaEnemigo.length-1)
    
    if(ataquesMascotaEnemigo[numeroAleatorio].nombre == "🔥"){
        ataqueEnemigo.push("FUEGO")
    } else if(ataquesMascotaEnemigo[numeroAleatorio].nombre == "💧"){
        ataqueEnemigo.push("AGUA")
    } else if (ataquesMascotaEnemigo[numeroAleatorio].nombre == "🌴"){
        ataqueEnemigo.push("TIERRA")
    }
    iniciarCombate()
}

function iniciarCombate(){
    if (ataqueJugador.length == 5) {
        combate()
    }
}

function indexAmbosOponentes(indexJugador,indexEnemigo){
    indexAtaqueJugador = ataqueJugador[indexJugador]
    indexAtaqueEnemigo = ataqueEnemigo[indexEnemigo]
}

function combate(){

    for (let index = 0; index < ataqueJugador.length; index++) {
        console.log(ataqueJugador[index])
        
        if(ataqueJugador[index] == ataqueEnemigo[index]){
            indexAmbosOponentes(index,index)
            crearMensaje("EMPATE")
        } else if((ataqueJugador[index] == "FUEGO" && ataqueEnemigo[index] == "TIERRA") || 
            (ataqueJugador[index] == "AGUA" && ataqueEnemigo[index] == "FUEGO") || 
            (ataqueJugador[index] == "TIERRA" && ataqueEnemigo[index] == "AGUA")){
            victoriasJugador++
            indexAmbosOponentes(index,index)
            crearMensaje("GANASTE")
            spanVictoriasJugador.innerHTML = victoriasJugador
        } else {
            victoriasEnemigo++
            indexAmbosOponentes(index,index)
            crearMensaje("PERDISTE")
            spanVictoriasEnemigo.innerHTML = victoriasEnemigo
        }
    }
    
    
    revisarVictorias()
}

function revisarVictorias(){
    if(victoriasJugador == victoriasEnemigo){
        crearMensajeFinal("Esto ha sido un EMPATE 🫣!!")
    } else if(victoriasJugador > victoriasEnemigo){
        crearMensajeFinal("Felicitaciones, GANASTE 🤩!!")
    } else if(victoriasJugador < victoriasEnemigo){
        crearMensajeFinal("Lo siento, PERDISTE!! 😥")
    }
}

function crearMensaje(resultadoCombate){
    let nuevoAtaqueJugador = document.createElement('p')
    let nuevoAtaqueEnemigo = document.createElement('p')
    
    sectionResultados.innerHTML = resultadoCombate
    nuevoAtaqueJugador.innerHTML = indexAtaqueJugador
    nuevoAtaqueEnemigo.innerHTML = indexAtaqueEnemigo

    sectionAtaqueJugador.appendChild(nuevoAtaqueJugador)
    sectionAtaqueEnemigo.appendChild(nuevoAtaqueEnemigo)
}

function crearMensajeFinal(resultadoFinal){
    sectionResultados.innerHTML = resultadoFinal    
    sectionReiniciar.style.display = "block"
}

function reiniciarJuego(){
    location.reload()
}

function aleatorio(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function pintarPersonaje(){
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        capipepo.mapaFoto,
        capipepo.x,
        capipepo.y,
        capipepo.ancho,
        capipepo.alto
    )
}

function moverCapipepoDerecha(){
    capipepo.x = capipepo.x + 5
    pintarPersonaje()
}

function moverCapipepoIzquierda(){
    capipepo.x = capipepo.x - 5
    pintarPersonaje()
}

function moverCapipepoArriba(){
    capipepo.y = capipepo.y - 5
    pintarPersonaje()
}

function moverCapipepoAbajo(){
    capipepo.y = capipepo.y + 5
    pintarPersonaje()
}

window.addEventListener("load", iniciarJuego)