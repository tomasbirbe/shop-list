import styled from "styled-components";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

const Button = styled.button({
  position: "fixed",
  bottom: "35px",
  right: "calc(50% - 30px)",
  borderRadius: "50%",
  height: "60px",
  width: "60px",
  border: "none",
  background: "#DA2C38",
  boxShadow: `0px -0.2px 0.2px rgba(157, 133, 14, 1) ,
    0.1px -0.6px 0.7px -0.8px rgba(157, 133, 14, 1) ,
    0.3px -1.4px 1.6px -1.7px rgba(157, 133, 14, 1) ,
    0.8px -3.5px 4px -2.5px rgba(157, 133, 14, 1) `,
  color: "white",
  fontSize: "2em",
  cursor: "pointer",
});

const RoundedForm = styled.div({});

export function FloatingButton({ children, ...props }: Props) {
  return (
    <>
      <Button {...props}>{children}</Button>
      <RoundedForm />
    </>
  );
}
