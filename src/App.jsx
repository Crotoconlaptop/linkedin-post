import { useState } from "react";

function App() {
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState("");
  const [idea, setIdea] = useState("");
  const [tipo, setTipo] = useState("opinión");
  const [mensaje, setMensaje] = useState("");

  const PASSWORD = "portafolio123"; // 👈 CAMBIÁ ESTO

  const verificar = () => {
    if (clave === PASSWORD) {
      setAutorizado(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const enviar = async () => {
    try {
      const res = await fetch("/.netlify/functions/enviar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idea, tipo }),
      });

      const text = await res.text();
      setMensaje(text === "OK" ? "✅ Enviado correctamente" : "❌ Falló el envío");
      setIdea("");
      setTipo("opinión");
    } catch (err) {
      setMensaje("💥 Error de red");
    }
  };

  if (!autorizado) {
    return (
      <div style={estilos.container}>
        <h2 style={estilos.titulo}>Acceso protegido</h2>
        <input
          type="password"
          placeholder="Ingresá la clave"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          style={estilos.input}
        />
        <button onClick={verificar} style={estilos.boton}>Entrar</button>
      </div>
    );
  }

  return (
    <div style={estilos.container}>
      <h2 style={estilos.titulo}>Publicar en LinkedIn</h2>

      <label>Idea</label>
      <input
        style={estilos.input}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Ej: La IA no reemplazará la empatía"
      />

      <label style={{ marginTop: "1rem" }}>Tipo</label>
      <select
        style={estilos.input}
        value={tipo}
        onChange={(e) => setTipo(e.target.value)}
      >
        <option value="opinión">Opinión</option>
        <option value="crítica">Crítica</option>
        <option value="historia">Historia</option>
      </select>

      <button onClick={enviar} style={estilos.boton}>ENVIAR</button>

      {mensaje && <p style={{ marginTop: "1rem" }}>{mensaje}</p>}
    </div>
  );
}

const estilos = {
  container: {
    maxWidth: "500px",
    margin: "40px auto",
    fontFamily: "Arial, sans-serif",
    padding: "2rem",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#f9f9f9",
  },
  titulo: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#34a853",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
  },
  boton: {
    backgroundColor: "#34a853",
    color: "white",
    padding: "12px",
    width: "100%",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  }
};

export default App;
