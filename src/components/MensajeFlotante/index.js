import "./mensaje.css";

function MensajeFlotante({ texto, tipo = "info" }) {
  return (
    <div className={`mensaje-flotante ${tipo}`}>
      {texto}
    </div>
  );
}

export default MensajeFlotante;
