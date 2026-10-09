import { useState } from 'react';

// Importa todas las imágenes utilizadas:
import camaraEzviz from '../../assets/camaraEzviz.jpg';
import automatizacionEdificios from '../../assets/automatizacionEdificios.jpg';
import EnchufesInteligentes from '../../assets/EnchufesInteligentes.jpg';
import robotAspiradora1 from '../../assets/robotAspiradora1.jpg';
import termostatoInteligente from '../../assets/termostatoInteligente.jpg';
import aspiradorInteligente from '../../assets/aspiradorInteligente.jpg';
import imagenDomoticaGeneral from '../../assets/imagenDomoticaGeneral.jpeg';
import instalacionCamara from '../../assets/instalacionCamara.jpg';
import reparacionComputadores from '../../assets/reparacionComputadores.jpg';
import disenoPaginas from '../../assets/disenoPaginas.jpg';

// Diccionario mapeado con los nombres cortos que vienen del App.jsx
const imagenesLocales = {
  'imagenDomoticaGeneral': imagenDomoticaGeneral,
  'camaraEzviz': camaraEzviz,
  'automatizacionEdificios': automatizacionEdificios,
  'EnchufesInteligentes': EnchufesInteligentes,
  'robotAspiradora1': robotAspiradora1,
  'termostatoInteligente': termostatoInteligente,
  'aspiradorInteligente': aspiradorInteligente,
  'instalacionCamara': instalacionCamara,
  'reparacionComputadores': reparacionComputadores,
  'disenoPaginas': disenoPaginas
};

function TarjetaProducto({ nombre, precio, stock, detalle, imagen, children }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Selecciona la imagen local del mapa, o usa camaraEzviz por defecto si no la encuentra
  const fuenteImagen = imagenesLocales[imagen] || camaraEzviz;

  return (
    <div style={{
      perspective: "1000px",
      width: "100%",
      marginBottom: "20px"
    }}>
      {/* Caja que rota en 3D con altura fija garantizada */}
      <div style={{
        position: "relative",
        width: "100%",
        height: "460px",
        textAlign: "center",
        transition: "transform 0.6s",
        transformStyle: "preserve-3d",
        transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}>

        {/* ================= CARA FRONTAL ================= */}
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
            <span 
              onClick={() => setIsFlipped(true)}
              style={{ fontSize: "0.75rem", backgroundColor: "#e0f2fe", color: "#0369a1", padding: "4px 10px", borderRadius: "12px", fontWeight: "bold", cursor: "pointer", display: "inline-block" }}
            >
              🔄 Click para ver imagen
            </span>
            <h3 style={{ margin: "12px 0 8px 0", color: "#1e293b", fontSize: "1.2rem" }}>{nombre}</h3>
            <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "12px", lineHeight: "1.4" }}>{detalle}</p>
            <p style={{ fontWeight: "bold", fontSize: "1.3rem", color: "#2563eb", marginBottom: "4px" }}>${precio}</p>
            <p style={{ fontSize: "0.85rem", color: "#475569", marginBottom: "15px" }}>Stock disponible: {stock}</p>
          </div>

          <div>
            {children}
          </div>
        </div>
        
        {/* ================= CARA TRASERA (Imagen) ================= */}
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
          alignItems: "center",
          overflow: "hidden",
          boxSizing: "border-box",
          padding: "15px"
        }}>
          <div style={{ width: "100%", height: "340px", display: "flex", justifyContent: "center", alignItems: "center", overflow: "hidden", borderRadius: "8px" }}>
            <img 
              src={fuenteImagen} 
              alt={nombre} 
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover", 
                borderRadius: "8px" 
              }} 
            />
          </div>
          <span 
            onClick={() => setIsFlipped(false)}
            style={{
              position: "absolute",
              bottom: "15px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              color: "white",
              padding: "6px 14px",
              borderRadius: "6px",
              fontSize: "0.85rem",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            🔄 Click para volver a detalles
          </span>

        </div>

      </div>
    </div>
  );
}

export default TarjetaProducto;