import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import store, { persistor } from "./store/authentication/index";

import reportWebVitals from "./reportWebVitals";
import { AuthContextProvider } from "../src/store/authentication/auth-context";

import { PersistGate } from "redux-persist/integration/react";
import { WishlistContext, WishlistProvider } from "./context/WishlistContext";
import { CartContext } from "./context/CartContext";
//import {disablereactDevTools} from "@fvilers/disable-react-devtools";

// const root = ReactDOM.createRoot(document.getElementById('root'));

// if(!isDevEnv)
// {
//   disableReactDevTools();
// }
ReactDOM.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  // <App/>,
  <Provider store={store}>
    {/* <PersistGate loading={null} persistor = {persistor}> */}
    <AuthContextProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <React.StrictMode>
          <App></App>
        </React.StrictMode>
      </BrowserRouter>
    </AuthContextProvider>
    {/* </PersistGate> */}
  </Provider>,

  document.getElementById("root")
);

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.getElementById("root"),
// );
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
