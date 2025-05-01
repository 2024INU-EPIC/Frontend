import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import isPropValid from "@emotion/is-prop-valid";
import { StyleSheetManager } from "styled-components";

const useMsw = true;
//const useMsw = false;
async function enableMocking() {
  if (process.env.NODE_ENV === "development" && useMsw) {
    const { worker } = await import("./mocks/browser");
    await worker.start();
  }
}

if (useMsw) {
  enableMocking().then(() => {
    createRoot(document.getElementById("root")!).render(
      <StyleSheetManager shouldForwardProp={isPropValid}>
        <StrictMode>
          <App />
        </StrictMode>
      </StyleSheetManager>,
    );
  });
} else {
  createRoot(document.getElementById("root")!).render(
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <StrictMode>
        <App />
      </StrictMode>
    </StyleSheetManager>,
  );
}

// enableMocking().then(() => {
//   createRoot(document.getElementById("root")!).render(
//     <StrictMode>
//       <App />
//     </StrictMode>,
//   );
// });

// createRoot(document.getElementById("root")!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// );
