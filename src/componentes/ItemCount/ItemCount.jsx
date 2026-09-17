import { useState } from 'react';

function ItemCount({ stock, initial = 1, onAdd }) {
                                                               // 1. Estado local para la cantidad seleccionada
  const [cantidad, setCantidad] = useState(initial);

                                                             // 2. Funciones para incrementar y decrementar respetando el stock
  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
      {/* Controles de más y menos */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <button 
          onClick={decrementar}
          style={{ padding: '5px 12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          -
        </button>
        
        <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{cantidad}</span>
        
        <button 
          onClick={incrementar}
          style={{ padding: '5px 12px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          +
        </button>
      </div>

      {/* Botón de confirmar compra / agregar al carrito */}
      <button 
        onClick={() => onAdd(cantidad)}
        disabled={stock === 0}
        style={{
          backgroundColor: stock === 0 ? '#ccc' : '#2563eb',
          color: 'white',
          border: 'none',
          padding: '8px 16px',
          borderRadius: '6px',
          cursor: stock === 0 ? 'not-allowed' : 'pointer',
          fontWeight: 'bold',
          width: '100%'
        }}
      >
        {stock === 0 ? 'Sin Stock' : 'Agregar al Carrito'}
      </button>
    </div>
  );
}

export default ItemCount;