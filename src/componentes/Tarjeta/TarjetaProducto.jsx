import { useState } from 'react';

function TarjetaProducto({ nombre, precio, stock, detalle, imagen, children }) {
  // Opcional: estado para girar al hacer clic (en mobile es mejor el click que el hover)
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="card-container"
      onClick={() => setIsFlipped(!isFlipped)} // Gira al hacer clic (ideal para celulares y compu)
      style={{
        perspective: "1000px",
        width: "100%",
        minHeight: "420px",
        cursor: "pointer"
      }}
    >
      {/* Caja que rota en 3D */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}>

        {/* ================= CARA FRONTAL (Información, precio y contador) ================= */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          backgroundColor: "#fff",
          borderRadius: "12px",
          border: "1px solid #e2e8f0",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          boxSizing: "border-box"
        }}>
          <div>
            <span style={{ fontSize: "0.75rem", backgroundColor: "#e0f2fe", color: "#0369a1", padding: "3px 8px", borderRadius: "12px", fontWeight: "bold" }}>
              🔄 Click para ver imagen
            </span>
            <h3 style={{ margin: "12px 0 8px 0", color: "#1e293b", fontSize: "1.2rem" }}>{nombre}</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "12px", lineHeight: "1.4" }}>{detalle}</p>
            <p style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#2563eb", marginBottom: "4px" }}>${precio}</p>
            <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "15px" }}>Stock disponible: {stock}</p>
          </div>

          {/* El ItemCount o botones que le inyectamos desde App */}
          <div onClick={(e) => e.stopPropagation()}> {/* Evita que al tocar el contador gire la tarjeta */}
            {children}
          </div>
        </div>


        {/* ================= CARA TRASERA (La Imagen del Producto) ================= */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backfaceVisibility: "hidden",
          backgroundColor: "#1e293b",
          color: "white",
          borderRadius: "12px",
          transform: "rotateY(180deg)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItem: "center",
          overflow: "hidden",
          boxSizing: "border-box",
          padding: "10px"
        }}>
          <img 
            src={imagen} 
            alt={nombre} 
            style={{ 
              width: "100%", 
              height: "100%", 
              objectFit: "cover", 
              borderRadius: "8px" 
            }} 
          />
          <span style={{
            position: "absolute",
            bottom: "15px",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "5px 12px",
            borderRadius: "6px",
            fontSize: "0.8rem",
            fontWeight: "bold"
          }}>
            🔄 Click para volver a detalles
          </span>
        </div>

      </div>
    </div>
  );
}

export default TarjetaProducto;