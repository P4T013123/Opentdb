import { useState, useEffect } from "react";
import './style.css';

function Aleatorios({ agregarFavorito }) {
  const [preguntas, setPreguntas] = useState([]);
  const [preguntasFiltradas, setPreguntasFiltradas] = useState([]);
  const [dificultadSeleccionada, setDificultadSeleccionada] = useState('');
  const [inputBusqueda, setInputBusqueda] = useState('');

  const cargarPreguntas = () => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const preguntasConId = data.results.map((pregunta, index) => ({
          ...pregunta,
          id: index + 1
        }));
        setPreguntas(preguntasConId);
        setPreguntasFiltradas(preguntasConId);
      });
  };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  const filtrarPreguntas = (texto, dificultad = dificultadSeleccionada) => {
    const textoMinuscula = texto.toLowerCase();
  
    const resultado = preguntas.filter(p =>
      (p.id.toString().includes(textoMinuscula) || p.question.toLowerCase().includes(textoMinuscula)) &&
      (dificultad === '' || p.difficulty === dificultad)
    );
  
    setPreguntasFiltradas(resultado);
  };
  

  return (
    <div className="contenedor">
      <h1>Preguntas Aleatorias</h1>
      <button className="boton-recargar" onClick={cargarPreguntas}>🔄 Cargar Nuevas Preguntas</button>
      
      <input
  type="text"
  placeholder="Buscar pregunta por ID o texto..."
  value={inputBusqueda}
  onChange={(e) => {
    setInputBusqueda(e.target.value);
    filtrarPreguntas(e.target.value, dificultadSeleccionada);
  }}
  className="input-buscador"
/>

      {preguntasFiltradas.length > 0 ? (
        preguntasFiltradas.map((pregunta, index) => (
          <div key={index} className="carta">
            <h3 dangerouslySetInnerHTML={{ __html: pregunta.question }} />
            <button onClick={() => agregarFavorito(pregunta)}>⭐ Favorito</button>
            <select
  value={dificultadSeleccionada}
  onChange={(e) => {
    setDificultadSeleccionada(e.target.value);
    filtrarPreguntas(inputBusqueda, e.target.value); // también filtramos al cambiar
  }}
  className="select-dificultad"
>
  <option value="">Todas las dificultades</option>
  <option value="easy">Fácil</option>
  <option value="medium">Medio</option>
  <option value="hard">Difícil</option>
</select>
          </div>
        ))
      ) : (
        <p>No se encontraron preguntas.</p>
      )}
    </div>
  );
}

export default Aleatorios;


