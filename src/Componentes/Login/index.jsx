import { useState } from 'react';
import { supabase } from '../../supabase';
import { Link, useNavigate } from 'react-router-dom';
import './style.css'; 

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) return alert(error.message);

    setUser(data.user);
    navigate('/'); // Redirige al home
  };

  return (
    <div className="formulario">
      <h2>Iniciar Sesión</h2>

      <label htmlFor="correo">Correo electrónico</label>
      <input
        id="correo"
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="clave">Contraseña</label>
      <input
        id="clave"
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Iniciar Sesión</button>

      <div className="link-registro">
        ¿No tienes cuenta? <Link to="/registro">Registrarse</Link>
      </div>
    </div>
  );
}

export default Login;






