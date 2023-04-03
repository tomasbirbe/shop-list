import styled from "styled-components";

type Props = {
  forwardedRef: React.MutableRefObject<HTMLInputElement | null>;
  onSubmit: (event: React.FormEvent) => void;
};

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "7px",
});

export function AddProductForm({ onSubmit, forwardedRef }: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <label htmlFor="">Producto</label>
      <input ref={forwardedRef} autoFocus id="productName" placeholder="mayonesa" type="text" />
      <label htmlFor="">Valor</label>
      <input id="value" placeholder="500" type="number" />
      <label htmlFor="">unidades</label>
      <input defaultValue="1" id="units" type="number" />
      <button type="submit">Guardar producto</button>
    </Form>
  );
}
