const convocados = document.querySelector("#convocados");
const btn = document.querySelector("#btnConvocados")


btn.addEventListener('click', (e) => {
    
    if (convocados.dataset.conv === 'view') {  //comprueba si ya se abrió la pestaña, si es true agrega d-none y cambia el valor de data a hide
        convocados.classList.add('d-none')
        convocados.dataset.conv = 'hide'
        return
    } 
        // si no quita la clase d-none y muestra el menu
        convocados.classList.remove('d-none')
        convocados.dataset.conv = 'view'
    
    })    













/* const titularesObj = {} //crea objeto vacío para almacenar jugadores

const agregarTitulares = (e) => {
    console.log(e.target.dataset.pos)
    let id = 0;
    const jugador = { //crea jugador
        id: id++,
        nombre: e.target.dataset.name,
        posicion: e.target.dataset.pos
    }

    titularesObj[id] = jugador; //lo almacena en objeto

    cargarJugador(jugador); //imprime el jugador en el div
}


const cargarJugador = (jugador) => {
    
    Object.values(titularesObj).forEach(item => { //lee cada uno de los valores de las prop del obj clickeado
        const clone = template.content.firstElementChild.cloneNode(true); // clono los elementos del template
        clone.querySelector('.lead').textContent = item.nombre; //cambio el nombre del texto por el del objeto
        clone.querySelector('.badge').textContent = item.posicion //cambio la posicion por el del objeto
        fragment.appendChild(clone); //insertamos el clon en el fragmento
    })
    titulares.appendChild(fragment); //incluimos el fragmento en el flujo del DOM
}

btn.forEach(btn => {btn.addEventListener("click", agregarTitulares)}) // evento boton */