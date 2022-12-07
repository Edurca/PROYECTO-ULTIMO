const botonera = document.querySelector('#botonera');
const convocados = document.getElementById('convocados');
const convocadosDiv = document.getElementById('convocadosDiv');
const titularesDiv = document.getElementById('titulares');

const partidosDiv = document.getElementById('partidos');
const templateConvocados = document.getElementById(
	'template-convocados'
).content;
const templateTitulares = document.getElementById('template-titulares').content;
const fragment = document.createDocumentFragment();
let listaConvocados;
let contadorTitulares = 0;

class Jugador {
	constructor(nombre, apellido, edad, posicion, color, dorsal, titular) {
		this.nombre = nombre;
		this.apellido = apellido;
		this.edad = edad;
		this.posicion = posicion;
		this.color = color;
		this.dorsal = dorsal;
		this.titular = titular;
	}
}

//funcion para traer datos del JSON
const fetchData = async () => {
	try {
		const res = await fetch('./convocados.json');
		const data = await res.json(); //almaceno la respuesta en json
		listaConvocados = data;
		pintarConvocados(listaConvocados);
	} catch (error) {
		console.log(error);
	}
};

//funcion para imprimir datos de convocados
const pintarConvocados = lista => {
	lista.convocados.map(jugador => {
		templateConvocados.querySelector(
			'.fw-bolder'
		).textContent = `#${jugador.dorsal}`;
		templateConvocados.querySelector(
			'.lead'
		).textContent = `${jugador.nombre} ${jugador.apellido}`;
		templateConvocados.querySelector(
			'.badge'
		).textContent = `${jugador.posicion}`;
		templateConvocados.querySelector(
			'.badge'
		).className = `badge ${jugador.color} rounded-pill`;
		templateConvocados.querySelector('.list-group-item').dataset.id =
			jugador.dorsal;

		const clone = templateConvocados.cloneNode(true);
		fragment.appendChild(clone);
	});
	convocados.appendChild(fragment);
};

//funcion para pintar jugadores titulares
const pintarTitulares = data => {
	console.log(listaConvocados);
	titularesDiv.innerHTML = '';
	data.convocados.map(jugador => {
		if (jugador.titular === true) {
			templateTitulares.querySelector('img').src = jugador.img;
			templateTitulares.querySelectorAll(
				'.lead'
			)[0].textContent = `${jugador.edad}`;
			templateTitulares.querySelectorAll(
				'.lead'
			)[1].textContent = `${jugador.dorsal}`;
			templateTitulares.querySelectorAll(
				'.lead'
			)[2].textContent = `${jugador.posicion}`;
			templateTitulares.querySelector(
				'h6'
			).textContent = `${jugador.nombre} ${jugador.apellido}`;
			templateTitulares.querySelector('#rmvJugador').dataset.id =
				jugador.dorsal;
			const clone = templateTitulares.cloneNode(true);
			fragment.appendChild(clone);
		}
	});
	titularesDiv.appendChild(fragment);
};

convocadosDiv.addEventListener('click', e => {
	agregarTitular(e);
});

const agregarTitular = e => {
	// Validacion no más de 11 jugadores
	if (e.target.dataset.id) {
		if (contadorTitulares < 11) {
			const jugador = listaConvocados.convocados.find(
				jugador => jugador.dorsal == e.target.dataset.id
			);
			jugador.titular = true;
			contadorTitulares++;
			Swal.fire({
				position: 'top-center',
				icon: 'success',
				title: `¡Seleccionaste a ${jugador.nombre} ${jugador.apellido} como titular!`,
				showConfirmButton: true,
				timer: 1500
			  })
		} else {
			Swal.fire({
				icon: 'error',
				title: '¡El equipo está completo!',
				text: 'Elimina alguno de tus jugadores titulares para seguir realizando cambios en el equipo.',
			  })
		}
	}
};

titularesDiv.addEventListener('click', e => {
	removerTitular(e);
});

// funcion que remueve jugador titular del equipo
const removerTitular = e => {
	if (e.target.classList.contains('btn-danger')) {
		const jugador = listaConvocados.convocados.find(
			jugador => jugador.dorsal == e.target.dataset.id
		);
		jugador.titular = false;
		e.target.parentNode.remove();
		contadorTitulares--;
	}
	e.stopPropagation();
};

//funcion para desplegar contenidos del menu
botonera.addEventListener('click', e => {
	if (e.target.id === 'btnConvocados') {
		titularesDiv.classList.add('d-none');
		titularesDiv.dataset.state = 'hide';
		partidos.classList.add('d-none');
		partidos.dataset.state = 'hide';

		if (convocadosDiv.dataset.state === 'view') {
			//comprueba si ya se abrió la pestaña, si es true agrega d-none y cambia el valor de data a hide
			convocadosDiv.classList.add('d-none');
			convocadosDiv.dataset.state = 'hide';
			return;
		}
		// si no quita la clase d-none y muestra el menu
		convocadosDiv.classList.remove('d-none');
		convocadosDiv.dataset.state = 'view';
	}

	if (e.target.id === 'btnTitulares') {
		pintarTitulares(listaConvocados);
		convocadosDiv.classList.add('d-none');
		convocadosDiv.dataset.state = 'hide';
		partidos.classList.add('d-none');
		partidos.dataset.state = 'hide';

		if (titularesDiv.dataset.state === 'view') {
			titularesDiv.classList.add('d-none');
			titularesDiv.dataset.state = 'hide';
			return;
		}
		titularesDiv.classList.remove('d-none');
		titularesDiv.dataset.state = 'view';
	}

	if (e.target.id === 'btnPartidos') {
		convocadosDiv.classList.add('d-none');
		convocadosDiv.dataset.state = 'hide';
		titularesDiv.classList.add('d-none');
		titularesDiv.dataset.state = 'hide';

		if (partidos.dataset.state === 'view') {
			partidos.classList.add('d-none');
			partidos.dataset.state = 'hide';
			return;
		}
		partidos.classList.remove('d-none');
		partidos.dataset.state = 'view';
	}

	e.stopPropagation();
});

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
});
