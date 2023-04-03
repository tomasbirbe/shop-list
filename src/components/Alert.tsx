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
  background: "rgba(0,0,0,0.75)",
  maxWidth: "400px",
  minWidth: "300px",
  width: "fit-content",
  height: "fit-content",
  placeSelf: "center",
});
const Overlay = styled.div({
  gridArea: "1 / 1 / -1 / -1",
  background: "rgba(0,0,0,0.25)",
});

const Container = styled.div({
  position: "fixed",
  display: "grid",
  // gridTemplateColumns: "minmax(50px, 1fr) minmax(200px,400px) minmax(50px, 1fr)",
  // gridTemplateRows: "minmax(50px, 1fr) minmax(100px,300px) minmax(50px, 1fr)",
  gridTemplateColumns: "repeat(3,1fr)",
  gridTemplateRows: "repeat(3,1fr)",
  top: "0",
  width: "100vw",
  height: "100vh",
});

const PrimaryButton = styled.button({});
const SecondaryButton = styled.button({});
const Title = styled.h2({});
const TitleContainer = styled.div({
  display: "grid",
  placeItems: "center",
  height: "20%",
  background: "red",
  paddingBlock: "8px",
});
const MessageContainer = styled.div({
  background: "blue",
  height: "60%",
  paddingBlock: "8px",
  paddingInline: "12px",
});
const Message = styled.p({});
const Footer = styled.footer({
  height: "20%",
  background: "green",
  display: "flex",
  justifyContent: "space-around",
  paddingBlock: "8px",
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
              <SecondaryButton type="button" onClick={onCancel}>
                Cancelar
              </SecondaryButton>
              <PrimaryButton type="button" onClick={onConfirm}>
                Aceptar
              </PrimaryButton>
            </Footer>
          </AlertContainer>
        </Container>
      </Portal>
    );
  }

  return null;
}
