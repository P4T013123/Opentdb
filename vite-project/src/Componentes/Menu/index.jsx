import './style.css';

function Menu({ setTabSeleccionada }) {
  return (
    <nav className="menu">
      <button onClick={() => setTabSeleccionada('Aleatorios')}>Inicio</button>
      <button onClick={() => setTabSeleccionada('Lista')}>Lista</button>
      <button onClick={() => setTabSeleccionada('Filtro')}>Filtro</button>
      <button onClick={() => setTabSeleccionada('Favoritos')}>Favoritos</button>
      <button onClick={() => setTabSeleccionada('Otras')}>Otras</button>
      <button onClick={() => setTabSeleccionada('Respuestas')}>Respuestas</button>
    </nav>
  );
}

export default Menu;
