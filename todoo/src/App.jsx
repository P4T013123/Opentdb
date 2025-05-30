import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { supabase } from './supabase';

import Aleatorios from './Componentes/Aleatorios';
import Favoritos from './Componentes/Favoritos';
import Filtro     from './Componentes/Filtro';
import Lista      from './Componentes/Lista';
import Menu       from './Componentes/Menu';
import Login      from './Componentes/Login';
import Registro   from './Componentes/Registro';

import './index.css';

function App() {
  const [user, setUser]         = useState(null);
  const [preguntas,  setPreguntas]  = useState([]);
  const [favoritos,  setFavoritos]  = useState([]);
  const [busqueda,   setBusqueda]   = useState('');

  const navigate = useNavigate();

  /* ───────────────── Sesión ───────────────── */
  useEffect(() => {
    supabase.auth.getSession()
      .then(({ data: { session } }) => setUser(session?.user ?? null));

    supabase.auth.onAuthStateChange((_evt, session) =>
      setUser(session?.user ?? null)
    );
  }, []);

  /* ──────────────── Favoritos ─────────────── */
  useEffect(() => { user ? cargarFavoritos() : setFavoritos([]); }, [user]);

  const cargarFavoritos = async () => {
    const { data, error } = await supabase
      .from('capturados')
      .select('*')
      .eq('usuarioid', user.id);

    if (error) {
      console.error('Error al cargar favoritos:', error.message);
      return;
    }

    const preguntasFav = data.flatMap(f => f.capturados);
    setFavoritos(preguntasFav.map(q => ({ question: q })));
  };

  const agregarFavorito = async pregunta => {
    if (!user) return alert('Inicia sesión para guardar favoritos.');
    if (favoritos.some(f => f.question === pregunta.question)) return;

    const { error } = await supabase.from('capturados').insert({
      capturados: [pregunta.question],
      usuarioid : user.id,
    });

    if (error) {
      console.error('Error al guardar favorito:', error.message);
    } else {
      setFavoritos([...favoritos, pregunta]);
    }
  };

  /* ───────────────── Logout ───────────────── */
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setFavoritos([]);
    navigate('/login');
  };

  /* ────────────── Ruta privada ────────────── */
  const RutaPrivada = ({ children }) =>
    user ? children : <Navigate to="/login" replace />;

  /* ───────────────── Render ───────────────── */
  return (
    <>
      {/* Barra superior de sesión */}
      {user && (
        <div style={{ padding:'10px', background:'#f0f0f0' }}>
          <span>Sesión: {user.email}</span>
          <button onClick={logout} style={{ marginLeft:'10px' }}>
            Cerrar sesión
          </button>
        </div>
      )}

      {/* Rutas principales */}
      <Routes>
        <Route path="/login"    element={<Login setUser={setUser} />} />
        <Route path="/registro" element={<Registro />} />

        <Route
          path="/"
          element={
            <RutaPrivada>
              <Aleatorios agregarFavorito={agregarFavorito} />
            </RutaPrivada>
          }
        />
        <Route
          path="/lista"
          element={
            <RutaPrivada>
              <Lista preguntas={preguntas} agregarFavorito={agregarFavorito} />
            </RutaPrivada>
          }
        />
        <Route
          path="/filtro"
          element={
            <RutaPrivada>
              <Filtro
                setPreguntas={setPreguntas}
                busqueda={busqueda}
                setBusqueda={setBusqueda}
              />
            </RutaPrivada>
          }
        />
        <Route
          path="/favoritos"
          element={
            <RutaPrivada>
              <Favoritos favoritos={favoritos} />
            </RutaPrivada>
          }
        />

        {/* Cualquier ruta desconocida → home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* Menú visible sólo si hay sesión */}
      {user && <Menu />}
    </>
  );
}

export default App;

