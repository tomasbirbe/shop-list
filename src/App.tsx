import { useRef, useState } from "react";
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
  justifyContent: "space-between",
  height: "100%",
});

const Main = styled.main({
  display: "flex",
  paddingBlockEnd: "70px",
  flexDirection: "column",
  alignItems: "center",
  overflow: "auto",
});

const Title = styled.h1({
  lineHeight: "3",
});
const Subtitle = styled.h2({
  lineHeight: "3",
});

const Footer = styled.footer({
  justifySelf: "flex-end",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  position: "fixed",
  bottom: "0",
  height: "50px",
  width: "100%",
  background: "white",
});

function App() {
  const [products, setProducts] = useState<Product[]>(DEFAULT_PRODUCTS);
  const [openForm, setOpenForm] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [productToDelete, setProductToDelete] = useState("");

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

    form.reset();

    productInputRef.current?.focus();
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

  function handleCancel() {
    setShowAlert(false);
  }

  function handleConfirm() {
    deleteProduct();
    closeAlert();
  }

  return (
    <Container className="App">
      <Main>
        <Title>Shop list</Title>
        <Modal isOpen={openForm} onClose={handleOpenForm}>
          <AddProductForm forwardedRef={productInputRef} onSubmit={handleSubmit} />
        </Modal>
        <Alert
          isOpen={showAlert}
          message="Vas eliminar un producto de la lista, estas seguro?"
          title="Are you sure about that ?"
          onCancel={handleCancel}
          onClose={closeAlert}
          onConfirm={handleConfirm}
        />

        <Subtitle>Lista de productos</Subtitle>
        <ListOfProducts products={products} onDelete={handleDelete} />
      </Main>
      <Footer>
        <Subtitle>Total</Subtitle>
        <p>{calculateTotal()}</p>
      </Footer>
      <FloatingButton onClick={handleOpenForm}>+</FloatingButton>
    </Container>
  );
}

export default App;
