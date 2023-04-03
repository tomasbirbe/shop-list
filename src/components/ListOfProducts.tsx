import styled from "styled-components";
import type { Product } from "../types";

type Props = {
  products: Product[];
  onDelete: (productName: string) => void;
};

const List = styled.ul({
  listStyle: "none",
  padding: "0",
  width: "80%",
});

const Product = styled.li({
  display: "flex",
  justifyContent: "space-between",
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
          <button onClick={() => onDelete(product.name)}>X</button>
        </Product>
      ))}
    </List>
  );
}
