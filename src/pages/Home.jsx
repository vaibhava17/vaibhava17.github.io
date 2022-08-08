import React, { useState } from "react";
import Button from "../components/Button/Button";
import AppDrawer from "../components/Drawer/Drawer";
import { DetailsData } from "../data/details";

const Home = () => {
  const [visible, setVisible] = useState(false);

  function handleClick() {
    setVisible(true);
  }

  function onClose() {
    setVisible(false);
  }
  return (
    <div className="section d-flex" id="home">
      <div className="my-auto p-md-5 p-3 me-md-5">
        <h3 className="text-light">Web Developer</h3>
        <h1 className="text-light mb-md-5 mb-3">Vaibhav Agarwal</h1>
        <p className="main-text mb-md-5 mb-3">
          Hey! My name is Vaibhav Agarwal and I'm a India based Web Developer
          with over 2+ year of experience (professional career, presonal projects freelancing). I'm currently working with
          <a
            href="https://www.gunisms.com.au/"
            target="_blank"
            rel="noopener noreferrer"
            className="fw-bold text-light"
          >
            {" "}
            <u>Guni</u>
          </a>
          , Australia as a Frontend Engineer.
        </p>
        <div className="d-none d-md-block">
          <Button
            label="More About Me"
            className="text-light"
            onClick={handleClick}
          />
        </div>
        <AppDrawer visible={visible} data={DetailsData} onClose={onClose} />
      </div>
    </div>
  );
};

export default Home;
