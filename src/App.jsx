import { useState, useEffect } from 'react';
import Layout from './componentes/Layout/Layout';
import CuerpoPosteo from './componentes/CuerpoPosteo/CuerpoPosteo';
import TarjetaProducto from './componentes/Tarjeta/TarjetaProducto';
import ItemCount from './componentes/ItemCount/ItemCount';
import AdminPrecios from './componentes/Admin/AdminPrecios';

function App() {
  const [vistaActual, setVistaActual] = useState('cliente');
  const [isAdminLogged, setIsAdminLogged] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  const [listaProductos, setListaProductos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/api/productos')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
        return response.json();
      })
      .then(data => {
        // Aseguramos que siempre sea un array aunque el backend mande otra cosa
        if (Array.isArray(data)) {
          setListaProductos(data);
        } else {
          setListaProductos([]);
        }
      })
      .catch(error => {
        console.error('Error al obtener los productos del backend:', error);
        setListaProductos([]);
      });
  }, []);

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

  const handleAgregarProducto = (nuevoProducto) => {
    fetch('http://localhost:8080/api/productos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoProducto),
    })
      .then((response) => response.json())
      .then((productoGuardado) => {
        setListaProductos([...listaProductos, productoGuardado]);
        alert('¡Producto guardado y publicado con éxito en el backend!');
      })
      .catch((error) => {
        console.error('Error al guardar el producto:', error);
        alert('Hubo un error al intentar guardar el producto en el servidor.');
      });
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
          {/* GRILLA RESPONSIVE CON PROTECCIÓN DE ARRAY */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
            gap: "20px", 
            padding: "20px", 
            maxWidth: "1200px", 
            margin: "0 auto" 
          }}>
            {Array.isArray(listaProductos) && listaProductos.length > 0 ? (
              listaProductos.map((producto) => (
                <TarjetaProducto
                  key={producto.id}
                  nombre={producto.nombre}
                  precio={producto.precio}
                  stock={producto.stock}
                  detalle={producto.detalle || producto.descripcion}
                  imagen={producto.imagen}
                >
                  <ItemCount 
                    stock={producto.stock} 
                    onAdd={(cantidadElegida) => handleAdd(producto, cantidadElegida)} 
                  />
                </TarjetaProducto>
              ))
            ) : (
              <p style={{ gridColumn: "1 / -1", textAlign: "center", color: "#666", padding: "20px" }}>
                Cargando productos o esperando conexión con el servidor backend...
              </p>
            )}
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
                placeholder="Contraseña de administrador"
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