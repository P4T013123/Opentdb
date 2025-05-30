import './style.css';

function Filtro({ setPreguntas, busqueda, setBusqueda }) {

  const buscarPreguntas = () => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${busqueda}`)
      .then(response => response.json())
      .then(data => setPreguntas(data.results));
  };

  return (
    <div className="contenedor">
      <h1>Filtro de Preguntas</h1>
      <input 
        type="text" 
        placeholder="ID de categoría..." 
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={buscarPreguntas}>Buscar</button>
    </div>
  );
}

export default Filtro;
