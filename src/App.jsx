import { useState } from 'react';
import Layout from './componentes/Layout/Layout';
import CuerpoPosteo from './componentes/CuerpoPosteo/CuerpoPosteo';
import TarjetaProducto from './componentes/Tarjeta/TarjetaProducto';
import ItemCount from './componentes/ItemCount/ItemCount';
import AdminPrecios from './componentes/Admin/AdminPrecios';

function App() {
  const [vistaActual, setVistaActual] = useState('cliente');
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [listaProductos, setListaProductos] = useState([
    { 
      id: 1, 
      nombre: "Control de Activos RFID", 
      precio: 1350000,
      stock: 12, 
      detalle: "Sistema inteligente para prevenir pérdidas de mercancía en comercios, fábricas o perfumerías mediante tecnología RFID.",
      imagen: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=500"
    },
    { 
      id: 2, 
      nombre: "Seguridad y Domótica", 
      precio: 1300000, 
      stock: 8, 
      detalle: "Integración de automatización en proyectos de seguridad perimetral y cuidado eficiente de recursos del hogar." ,
      imagen: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500"
    },
    { 
      id: 3, 
      nombre: "Monitoreo Senior Care", 
      precio: 2300000, 
      stock: 15, 
      detalle: "Soluciones de asistencia y cuidado inteligente orientadas a la seguridad y tranquilidad de adultos mayores." ,
      imagen: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500"
    }
  ]);

  const [carrito, setCarrito] = useState([]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'LibertadyAlma') {
      setIsAdminLogged(true);
      setPasswordInput('');
    } else {
      alert('Contraseña incorrecta. Acceso denegado.');
      setPasswordInput('');
    }
  };

  const handleActualizarPrecio = (id, nuevoPrecio) => {
    const productosActualizados = listaProductos.map((prod) => {
      if (prod.id === id) {
        return { ...prod, precio: nuevoPrecio };
      }
      return prod;
    });
    setListaProductos(productosActualizados);
  };

  // FUNCIÓN NUEVA: Agrega un producto dinámicamente al estado global del catálogo
  const handleAgregarProducto = (nuevoProducto) => {
    setListaProductos([...listaProductos, nuevoProducto]);
  };

  const handleAdd = (producto, cantidadElegida) => {
    const productoExistenteIndex = carrito.findIndex((item) => item.id === producto.id);

    if (productoExistenteIndex !== -1) {
      const carritoActualizado = [...carrito];
      carritoActualizado[productoExistenteIndex].cantidad += cantidadElegida;
      setCarrito(carritoActualizado);
    } else {
      const itemAgregado = {
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        cantidad: cantidadElegida
      };
      setCarrito([...carrito, itemAgregado]);
    }
  };

  const handleDecrementarDelCarrito = (id) => {
    const productoExistenteIndex = carrito.findIndex((item) => item.id === id);

    if (productoExistenteIndex !== -1) {
      const carritoActualizado = [...carrito];
      
      if (carritoActualizado[productoExistenteIndex].cantidad > 1) {
        carritoActualizado[productoExistenteIndex].cantidad -= 1;
        setCarrito(carritoActualizado);
      } else {
        const carritoFiltrado = carrito.filter((item) => item.id !== id);
        setCarrito(carritoFiltrado);
      }
    }
  };

  const handleIncrementarDelCarrito = (id, stockMaximo) => {
    const productoExistenteIndex = carrito.findIndex((item) => item.id === id);

    if (productoExistenteIndex !== -1) {
      const carritoActualizado = [...carrito];
      if (carritoActualizado[productoExistenteIndex].cantidad < stockMaximo) {
        carritoActualizado[productoExistenteIndex].cantidad += 1;
        setCarrito(carritoActualizado);
      } else {
        alert("Has alcanzado el límite del stock disponible.");
      }
    }
  };

  const handleEliminarCompleto = (id) => {
    const carritoFiltrado = carrito.filter((item) => item.id !== id);
    setCarrito(carritoFiltrado);
  };

  const totalCompra = carrito.reduce((acc, prod) => acc + (prod.precio * prod.cantidad), 0);

  return (
    <Layout>
      <CuerpoPosteo Texto="Innovación y seguridad aplicada a empresas y hogares" />

      {/* Barra de navegación superior para alternar vistas */}
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", margin: "20px 0" }}>
        <button 
          onClick={() => setVistaActual('cliente')}
          style={{
            padding: "10px 20px",
            backgroundColor: vistaActual === 'cliente' ? "#2563eb" : "#e2e8f0",
            color: vistaActual === 'cliente' ? "white" : "#1f2937",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🛒 Vista Cliente (Catálogo)
        </button>

        <button 
          onClick={() => setVistaActual('admin')}
          style={{
            padding: "10px 20px",
            backgroundColor: vistaActual === 'admin' ? "#2563eb" : "#e2e8f0",
            color: vistaActual === 'admin' ? "white" : "#1f2937",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          🔒 Acceso Administrador
        </button>
      </div>

      {vistaActual === 'cliente' ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", padding: "20px", maxWidth: "1200px", margin: "0 auto" }}>
            {listaProductos.map((producto) => (
              <TarjetaProducto
                key={producto.id}
                nombre={producto.nombre}
                precio={producto.precio}
                stock={producto.stock}
                detalle={producto.detalle}
              >
                <ItemCount 
                  stock={producto.stock} 
                  onAdd={(cantidadElegida) => handleAdd(producto, cantidadElegida)} 
                />
              </TarjetaProducto>
            ))}
          </div>

          <div style={{ maxWidth: "1200px", margin: "20px auto 50px auto", padding: "20px", border: "1px solid #e5e7eb", borderRadius: "12px", backgroundColor: "#fff" }}>
            <h3>🛒 Resumen de tu Carrito ({carrito.length} productos diferentes)</h3>
            {carrito.length === 0 ? (
              <p style={{ color: "#666" }}>Aún no has agregado productos al carrito.</p>
            ) : (
              <div>
                {carrito.map((item) => {
                  const productoOriginal = listaProductos.find((p) => p.id === item.id);
                  const stockMaximo = productoOriginal ? productoOriginal.stock : 99;

                  return (
                    <div key={item.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: "1px solid #f3f4f6" }}>
                      <div>
                        <strong style={{ fontSize: "1.05rem" }}>{item.nombre}</strong>
                        <span style={{ display: "block", color: "#666", fontSize: "0.9rem" }}>Precio unitario: ${item.precio} | Subtotal: ${item.precio * item.cantidad}</span>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <button 
                          onClick={() => handleDecrementarDelCarrito(item.id)}
                          style={{ padding: "6px 12px", backgroundColor: "#e2e8f0", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                          title="Restar una unidad"
                        >
                          -
                        </button>

                        <span style={{ fontWeight: "bold", minWidth: "25px", textAlign: "center", fontSize: "1rem" }}>{item.cantidad}</span>

                        <button 
                          onClick={() => handleIncrementarDelCarrito(item.id, stockMaximo)}
                          style={{ padding: "6px 12px", backgroundColor: "#e2e8f0", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
                          title="Sumar una unidad"
                        >
                          +
                        </button>

                        <button 
                          onClick={() => handleEliminarCompleto(item.id)}
                          style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "6px", cursor: "pointer", marginLeft: "10px", fontWeight: "bold" }}
                          title="Eliminar producto completo"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
                <hr style={{ margin: "15px 0" }} />
                <h3 style={{ textAlign: "right" }}>Total a Pagar: ${totalCompra}</h3>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ maxWidth: "500px", margin: "40px auto", padding: "30px", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #e2e8f0", textAlign: "center" }}>
          {!isAdminLogged ? (
            <form onSubmit={handleLogin}>
              <h2>🔐 Área Restringida</h2>
              <p style={{ color: "#666", marginBottom: "20px", fontSize: "0.9rem" }}>Ingrese la clave de administrador de TecniBruma para gestionar precios.</p>
              
              <input 
                type="password" 
                placeholder="Contraseña (ej: tecnibruma2026)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "6px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
              />
              
              <button 
                type="submit"
                style={{ width: "100%", padding: "10px", backgroundColor: "#2563eb", color: "white", border: "none", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" }}
              >
                Ingresar al Sistema
              </button>
            </form>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0 }}>Panel de Control Activo</h3>
                <button 
                  onClick={() => setIsAdminLogged(false)}
                  style={{ backgroundColor: "#ef4444", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer", fontSize: "0.85rem" }}
                >
                  Cerrar Sesión
                </button>
              </div>

              {/* AQUÍ ESTÁ LA CONEXIÓN CORRECTA CON AdminPrecios */}
              <AdminPrecios 
                productos={listaProductos} 
                onActualizarPrecio={handleActualizarPrecio} 
                onAgregarProducto={handleAgregarProducto}
              />
            </div>
          )}
        </div>
      )}
    </Layout>
  );
}

export default App;