import './style.css';

function Favoritos({ favoritos }) {
  return (
    <div className="contenedor">
      <h1>Favoritos</h1>
      {favoritos.length === 0 ? (
        <p>No has agregado preguntas a favoritos.</p>
      ) : (
        favoritos.map((pregunta, index) => (
          <div key={index} className="carta">
            <h3 dangerouslySetInnerHTML={{ __html: pregunta.question }} />
          </div>
        ))
      )}
      <p>Progreso: {favoritos.length} favoritos agregados.</p>
    </div>
  );
}

export default Favoritos;
