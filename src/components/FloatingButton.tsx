import styled from "styled-components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = styled.button({
  position: "fixed",
  bottom: "25px",
  right: "25px",
  borderRadius: "50%",
  height: "50px",
  width: "50px",
});

export function FloatingButton({ children, ...props }: Props) {
  return <Button {...props}>{children}</Button>;
}
