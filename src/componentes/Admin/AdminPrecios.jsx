import { useState } from 'react';

function AdminPrecios({ productos, onActualizarPrecio, onAgregarProducto, onEliminarProducto }) {
  const [preciosEditados, setPreciosEditados] = useState({});
  
  // Estados para el formulario de nuevo producto
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');
  const [nuevoDetalle, setNuevoDetalle] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState('');

  const handleInputChange = (id, valor) => {
    setPreciosEditados({ ...preciosEditados, [id]: valor });
  };

  const handleGuardarPrecio = (id) => {
    const precioFinal = Number(preciosEditados[id]);
    if (precioFinal > 0) {
      onActualizarPrecio(id, precioFinal);
      alert("¡Precio actualizado con éxito!");
    } else {
      alert("Por favor, ingresa un precio válido.");
    }
  };

  const handleSubmitNuevo = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio || !nuevoStock) {
      alert("Por favor, completa al menos el nombre, precio y stock.");
      return;
    }

    const productoParaAgregar = {
      id: Date.now(),
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      stock: Number(nuevoStock),
      detalle: nuevoDetalle || "Sin detalles especificados.",
      imagen: nuevaImagen || "camaraEzviz.jpg"
    };

    onAgregarProducto(productoParaAgregar);

    setNuevoNombre('');
    setNuevoPrecio('');
    setNuevoStock('');
    setNuevoDetalle('');
    setNuevaImagen('');
  };

  return (
    <div style={{ maxWidth: "800px", margin: "30px auto", padding: "20px", border: "2px solid #2563eb", borderRadius: "12px", backgroundColor: "#f8fafc" }}>
      <h2>🛠️ Panel de Gestión - TecniBruma</h2>
      
      {/* FORMULARIO PARA AGREGAR NUEVO PRODUCTO */}
      <form onSubmit={handleSubmitNuevo} style={{ marginBottom: "30px", padding: "15px", backgroundColor: "#fff", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
        <h3>➕ Agregar Nuevo Producto / Servicio</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <input 
            type="text" 
            placeholder="Nombre del servicio" 
            value={nuevoNombre}
            onChange={(e) => setNuevoNombre(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />
          <input 
            type="number" 
            placeholder="Precio ($)" 
            value={nuevoPrecio}
            onChange={(e) => setNuevoPrecio(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "10px", marginBottom: "10px" }}>
          <input 
            type="number" 
            placeholder="Stock inicial" 
            value={nuevoStock}
            onChange={(e) => setNuevoStock(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />

          <input 
            type="text" 
            placeholder="Nombre de imagen (ej: camaraEzviz.jpg)" 
            value={nuevaImagen}
            onChange={(e) => setNuevaImagen(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
          />

          <textarea 
            placeholder="Detalle o descripción del servicio" 
            value={nuevoDetalle}
            onChange={(e) => setNuevoDetalle(e.target.value)}
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #cbd5e1", resize: "vertical" }}
          />
        </div>

        <button 
          type="submit"
          style={{ backgroundColor: "#16a34a", color: "white", border: "none", padding: "10px 15px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold", width: "100%" }}
        >
          Guardar y Publicar Producto
        </button>
      </form>

      <hr style={{ margin: "20px 0" }} />

      <h3>✏️ Modificar Precios o Eliminar Productos</h3>
      
      {/* VALIDACIÓN DE PRODUCTOS */}
      {Array.isArray(productos) && productos.length > 0 ? (
        productos.map((prod) => (
          <div key={prod.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
            <div style={{ textAlign: "left" }}>
              <strong>{prod.nombre}</strong>
              <span style={{ display: "block", fontSize: "0.9rem", color: "#666" }}>Precio actual: ${prod.precio}</span>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input 
                type="number" 
                placeholder="Nuevo precio"
                defaultValue={prod.precio}
                onChange={(e) => handleInputChange(prod.id, e.target.value)}
                style={{ padding: "6px", width: "110px", borderRadius: "4px", border: "1px solid #cbd5e1" }}
              />
              <button 
                onClick={() => handleGuardarPrecio(prod.id)}
                style={{ backgroundColor: "#2563eb", color: "white", border: "none", padding: "7px 14px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
              >
                Actualizar
              </button>
              <button 
                onClick={() => {
                  if (window.confirm(`¿Estás seguro de eliminar "${prod.nombre}"?`)) {
                    onEliminarProducto(prod.id);
                  }
                }}
                style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "7px 12px", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                title="Eliminar producto"
              >
                🗑️
              </button>
            </div>
          </div>
        ))
      ) : (
        <p style={{ color: "#666", textAlign: "center" }}>No hay productos cargados para gestionar.</p>
      )}
    </div>
  );
}

export default AdminPrecios;