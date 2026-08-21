import Encabezado from './Encabezado';
import CuerpoPosteo from './CuerpoPosteo';
import PieDePosteo from './PieDePosteo';
import TarjetaProducto from './TarjetaProducto';

// 1. Declaramos la lista de productos (simulando backend)
const listaProductos = [
  { id: 1, nombre: "Sensor RFID Industrial", precio: 45000, stock: 12, detalle: "Color: Negro | Peso: 150g" },
  { id: 2, nombre: "Lector Biométrico de Acceso", precio: 85000, stock: 5, detalle: "Color: Gris | Peso: 300g" },
  { id: 3, nombre: "Central Domótica Insteon", precio: 120000, stock: 8, detalle: "Color: Blanco | Peso: 500g" }
];

function App() {
  return (
    <div>
      <Encabezado Titulo="Mi presentacion en React" />
      <CuerpoPosteo Texto="Todo lo que desarrollemos como Body" />
      
      {/* 2. Contenedor con CSS Grid para alinear de a 3 */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px", margin: "20px 0" }}>
        {listaProductos.map((producto) => (
          <TarjetaProducto 
            key={producto.id} 
            nombre={producto.nombre} 
            precio={producto.precio} 
            stock={producto.stock}
          >
            <p>{producto.detalle}</p>
            <button style={{ backgroundColor: "#8B5CF6", color: "white", border: "none", padding: "8px 12px", borderRadius: "4px", cursor: "pointer" }}>
              Agregar al Carrito
            </button>
          </TarjetaProducto>
        ))}
      </div>

      <PieDePosteo Footer="Todo lo que hagamos para el pie de pagina" />
    </div>
  );
}

export default App;