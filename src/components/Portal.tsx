import { createPortal } from "react-dom";

export function Portal({ children }: { children: React.ReactNode }) {
  const element = document.getElementById("portal");

  if (element) {
    return createPortal(children, element);
  } else {
    throw new Error("Portal element is needed");
  }
}
