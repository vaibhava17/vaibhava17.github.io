import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import routesMapping from "./routes/mapping";
import AppLayout from "./components/AppLayout/AppLayout";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import About from "./pages/About";
import Tools from "./pages/Tools";
import Contact from "./pages/Contact";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routesMapping.map((i) => {
          return (
            <Route
              key={i.path}
              path={i.path}
              element={
                <>
                  {i.single ? (
                    <AppLayout
                      nav={<i.Navbar />}
                      footer={<i.Footer />}
                      buttons={null}
                      singlePage={i.single}
                    >
                      <i.Component />
                    </AppLayout>
                  ) : (
                    <AppLayout
                      nav={<Navbar />}
                      footer={<Footer />}
                      buttons={null}
                    >
                      <Home />
                      <About />
                      <Tools />
                      <Projects />
                      <Contact />
                    </AppLayout>
                  )}
                </>
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
