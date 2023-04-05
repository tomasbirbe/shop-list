import styled from "styled-components";

type Props = {
  forwardedRef: React.MutableRefObject<HTMLInputElement | null>;
  onSubmit: (event: React.FormEvent) => void;
};

const Form = styled.form({
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
  gap: "7px",
});

const Button = styled.button({
  background: "#DA2C38",
  color: "white",
  rounded: "4px",
  border: "none",
  paddingBlock: "8px",
  paddingInline: "4px",
  borderRadius: "4px",
  cursor: "pointer",
});

const Input = styled.input({
  background: "transparent",
  border: "none",
  borderBlockEnd: "1px solid black",
  "&:focus-visible": {
    outline: "none",
  },
});

const Title = styled.h1({
  fontSize: "1.5em",
});

export function AddProductForm({ onSubmit, forwardedRef }: Props) {
  return (
    <Form onSubmit={onSubmit}>
      <Title>Agregar un producto</Title>
      <InputContainer>
        <label htmlFor="">Producto</label>
        <Input ref={forwardedRef} autoFocus id="productName" placeholder="mayonesa" type="text" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="">Valor</label>
        <Input id="value" placeholder="500" type="number" />
      </InputContainer>
      <InputContainer>
        <label htmlFor="">Unidades</label>
        <Input defaultValue="1" id="units" type="number" />
      </InputContainer>
      <Button type="submit">Guardar producto</Button>
    </Form>
  );
}
