import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [id, setIdUsuario] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // El login.jsx actual ya está bien configurado:
  const enviarDatos = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const res = await fetch("http://localhost/Login/login.php", {
    method: "POST",
    credentials: 'include',
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        id: id,
        contrasena: contrasena
    })
});
      // Verifica si la respuesta es válida
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem('userRole', data.role);
        navigate(data.redirect);
      } else {
        setMensaje(data.error || "Error en el inicio de sesión");
      }
    } catch (error) {
      console.error("Error detallado:", error);
      setMensaje(`Error de conexión: ${error.message}`);
    }
  };


  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "20px" }}>
      <h1>Iniciar Sesión</h1>
      <div className="login">
        <form onSubmit={enviarDatos}>
          <div className="cerrar"></div>
          <label>Id del usuario: </label>
          <input
            type="text"
            className="usuario"
            name="id"
            min="1"
            max="6"
            placeholder="20219082"
            required
            value={id}
            onChange={e => setIdUsuario(e.target.value)}
          />
          <br />
          <label>Contraseña: </label>
          <input
            type="password"
            className="contrasena"
            name="contrasena"
            min="1"
            max="16"
            placeholder="Contraseña123"
            required
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
          />
          <br />
          <br />
          <input
            type="submit"
            name="login"
            value="Iniciar Sesion"
            id="boton"
          />
        </form>
        {mensaje && <div style={{ color: "red", marginTop: "10px" }}>{mensaje}</div>}
      </div>
    </div>
  );
}

export default Login;