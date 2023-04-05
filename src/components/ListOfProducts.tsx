import styled from "styled-components";
import type { Product } from "../types";

type Props = {
  products: Product[];
  onDelete: (productName: string) => void;
};

const List = styled.ul({
  listStyle: "none",
  padding: "0",
  width: "90%",
  display: "flex",
  flexDirection: "column",
  gap: "15px",
});

const Product = styled.li({
  display: "flex",
  justifyContent: "space-between",
  background: "#F8EBAC",
  paddingBlock: "8px",
  paddingInline: "16px",
  borderRadius: "4px",
});

const Button = styled.button({
  background: "transparent",
  border: "none",
  fontWeight: "bold",
  cursor: "pointer",
});

export function ListOfProducts({ products, onDelete }: Props) {
  return (
    <List>
      {products.map((product) => (
        <Product key={product.name}>
          <div>
            <p>
              {product.name} X{product.units}
            </p>
            <small>{product.value}</small>
          </div>
          <Button onClick={() => onDelete(product.name)}>X</Button>
        </Product>
      ))}
    </List>
  );
}
