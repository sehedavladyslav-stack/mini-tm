import { act, type ReactElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';

Reflect.set(globalThis, 'IS_REACT_ACT_ENVIRONMENT', true);

type RenderResult = {
  container: HTMLDivElement;
  root: Root;
  unmount: () => Promise<void>;
};

export async function render(ui: ReactElement): Promise<RenderResult> {
  const container = document.createElement('div');
  const root = createRoot(container);

  document.body.appendChild(container);

  await act(async () => {
    root.render(ui);
  });

  return {
    container,
    root,
    unmount: async () => {
      await act(async () => {
        root.unmount();
      });

      container.remove();
    },
  };
}

export async function click(element: Element) {
  await act(async () => {
    element.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
}

export async function setInputValue(
  element: HTMLInputElement | HTMLTextAreaElement,
  value: string,
) {
  const prototype =
    element instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');

  await act(async () => {
    descriptor?.set?.call(element, value);
    element.dispatchEvent(new Event('input', { bubbles: true }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

export async function setSelectValue(element: HTMLSelectElement, value: string) {
  const descriptor = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value');

  await act(async () => {
    descriptor?.set?.call(element, value);
    element.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

export async function submit(element: HTMLFormElement) {
  await act(async () => {
    element.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  });
}

export async function flushPromises() {
  await act(async () => {
    await Promise.resolve();
  });
}
