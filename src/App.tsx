import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import AppButton from "./components/AppButton/AppButton";

function App() {
  const [colorMode, setColorMode] = useState("light");

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

  return (
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
    </div>
  );
}

export default App;
