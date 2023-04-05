import { useEffect, useRef, useState } from "react";
import { getInputValuesFromEvent, isDuplicated } from "./utils";
import type { Product } from "./types";
import { ListOfProducts } from "./components/ListOfProducts";
import { AddProductForm } from "./components/AddProductForm";
import styled from "styled-components";
import { Modal } from "./components/Modal";
import { FloatingButton } from "./components/FloatingButton";
import { Alert } from "./components/Alert";

const DEFAULT_PRODUCTS = [
  { name: "prueba1", units: 1, value: 500 },
  { name: "prueba2", units: 1, value: 500 },
  { name: "prueba3", units: 1, value: 500 },
  { name: "prueba4", units: 1, value: 500 },
  { name: "prueba5", units: 1, value: 500 },
  { name: "prueba6", units: 1, value: 500 },
  { name: "prueba7", units: 1, value: 500 },
  { name: "prueba8", units: 1, value: 500 },
  { name: "prueba9", units: 1, value: 500 },
  { name: "prueba10", units: 1, value: 500 },
  { name: "prueba11", units: 1, value: 500 },
  { name: "prueba12", units: 1, value: 500 },
  { name: "prueba13", units: 1, value: 500 },
  { name: "prueba14", units: 1, value: 500 },
  { name: "prueba15", units: 1, value: 500 },
];

const Container = styled.div({
  display: "flex",
  flexDirection: "column",
  height: "100%",
  background: "#F6E697",
});

const Main = styled.main({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingBlock: "1.5em",
  overflow: "auto",
  height: "100%",
});

const Footer = styled.footer({
  justifySelf: "flex-end",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  width: "100%",
  background: "#F4E07E",
  minHeight: "70px",
  boxShadow: `0px -0.2px 0.2px rgba(157, 133, 14, 0.2) ,
    0.1px -0.6px 0.7px -0.8px rgba(157, 133, 14, 0.2) ,
    0.3px -1.4px 1.6px -1.7px rgba(157, 133, 14, 0.2) ,
    0.8px -3.5px 4px -2.5px rgba(157, 133, 14, 0.2) `,
});

function App() {
  const [products, setProducts] = useState<Product[]>(() => {
    const products = window.localStorage.getItem("products");

    if (products) {
      return JSON.parse(products);
    }

    return [];
  });
  const [openForm, setOpenForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");

  useEffect(() => {
    window.localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  function handleOpenForm() {
    setOpenForm(!openForm);
  }

  const productInputRef = useRef<null | HTMLInputElement>(null);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    let { productName, units, value } = getInputValuesFromEvent(event);

    const curatedProductName = productName.toLowerCase().trim();

    if (isDuplicated(products, curatedProductName)) {
      form.reset();

      productInputRef.current?.focus();

      return null;
    }

    value = Number(value);
    if (Number.isNaN(value)) {
      form.reset();

      productInputRef.current?.focus();

      return null;
    }
    setProducts([...products, { name: curatedProductName, units, value: Number(value) }]);

    // form.reset();

    setOpenForm(false);
  }

  function calculateTotal() {
    return products.reduce((acc, product) => product.value + acc, 0);
  }

  function deleteProduct() {
    const updatedProducts = products.filter((product) => product.name !== productToDelete);

    setProducts(updatedProducts);
  }

  function handleDelete(productName: Product["name"]) {
    setProductToDelete(productName);
    setShowAlert(true);
  }

  function closeAlert() {
    setShowAlert(false);
  }

  function handleConfirm() {
    deleteProduct();
    closeAlert();
  }

  return (
    <Container className="App">
      <Main>
        <Modal isOpen={openForm} onClose={handleOpenForm}>
          <AddProductForm forwardedRef={productInputRef} onSubmit={handleSubmit} />
        </Modal>
        <Alert
          isOpen={showAlert}
          message="Vas eliminar un producto de la lista, estas seguro?"
          title="Are you sure about that ?"
          onCancel={closeAlert}
          onClose={closeAlert}
          onConfirm={handleConfirm}
        />

        <ListOfProducts products={products} onDelete={handleDelete} />
      </Main>
      <Footer>
        <h2>Total</h2>
        <h2>${calculateTotal()}</h2>
      </Footer>
      <FloatingButton onClick={handleOpenForm}>+</FloatingButton>
    </Container>
  );
}

export default App;
