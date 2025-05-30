import { useNavigate } from 'react-router-dom';
import './style.css';

function Menu() {
  const navigate = useNavigate();

  return (
    <nav className="menu">
      <button onClick={() => navigate('/')}>Inicio</button>
      <button onClick={() => navigate('/lista')}>Lista</button>
      <button onClick={() => navigate('/filtro')}>Filtro</button>
      <button onClick={() => navigate('/favoritos')}>Favoritos</button>
      <button onClick={() => navigate('/otras')}>Otras</button>
      <button onClick={() => navigate('/respuestas')}>Respuestas</button>
    </nav>
  );
}

export default Menu;


