import { useState } from 'react';
import { supabase } from '../../supabase';
import { Link } from 'react-router-dom';

function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [telefono, setTelefono] = useState('');

  const registrar = async () => {
    if (!nombre || !email || !password || !fechaNacimiento || !telefono) {
      alert('Por favor completa todos los campos.');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) return alert(error.message);

    await supabase.from('usuario').insert({
      id: data.user.id,
      nombre,
      correo: email,
      fecha_nacimiento: fechaNacimiento,
      telefono,
      roll: 'user',
    });

    alert('Registro exitoso. Revisa tu correo para confirmar tu cuenta.');
  };

  return (
    <div>
      <h2>Registro</h2>
      <input
        type="text"
        placeholder="Nombre completo"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
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
      <input
        type="date"
        placeholder="Fecha de nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <button onClick={registrar}>Registrarse</button>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Registro;

