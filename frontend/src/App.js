/* Enunciado:
Como objetivo final debemos desarrollar un frontal que tenga la siguiente funcionalidad:

- Deberá mostrar todos los productos al entrar a la aplicación
- Formulario de filtrado (Relevancia, precio y marca)
- Debemos poder ordenar por precio de manera ascendiente y descendiente
- Componente para paginación que nos permita navegar entre los productos, debe mostrar en la página en la que estás, el total de productos y páginas
- Al seleccionar un producto, mostraremos los datos relativos a este y su fabricante
*/

import "./App.css";
import Header from "./components/header/Header";
import Container from "./components/container/Container";
import Footer from "./components/footer/Footer";

function App() {
  return (
    <div className="App">
      <Header title="Concesionario Mezquita" description="Tus vehículos de ocasión, con la mejor calidad y al mejor precio" />
      <Container title="Elige tu vehículo"></Container>
      <Footer />
    </div>
  );
}

export default App;
