import { useState, useRef, useEffect } from "react";

function App() {
  const [autorizado, setAutorizado] = useState(false);
  const [clave, setClave] = useState("");
  const [idea, setIdea] = useState("");
  const [tipo, setTipo] = useState("opinión");
  const [mensaje, setMensaje] = useState("");

  const textareaRef = useRef(null);

  const PASSWORD = "portafolio123";

  const verificar = () => {
    if (clave === PASSWORD) {
      setAutorizado(true);
    } else {
      alert("Contraseña incorrecta");
    }
  };

  const enviar = async () => {
    try {
      const res = await fetch("/api/enviar", {
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

  // autoexpansión del textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [idea]);

  return (
    <div style={estilos.fondo}>
      <div style={estilos.container}>
        {!autorizado ? (
          <>
            <h2 style={estilos.titulo}>Acceso protegido</h2>
            <input
              type="password"
              placeholder="Ingresá la clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              style={estilos.input}
            />
            <button onClick={verificar} style={estilos.boton}>Entrar</button>
          </>
        ) : (
          <>
            <h2 style={estilos.titulo}>Publicar en LinkedIn</h2>

            <label>Idea</label>
            <textarea
              ref={textareaRef}
              style={estilos.textarea}
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

            {mensaje && <p style={{ marginTop: "1rem", textAlign: "center" }}>{mensaje}</p>}
          </>
        )}
      </div>
    </div>
  );
}

const estilos = {
  fondo: {
    height: "100vh",
    width: "100vw",
    backgroundColor: "#1d2226",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1rem",
    boxSizing: "border-box",
  },
  container: {
    maxWidth: "500px",
    width: "100%",
    backgroundColor: "#2c2f33",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
    color: "#fff",
  },
  titulo: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#0a66c2",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginTop: "5px",
    marginBottom: "10px",
    backgroundColor: "#3b3f45",
    border: "1px solid #555",
    borderRadius: "5px",
    color: "#fff",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    border: "1px solid #555",
    borderRadius: "5px",
    resize: "none",
    overflow: "hidden",
    minHeight: "80px",
    fontFamily: "inherit",
    fontSize: "14px",
    boxSizing: "border-box",
    marginTop: "5px",
    marginBottom: "10px",
    backgroundColor: "#3b3f45",
    color: "#fff",
  },
  boton: {
    backgroundColor: "#0a66c2",
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
