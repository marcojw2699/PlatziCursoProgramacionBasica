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
let mascotaJugadorObjeto
let mascotaEnemigo
let victoriasJugador = 0
let victoriasEnemigo = 0

let lienzo = mapa.getContext("2d")
let intervalo
let mapaBackground = new Image()
mapaBackground.src = "./assets/mokemap.png"

class Mokepon {
    constructor(nombre, foto, vida, fotoMapa, x = 10, y = 10){
        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
        this.x = x
        this.y = y
        this.ancho = 40
        this.alto = 40
        this.mapaFoto = new Image()
        this.mapaFoto.src = fotoMapa
        this.velocidadX = 0
        this.velocidadY = 0
    }

    pintarMokepon() {
        lienzo.drawImage(
            this.mapaFoto,
            this.x,
            this.y,
            this.ancho,
            this.alto
        )
    }
}

let hipodoge = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5,"./assets/hipodoge.png")
let capipepo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5,"./assets/capipepo.png")
let ratigueya = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5,"./assets/ratigueya.png")

let hipodogeEnemigo = new Mokepon("Hipodoge", "./assets/mokepons_mokepon_hipodoge_attack.png", 5,"./assets/hipodoge.png",80,120)
let capipepoEnemigo = new Mokepon("Capipepo", "./assets/mokepons_mokepon_capipepo_attack.png", 5,"./assets/capipepo.png",150,95)
let ratigueyaEnemigo = new Mokepon("Ratigueya", "./assets/mokepons_mokepon_ratigueya_attack.png", 5,"./assets/ratigueya.png",200,190)


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
        mascotaJugadorObjeto = obtenerObjetoMascota()
        ataquesMascotaJugador = mascotaJugadorObjeto.ataques
        seleccionarMascotaEnemigo()
        sectionSeleccionarMascota.style.display = "none"
        sectionVerMapa.style.display = "flex"
        iniciarMapa()
        //sectionSeleccionarAtaque.style.display = "flex"
    }
}

function obtenerObjetoMascota(){
    for(let i=0; i<mokepones.length; i++) {
        if (mascotaJugador == mokepones[i].nombre){
            return mokepones[i]
        }
    }
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

function pintarCanvas(){
    mascotaJugadorObjeto.x = mascotaJugadorObjeto.x + mascotaJugadorObjeto.velocidadX
    mascotaJugadorObjeto.y = mascotaJugadorObjeto.y + mascotaJugadorObjeto.velocidadY
    lienzo.clearRect(0, 0, mapa.width, mapa.height)
    lienzo.drawImage(
        mapaBackground,
        0,
        0,
        mapa.width,
        mapa.height
    )
    mascotaJugadorObjeto.pintarMokepon()
    hipodogeEnemigo.pintarMokepon()
    capipepoEnemigo.pintarMokepon()
    ratigueyaEnemigo.pintarMokepon()
}

function moverCapipepoDerecha(){
    mascotaJugadorObjeto.velocidadX = 5
}

function moverCapipepoIzquierda(){
    mascotaJugadorObjeto.velocidadX = -5
}

function moverCapipepoArriba(){
    mascotaJugadorObjeto.velocidadY = -5
}

function moverCapipepoAbajo(){
    mascotaJugadorObjeto.velocidadY = 5
}

function detenerMovimiento(){
    mascotaJugadorObjeto.velocidadX = 0
    mascotaJugadorObjeto.velocidadY = 0
}

function teclaPresionada(event){
    switch (event.key) {
        case 'ArrowUp':
            moverCapipepoArriba()
            break;
        case 'ArrowDown':
            moverCapipepoAbajo()
            break;
        case 'ArrowLeft':
            moverCapipepoIzquierda()
            break;
        case 'ArrowRight':
            moverCapipepoDerecha()
            break;        

        default:
            break;
    }
}

function iniciarMapa(){
    mapa.width = 320
    mapa.height = 240
    intervalo = setInterval(pintarCanvas, 50)
    window.addEventListener('keydown',teclaPresionada)
    window.addEventListener('keyup',detenerMovimiento)
}

window.addEventListener("load", iniciarJuego)