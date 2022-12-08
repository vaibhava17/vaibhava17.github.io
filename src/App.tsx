import { useState, useEffect } from "react";
import { inject, observer } from "mobx-react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Provider } from "mobx-react";
import AppButton from "./components/AppButton/AppButton";
import { BASE_API_URL } from "./constants/common";
import { Formik, Form } from "formik";
import FormInput from "./components/FormItems/FormInput";
import RootLibrary from "./libraries";

const library = new RootLibrary();
function App() {
  const [colorMode, setColorMode] = useState("light");
  console.log(BASE_API_URL);
  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setColorMode(localStorage.getItem("theme") || "light");
      document.documentElement.classList.add(
        localStorage.getItem("theme") || "light"
      );
    }
  }, [colorMode]);

  function toggleColorMode() {
    setColorMode(colorMode === "light" ? "dark" : "light");
    if (colorMode === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  let authStore = library.authLibrary;
  console.log(library.authLibrary);

  return (
    <Provider state={library}>
      <div className="App">
        <div className="flex flex-row">
          <a href="https://vaibhavag.me" target="_blank">
            <img src="/logo.svg" className="logo" alt="Vite logo" />
          </a>
          <a href="https://reactjs.org" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <AppButton
            label={`Color Mode ${colorMode}`}
            onClick={toggleColorMode}
            color={colorMode === "light" ? "primary" : "secondary"}
          />
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values) => {
            
          }}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <FormInput
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Email"
              />
              <FormInput
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Password"
                type="password"
              />
              <AppButton
                label="Submit"
                type="submit"
                onClick={() => console.log("clicked")}
              />
            </Form>
          )}
        </Formik>
      </div>
    </Provider>
  );
}

export default inject((library) => ({
  state: library,
}))(observer(App));
