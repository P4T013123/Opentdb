import { useState } from 'react';
import Aleatorios from './Componentes/Aleatorios';
import Favoritos from './Componentes/Favoritos';
import Filtro from './Componentes/Filtro';
import Lista from './Componentes/Lista';
import Menu from './Componentes/Menu';
import './index.css';

function App() {
  const [tabSeleccionada, setTabSeleccionada] = useState('Aleatorios');
  const [favoritos, setFavoritos] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [preguntas, setPreguntas] = useState([]);

  const agregarFavorito = (pregunta) => {
    if (!favoritos.some(fav => fav.question === pregunta.question)) {
      setFavoritos([...favoritos, pregunta]);
    }
  };

  const renderizarContenido = () => {
    switch(tabSeleccionada) {
      case 'Aleatorios':
        return <Aleatorios agregarFavorito={agregarFavorito} />;
      case 'Lista':
        return <Lista preguntas={preguntas} agregarFavorito={agregarFavorito} />;
      case 'Filtro':
        return <Filtro setPreguntas={setPreguntas} busqueda={busqueda} setBusqueda={setBusqueda} />;
      case 'Favoritos':
        return <Favoritos favoritos={favoritos} />;
      // Agrega más pestañas si necesitas
      default:
        return <Aleatorios agregarFavorito={agregarFavorito} />;
    }
  };

  return (
    <div className="App">
      {renderizarContenido()}
      <Menu setTabSeleccionada={setTabSeleccionada} />
    </div>
  );
}

export default App;
