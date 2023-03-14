function App() {
  return (
    <div className="App">
      <h1>Shop list</h1>
      <form>
        <label htmlFor="">Producto</label>
        <input placeholder="mayonesa" type="text" />
        <label htmlFor="">unidades</label>
        <input defaultValue={1} type="number" />
        <label htmlFor="">Valor</label>
        <input placeholder="500" type="text" />
      </form>
      <h2>Lista de productos</h2>
      <ul>
        <li>
          <p>Mayonesa X10</p>
          <p>500</p>
        </li>
        <li>
          <p>Savora X3</p>
          <p>250</p>
        </li>
        <li>
          <p>Ketchup X5</p>
          <p>170</p>
        </li>
      </ul>
      <footer>
        <h2>Total</h2>
        <p>6600</p>
      </footer>
    </div>
  );
}

export default App;
