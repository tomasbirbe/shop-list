import styled from "styled-components";
import { Portal } from "./Portal";

type Props = {
  isOpen: boolean;
  onClose?: () => void;
  children: React.ReactNode;
};

const ModalContainer = styled.div({
  gridArea: "2 / 2 / 3 / 3",
  background: "rgba(0,0,0,0.75)",
});
const Overlay = styled.div({
  gridArea: "1 / 1 / -1 / -1",
  background: "rgba(0,0,0,0.25)",
});

const Container = styled.div({
  position: "fixed",
  display: "grid",
  gridTemplateColumns: "minmax(50px, 1fr) minmax(200px,500px) minmax(50px, 1fr)",
  gridTemplateRows: "minmax(50px, 1fr) minmax(300px,500px) minmax(50px, 1fr)",
  top: "0",
  width: "100vw",
  height: "100vh",
});

export function Modal({ isOpen, onClose, children }: Props) {
  if (isOpen) {
    return (
      <Portal>
        <Container>
          <Overlay onClick={onClose} />
          <ModalContainer>{children}</ModalContainer>
        </Container>
      </Portal>
    );
  }

  return null;
}
