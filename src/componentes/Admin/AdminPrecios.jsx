import { useState } from 'react';

function AdminPrecios({ productos, onActualizarPrecio, onAgregarProducto }) {
  const [preciosEditados, setPreciosEditados] = useState({});
  
  // Estados para el formulario de nuevo producto
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoPrecio, setNuevoPrecio] = useState('');
  const [nuevoStock, setNuevoStock] = useState('');
  const [nuevoDetalle, setNuevoDetalle] = useState('');
  const [nuevaImagen, setNuevaImagen] = useState(''); // Estado para la URL de la imagen

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

  // Manejador para enviar el formulario de producto nuevo
  const handleSubmitNuevo = (e) => {
    e.preventDefault();
    if (!nuevoNombre || !nuevoPrecio || !nuevoStock) {
      alert("Por favor, completa al menos el nombre, precio y stock.");
      return;
    }

    const productoParaAgregar = {
      id: Date.now(), // Genera un ID único basado en el tiempo actual
      nombre: nuevoNombre,
      precio: Number(nuevoPrecio),
      stock: Number(nuevoStock),
      detalle: nuevoDetalle || "Sin detalles especificados.",
      imagen: nuevaImagen || "https://via.placeholder.com/300" // URL de imagen o una por defecto si se deja vacío
    };

    onAgregarProducto(productoParaAgregar);

    // Limpiamos el formulario y la imagen
    setNuevoNombre('');
    setNuevoPrecio('');
    setNuevoStock('');
    setNuevoDetalle('');
    setNuevaImagen('');
    alert("¡Nuevo producto agregado al catálogo con éxito!");
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

          {/* AQUÍ COLOCAMOS EL CAMPO DE TEXTO PARA LA URL DE LA IMAGEN */}
          <input 
            type="text" 
            placeholder="URL de la imagen (ej: https://...)" 
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

      <h3>✏️ Modificar Precios Existentes</h3>
      {productos.map((prod) => (
        <div key={prod.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #e2e8f0" }}>
          <div>
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
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminPrecios;