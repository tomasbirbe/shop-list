import styled from "styled-components";
import { Portal } from "./Portal";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  message: string;
  title?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const AlertContainer = styled.div({
  gridArea: "2 / 2 / 3 / 3",
  background: "#F4E07E",
  maxWidth: "400px",
  minWidth: "300px",
  width: "fit-content",
  height: "fit-content",
  placeSelf: "center",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  paddingBlock: "18px",
  alignItems: "center",
});
const Overlay = styled.div({
  gridArea: "1 / 1 / -1 / -1",
  background: "rgba(0,0,0,0.25)",
});

const Container = styled.div({
  position: "fixed",
  display: "grid",
  gridTemplateColumns: "repeat(3,1fr)",
  gridTemplateRows: "repeat(3,1fr)",
  top: "0",
  width: "100vw",
  height: "100vh",
});

const PrimaryButton = styled.button({
  background: "#DA2C38",
  color: "white",
  rounded: "4px",
  border: "none",
  paddingBlock: "8px",
  paddingInline: "8px",
  borderRadius: "4px",
  cursor: "pointer",
});

const SecondaryButton = styled.button({
  background: "transparent",
  rounded: "4px",
  border: "1px solid #DA2C38",
  color: "#DA2C38",
  paddingBlock: "8px",
  paddingInline: "8px",
  borderRadius: "4px",
  cursor: "pointer",
});

const Title = styled.h2({});
const TitleContainer = styled.div({
  display: "grid",
  placeItems: "center",
  height: "20%",
  paddingBlock: "8px",
});
const MessageContainer = styled.div({
  height: "60%",
  width: "80%",
  paddingBlock: "8px",
  paddingInline: "18px",
});
const Message = styled.p({});
const Footer = styled.footer({
  height: "20%",
  display: "flex",
  justifyContent: "space-around",
  paddingBlock: "8px",
  width: "100%",
});

export function Alert({ isOpen, onClose, message, title, onCancel, onConfirm }: Props) {
  if (isOpen) {
    return (
      <Portal>
        <Container>
          <Overlay onClick={onClose} />
          <AlertContainer>
            {title && (
              <TitleContainer>
                <Title>{title}</Title>
              </TitleContainer>
            )}
            <MessageContainer>
              <Message>{message}</Message>
            </MessageContainer>
            <Footer>
              <PrimaryButton type="button" onClick={onCancel}>
                Cancelar
              </PrimaryButton>
              <SecondaryButton type="button" onClick={onConfirm}>
                Aceptar
              </SecondaryButton>
            </Footer>
          </AlertContainer>
        </Container>
      </Portal>
    );
  }

  return null;
}
