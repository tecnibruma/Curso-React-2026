// src/componentes/Layout/Layout.jsx

import Encabezado from '../Encabezado/Encabezado';
import PieDePosteo from '../PieDePosteo/PieDePosteo';

function Layout({ children }) {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div>
        <Encabezado Titulo="Tecnibruma - Soluciones Tecnológicas" />
        <main>
          {children}
        </main>
      </div>

      {/* Aquí sumamos el componente que ya habías importado */}
      <PieDePosteo />
    </div>
  );
}

export default Layout;