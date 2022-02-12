import React from "react";
import { icons } from "../data/icons";

const Tools = () => {
  return (
    <div className="section d-flex position-relative" id="tools">
      <div className="my-auto p-md-5 p-3 me-md-5 w-100">
        <i className="fas fa-tools position-absolute bg-tools" />
        <h3 className="text-light text-md-start text-center">Tools and Technologies</h3>
        <div className="row icons align-items-center text-center g-4 mt-md-4 mt-3">
          {icons.map((icon, index) => (
            <div className="col" key={index}>
              <a href={icon.link} target="_blank" rel="noopener noreferrer">
              <i className={`fab fa-${icon.icon} m-sm-3 m-md-4`} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tools;
