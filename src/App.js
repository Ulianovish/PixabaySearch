import React, { useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import ListadoImagenes from './components/ListadoImagenes';

function App() {
	const [busqueda, setBusqueda] = useState('');
	const [imagenes, setImagenes] = useState([]);
	const [paginaActual, setPaginaActual] = useState(1);
	const [totalPaginas, setTotalPaginas] = useState(3);

	useEffect(() => {

		const conaultarApi = async () => {
			if (busqueda === '') return;

			const imagenesPorPagina = 30;
			const key = '15880644-4313aaa2b3c7eb46862517f23';
			const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

			const respuesta = await fetch(url);
			const resultado = await respuesta.json();

			setImagenes(resultado.hits);

			setTotalPaginas(Math.ceil(resultado.totalHits / imagenesPorPagina));

			const jumbotron = document.querySelector('.jumbotron')

			jumbotron.scrollIntoView({ behavior: 'smooth' });
		}

		conaultarApi();
	}, [busqueda, paginaActual])

	const paginaAnterior = () => {
		const nuevaPaginaActual = paginaActual - 1;

		if (nuevaPaginaActual === 0) return;
		setPaginaActual(nuevaPaginaActual);
	}

	const paginaSiguiente = () => {
		const nuevaPaginaActual = paginaActual + 1;

		if (nuevaPaginaActual > totalPaginas) return;
		setPaginaActual(nuevaPaginaActual);
	}

	return (
		<div className="container">
			<div className="jumbotron">
				<p className="lead text-center">Buscador de Imagenes</p>
				<Formulario
					setBusqueda={setBusqueda}
				/>
			</div>
			<div className="row justify-content-center">
				<ListadoImagenes imagenes={imagenes} />

				{(paginaActual === 1) ? null : (
					<button
						type="button"
						className="bbtn btn-info mr-1"
						onClick={paginaAnterior}
					>&laquo; Anterior</button>
				)}

				{(paginaActual === totalPaginas) ? null : (
					<button
						type="button"
						className="bbtn btn-info mr-1"
						onClick={paginaSiguiente}
					>Siguiente &raquo;</button>
				)}

			</div>
		</div>
	);
}

export default App;
