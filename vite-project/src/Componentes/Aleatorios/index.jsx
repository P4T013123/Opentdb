import { useState, useEffect } from "react";
import './style.css';

function Aleatorios({ agregarFavorito }) {
  const [preguntas, setPreguntas] = useState([]);

  const cargarPreguntas = () => {
    fetch('https://opentdb.com/api.php?amount=10')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setPreguntas(data.results);
      });
  };

  useEffect(() => {
    cargarPreguntas();
  }, []);

  return (
    <div className="contenedor">
      <h1>Preguntas Aleatorias</h1>
      <button className="boton-recargar" onClick={cargarPreguntas}>🔄 Cargar Nuevas Preguntas</button>
      {preguntas && preguntas.length > 0 ? (
        preguntas.map((pregunta, index) => (
          <div key={index} className="carta">
            <h3 dangerouslySetInnerHTML={{ __html: pregunta.question }} />
            <button onClick={() => agregarFavorito(pregunta)}>⭐ Favorito</button>
          </div>
        ))
      ) : (
        <p>Cargando preguntas...</p>
      )}
    </div>
  );
}

export default Aleatorios;

