const botonera = document.querySelector('#botonera');
const convocados = document.getElementById('convocados');
const titulares = document.getElementById('titulares');
const partidos = document.getElementById('partidos');
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
    cardArqueros(data)
   
};

const cardArqueros = (data) => {
    const arq = []
    data.convocados.map(jugador => {
		jugador.posicion.filter(posicion => {
            if (posicion === 'ARQ') {
                arq.push(jugador)
			}
        });
	});
    
    arq.forEach(arquero => {
        // hacer el template de cardArqueros y sustituir contenido
    })
}
//funcion para imprimir datos de titulares
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
	titulares.appendChild(fragment);
};

// funcion que remueve jugador titular del equipo
titulares.addEventListener('click', e => {
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
		titulares.classList.add('d-none');
		titulares.dataset.state = 'hide';
		partidos.classList.add('d-none');
		partidos.dataset.state = 'hide';
		if (convocados.dataset.state === 'view') {
			//comprueba si ya se abrió la pestaña, si es true agrega d-none y cambia el valor de data a hide
			convocados.classList.add('d-none');
			convocados.dataset.state = 'hide';
			titulares.classList.add('d-none');
			titulares.dataset.state = 'hide';
			return;
		}
		// si no quita la clase d-none y muestra el menu
		convocados.classList.remove('d-none');
		convocados.dataset.state = 'view';
	}

	if (e.target.id === 'btnTitulares') {
		convocados.classList.add('d-none');
		convocados.dataset.state = 'hide';
		partidos.classList.add('d-none');
		partidos.dataset.state = 'hide';

		if (titulares.dataset.state === 'view') {
			titulares.classList.add('d-none');
			titulares.dataset.state = 'hide';
			return;
		}
		titulares.classList.remove('d-none');
		titulares.dataset.state = 'view';
	}

	if (e.target.id === 'btnPartidos') {
		convocados.classList.add('d-none');
		convocados.dataset.state = 'hide';
		titulares.classList.add('d-none');
		titulares.dataset.state = 'hide';

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
