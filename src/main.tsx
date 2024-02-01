import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { BooksProvider } from "./BookContext.tsx";
import { DisplayProvider } from "./DisplayContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <BooksProvider>
      <DisplayProvider>
        <App />
      </DisplayProvider>
    </BooksProvider>
  </BrowserRouter>
);
