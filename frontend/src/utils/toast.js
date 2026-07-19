// Lightweight toast utility — no external library needed.
// Usage: import { toast } from "../utils/toast";
//        toast.success("Saved!"); toast.error("Something went wrong");
//        toast.info("Heads up");

const EVENT_NAME = "ricx-toast";

let idCounter = 0;

const emit = (message, type = "info") => {
  idCounter += 1;
  window.dispatchEvent(
    new CustomEvent(EVENT_NAME, {
      detail: { id: idCounter, message, type },
    })
  );
};

export const toast = {
  success: (message) => emit(message, "success"),
  error: (message) => emit(message, "error"),
  info: (message) => emit(message, "info"),
};

export const TOAST_EVENT_NAME = EVENT_NAME;
