import type { Product } from "./types";

export function getInputValuesFromEvent(event: React.FormEvent) {
  const arrayOfElements = Object.values(event.target).filter(
    (element) => element.nodeName === "INPUT",
  );

  return arrayOfElements.reduce((acc, input) => {
    return { ...acc, [input.id]: input.value };
  }, {});
}

export function clearInputValues(event: React.FormEvent, exceptions?: string[]) {
  const arrayOfElements = Object.values(event.target).filter(
    (element) => element.nodeName === "INPUT" && !exceptions?.includes(element.id),
  );

  arrayOfElements.forEach((element) => {
    element.value = "";	
  });
}

export function isDuplicated(products: Product[], productName: string) {
  if (products.find((product) => product.name.trim().toLowerCase() === productName)) {
    return true;
  }

  return false;
}
