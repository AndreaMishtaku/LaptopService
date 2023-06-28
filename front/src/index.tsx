import React from "react";
import ReactDOM from "react-dom/client";
import App from "./routes";
import { Provider } from "react-redux";
import initApp from "./initializers/app";
import ThemeProvider from "./theme";
import { Toaster } from "react-hot-toast";

initApp().then((store: any) => {
  const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
  );

  root.render(
    <Provider store={store}>
      <ThemeProvider>
        <Toaster />
        <App />
      </ThemeProvider>
    </Provider>
  );
});
