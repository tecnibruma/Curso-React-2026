function TarjetaProducto({ nombre, precio, stock, children }) {
  const estiloTarjeta = {
    border: "1px solid #e5e7eb",
    borderRadius: "12px",
    padding: "20px",
    backgroundColor: "#ffffff", // Fondo blanco limpio
    color: "#1f2937",           // Texto oscuro legible
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%"              // Para que todas midan lo mismo en la fila
  };

  return (
    <div style={estiloTarjeta}>
      <div>
        <h3 style={{ fontSize: "1.1rem", marginBottom: "10px" }}>{nombre}</h3>
        <p><strong>Precio:</strong> ${precio}</p>
        <p><strong>Stock:</strong> {stock} unidades</p>
      </div>
      
      {/* Sección del children */}
      <div style={{ marginTop: "15px", borderTop: "1px dashed #e5e7eb", paddingTop: "12px" }}>
        {children}
      </div>
    </div>
  );
}

export default TarjetaProducto;