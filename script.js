const botonera = document.querySelector('#botonera');
const convocados = document.getElementById('convocados');
const convocadosDiv = document.getElementById('convocadosDiv');
const titularesDiv = document.getElementById('titulares');
const partidosDiv = document.getElementById('partidos');
const templateConvocados = document.getElementById('template-convocados').content
const templateTitulares = document.getElementById('template-titulares').content;
const fragment = document.createDocumentFragment();

document.addEventListener('DOMContentLoaded', () => {
	fetchData();
});

//funcion para traer datos del JSON
const fetchData = async () => {
	try {
		const res = await fetch('./convocados.json');
		const data = await res.json(); //almaceno la respuesta en json
		pintarConvocados(data);
		pintarTitulares(data);
	} catch (error) {
		console.log(error);
	}
};

//funcion para imprimir datos de convocados
const pintarConvocados = data => {
	data.convocados.map(jugador => {
		templateConvocados.querySelector('.lead').textContent = `${jugador.nombre} ${jugador.apellido}`;
		templateConvocados.querySelector('.badge').textContent = `${jugador.posicion[0]}`
		templateConvocados.querySelector('.badge').className = `badge ${jugador.color} rounded-pill`
		
		const clone = templateConvocados.cloneNode(true);
		fragment.appendChild(clone);
	})
	convocados.appendChild(fragment)
};

//funcion para pintar jugadores titulares
const pintarTitulares = data => {
	data.convocados.map(jugador => {
		if (jugador.titular === true) {
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

// funcion que remueve jugador titular del equipo (en desarollo)
titularesDiv.addEventListener('click', e => {
	removerTitular(e);
});

const removerTitular = e => {
	if (e.target.classList.contains('btn-danger')) {
		//pregunta si el elemento al que clickeamos contiene la clase
		console.log('Remover'); // FALTA IMPLEMENTAR
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


/* const filtrarConvocados = data => {
	const arq = [];
	const def = [];
	const vol = [];
	const del = [];

	data.convocados.map(jugador => {
		jugador.posicion.filter(posicion => {
			if (posicion === 'ARQ') {
				arq.push(jugador);
			}
			if (posicion === 'DFC' || posicion === 'LD' || posicion === 'LI') {
				def.push(jugador);
			}
			if (
				posicion === 'MC' ||
				posicion === 'MCO' ||
				posicion === 'PIV' ||
				posicion === 'VOL'
			) {
				vol.push(jugador);
			}
			if (
				posicion === 'DC' ||
				posicion === 'ED' ||
				posicion === 'EI' ||
				posicion === 'MP'
			) {
				del.push(jugador);
			}
		});

	});
	
	pintarConvocados( arq ,  def ,  vol , del );

};

const pintarConvocados = (arq, def, vol, del) => {
	console.log(arq, def, vol, del)
	
	 /* arq.forEach(arquero => {
		// hacer el template de cardArqueros y sustituir contenido
		console.log(arquero);
		templateArq.querySelector('.lead').textContent = `${arquero.nombre} ${arquero.apellido}`;
		templateArq.querySelector('.badge').textContent = `${arquero.posicion[0]}`;
		const clone = templateArq.cloneNode(true);
		fragment.appendChild(clone);
	});
	cardArq.appendChild(fragment);  
} */