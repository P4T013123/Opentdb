import './style.css';

function Lista({ preguntas, agregarFavorito }) {
  return (
    <div className="contenedor">
      <h1>Lista de Preguntas</h1>
      {preguntas.length === 0 ? (
        <p>No hay preguntas, usa el filtro</p>
      ) : (
        preguntas.map((pregunta, index) => (
          <div key={index} className="carta">
            <h3 dangerouslySetInnerHTML={{ __html: pregunta.question }} />
            <button onClick={() => agregarFavorito(pregunta)}>⭐ Favorito</button>
          </div>
        ))
      )}
    </div>
  );
}

export default Lista;
