import { useState } from 'react';
import { supabase } from '../../supabase';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Iniciar Sesión</button>
      <p>¿No tienes cuenta? <Link to="/registro">Registrarse</Link></p>
    </div>
  );
}

export default Login;





