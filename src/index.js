import React from "react";
import ReactDOM from "react-dom";
// import registerServiceWorker from './registerServiceWorker';
import { createBrowserHistory } from "history";
import { unregister } from "./registerServiceWorker";
import { HashRouter } from "react-router-dom";
import "./assets/base.scss";
import "./assets/custom.scss";
import fr from "./translations/fr.json";
import en from "./translations/en.json";
import ar from "./translations/ar.json";
import Main from "./Pages/Main";
import configureStore from "./config/configureStore";
import { Provider } from "react-redux";
import { setDefaultTranslations, setDefaultLanguage } from "react-multi-lang";
import NavigationBar from "./Pages/Components/NavigationComponent/navigation";
import Footer from "./Pages/Components/HomeComponent/Footer";
// import Login from "./Pages/Components/Login";
// import HomeComponent from "./Pages/Components/HomeComponent";
// import Register from "./Pages/Components/Register";

// setDefaultTranslations({ fr, en, ar });
// setDefaultLanguage("fr");
const hist = createBrowserHistory();
setDefaultTranslations({ fr, en, ar });
if (localStorage.getItem("lang")) {
  // console.log("lang",localStorage.getItem("lang"));
  setDefaultLanguage(localStorage.getItem("lang").split("-")[0]);
} else {
  setDefaultLanguage(`${process.env.REACT_APP_LANG_NAME}`);
}

// console.log(window.location, "Hello");

const store = configureStore();
const rootElement = document.getElementById("root");
const renderApp = (Component) => {
  // const serverDEVURL = "https://oncf-2255.azurewebsites.net/";
  // const localServerURL = "http://localhost:3000/";
  // const productionServerURL = "https://192.230.230.221/";
  // const showNav =
  //   window.location.href === serverDEVURL ||
  //   window.location.href === productionServerURL ||
  //   window.location.href === localServerURL ||
  //   window.location.href.includes("frontOffice");

  // console.log(showNav);
  ReactDOM.render(
    <Provider store={store}>
      <HashRouter history={hist}>
        {<NavigationBar />}
        <Component />
        <Footer />
      </HashRouter>
    </Provider>,
    rootElement
  );
};
// change default component here
renderApp(Main);

if (module.hot) {
  module.hot.accept("./Pages/Components/HomeComponent", () => {
    const NextApp = require("./Pages/Components/HomeComponent").default;
    renderApp(NextApp);
  });
}
unregister();

// registerServiceWorker();
